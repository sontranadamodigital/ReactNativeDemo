import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { SavedCoupon } from "./SavedCoupon.view";
import { AuthenActionImp } from "../../../redux/user";
import { LOGIN_ACTION } from "../../../redux/user/types";
import { AppServices } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language
    }
}

const mapDispatchToProp = {
    getSavedCounpon: (page: number, callback?: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.getSavedCoupon(page).then(res => {
                callback && callback(false, res)
            }).catch(err => {
                console.log("----- getSavedCounpon err", err);
                callback && callback(err)
            })
        }
    },
    addToCart: AuthenActionImp.addToCart,
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
}

let SavedCouponScreen = connect(mapStateToProps, mapDispatchToProp)(SavedCoupon)
export default SavedCouponScreen