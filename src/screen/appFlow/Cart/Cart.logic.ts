

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Yup from 'yup';
import { AppFlowRouteName } from '../../../navigation';
import { GlobalUIManager } from '../../../common';
//@ts-ignore
import simpleStore from 'react-native-simple-store'
import { StorageConstant, CartDetailItem, CartItem, Voucher } from '../../../instances';
import { CommonImage } from '../../../assets';

interface Props {
    navigation: StackNavigationProp<any>,
    getShoppingCart: (body: any, callback?: (isErr: any, res?: any) => void) => void,
    cartReducer: Array<CartItem>
    updateQuantOfCart: (cartItem: CartItem, callback: () => void) => void
    clearCart: (callback?: () => void) => void
    createOrder: (body: any, callback?: (isErr: any, res?: any) => void) => void
    token: string
}

interface State {
    cart: Array<CartDetailItem>,
    firstLoading: boolean,

}

export class CartLogic extends React.PureComponent<Props, State> {
    state = {
        cart: [],
        firstLoading: true,
    }

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        GlobalUIManager.view.showLoading();
        this.props.getShoppingCart({
            couponIds: this.props.cartReducer.map(item => {
                return item.id
            })
        }, (isErr: any, res?: any) => {
            if (!isErr) {
                this.setState({
                    cart: this.props.cartReducer.map(item => {
                        let index = res.findIndex((i: Voucher) => i.id === item.id)
                        return {
                            ...item,
                            coupon: index !== -1 ? res[index] : {}
                        }
                    })
                })
            }
            this.setState({ firstLoading: false })
            GlobalUIManager.view.hideLoading();
        })
    }

    refresh = (calback?: () => void) => {
        this.props.getShoppingCart({
            couponIds: this.props.cartReducer.map(item => {
                return item.id
            })
        }, (isErr: any, res?: any) => {
            if (!isErr) {
                this.setState({
                    cart: this.props.cartReducer.map(item => {
                        let index = res.findIndex((i: Voucher) => i.id === item.id)
                        return {
                            ...item,
                            coupon: index !== -1 ? res[index] : {}
                        }
                    })
                })
            }
            calback && calback()
        })

    }

    updateQuant = (props: { id: number, quantity: number }) => {
        this.props.updateQuantOfCart({ id: props.id, quantity: props.quantity }, () => {
            this.setState({
                cart: this.state.cart.map((item: CartDetailItem) => {
                    return {
                        ...item,
                        quantity: item.id === props.id ? props.quantity : item.quantity
                    }
                })
            })
        })
    }

    loadMore = (calback?: () => void) => {
        calback && calback()
    }

    calculateTotalMoney = () => {
        let { cart } = this.state
        let total: number = 0
        cart.map((item: CartDetailItem) => {
            total = total + item.quantity * (item.coupon.cp_sale_price || 0)
        })
        return total
    }

    confirm = () => {
        if (this.calculateTotalMoney() > 0) {
            if (!this.props.token) {
                this.props.navigation.replace(AppFlowRouteName.AuthenScreen)
                return;
            }
            GlobalUIManager.view.showLoading();
            this.props.createOrder({
                "orders": this.state.cart.map((item: CartDetailItem) => {
                    return {
                        coupon_id: item.id,
                        quantity: item.quantity
                    }
                }).filter((item) => !!item)
            }, (isErr, res) => {
                console.log("------res", res);
                if (!isErr) {
                    this.props.clearCart();
                    this.setState({
                        cart: []
                    })
                    GlobalUIManager.view.showAlert({
                        alertIcon: CommonImage.Congratulation,
                        alertIsSuccess: true,
                        alertTitle: res.title || "",
                        alertMess: res.message || "",
                        alertOnPress: () => { this.props.navigation.navigate(AppFlowRouteName.HomeScreen) },
                        alertVisible: true,
                    })
                }
                GlobalUIManager.view.hideLoading();
            })
        } else {
            this.props.navigation.navigate(AppFlowRouteName.HomeScreen)
        }
    }

}
