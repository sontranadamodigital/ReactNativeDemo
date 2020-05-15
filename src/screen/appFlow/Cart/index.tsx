import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { Cart } from "./Cart.view";
import { AuthenActionImp } from "../../../redux/user";
import { LOGIN_ACTION } from "../../../redux/user/types";
import { AppServices } from "../../../services";
const mapStateToProps = (state: ReduxState) => {
    return {
        language: state.user.language,
        cartReducer: state.user.cart,
        token: state.user.token
    }
}

const mapDispatchToProp = {
    getShoppingCart: (body: any, callback?: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.getShoppingCart(body).then(res => {
                console.log("----- getShoppingCart res", res);
                callback && callback(false, res)
            }).catch(err => {
                console.log("----- getShoppingCart err", err);
                callback && callback(err)
            })
        }
    },
    updateQuantOfCart: AuthenActionImp.updateQuantOfCart,
    clearCart: AuthenActionImp.clearCart,
    createOrder: (body: any, callback?: (isErr: any, res?: any) => void) => {
        return () => {
            AppServices.createOrder(body).then(res => {
                callback && callback(false, res);
            }).catch(err => {
                console.log("----createOrder err", err);
                callback && callback(err);
            })
        }
    },
}

let CartScreen = connect(mapStateToProps, mapDispatchToProp)(Cart)
export default CartScreen