

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Yup from 'yup';
import { AppFlowRouteName } from '../../../navigation';
import { GlobalUIManager } from '../../../common';
//@ts-ignore
import simpleStore from 'react-native-simple-store'
import { StorageConstant, Voucher, Paging, CartItem } from '../../../instances';
import { Animated } from 'react-native';
import { Route } from '@react-navigation/native';

interface Props {
    navigation: StackNavigationProp<any>
    language: string
    route: Route<any>
    getDetailMerchant: (id: number, page: number, callback: (isErr: any, res?: any) => void) => void
    addToCart: (cart: CartItem[], callback: () => void) => void
}

interface State {
    language: string
    opacity: Animated.Value
    loading: boolean,
    detailMerchant: {
        merchant: any,
        merchantCoupons: Array<Voucher>,
    },
    paging: Paging
    firstLoading: boolean,
    loadingMore: boolean,
}

export class MerchantDetailLogic extends React.PureComponent<Props, State> {
    state = {
        language: this.props.language,
        opacity: new Animated.Value(0),
        loading: false,
        detailMerchant: {
            merchant: {},
            merchantCoupons: []
        },
        paging: {
            total: 1,
            current_page: 1,
            last_page: 1
        },
        firstLoading: true,
        loadingMore: false
    }

    constructor(props: Props) {
        super(props)
    }
    componentDidMount() {
        let { route, } = this.props
        let params: any = route.params
        if (!params || !Number(params.id)) {
            this.props.navigation.goBack();
            return;
        }
        GlobalUIManager.view.showLoading();
        this.setState({ loading: true });
        this.props.getDetailMerchant(Number(params.id), this.state.paging.current_page, (isErr, res) => {
            if (!isErr) {
                this.setState({
                    detailMerchant: {
                        merchant: res.merchant,
                        merchantCoupons: res.merchantCoupons.data
                    },
                    paging: res.merchantCoupons.paging
                }, () => {
                    this.setState({ loading: false, firstLoading: false, })
                });
            } else {
                this.props.navigation.goBack();
                this.setState({ loading: false });
            }
            GlobalUIManager.view.hideLoading();
        })
    }

    loadmore = () => {
        let { route, } = this.props
        let params: any = route.params
        if (!params || !Number(params.id)) {
            this.props.navigation.goBack();
            return;
        }
        this.setState({ loadingMore: true });
        this.props.getDetailMerchant(Number(params.id), this.state.paging.current_page + 1, (isErr, res) => {
            if (!isErr) {
                this.setState({
                    detailMerchant: {
                        merchant: res.merchant,
                        merchantCoupons: this.state.detailMerchant.merchantCoupons.concat(res.merchantCoupons.data)
                    },
                    paging: res.merchantCoupons.paging
                }, () => {
                    this.setState({ loadingMore: false, firstLoading: false, })
                });
            } else {
                this.props.navigation.goBack();
                this.setState({ loadingMore: false });
            }
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
        this.props.getDetailMerchant(Number(params.id), 1, (isErr, res) => {
            if (!isErr) {
                this.setState({
                    detailMerchant: {
                        merchant: res.merchant,
                        merchantCoupons: res.merchantCoupons.data
                    },
                    paging: res.merchantCoupons.paging
                }, () => {
                    this.setState({ loading: false })
                });
            } else {
                this.props.navigation.goBack();
                this.setState({ loading: false });
            }
        })
    }



}
