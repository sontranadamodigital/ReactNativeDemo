

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Yup from 'yup';
import { AppFlowRouteName } from '../../../navigation';
import { GlobalUIManager } from '../../../common';
//@ts-ignore
import simpleStore from 'react-native-simple-store'
import { StorageConstant, Voucher, CartItem } from '../../../instances';
import { Animated } from 'react-native';
import { Route } from '@react-navigation/native';

interface Props {
    navigation: StackNavigationProp<any>
    route: Route<any>
    language: string
    getDetailCoupon: (id: number, callback: (isErr: any, res?: any) => void) => void
    recentlyViewed: Array<Voucher>
    favouriteCoupon: (body: any, callback: (isErr: any, res?: any) => void) => void
    addToCart: (cart: CartItem[], callback: () => void) => void
}

interface State {
    language: string
    opacity: Animated.Value,
    loading: boolean,
    detailCoupon: any,
    firstLoading: boolean,
}

export class DetailCouponLogic extends React.PureComponent<Props, State> {
    state = {
        language: this.props.language,
        opacity: new Animated.Value(0),
        loading: false,
        detailCoupon: {},
        firstLoading: true,
    }

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        let { route, recentlyViewed } = this.props
        let params: any = route.params
        if (!params || !Number(params.id)) {
            this.props.navigation.goBack();
            return;
        }
        GlobalUIManager.view.showLoading();
        this.setState({ loading: true });
        this.props.getDetailCoupon(Number(params.id), (isErr, res) => {
            if (!isErr) {
                this.setState({ detailCoupon: res }, () => {
                    this.setState({ loading: false, firstLoading: false, })
                    let savedViewed = recentlyViewed.map((item) => {
                        return {
                            id: item.id,
                            category_id: res.coupon.category_id,
                            viewed_at: Date.now()
                        }
                    })
                    simpleStore.save(StorageConstant.RECENTLY_VIEWED_VOUCHER, savedViewed.concat([{
                        id: params.id,
                        category_id: res.coupon.category_id,
                        viewed_at: Date.now()
                    }]));
                });
            } else {
                this.props.navigation.goBack();
                this.setState({ loading: false });
            }
            GlobalUIManager.view.hideLoading();
        })
    }

    refresh = () => {
        let { route } = this.props
        let params: any = route.params
        if (!params || !Number(params.id)) {
            this.props.navigation.goBack();
            return;
        }
        this.setState({ loading: true });
        this.props.getDetailCoupon(Number(params.id), (isErr, res) => {
            if (!isErr) {
                this.setState({ detailCoupon: res }, () => {
                    this.setState({ loading: false })
                });
            } else {
                this.props.navigation.goBack();
                this.setState({ loading: false });
            }
        })
    }

    saveCoupon = (isSaved: boolean, callback: (isErr: boolean) => void) => {
        let { route, } = this.props
        let { detailCoupon } = this.state
        let params: any = route.params
        this.props.favouriteCoupon({
            "coupon_id": params.id,
            "status": isSaved
        }, (isErr: any, res: any) => {
            if (!isErr) {
                callback(false)
            } else callback(true)
        })
    }

}
