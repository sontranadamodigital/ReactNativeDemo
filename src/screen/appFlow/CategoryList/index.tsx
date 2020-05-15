import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { CategoryList } from "./CategoryList.view";
import { AuthenActionImp } from "../../../redux/user";
import { LOGIN_ACTION } from "../../../redux/user/types";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language,
        categories: state.user.categories
    }
}

const mapDispatchToProp = {
}

let CategoryListScreen = connect(mapStateToProps, mapDispatchToProp)(CategoryList)
export default CategoryListScreen