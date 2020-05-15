import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { ForgotPass } from "./ForgotPass.view";
import { AuthenService } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
    sendCode: (body: any, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AuthenService.sendCodeForgot(body).then(res => {
                console.warn("------res sendCode", res)
                callback && callback(false, res)
            }).catch(err => {
                callback && callback(err)
                console.warn("------err sendCode", err)
            })
        }
    },
    verifyCode: (body: any, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AuthenService.verifyCodeForgot(body).then(res => {
                console.warn("------res verifyCode", res)
                callback && callback(false, res)
            }).catch(err => {
                callback && callback(err)
                console.warn("------err verifyCode", err)
            })
        }
    },
    changePass: (body: any, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AuthenService.setPassForgot(body).then(res => {
                console.warn("------res changePass", res)
                callback && callback(false, res)
            }).catch(err => {
                callback && callback(err)
                console.warn("------err changePass", err)
            })
        }
    }
}

let ForgotPassScreen = connect(mapStateToProps, mapDispatchToProp)(ForgotPass)
export default ForgotPassScreen