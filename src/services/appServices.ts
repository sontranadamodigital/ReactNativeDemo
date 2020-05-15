import { RequestConfigProperties, api, API_URL } from "../instances";


export function updateProfile(body: any, config: RequestConfigProperties = { showMessage: true, showMessageError: true }) {
    return api.postForm(API_URL.APP.UPDATE_PROFILE, body, config);
}

export function getTerm(config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.RESOURCE.GET_TERMS, config);
}

export function getCustomerServices(config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.RESOURCE.GET_SERVICES, config);
}

export function getBanner(config: RequestConfigProperties = { showMessage: false, showMessageError: false }) {
    return api.get(API_URL.RESOURCE.GET_BANNER, config);
}

export function getCategories(config: RequestConfigProperties = { showMessage: false, showMessageError: false }) {
    return api.get(API_URL.RESOURCE.GET_CATEGORY, config);
}

export function getHotDeal(config: RequestConfigProperties = { showMessage: false, showMessageError: false }) {
    return api.get(API_URL.RESOURCE.GET_HOT_DEAL, config);
}

export function getDealToday(page: number, body: any, config: RequestConfigProperties = { showMessage: false, showMessageError: false }) {
    return api.postNormal(API_URL.RESOURCE.GET_TODAY_DEAL + "?page=" + page, body, config);
}

export function getRecentViewed(body: any, config: RequestConfigProperties = { showMessage: false, showMessageError: false }) {
    return api.postNormal(API_URL.RESOURCE.GET_RECENTLY_VIEWED, body, config);
}

export function getRecommended(body: any, config: RequestConfigProperties = { showMessage: false, showMessageError: false }) {
    return api.postNormal(API_URL.RESOURCE.GET_RECOMMENDED, body, config);
}

export function getDetailCoupon(id: number, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.COUPON.DETAIL + "/" + id, config);
}

export function getDetailMerchant(id: number, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.MERCHANT.DETAIL + "/" + id, config);
}

export function saveFavCoupon(body: any, config: RequestConfigProperties = { showMessage: true, showMessageError: true }) {
    return api.postNormal(API_URL.COUPON.SAVE, body, config);
}

export function getSavedCoupon(page: number, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.COUPON.SAVE + "?page=" + page, config);
}

export function getMyOrder(page: number, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.ORDER.LIST + "?page=" + page, config);
}

export function getMyOrderDetail(id: number, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.ORDER.LIST + "/" + id, config);
}

export function getWallet(page: number, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.WALLET.LIST + "?page=" + page, config);
}

export function getWalletByOrder(id: number, page: number, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.ORDER.LIST + "/" + id + "/ewallet" + "?page=" + page, config);
}

export function getWalletDetail(id: number, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.get(API_URL.WALLET.LIST + "/" + id, config);
}

export function getShoppingCart(body: any, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.postNormal(API_URL.COUPON.LIST_CART, body, config);
}

export function createOrder(body: any, config: RequestConfigProperties = { showMessage: false, showMessageError: true }) {
    return api.postNormal(API_URL.ORDER.LIST, body, config);
}


export function updateDeviceToken(body: any, config: RequestConfigProperties = { showMessage: false, showMessageError: false }) {
    return api.postNormal(API_URL.NOTIFICATION.UPDATE_DEVICE_TOKEN, body, config);
}