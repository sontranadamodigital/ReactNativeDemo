import { AuthenActionTypes, LOGIN_ACTION, SplashAction, SPLASH_ACTION, LOG_OUT_ACTION } from "./types"
import { AuthenService, AppServices } from "../../services"
// import { api, StorageConstant } from "../../instance"
//@ts-ignore
import simpleStore from 'react-native-simple-store'
import { store } from "../store"
import { api, RequestConfigProperties, User, StorageConstant, Voucher, CartItem } from "../../instances"

const loginInfo = (token: string = '', userInfo: User): AuthenActionTypes => {
    return {
        type: LOGIN_ACTION,
        payload: {
            token,
            userInfo
        }
    }
}
const changeLanguage = (language: string = ''): AuthenActionTypes => {
    return {
        type: LOGIN_ACTION,
        payload: {
            language,
        }
    }
}


const changeSplash = (onSplash: boolean): SplashAction => {
    return {
        type: SPLASH_ACTION,
        payload: {
            onSplash
        }
    }
}

const login = (
    body: any,
    callback: (isErr: any, res?: any) => void,
    config?: RequestConfigProperties
) => {
    return (dispatch: any) => {
        AuthenService.login(body, config || { showMessage: true, showMessageError: true }).then((res: any) => {
            dispatch(loginInfo(res.token, {
                "id": res.data.id,
                "full_name": res.data.full_name || "",
                "email": res.data.email || "",
                "phone_number": res.data.phone_number,
                "gender": res.data.gender || 0,
                "avatar": res.data.avatar || "",
                "email_verified_at": res.data.email_verified_at || "",
                "created_at": res.data.created_at || "",
                "updated_at": res.data.updated_at || "",
            }))
            api.setToken(res.token, body);
            callback && callback(false, res)
        }).catch(err => {
            callback && callback(err)
            console.log("-----err login", err)
        })
    }

}



const verifyAccount = (
    body: any,
    callback: (isErr: any, res?: any) => void,
    config?: RequestConfigProperties
) => {
    return (dispatch: any) => {
        AuthenService.verifyAccount(body, config || { showMessage: true, showMessageError: true }).then((res: any) => {
            dispatch(loginInfo(res.token, {
                "id": res.data.id,
                "full_name": res.data.full_name || "",
                "email": res.data.email || "",
                "phone_number": res.data.phone_number,
                "gender": res.data.gender || 0,
                "avatar": res.data.avatar || "",
                "email_verified_at": res.data.email_verified_at || "",
                "created_at": res.data.created_at || "",
                "updated_at": res.data.updated_at || "",
            }))
            api.setToken(res.token, body);
            callback && callback(false, res)
        }).catch(err => {
            callback && callback(err)
            console.log("-----err verifyAccount", err)
        })
    }

}


const logout = (callback: (isErr: any, res?: any) => void) => {
    return (dispatch: any) => {
        AuthenService.logout().then(res => {
            dispatch({
                type: LOG_OUT_ACTION,
                payload: {
                    userInfo: {},
                    token: '',
                }
            })
            api.clear();
            callback && callback(false, res)
        }).catch(err => {
            callback && callback(err)
        })
    }
}

const updateProfile = (body: any, callback: (isErr: any, res?: any) => void) => {
    return (dispatch: any) => {
        AppServices.updateProfile(body).then((res: any) => {
            dispatch({
                type: LOGIN_ACTION,
                payload: {
                    userInfo: {
                        "id": res.user.id,
                        "full_name": res.user.full_name || "",
                        "email": res.user.email || "",
                        "phone_number": res.user.phone_number,
                        "gender": res.user.gender || 0,
                        "avatar": res.user.avatar || "",
                        "email_verified_at": res.user.email_verified_at || "",
                        "created_at": res.user.created_at || "",
                        "updated_at": res.user.updated_at || "",
                    },
                }
            })
            callback && callback(false, res)
        }).catch(err => {
            console.log("------updateProfile err", err);
            callback && callback(err)
        })
    }
}

const getViewedVoucher = (body: any, callback?: (isErr: any, res?: any) => void) => {
    return (dispatch: any) => {
        Promise.all([
            AppServices.getRecentViewed(body),
            AppServices.getRecommended(body)
        ]).then((res: any) => {
            let recentlyViewed = res[0].data
            dispatch({
                type: LOGIN_ACTION,
                payload: {
                    recentlyViewed,
                    recommendVoucher: res[1].data
                }
            })
            simpleStore.save(StorageConstant.RECENTLY_VIEWED_VOUCHER, !!recentlyViewed && recentlyViewed.map((item: Voucher, index: number) => {
                return {
                    id: item.id,
                    category_id: item.category_id,
                    viewed_at: Math.round(Date.now() / 1000) + Number(index)
                }
            }));
            callback && callback(false, res)
        }).catch(err => {
            console.log("------getViewedVoucher err", err);
            callback && callback(err)
        })
    }
}

