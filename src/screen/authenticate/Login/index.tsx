import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { Login } from "./Login.view";
import { AuthenActionImp } from "../../../redux/user";
import { AuthenService } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
    login: AuthenActionImp.login,
    confirmCode: AuthenActionImp.verifyAccount,
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

let LoginScreen = connect(mapStateToProps, mapDispatchToProp)(Login)
export default LoginScreen