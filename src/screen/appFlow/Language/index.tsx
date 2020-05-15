import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { Language } from "./Language.view";
import { AuthenActionImp } from "../../../redux/user";
import { LOGIN_ACTION } from "../../../redux/user/types";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
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
    getResource: AuthenActionImp.getResource,
    getViewedVoucher: AuthenActionImp.getViewedVoucher,
}

let LanguageScreen = connect(mapStateToProps, mapDispatchToProp)(Language)
export default LanguageScreen