const getResource = (page: number, callback: (isErr: any, res?: any) => void) => {
    return (dispatch: any) => {
        Promise.all([
            AppServices.getBanner(),
            AppServices.getCategories(),
            AppServices.getHotDeal(),
            AppServices.getDealToday(page, {}),
            AppServices.getCustomerServices(),
            AppServices.getTerm(),
        ]).then((res: Array<any>) => {
            console.log("------getResource res", res);
            dispatch({
                type: LOGIN_ACTION,
                payload: {
                    banner: res[0].bannerImages,
                    categories: res[1].categories,
                    hotDeal: res[2].data,
                    todayDeal: res[3].coupons.data,
                    todayDealPaging: res[3].coupons.paging,
                    customerServices: res[4].article,
                    term: res[5].article,
                }
            })
            callback && callback(false, res)

        }).catch(err => {
            console.log("------getResource err", err);
            callback && callback(err)
        })
    }
}


const getDealToday = (page: number, body: any, callback: (isErr: any, res?: any) => void) => {
    return (dispatch: any) => {
        AppServices.getDealToday(page, body).then((res: any) => {
            console.log("------getDealToday res", res);
            dispatch({
                type: LOGIN_ACTION,
                payload: {
                    todayDeal: res.data.data,
                    todayDealPaging: res.data.paging
                }
            })
            callback && callback(false, res)

        }).catch(err => {
            console.log("------getDealToday err", err);
            callback && callback(err)
        })
    }
}

const getMoreDealToday = (currentData: Array<Voucher>, page: number, body: any, callback: (isErr: any, res?: any) => void) => {
    return (dispatch: any) => {
        AppServices.getDealToday(page, body).then((res: any) => {
            console.log("------getMoreDealToday res", res);
            dispatch({
                type: LOGIN_ACTION,
                payload: {
                    todayDeal: currentData.concat(res.data.data),
                    todayDealPaging: res.data.paging
                }
            })
            callback && callback(false, res)

        }).catch(err => {
            console.log("------getMoreDealToday err", err);
            callback && callback(err)
        })
    }
}


const saveCart = (cart: Array<CartItem>, callback: () => void) => {
    return (dispatch: any) => {
        dispatch({
            type: LOGIN_ACTION,
            payload: { cart }
        })
        callback()
    }
}


const addToCart = (cart: Array<CartItem>, callback: () => void) => {
    return (dispatch: any, getState: any) => {
        let oldCart: Array<CartItem> = getState().user.cart
        let newCart: Array<CartItem> = [];
        oldCart.concat(cart).map(item => {
            let index = newCart.findIndex(i => i.id === item.id)
            if (index === -1) {
                newCart.push(item);
            } else {
                newCart[index].quantity = newCart[index].quantity + item.quantity
            }
        })
        dispatch({
            type: LOGIN_ACTION,
            payload: { cart: newCart }
        })
        simpleStore.save(StorageConstant.CART, newCart)
        console.log('----addToCart .cart', newCart);
        callback()
    }
}

const refreshFireBaseToken = (body: any) => {
    return () => {
        AppServices.updateDeviceToken(body).then(response => {
            console.log(' seting refreshFireBaseToken response======', response)
            // callback(false, response);
        }).catch(err => {
            console.log('-----err refreshFireBaseToken', err)
            // callback(err);
        })
    }
}
const updateQuantOfCart = (cartItem: CartItem, callback: () => void) => {
    return (dispatch: any, getState: any) => {
        let oldCart: Array<CartItem> = getState().user.cart
        let index = oldCart.findIndex(i => i.id === cartItem.id)
        if (cartItem.quantity === 0) {
            oldCart = oldCart.filter(i => i.id !== cartItem.id)
        }
        else if (index !== -1) {
            oldCart[index].quantity = cartItem.quantity
        }
        dispatch({
            type: LOGIN_ACTION,
            payload: { cart: oldCart }
        })
        simpleStore.save(StorageConstant.CART, oldCart)
        console.log('---- updateQuantOfCart   .cart', oldCart);
        callback()
    }
}


const clearCart = (callback?: () => void) => {
    return (dispatch: any) => {
        dispatch({
            type: LOGIN_ACTION,
            payload: { cart: [] }
        })
        simpleStore.save(StorageConstant.CART, [])
        callback && callback()
    }
}


export const AuthenActionImp = {
    loginInfo,
    changeLanguage,
    changeSplash,
    login,
    getDealToday,
    logout,
    updateProfile,
    verifyAccount,
    getResource,
    getMoreDealToday,
    getViewedVoucher,
    saveCart,
    addToCart,
    updateQuantOfCart,
    clearCart,
    refreshFireBaseToken
}