import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { MyOrder } from "./MyOrder.view";
import { AppServices } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
    getMyOrder: (page: number, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.getMyOrder(page).then(res => {
                callback && callback(false, res);
            }).catch(err => {
                console.log("----- getMyOrder err", err);
                callback && callback(err);
            })
        }
    }
}

let MyOrderScreen = connect(mapStateToProps, mapDispatchToProp)(MyOrder)
export default MyOrderScreen