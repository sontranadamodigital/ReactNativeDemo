import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { DeliveryInfo } from "./DeliveryInfo.view";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
}

let DeliveryInfoScreen = connect(mapStateToProps, mapDispatchToProp)(DeliveryInfo)
export default DeliveryInfoScreen