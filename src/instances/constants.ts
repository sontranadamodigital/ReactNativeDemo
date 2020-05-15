
export const ApiConfigs = {
    baseURL: "https://snapad-api.adamo.tech/api",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "timeout": 5000,
    }
}

export const API_URL = {
    AUTHEN: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/signup",
        VERIFY_CODE_REGISTER: "/auth/verify",
        VERIFY_ACCOUNT: "/auth/login/verify",
        SET_PASS_REGISTER: "/auth/setup-password",
        RESEND_VERIFY_CODE: "/auth/signup/code",
        LOG_OUT: "/auth/logout",
        SEND_CODE_FORGOT: "/password/forgot",
        VERIFY_CODE_FORGOT: "/password/verify",
        SET_PASS_FORGOT: "/password/create",
        CHANGE_PASS: "/password/update"
    },
    RESOURCE: {
        GET_BANNER: "/home/banner",
        GET_CATEGORY: "/categories",
        GET_HOT_DEAL: "/deals/hot",
        GET_TODAY_DEAL: "/deals/today",
        GET_RECENTLY_VIEWED: "/coupons/history",
        GET_RECOMMENDED: "/coupons/recommends",
        GET_TERMS: "/static/purchase-policy",
        GET_SERVICES: "/static/custom-service"
    },
    NOTIFICATION: {
        UPDATE_DEVICE_TOKEN: "/client/device",
    },
    COUPON: {
        DETAIL: "/coupons",
        SAVE: "/coupons",
        LIST_CART: "/coupons/ids"
    },
    ORDER: {
        LIST: "/orders"
    },
    WALLET: {
        LIST: "/ewallet"
    },
    MERCHANT: {
        DETAIL: "/merchants"
    },
    APP: {
        UPDATE_PROFILE: "/client",
    }
}

export const LangugeType = {
    Thai: 'th',
    English: 'en'
}

export interface StaticArticle {
    id?: number,
    title?: string,
    description?: string,
}

export interface CartItem {
    id: number,
    quantity: number,
}

export interface CartDetailItem {
    id: number,
    coupon: Voucher,
    quantity: number,
}

export interface OrderType {
    id?: number,
    order_code?: string,
    total_amount?: number,
    status?: number,
    order_details?: Array<OrderDetailType>,
    created_at?: string
    total_coupon?: number
}

export interface OrderDetailType {
    "id"?: number,
    "coupon_id"?: number,
    "coupon"?: Voucher
    "quantity"?: number,
    "order_id"?: number,
    "merchant_id"?: number,
    "price"?: number,
    "sale_price"?: number,
    "sub_amount"?: number,
}

export interface E_Wallet {
    "id"?: number,
    "coupon_code"?: string,
    "title"?: string,
    "price"?: number,
    "sale_price"?: number,
    "status"?: number,
    "locations"?: Array<CouponLocation>,
    "merchant_name"?: string,
    "token"?: string,
}

export interface CouponLocation {
    "address"?: string,
    "hot_line"?: string,
}

export interface Paging {
    current_page?: number,
    first_page_url?: string,
    from?: number,
    last_page?: number,
    last_page_url?: string,
    next_page_url?: string,
    path?: string,
    per_page?: number,
    prev_page_url?: string,
    to?: number,
    total?: number,
}

export interface SavedVoucher {
    id: number,
    category_id: number,
    viewed_at: number
}

export interface User {
    "id": number,
    "full_name": string | undefined,
    "email": string | undefined,
    "phone_number": string,
    "gender": number | 0,
    "avatar": string | undefined,
    "email_verified_at": string | undefined,
    "created_at": string | undefined,
    "updated_at": string | undefined,
}

export interface Voucher {
    id?: number,
    product_id?: number,
    merchant_id?: number,
    image_path?: string,
    sales?: number,
    cp_price?: number,
    category?: string,
    category_id?: number,
    cp_sale_price?: number,
    discount_type?: number,
    description?: string,
    quantity?: number,
    coupon_code?: string,
    is_hot_deal?: number,
    merchant_name?: string,
    language?: string,
    title?: string,
    medias?: Array<any>
    discount_percent?: number,
    discount_amount_max?: number,
    discount_amount?: number
}

export interface Banner {
    id: number,
    image_path: string
}
export interface Category {
    id: number,
    name: string,
    description: string,
    icon_path: string,
    sub_categories: Array<SubCategory>
}

export interface SubCategory {
    id: number,
    name: string,
    description: string,
    icon_path: string,

}

export const StorageConstant = {
    TOKEN_KEY: "USER_TOKEN",
    VERSION: 'APP_VERSION',
    ACCOUNT: "ACCOUNT",
    LANGUAGE: "LANGUAGE",
    SEARCH_CACHE: "SEARCH_CACHE",
    IS_USING_APP: "IS_USING_APP",
    FIRST_TIME: "FIRST_TIME",
    RECENTLY_VIEWED_VOUCHER: "RECENTLY_VIEWED_VOUCHER",
    CART: "CART"
}


export const API_ERROR_CODE = {
    UPLOAD_EXCEED: {
        CODE: 413,
        MESSAGE: "The file is too big !"
    },
    REQUEST_ERROR: {
        CODE: 400,
        MESSAGE: "api_request_error"
    },
    INTENER_SERVER_ERROR: {
        CODE: 500,
        MESSAGE: "Cannot connect to server. Try Again later!"
    },
    NO_RESPONSE: {
        CODE: 1000,
        MESSAGE: "api_no_response"
    },
    AUTHENTICATE: {
        CODE: 401,
        MESSAGE: "Your session has expired please login again"
    },
    VAILDATE: {
        CODE: 422,
        MESSAGE: "Something went wrong. Try Again later!"//"api_request_validate"
    },
    VAILDATE_LOGIN: {
        CODE: 409,
        MESSAGE: "Something went wrong. Try Again later!"// "api_request_validate"
    },
    SERVER_DATA_ERROR: {
        CODE: 404,
        MESSAGE: "Something went wrong. Try Again later!"
    },
    //stupid code 1000 from server
    CUSTOM_CODE: {
        CODE: 1000,
        MESSAGE: "Something went wrong. Try Again later!"
    }
}