import * as React from 'react'
import { Text as ReactNativeText, TextProps as TextProperties, TextStyle, Platform, ViewStyle, View, Image, ViewPropTypes, ActivityIndicator, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Color as valueColor, FontSize, Color, CommonImage, FontWithBold, Device } from '../../assets'
import { I18n, OrderType, E_Wallet } from '../../instances'
import { CommonText } from '../CommonText'
import { CommonBtn } from '../CommonButton'
import { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import QRCode from 'react-native-qrcode-svg';

export interface CouponItemProps {
    onPress?: () => void
    item?: E_Wallet
}

export function CouponItem(props: CouponItemProps) {
    const { onPress = () => { }, item, ...rest } = props
    // let totalCoupons = item?.order_details?.length || 1
    return (
        <TouchableOpacity onPress={onPress} style={{}}>
            <View style={{ flexDirection: 'row', width: '100%', }} >
                <View style={{ width: '45%', height: 15, borderTopLeftRadius: 8, backgroundColor: Color.White }} />
                <View style={{ width: '10%' }}>
                    <Image source={CommonImage.CouponBorder} style={{ width: '100%', height: 15 }} />
                </View>
                <View style={{ width: '45%', height: 15, borderTopRightRadius: 8, backgroundColor: Color.White }} />
            </View>
            <View style={{ backgroundColor: Color.White, width: '100%', paddingHorizontal: 15, paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '24%', alignItems: 'center', justifyContent: 'center' }}>
                        <QRCode
                            size={(Device.width - 78) * 0.22}
                            value={item?.token}
                        />
                    </View>
                    <View style={{ width: '75%' }}>
                        <CommonText
                            numberOfLines={2}
                            text={item?.title || ''}
                            style={{
                                fontSize: FontSize.Title,
                                fontWeight: '500'
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 }}>
                            <CommonText text={`฿ ${item?.sale_price}`} style={{ fontWeight: "400", color: Color.Red, fontSize: FontSize.Title, marginRight: 5 }} />
                            <CommonText text={`฿${item?.price}`} style={{ paddingBottom: Device.isIos ? 0 : 1, fontWeight: "400", color: Color.BorderGray, fontSize: FontSize.SmallTitle, textDecorationLine: 'line-through' }} />
                        </View>
                    </View>
                </View>
                <CommonBtn title={'use_coupon'} onPress={onPress} multiLanguage containerStyle={{ marginTop: 15, height: 'auto', paddingVertical: 8, borderRadius: 5 }} titleStyle={{ fontSize: FontSize.Normal }} />
            </View >
            <View style={{ flexDirection: 'row', width: '100%', }} >
                <View style={{ width: '45%', height: 15, borderBottomLeftRadius: 8, backgroundColor: Color.White }} />
                <View style={{ width: '10%', }}>
                    <Image source={CommonImage.CouponBorder} style={{ width: '100%', height: 15, transform: [{ rotate: `180deg` }], }} resizeMethod='resize' resizeMode='cover' />
                </View>
                <View style={{ width: '45%', height: 15, borderBottomRightRadius: 8, backgroundColor: Color.White }} />
            </View>
        </TouchableOpacity >
    )
}
