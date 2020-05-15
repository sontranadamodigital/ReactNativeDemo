import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { VerifyCode } from "./VerifyCode.view";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
}

let VerifyCodeScreen = connect(mapStateToProps, mapDispatchToProp)(VerifyCode)
export default VerifyCodeScreen