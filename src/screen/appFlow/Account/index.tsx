import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { Account } from "./Account.view";
import { AuthenActionImp } from "../../../redux/user";
import { LOGIN_ACTION, LOG_OUT_ACTION } from "../../../redux/user/types";
import { AuthenService } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        token: state.user.token,
        language: state.user.language,
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProp = {
    changeLanguage: (language: string) => {
        return (dispatch: any) => {
            dispatch({
                type: LOGIN_ACTION,
                payload: {
                    language,
                }
            })
        }
    },
    logout: AuthenActionImp.logout

}

let AccountScreen = connect(mapStateToProps, mapDispatchToProp)(Account)
export default AccountScreen