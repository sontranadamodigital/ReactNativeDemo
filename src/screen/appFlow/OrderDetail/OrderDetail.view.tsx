

import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { OrderDetailLogic } from './OrderDetail.logic';
import { CommonImage, FontSize, Device, Color, FontWithBold } from '../../../assets';
import { CommonText, BGWithScroll } from '../../../common';
import { I18n, OrderDetailType } from "../../../instances";
import { AppFlowRouteName } from '../../../navigation';

export class OrderDetail extends OrderDetailLogic {


    renderItem = (props: { item: OrderDetailType, index: number }) => {
        console.log("---prosp", props);
        let { item, index } = props
        let totalCoupons = item.quantity || 1
        return (
            <TouchableOpacity onPress={() => {
                //@ts-ignore
                this.props.navigation.push(AppFlowRouteName.WalletScreen, { id: item.id, orderCode: this.state.detailOrder.order_code })
            }}>
                <View
                    //@ts-ignore
                    style={{ paddingVertical: 15, borderBottomColor: Color.BlurBorder, borderBottomWidth: index < this.state.detailOrder.order_details.length - 1 ? 0.5 : 0 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ width: '40%' }}>
                            <Image source={{ uri: item.coupon?.image_path || "" }} style={{ width: "100%", height: 100, borderRadius: 8 }} resizeMode='cover' resizeMethod='scale' />
                        </View>
                        <View style={{ width: '60%', paddingLeft: 10 }}>
                            <CommonText
                                numberOfLines={3}
                                text={item.coupon?.title || ''}
                                style={{
                                    fontSize: FontSize.Title,
                                    fontWeight: '500'
                                }}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 }}>
                                <CommonText text={`฿ ${item.coupon?.cp_sale_price}`} style={{ fontWeight: "400", color: Color.Red, fontSize: FontSize.Title, marginRight: 5 }} />
                                <CommonText text={`฿${item.coupon?.cp_price}`} style={{ paddingBottom: Device.isIos ? 0 : 1, fontWeight: "400", color: Color.BorderGray, fontSize: FontSize.SmallTitle, textDecorationLine: 'line-through' }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 }}>
                        <CommonText text={'quantity'} multiLanguage style={{ color: Color.Grey, fontSize: FontSize.Title, marginRight: 5 }} />
                        <CommonText text={totalCoupons + ""}
                            //@ts-ignore
                            style={{ paddingBottom: Device.isIos ? 0 : 1, ...FontWithBold.Bold_600, color: Color.Black, fontSize: FontSize.Title }} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let { detailOrder } = this.state
        return (
            <>
                <BGWithScroll showsVerticalScrollIndicator={false}
                    style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                    // hasSafeArea
                    headerProps={{
                        leftIcon: CommonImage.ArrowLeft,
                        leftOnPress: this.props.navigation.goBack,
                        //@ts-ignore
                        title: I18n.trans('order_id') + " " + (!!this.state.detailOrder ? this.state.detailOrder.order_code : ""),
                        rightComponent: () => {
                            return (
                                <View />
                            )
                        },
                    }}
                    headerStyle={{ paddingHorizontal: 15 }}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => { }} tintColor={Color.Black} />}
                >
                    {this.state.firstLoading || <View style={styles.content}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }}>
                                <CommonText numberOfLines={1} text='order_id' multiLanguage style={{ fontSize: FontSize.SmallTitle }} />
                                <CommonText
                                    //@ts-ignore
                                    numberOfLines={1} text={this.state.detailOrder.order_code}
                                    //@ts-ignore
                                    style={{ color: Color.Red, fontSize: FontSize.SmallTitle, ...FontWithBold.Bold_600, marginLeft: 2 }} />
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Image source={CommonImage.ClockGrey}
                                    style={{ overlayColor: Color.Grey, marginRight: 5, height: 12, width: 12 }}
                                    resizeMethod='scale' resizeMode='contain' />
                                <CommonText
                                    //@ts-ignore
                                    numberOfLines={1} text={this.state.detailOrder.created_at}
                                    //@ts-ignore
                                    style={{ color: Color.Grey, fontSize: FontSize.Normal, ...FontWithBold.Bold_600 }} />
                            </View>
                        </View>
                        {
                            //@ts-ignore
                            this.state.detailOrder.order_details.map((item, index) => {
                                return this.renderItem({ item, index })
                            })}
                        <View style={{ height: 65 }} />
                        <View style={{ backgroundColor: Color.BlurRed, flexDirection: 'row', alignItems: 'center', marginTop: 8, position: 'absolute', width: Device.width - 48, bottom: 0, padding: 15, paddingHorizontal: 20 }}>
                            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }}>
                                <CommonText numberOfLines={1} text='total_Price' multiLanguage style={{ color: Color.Grey, fontSize: FontSize.InputTitle }} />
                                <CommonText
                                    //@ts-ignore
                                    numberOfLines={1} text={detailOrder?.total_coupon + " " + (!!detailOrder?.total_coupon && detailOrder?.total_coupon > 1 ? I18n.trans('coupons') : I18n.trans('coupon'))}
                                    //@ts-ignore
                                    style={{ color: Color.Black, fontSize: FontSize.Title, ...FontWithBold.Bold_600, marginLeft: 2 }} />
                            </View>
                            <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <CommonText
                                    //@ts-ignore
                                    numberOfLines={1} text={"฿" + detailOrder?.total_amount}
                                    //@ts-ignore
                                    style={{ color: Color.Red, fontSize: FontSize.LargeTitle, ...FontWithBold.Bold_600 }} />
                            </View>
                        </View>
                    </View>}
                </BGWithScroll >

            </>
        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        flex: 1,
        height: '100%'
    },
    bigTitle: {
        fontSize: FontSize.Giant,
        fontWeight: '600'
    },
    content: {
        overflow: 'hidden',
        paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 15, marginTop: 15, paddingTop: 15
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
    deliverBtn: {
        position: 'absolute', bottom: 30,
        marginTop: 30, height: 'auto',
        paddingVertical: 15,
        width: '100%', paddingHorizontal: 24
    }
});

