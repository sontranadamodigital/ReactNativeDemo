import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { CouponByCate } from "./CouponByCate.view";
import { AuthenActionImp } from "../../../redux/user";
import { LOGIN_ACTION } from "../../../redux/user/types";
import { AppServices } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language,
        banner: state.user.banner,
        categories: state.user.categories,
    }
}

const mapDispatchToProp = {
    getDealsByCate: (page: number, body: any, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.getDealToday(page, body).then(res => {
                callback && callback(false, res);
            }).catch(err => {
                console.log("----- getDealsByCate err", err);
                callback && callback(err);
            })
        }
    },
    addToCart:AuthenActionImp.addToCart
}

let CouponByCateScreen = connect(mapStateToProps, mapDispatchToProp)(CouponByCate)
export default CouponByCateScreen