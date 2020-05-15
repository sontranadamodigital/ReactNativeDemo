

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Banner, Category, Voucher, StorageConstant, SavedVoucher, Paging, CartItem } from '../../../instances';
//@ts-ignore
import simpleStore from 'react-native-simple-store'

interface Props {
    token: string,
    navigation: StackNavigationProp<any>,
    banner: Array<Banner>,
    categories: Array<Category>,
    hotDeal: Array<Voucher>,
    language: string,
    todayDeal: Array<Voucher>,
    recentlyViewed: Array<Voucher>,
    recommendVoucher: Array<Voucher>,
    todayDealPaging: Paging,
    getResource: (page: number, callback: (isErr: any, res?: any) => void) => void
    getViewedVoucher: (body: any, callback?: (isErr: any, res?: any) => void) => void
    getDealToday: (page: number, body: any, callback: (isErr: any, res?: any) => void) => void
    getMoreDealToday: (currentData: Array<Voucher>, page: number, body: any, callback: (isErr: any, res?: any) => void) => void
    addToCart: (cart: Array<CartItem>, callback: () => void) => void
}

interface State {

}

export class HomeLogic extends React.PureComponent<Props, State> {

    state = {
    }

    componentDidMount() {

    }

    carouselRef: any = null

    refresh = (calback?: () => void) => {
        simpleStore.get(StorageConstant.RECENTLY_VIEWED_VOUCHER).then((coupons: Array<SavedVoucher>) => {
            if (!!coupons && coupons.length > 0) {
                this.props.getViewedVoucher({
                    coupons
                }, () => {
                    this.loadResouce(calback);
                })
            } else this.loadResouce(calback);
        }).catch((err: any) => {
            console.log("-----err getRecentlyViewedVoucher", err)
            this.loadResouce(calback);
        })

    }

    loadResouce = (calback?: () => void) => {
        this.props.getResource(1, (isErr, res) => {
            calback && calback()
        })
    }

    loadMore = (calback?: () => void) => {
        let { todayDealPaging, todayDeal } = this.props
        // @ts-ignore
        if (todayDealPaging.current_page < todayDealPaging.last_page && todayDealPaging.total > 20) {
            // @ts-ignore
            this.props.getMoreDealToday(todayDeal, todayDealPaging.current_page + 1, {}, () => {
                calback && calback()
            })
        } else {
            calback && calback()
        }
    }


}
