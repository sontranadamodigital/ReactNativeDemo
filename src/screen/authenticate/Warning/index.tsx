import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { Warning } from "./Warning.view";
import { LOGIN_ACTION } from "../../../redux/user/types";
import { AuthenActionImp } from "../../../redux/user";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
    login: AuthenActionImp.login,
}

let WarningScreen = connect(mapStateToProps, mapDispatchToProp)(Warning)
export default WarningScreen