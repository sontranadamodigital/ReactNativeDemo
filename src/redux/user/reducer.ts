import { Reducer } from 'redux'
import { LOGIN_ACTION, AuthenActionTypes, SPLASH_ACTION, LOG_OUT_ACTION } from "./types";
import { Banner, Category, Voucher, Paging, CartItem, StaticArticle } from '../../instances';

export interface UserState {
    userInfo: any,
    token: string,
    language: string,
    onSplash: boolean,
    banner: Array<Banner>,
    categories: Array<Category>,
    hotDeal: Array<Voucher>,
    todayDeal: Array<Voucher>,
    recentlyViewed: Array<Voucher>,
    recommendVoucher: Array<Voucher>,
    todayDealPaging: Paging,
    cart: Array<CartItem>,
    customerServices: StaticArticle,
    term: StaticArticle
}

const INITIAL: UserState = {
    userInfo: {},
    token: '',
    language: 'en',
    onSplash: true,
    banner: [],
    categories: [],
    hotDeal: [],
    todayDeal: [],
    todayDealPaging: {},
    recentlyViewed: [],
    recommendVoucher: [],
    cart: [],
    customerServices: {},
    term: {}
}

export const userReducer: Reducer<UserState, AuthenActionTypes> = (
    state: UserState = INITIAL,
    action: AuthenActionTypes): UserState => {
    const { type, payload } = action

    switch (type) {
        case LOGIN_ACTION:
            return Object.assign({}, state, payload)
        case SPLASH_ACTION:
            return Object.assign({}, state, payload)
        case LOG_OUT_ACTION:
            return Object.assign({}, state, payload)
        default:
            return state
    }

}