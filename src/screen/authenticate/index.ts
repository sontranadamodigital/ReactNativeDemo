import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../redux";
import { Authen } from "./Authen";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
}

let AuthenScreen = connect(mapStateToProps, mapDispatchToProp)(Authen)
export default AuthenScreen