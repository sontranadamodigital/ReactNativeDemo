

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Yup from 'yup';
import { AppFlowRouteName } from '../../../navigation';
import { GlobalUIManager } from '../../../common';
//@ts-ignore
import simpleStore from 'react-native-simple-store'
import { StorageConstant, Voucher, Paging, CartItem } from '../../../instances';

interface Props {
    navigation: StackNavigationProp<any>,
    getSavedCounpon: (page: number, callback?: (isErr: any, res?: any) => void) => void
    addToCart: (cart: CartItem[], callback: () => void) => void
    favouriteCoupon: (body: any, callback: (isErr: any, res?: any) => void) => void
}

interface State {
    paging: Paging,
    data: Array<Voucher>,
    firstLoading: boolean,

}

export class SavedCouponLogic extends React.PureComponent<Props, State> {
    state = {
        paging: {
            current_page: 1,
            last_page: 1,
            total: 1,
        },
        data: [],
        firstLoading: true
    }

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.refresh();
    }

    refresh = (calback?: () => void) => {
        let { current_page, last_page, total } = this.state.paging
        this.props.getSavedCounpon(1, (isErr, res) => {
            if (!isErr) {
                console.log('000---res', res);
                this.setState({
                    data: res.data,
                    paging: res.paging
                })
            }
            this.setState({
                firstLoading: false
            })
            calback && calback()
        })

    }


    loadMore = (calback?: () => void) => {
        let { current_page, last_page, total } = this.state.paging
        if (current_page >= last_page) {
            calback && calback()
            return
        }
        this.props.getSavedCounpon(current_page + 1, (isErr, res) => {
            if (!isErr) {
                console.log('000---res', res);
                this.setState({
                    data: this.state.data.concat(res.data),
                    paging: res.paging
                })
            }
        })
    }

    removeCoupon = (id: number) => {
        GlobalUIManager.view.showLoading();
        this.props.favouriteCoupon({
            "coupon_id": id,
            "status": false
        }, (isErr: any, res: any) => {
            if (!isErr) {
                this.refresh();
            }
            GlobalUIManager.view.hideLoading()
        })
    }

}
