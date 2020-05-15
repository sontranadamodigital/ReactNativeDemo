import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { DetailCoupon } from "./DetailCoupon.view";
import { AuthenActionImp } from "../../../redux/user";
import { LOGIN_ACTION } from "../../../redux/user/types";
import { AppServices } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language,
        recentlyViewed: state.user.recentlyViewed
    }
}

const mapDispatchToProp = {
    getDetailCoupon: (id: number, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.getDetailCoupon(id).then(res => {
                callback && callback(false, res);
            }).catch(err => {
                console.log("----getDetailCoupon err", err);
                callback && callback(err);
            })
        }
    },
    favouriteCoupon: (body: any, callback: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.saveFavCoupon(body).then(res => {
                callback && callback(false, res);
            }).catch(err => {
                console.log("----favouriteCoupon err", err);
                callback && callback(err);
            })
        }
    },
    addToCart:AuthenActionImp.addToCart
}

let DetailCouponScreen = connect(mapStateToProps, mapDispatchToProp)(DetailCoupon)
export default DetailCouponScreen