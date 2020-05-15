

import React from 'react';
import {
    StyleSheet,
    View,
    RefreshControl,
    Image,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { DetailCouponLogic } from './DetailCoupon.logic';
import { CommonImage, FontSize, Device, Color } from '../../../assets';
import { BGWithScroll, CommonText, CommonFlatlist, VoucherItem, MerchantInfo, CouponTerm, CommonBtn, StartStatus } from '../../../common';
import { I18n } from '../../../instances';
import { Divider } from 'react-native-elements';
import { AppFlowRouteName } from '../../../navigation';

export class DetailCoupon extends DetailCouponLogic {

    renderRightHeader = () => {
        let { detailCoupon } = this.state
        //@ts-ignore
        let counpon: any = !!detailCoupon && !!detailCoupon.coupon ? detailCoupon.coupon : null
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity style={{ marginRight: 20 }}>
                    <Image source={CommonImage.Share} style={{ height: 22, width: 22 }} resizeMethod="scale" resizeMode="contain" />
                </TouchableOpacity>
                <StartStatus isSavedProps={!!counpon ? counpon.is_saved : false} onPress={this.saveCoupon} />
            </View>
        )
    }

    renderListVoucherItem = (title: string, array: Array<any>, multiLanguage: boolean = false) => {
        return (
            <>
                <CommonText text={title} multiLanguage={multiLanguage} style={{ marginHorizontal: 24, marginTop: 20, marginBottom: 15, fontSize: FontSize.Title, fontWeight: '500' }} />
                <CommonFlatlist
                    style={{ width: '100%' }}
                    // ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal
                    data={array}
                    renderItem={({ item }) => <VoucherItem
                        item={item}
                        onPressDetail={() => {
                            this.props.navigation.push(AppFlowRouteName.DetailCouponScreen, { id: item.id })
                        }}
                        onBuy={() => {
                            this.props.addToCart([{ id: item.id, quantity: 1 }], () => {
                                this.props.navigation.navigate(AppFlowRouteName.CartScreen, { id: item.id })
                            })
                        }}
                        containerStyle={{ width: 180, marginHorizontal: 5 }} />}
                    ListHeaderComponent={() => <View style={{ width: 18 }} />}
                    ListFooterComponent={() => <View style={{ width: 18 }} />}
                    //@ts-ignore
                    refreshControl={null}
                />
            </>
        )
    }

    renderCouponTag = (arr: Array<any>) => {
        return (
            <View style={{ flexDirection: 'row', width: '100%', overflow: 'hidden', flexWrap: 'wrap', paddingHorizontal: 24, }}>
                {arr.map((item) => {
                    return (
                        <CommonText
                            key={item}
                            text={item}
                            style={{
                                paddingVertical: 3, borderRadius: 5, margin: 3,
                                overflow: 'hidden', paddingHorizontal: 8,
                                color: Color.Red, backgroundColor: Color.BlurRed,
                            }}
                        />
                    )
                })}
            </View >
        )
    }


    render() {
        let { loading, detailCoupon, firstLoading } = this.state
        //@ts-ignore
        let counpon: any = !!detailCoupon && !!detailCoupon.coupon ? detailCoupon.coupon : null
        //@ts-ignore
        let merchant: any = !!detailCoupon && !!detailCoupon.merchant ? detailCoupon.merchant : null
        //@ts-ignore
        let relatedCoupons: Array<any> = !!detailCoupon && !!detailCoupon.relatedCoupons ? detailCoupon.relatedCoupons : []
        //@ts-ignore
        let merchantCoupons: Array<any> = !!detailCoupon && !!detailCoupon.merchantCoupons ? detailCoupon.merchantCoupons : []
        return (
            <>
                <BGWithScroll showsVerticalScrollIndicator={false}
                    style={{ ...styles.scrollView, }}
                    // hasSafeArea
                    headerProps={{
                        leftIcon: CommonImage.ArrowLeft,
                        leftOnPress: this.props.navigation.goBack,
                        multiLanguage: true,
                        rightComponent: this.renderRightHeader
                    }}
                    scrollEventThrottle={12}
                    onScroll={(value) => {
                        if (Number(value.nativeEvent.contentOffset.y) >= 450) {
                            Animated.timing(
                                this.state.opacity,
                                {
                                    toValue: 1,
                                    duration: 100,
                                    useNativeDriver: true,
                                }
                            ).start()
                        } else {
                            Animated.timing(
                                this.state.opacity,
                                {
                                    toValue: 0,
                                    duration: 100,
                                    useNativeDriver: true,
                                }
                            ).start()
                        }
                    }}
                    headerStyle={{ paddingHorizontal: 15 }}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={this.refresh} tintColor={Color.Black} />}
                >
                    {!firstLoading ? <>
                        <View style={styles.content}>
                            <CommonText
                                numberOfLines={4}
                                text={!!counpon ? counpon.title : ""}
                                style={{ marginTop: 15, paddingHorizontal: 24, fontSize: FontSize.BigTitle, fontWeight: '600', fontFamily: "DMSans-Bold" }} />
                            {this.renderCouponTag(!!counpon ? [counpon.category] : [])}
                            {!!counpon && counpon.medias.length > 0 ? <CommonFlatlist
                                style={{ width: '100%', marginVertical: 15 }}
                                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                horizontal
                                data={counpon.medias}
                                renderItem={({ item }) => {
                                    return <Image source={{ uri: item.image_path }}
                                        style={{ height: 120, width: Device.width - 96, borderRadius: 5, overflow: "hidden" }}
                                        resizeMethod='scale' resizeMode='cover' />
                                }}
                                ListHeaderComponent={() => <View style={{ width: 24 }} />}
                                ListFooterComponent={() => <View style={{ width: 24 }} />}
                                //@ts-ignore
                                refreshControl={null}
                            /> : <View />}
                            <CommonText text={!!counpon ? counpon.description : ""}
                                style={{ paddingHorizontal: 24, fontSize: FontSize.Normal, color: Color.DarkGray }} />
                            <View style={{ width: '100%', alignItems: 'flex-start' }}>
                                <CommonText onPress={() => { this.props.navigation.navigate(AppFlowRouteName.TermScreen) }} text="view_coupon_tc" multiLanguage
                                    style={{ marginVertical: 15, paddingHorizontal: 24, color: Color.Red, textDecorationLine: 'underline', fontSize: FontSize.SmallTitle }} />
                            </View>
                            <Divider style={{ backgroundColor: Color.BlurBorder, marginVertical: 5, marginHorizontal: 20 }} />
                            <View style={{
                                flexDirection: 'row', alignItems: 'baseline', marginHorizontal: 20,
                            }}>
                                <CommonText text={`฿${!!counpon ? counpon.cp_sale_price : ""}`}
                                    style={{
                                        textAlignVertical: 'bottom',
                                        fontWeight: "400", color: Color.Red,
                                        fontSize: FontSize.LargeTitle, marginRight: 5
                                    }} />
                                <CommonText text={`฿${!!counpon ? counpon.cp_price : ""}`}
                                    style={{
                                        paddingBottom: Device.isIos ? 0 : 3,
                                        textAlignVertical: 'bottom',
                                        fontWeight: "400", color: Color.BorderGray,
                                        fontSize: FontSize.SmallTitle, textDecorationLine: 'line-through'
                                    }} />
                                <CommonText
                                    text={!!counpon && counpon.sales > 1 ? `${counpon.sales} ${I18n.t('sales')}` : `${counpon.sales} ${I18n.t('sale')}`}
                                    style={{
                                        textAlignVertical: 'bottom',
                                        fontWeight: "400", color: Color.BorderGray, fontSize: FontSize.Title,
                                        marginRight: 5, position: 'absolute', right: 0, bottom: 0,
                                        paddingBottom: Device.isIos ? 0 : 3,
                                    }} />
                            </View>
                            <View style={{ paddingHorizontal: 20 }}>
                                <CommonBtn title={"buy_title"} multiLanguage onPress={() => {
                                    console.log('------id', detailCoupon)
                                    //@ts-ignore
                                    this.props.addToCart([{ id: counpon.id, quantity: 1 }], () => {
                                        //@ts-ignore
                                        this.props.navigation.navigate(AppFlowRouteName.CartScreen, { id: detailCoupon.id })
                                    })
                                }} containerStyle={{ marginVertical: 15, height: 'auto', paddingVertical: 8, borderRadius: 5 }} titleStyle={{ fontSize: FontSize.Title }} />
                            </View>
                        </View>

                        {merchantCoupons.length > 0 && this.renderListVoucherItem(I18n.trans('other_deal') + ` ${merchant.name.toUpperCase()}`, merchantCoupons, false)}
                        <MerchantInfo onPressDetail={() => {
                            this.props.navigation.push(AppFlowRouteName.MerchantDetailScreen, { id: merchant.id })
                        }} merchant={merchant} containerStyle={{ marginHorizontal: 20, marginTop: 20, }} />
                        {relatedCoupons.length > 0 && this.renderListVoucherItem('related_coupons', relatedCoupons, true)}
                        {/* <CouponTerm containerStyle={{ marginHorizontal: 20, marginTop: 20, }} /> */}
                        <View style={{ height: 100 }} />
                    </> : <View />}
                </BGWithScroll >
                {!firstLoading ? <Animated.View style={{ opacity: this.state.opacity, position: 'absolute', bottom: 0, width: '100%', height: 70, backgroundColor: Color.White, justifyContent: 'center', paddingHorizontal: 20, }}>

                    <View style={{ alignItems: 'baseline', flexDirection: 'row' }}>
                        <CommonText text={`฿${!!counpon ? counpon.cp_sale_price : ""}`}
                            style={{
                                textAlignVertical: 'bottom',
                                fontWeight: "400", color: Color.Red,
                                fontSize: FontSize.Giant, marginRight: 5
                            }} />
                        <CommonText text={`฿${!!counpon ? counpon.cp_price : ""}`}
                            style={{
                                marginRight: 15,
                                paddingBottom: Device.isIos ? 0 : 1,
                                textAlignVertical: 'bottom',
                                fontWeight: "400", color: Color.BorderGray,
                                fontSize: FontSize.SmallTitle, textDecorationLine: 'line-through'
                            }} />
                    </View>
                    <View style={{ position: 'absolute', right: 20, bottom: 0 }}>
                        <CommonBtn title={'buy_title'} multiLanguage
                            onPress={() => {
                                this.props.addToCart([{ id: counpon.id, quantity: 1 }], () => {
                                    //@ts-ignore
                                    this.props.navigation.navigate(AppFlowRouteName.CartScreen, { id: detailCoupon.id })
                                })
                            }}
                            containerStyle={{ marginVertical: 15, height: 'auto', paddingVertical: 8, borderRadius: 5, paddingHorizontal: 12 }}
                            titleStyle={{ fontSize: FontSize.Title }} />
                    </View>
                </Animated.View> : <View />}
            </>
        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        flex: 1,
    },
    bigTitle: {
        fontSize: FontSize.Giant, fontFamily: "DMSans-Bold",
        fontWeight: '600'
    },
    content: {
        backgroundColor: 'white', borderRadius: 15, marginTop: 30,
        // height: Device.height - 300, 
        marginHorizontal: 24,
    },
    forgotStyle: {
        fontSize: FontSize.SmallTitle,
        color: Color.Grey,
        width: '100%',
        textAlign: 'right',
        marginVertical: 20
    },
    textNormal: {
        fontSize: FontSize.SmallTitle,
        color: Color.Grey,
        marginVertical: 20
    },
    errStyle: {
        position: 'absolute',
        bottom: -20,
    }
});

