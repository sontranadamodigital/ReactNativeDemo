import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { Register } from "./Register.view";
import { AuthenService } from "../../../services";
import { AuthenActionImp } from "../../../redux/user";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
    register: (body: any, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AuthenService.register(body).then(res => {
                console.log("------res register", res)
                callback && callback(false, res)
            }).catch(err => {
                callback && callback(err)
                console.log("------err register", err)
            })
        }
    },
    confirmCode: (body: any, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AuthenService.verifyCodeRegister(body).then(res => {
                console.warn("------res confirmCode", res)
                callback && callback(false, res)
            }).catch(err => {
                callback && callback(err)
                console.warn("------err confirmCode", err)
            })
        }
    },
    login: AuthenActionImp.login,
    resendCode: (body: any, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AuthenService.resendVerifyCode(body).then(res => {
                console.warn("------res resendCode", res)
                callback && callback(false, res)
            }).catch(err => {
                callback && callback(err)
                console.warn("------err resendCode", err)
            })
        }
    },
}

let RegisterScreen = connect(mapStateToProps, mapDispatchToProp)(Register)
export default RegisterScreen