import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { Notification } from "./Notification.view";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
}

let NotificationScreen = connect(mapStateToProps, mapDispatchToProp)(Notification)
export default NotificationScreen