

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Yup from 'yup';
import { AppFlowRouteName } from '../../../navigation';
import { GlobalUIManager } from '../../../common';
//@ts-ignore
import simpleStore from 'react-native-simple-store'
import { StorageConstant, Banner, Category, Voucher, Paging, CartItem } from '../../../instances';
import { Route } from '@react-navigation/native';

interface Props {
    navigation: StackNavigationProp<any>,
    banner: Array<Banner>,
    route: Route<any>,
    categories: Array<Category>,
    getDealsByCate: (page: number, body: any, callback: (isErr: any, res?: any) => void) => void
    addToCart: (cart: CartItem[], callback: () => void) => void
}

interface State {
    voucherList: Array<Voucher>,
    paging: Paging,
    categories: Array<Category>,
    firstLoading: boolean,

}

export class CouponByCateLogic extends React.PureComponent<Props, State> {
    state = {
        voucherList: [],
        paging: {
            total: 1,
            current_page: 1,
            last_page: 1
        },
        categories: [],
        firstLoading: true
    }

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        let { route, } = this.props
        let params: any = route.params
        console.log("----params", params);

        if (!params || !Number(params.cateID)) {
            this.props.navigation.goBack();
            return;
        }
        GlobalUIManager.view.showLoading();
        this.props.getDealsByCate(this.state.paging.current_page, {
            "category_id": params.cateID
        }, (isErr, res) => {
            console.log("----res", res);
            if (!isErr) {
                this.setState({
                    voucherList: res.coupons.data,
                    paging: res.coupons.paging,
                    categories: res.categories,
                    firstLoading: false
                })
            } else {
                this.props.navigation.goBack();
            }
            GlobalUIManager.view.hideLoading();
        })
    }

    refresh = (calback?: () => void) => {
        let { route, } = this.props
        let params: any = route.params
        if (!params || !Number(params.cateID)) {
            this.props.navigation.goBack();
            calback && calback()
            return;
        }
        this.props.getDealsByCate(1, {
            "category_id": params.cateID
        }, (isErr, res) => {
            console.log("----res", res);
            if (!isErr) {
                this.setState({
                    voucherList: res.coupons.data,
                    paging: res.coupons.paging,
                    categories: res.categories,
                })
            } else {
                this.props.navigation.goBack();
            }
            calback && calback()
        })

    }


    loadMore = (calback?: () => void) => {
        let { route, } = this.props
        let { paging } = this.state
        let params: any = route.params
        if (!params || !Number(params.cateID)) {
            this.props.navigation.goBack();
            calback && calback()
            return;
        }
        if (paging.current_page < paging.last_page && paging.total > 20) this.props.getDealsByCate(paging.current_page + 1, {
            "category_id": params.cateID
        }, (isErr, res) => {
            console.log("----res", res);
            if (!isErr) {
                this.setState({
                    voucherList: this.state.voucherList.concat(res.coupons.data),
                    paging: res.coupons.paging,
                    categories: res.categories,
                })
            } else {
                this.props.navigation.goBack();
            }
            calback && calback()
        })
        else calback && calback()
    }

}
