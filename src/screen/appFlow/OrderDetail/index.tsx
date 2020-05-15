import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { OrderDetail } from "./OrderDetail.view";
import { AppServices } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
    getMyOrderDetail: (id: number, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.getMyOrderDetail(id).then(res => {
                callback && callback(false, res);
            }).catch(err => {
                console.log("----- getMyOrderDetail err", err);
                callback && callback(err);
            })
        }
    }
}

let OrderDetailScreen = connect(mapStateToProps, mapDispatchToProp)(OrderDetail)
export default OrderDetailScreen