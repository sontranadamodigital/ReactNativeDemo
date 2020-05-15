import { RequestConfigProperties, api, API_URL } from "../instances";


export function login(body: any, config: RequestConfigProperties = { showMessage: true, showMessageError: true }) {
    return api.postNormal(API_URL.AUTHEN.LOGIN, body, config);
}

export function register(body: any, config: RequestConfigProperties = { showMessage: true, showMessageError: true }) {
    return api.postNormal(API_URL.AUTHEN.REGISTER, body, config);
}

export function verifyCodeRegister(body: any, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.postNormal(API_URL.AUTHEN.VERIFY_CODE_REGISTER, body, config);
}

export function verifyAccount(body: any, config: RequestConfigProperties = { showMessage: true, showMessageError: true }) {
    return api.postNormal(API_URL.AUTHEN.VERIFY_ACCOUNT, body, config);
}

export function logout(config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.AUTHEN.LOG_OUT, config);
}

export function sendCodeForgot(body: any, config: RequestConfigProperties = { showMessage: true, showMessageError: true }) {
    return api.postNormal(API_URL.AUTHEN.SEND_CODE_FORGOT, body, config);
}

export function verifyCodeForgot(body: any, config: RequestConfigProperties = { showMessage: true, showMessageError: true }) {
    return api.postNormal(API_URL.AUTHEN.VERIFY_CODE_FORGOT, body, config);
}


export function setPassForgot(body: any, config: RequestConfigProperties = { showMessage: true, showMessageError: true }) {
    return api.postNormal(API_URL.AUTHEN.SET_PASS_FORGOT, body, config);
}


export function resendVerifyCode(body: any, config: RequestConfigProperties = { showMessage: true, showMessageError: true }) {
    return api.postNormal(API_URL.AUTHEN.RESEND_VERIFY_CODE, body, config);
}




