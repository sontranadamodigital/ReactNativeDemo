import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { CouponDetail } from "./CouponDetail.view";
import { AppServices } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
    getWalletDetail: (id: number, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.getWalletDetail(id).then(res => {
                callback && callback(false, res);
            }).catch(err => {
                console.log("----- getWalletDetail err", err);
                callback && callback(err);
            })
        }
    }
}

let CouponDetailScreen = connect(mapStateToProps, mapDispatchToProp)(CouponDetail)
export default CouponDetailScreen