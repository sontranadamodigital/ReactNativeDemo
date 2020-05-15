import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios'
import { showMessage, hideMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
//@ts-ignore
import simpleStore from 'react-native-simple-store'
import { ApiConfigs, StorageConstant, API_ERROR_CODE } from './constants';
import { store } from '../redux';
import { Color, FontWithBold, Device } from '../assets';


export type RequestConfigProperties = {
    showMessage: boolean,
    showMessageError: boolean
}

export interface RequestQueueItemProperties {
    id: Number,
    config: RequestConfigProperties,
}

const DURATION = 3000
class AxiosClass {

    static instance: AxiosClass

    static default() {
        if (!AxiosClass.instance) {
            AxiosClass.instance = new AxiosClass()
        }
        return AxiosClass.instance
    }

    api!: AxiosInstance
    incrementRequestId = 0;
    requestQueue: Array<RequestQueueItemProperties> = [];
    token = "";

    constructor() {
        this.api = axios.create(ApiConfigs)
        this.api.interceptors.response.use(this.interceptorResponses, this.handleErrors);
    }

    setToken = (token: string, body: any) => {
        this.token = token
        this.api.defaults.headers.common['Authorization'] = token;
        simpleStore.save(StorageConstant.ACCOUNT, body);
    }
    clear = () => {
        this.token = ''
        this.api.defaults.headers.common['Authorization'] = null;
        simpleStore.update(StorageConstant.ACCOUNT, "");
        simpleStore.delete(StorageConstant.ACCOUNT);
    }

    handleErrors = (error: AxiosError) => {
        console.log('error', error);
        let message = ""
        const { response, request } = error
        console.log("interceptorResponses error response", response);
        console.log("interceptorResponses error request", request);
        if (response) {
            return this.handleErrorOnResponse(response)
        } else if (request) {
            NetInfo.fetch().then(isConnected => {
                if (!isConnected) {
                    console.log('---------not connection');
                    message = "No internet connection!"
                } else message = error.message
                console.log('--------have connection,', error.message);
                showMessage({
                    type: "danger",
                    message: "Error",
                    description: message,
                    duration: DURATION,
                    //@ts-ignore
                    titleStyle: {
                        color: Color.Red,
                        ...FontWithBold.Bold_600
                    },
                    textStyle: {
                        color: Color.Black,
                        fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Regular',
                    }
                })
                return Promise.reject(error)
            })
        } else {
            message = error.message
        }
        showMessage({
            type: "danger",
            message: "Error",
            description: message,
            duration: DURATION,
            //@ts-ignore
            titleStyle: {
                color: Color.Red,
                ...FontWithBold.Bold_600
            },
            textStyle: {
                color: Color.Black,
                fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Regular',
            }
        })
        return Promise.reject(error)
    }

    interceptorResponses = (response: AxiosResponse): Promise<any> => {
        console.log('response', response);
        const { data, config } = response;
        let optionShowMess = this.requestQueue.find(i => { return i.id === this.incrementRequestId })
        if (!!data.data) {
            // data.showAlert && this.pushFlashMessage(data.message, config, true)
            if (!!optionShowMess?.config.showMessage) {
                showMessage({
                    type: "success",
                    message: data.data.title || data.title,
                    description: data.data.message || data.message,
                    duration: DURATION,
                    //@ts-ignore
                    titleStyle: {
                        color: Color.Success,
                        ...FontWithBold.Bold_600
                    },
                    textStyle: {
                        color: Color.Black,
                        fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Regular',
                    }
                })
            }
            return Promise.resolve(data.data)
        } else {
            return Promise.reject(new Error(API_ERROR_CODE.NO_RESPONSE.CODE.toString()));
        }
    }
    getValidateMessage(data: { message: string, errors: { [key: string]: Array<string> } }) {

        try {
            const { errors } = data
            let listError = Object.keys(errors).map(key => {
                return errors[key].pop()
            })

            let message = listError.join("\n")
            return message ? message : data.message
        } catch (error) {
            console.log('----getValidateMessage err', error);
            return API_ERROR_CODE.VAILDATE.MESSAGE
        }

    }

    handleErrorOnResponse = (response: AxiosResponse) => {
        const { data, status, config } = response;
        console.log('-----errr data', data);
        console.log('-----errr data', data.message);
        let message = ""
        let error;
        let showAlert = data.show_alert
        switch (status) {
            case API_ERROR_CODE.REQUEST_ERROR.CODE:
                message = data.message || (data.error && data.error.message) || API_ERROR_CODE.REQUEST_ERROR.MESSAGE
                error = API_ERROR_CODE.REQUEST_ERROR;
                break;
            case API_ERROR_CODE.INTENER_SERVER_ERROR.CODE:
                message = data.message || (data.error && data.error.message) || API_ERROR_CODE.INTENER_SERVER_ERROR.MESSAGE
                console.log('-----errr data11', data.message);
                error = API_ERROR_CODE.INTENER_SERVER_ERROR
                console.log('-----errr data222', data.message);
                break;
            // break;
            case API_ERROR_CODE.AUTHENTICATE.CODE:
                console.log('-----errr data11', data.message);
                message = data.message || (data.error && data.error.message) || API_ERROR_CODE.AUTHENTICATE.MESSAGE
                console.log('-----errr data222', data.message);
                error = data.error || API_ERROR_CODE.AUTHENTICATE
                console.log('-----errr data333', data.message);
                // Authentication.checkAuthen(data.error)
                showAlert = true;
                break;
            case API_ERROR_CODE.VAILDATE.CODE:
                message = this.getValidateMessage(data.data)
                error = API_ERROR_CODE.VAILDATE.CODE
                break;
            case API_ERROR_CODE.VAILDATE_LOGIN.CODE:
                message = data.message || data.error.message || API_ERROR_CODE.AUTHENTICATE.MESSAGE
                error = API_ERROR_CODE.VAILDATE_LOGIN.CODE
                break;
            case API_ERROR_CODE.SERVER_DATA_ERROR.CODE:
                message = data.message || data.error.message || API_ERROR_CODE.SERVER_DATA_ERROR.MESSAGE
                error = API_ERROR_CODE.SERVER_DATA_ERROR.CODE
                break;
            case API_ERROR_CODE.CUSTOM_CODE.CODE:
                message = data.message || data.error.message || API_ERROR_CODE.SERVER_DATA_ERROR.MESSAGE
                error = API_ERROR_CODE.SERVER_DATA_ERROR.CODE
                break;
            default:
                message = "Something went wrong. Try Again later!"
                error = new Error("404");
                break;
        }

        showAlert && showMessage({
            type: "warning",
            // ,
            duration: DURATION,
            message: data.data.title || data.title,
            description: message,
            //@ts-ignore
            titleStyle: {
                color: Color.Red,
                ...FontWithBold.Bold_600
            },
            textStyle: {
                color: Color.Black,
                fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Regular',
            }
        })
        // Authentication.checkAuthen(error)

        return Promise.reject({ error, message })

    }

    pushReqestQueue = (config: RequestConfigProperties) => {
        this.incrementRequestId++;
        this.requestQueue.push({
            id: this.incrementRequestId,
            config
        })
    }

    get<T>(url: string, config: RequestConfigProperties): Promise<T> {
        this.pushReqestQueue(config)
        return this.api.get(url, {
            headers: {
                _id: this.incrementRequestId,
                ...this.api.defaults.headers,
                "X-localization": store.getState().user.language
            }
        })
    }

    del<T>(
        url: string,
        config: RequestConfigProperties
    ): Promise<T> {
        this.pushReqestQueue(config)
        return this.api.delete(url, {
            headers: {
                _id: this.incrementRequestId,
                ...this.api.defaults.headers,
                "X-localization": store.getState().user.language
            },
        })
    }
    postNormal<T>(
        url: string,
        body: any,
        config: RequestConfigProperties = { showMessage: true, showMessageError: true }
    ): Promise<T> {
        this.pushReqestQueue(config)
        // return this.api.post(url, body, {
        //     headers: {
        //         _id: this.incrementRequestId,
        //         ...this.api.defaults.headers
        //     }
        // })
        return this.api.post(url, body, {
            headers: {
                _id: this.incrementRequestId,
                "X-localization": store.getState().user.language
            }
        })
    }

    put<T>(
        url: string,
        body: any,
        config: RequestConfigProperties = { showMessage: true, showMessageError: true }
    ): Promise<T> {
        this.pushReqestQueue(config)
        // return this.api.put(url, body, {
        //     headers: {
        //         _id: this.incrementRequestId,
        //         ...this.api.defaults.headers
        //     }
        // })
        return this.api.put(url, body, {
            headers: {
                _id: this.incrementRequestId,
                "X-localization": store.getState().user.language
            }
        })
    }

    postForm<T>(url: string, body: FormData, config: RequestConfigProperties): Promise<T> {
        this.pushReqestQueue(config)
        // this.api.defaults.headers.common['Content-Type'] = "multipart/form-data";
        return this.api.post(url, body, {
            headers: {
                _id: this.incrementRequestId,
                "X-localization": store.getState().user.language,
                // ...this.api.defaults.headers,
                "Accept": 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })


    }
}


export default AxiosClass.default()
