

import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    SafeAreaView,
    Button,
    Animated,
    RefreshControl,
} from 'react-native';
import { CouponDetailLogic } from './CouponDetail.logic';
import { CommonImage, FontSize, InputIcon, Device, Color, ScreenType, FontWithBold } from '../../../assets';
import { CommonText, CommonInputWrapper, BGWithScroll, CommonBtn, Header, CommonInput, CommonFlatlist, CouponItem } from '../../../common';
import { I18n, CouponLocation } from "../../../instances";
import { PhoneInput } from '../../../common/CommonInputWrapper';
import { AppFlowRouteName } from '../../../navigation';
import { Image as ImageLib, Divider, ButtonGroup, CheckBox } from "react-native-elements";
import { isIPhoneX } from 'react-native-status-bar-height';
import QRCode from 'react-native-qrcode-svg';
import Dash from 'react-native-dash';

type InfoLine = {
    icon: any,
    title: string,
    information: string,
}


export class CouponDetail extends CouponDetailLogic {


    renderLine = (props: InfoLine) => {
        let { icon, information, title } = props
        return (
            <View style={{ flexDirection: 'row', marginVertical: 5, width: '100%', overflow: 'hidden' }}>
                <Image source={icon} style={{ height: 15, width: 15, marginRight: 5 }} resizeMode='contain' resizeMethod='scale' />
                <CommonText multiLanguage text={title} style={{ fontSize: FontSize.Normal, color: Color.DarkGray }} />
                <CommonText text={information} style={{ fontSize: FontSize.Normal, color: Color.Black, width: '60%' }} />
            </View>
        )
    }

    render() {

        return (
            <>

                <BGWithScroll showsVerticalScrollIndicator={false}
                    style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                    // hasSafeArea
                    headerProps={{
                        leftIcon: CommonImage.Delete,
                        leftOnPress: this.props.navigation.goBack,
                        title: 'your_coupon',
                        rightIcon: CommonImage.Share,
                        rightOnPress: () => { },
                        multiLanguage: true,
                    }}
                    headerStyle={{ paddingHorizontal: 15 }}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} tintColor={Color.Black} />}
                >
                    {this.state.firstLoading || <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", marginTop: 5, height: 250 }}>
                            <View style={{ width: '10%' }}>
                                <View style={{ width: '100%', height: '80%', backgroundColor: Color.White, borderTopLeftRadius: 15, }} />
                                <View style={{ width: '100%', height: '20%', backgroundColor: Color.Transparent }}>
                                    <Image source={CommonImage.CouponBorderSide} style={{ height: '100%', width: '100%' }} />
                                </View>
                            </View>
                            <View style={{ ...styles.content, width: '80%', alignItems: 'center', paddingVertical: 10 }}>
                                <CommonText text="Your Coupon QR Code:" style={{ marginTop: 10, marginBottom: 20, fontSize: FontSize.InputTitle, color: Color.DarkGray }} />
                                <QRCode size={120}
                                    //@ts-ignore
                                    value={this.state.coupon.token} />
                                <Dash style={{ width: '100%', height: 1, marginTop: 40, marginBottom: 20 }} dashColor={Color.Grey} dashGap={3} dashLength={5} dashThickness={1.5} />
                            </View>
                            <View style={{ width: '10%' }}>
                                <View style={{ width: '100%', height: '80%', backgroundColor: Color.White, borderTopRightRadius: 15, }} />
                                <View style={{ width: '100%', height: '20%', backgroundColor: Color.Transparent }}>
                                    <Image source={CommonImage.CouponBorderSide} style={{ height: '100%', width: '100%', transform: [{ rotate: `180deg` }], }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 35, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, marginBottom: 50 }}>
                            <CommonText
                                //@ts-ignore
                                text={this.state.coupon.title} numberOfLines={3} style={{ fontSize: FontSize.BigTitle, ...FontWithBold.Bold_700 }} />
                            <CommonText
                                //@ts-ignore
                                text={this.state.coupon.merchant_name} numberOfLines={1} style={{ marginVertical: 10, fontSize: FontSize.Title, ...FontWithBold.Bold_700 }} />
                            {
                                //@ts-ignore 
                                this.state.coupon.locations.map((item: CouponLocation, index: number) => {
                                    //@ts-ignore
                                    if (index === this.state.coupon.locations.length - 1) return (
                                        <>
                                            <Divider style={{ backgroundColor: Color.BlurBorder, width: '100%', marginVertical: 10 }} />
                                            {this.renderLine({
                                                icon: CommonImage.Location,
                                                information: item.address || '',
                                                title: "address_title"
                                            })}
                                            {this.renderLine({
                                                icon: CommonImage.Hotline,
                                                information: item.hot_line || '',
                                                title: "hotline_title"
                                            })}
                                            <Divider style={{ backgroundColor: Color.BlurBorder, width: '100%', marginVertical: 10 }} />

                                        </>
                                    )
                                    else return (
                                        <>
                                            <Divider style={{ backgroundColor: Color.BlurBorder, width: '100%', marginVertical: 10 }} />
                                            {this.renderLine({
                                                icon: CommonImage.Location,
                                                information: item.address || '',
                                                title: "address_title"
                                            })}
                                            {this.renderLine({
                                                icon: CommonImage.Hotline,
                                                information: item.hot_line || '',
                                                title: "hotline_title"
                                            })}
                                        </>
                                    )
                                })}
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
        paddingHorizontal: 5, backgroundColor: 'white', paddingBottom: 5, paddingTop: 10
    },
});

