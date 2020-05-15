import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { MerchantDetail } from "./MerchantDetail.view";
import { AuthenActionImp } from "../../../redux/user";
import { LOGIN_ACTION } from "../../../redux/user/types";
import { AppServices } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
    getDetailMerchant: (id: number, page: number, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.getDetailMerchant(id).then(res => {
                callback && callback(false, res);
            }).catch(err => {
                callback && callback(err);
            })
        }
    },
    addToCart:AuthenActionImp.addToCart
}

let MerchantDetailScreen = connect(mapStateToProps, mapDispatchToProp)(MerchantDetail)
export default MerchantDetailScreen