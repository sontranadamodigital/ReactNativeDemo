import { Dispatch } from "react";
import { Action, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReduxState } from "../../../redux";
import { Home } from "./Home.view";
import { AuthenActionImp } from "../../../redux/user";
const mapStateToProps = (state: ReduxState) => {
    return {
        token: state.user.token,
        language: state.user.language,
        banner: state.user.banner,
        categories: state.user.categories,
        hotDeal: state.user.hotDeal,
        todayDeal: state.user.todayDeal,
        recentlyViewed: state.user.recentlyViewed,
        recommendVoucher: state.user.recommendVoucher,
        todayDealPaging: state.user.todayDealPaging
    }
}

const mapDispatchToProp = {
    getResource: AuthenActionImp.getResource,
    getViewedVoucher: AuthenActionImp.getViewedVoucher,
    getDealToday: AuthenActionImp.getDealToday,
    getMoreDealToday: AuthenActionImp.getMoreDealToday,
    addToCart: AuthenActionImp.addToCart
}

let HomeScreen = connect(mapStateToProps, mapDispatchToProp)(Home)
export default HomeScreen