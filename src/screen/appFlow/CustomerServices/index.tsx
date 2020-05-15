import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { CustomerServices } from "./CustomerServices.view";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language,
        customerServices: state.user.customerServices,
    }
}

const mapDispatchToProp = {
}

let CustomerServicesScreen = connect(mapStateToProps, mapDispatchToProp)(CustomerServices)
export default CustomerServicesScreen