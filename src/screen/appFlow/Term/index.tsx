import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { Term } from "./Term.view";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language,
        term: state.user.term,
    }
}

const mapDispatchToProp = {
}

let TermScreen = connect(mapStateToProps, mapDispatchToProp)(Term)
export default TermScreen