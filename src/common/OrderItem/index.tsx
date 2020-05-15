import * as React from 'react'
import { Text as ReactNativeText, TextProps as TextProperties, TouchableOpacity, Platform, ViewStyle, View, Image, ViewPropTypes, ActivityIndicator } from 'react-native'
import { Color as valueColor, FontSize, Color, CommonImage, FontWithBold } from '../../assets'
import { I18n, OrderType } from '../../instances'
import { CommonText } from '../CommonText'
import { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'

export interface OrderItemProps {
    onPress?: () => void
    item?: OrderType
}

export function OrderItem(props: OrderItemProps) {
    const { onPress, item, ...rest } = props
    let totalCoupons = item?.order_details?.length || 1
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ backgroundColor: Color.White, borderRadius: 8, width: '100%', padding: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }}>
                        <CommonText numberOfLines={1} text='order_id' multiLanguage style={{ fontSize: FontSize.SmallTitle }} />
                        <CommonText
                            numberOfLines={1} text={item?.order_code + "" || ""}
                            //@ts-ignore
                            style={{ color: Color.Red, fontSize: FontSize.SmallTitle, ...FontWithBold.Bold_600, marginLeft: 2 }} />
                    </View>
                    <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Image source={CommonImage.ClockGrey}
                            style={{ overlayColor: Color.Grey, marginRight: 5, height: 12, width: 12 }}
                            resizeMethod='scale' resizeMode='contain' />
                        <CommonText
                            numberOfLines={1} text={item?.created_at + "" || ""}
                            //@ts-ignore
                            style={{ color: Color.Grey, fontSize: FontSize.Normal, ...FontWithBold.Bold_600 }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }}>
                    <View style={{ width: '28%', alignItems: 'center', borderRadius: 8, overflow: 'hidden' }}>
                        <Image
                            //@ts-ignore
                            source={{ uri: item?.order_details[0].coupon?.image_path }}
                            style={{ overlayColor: Color.Grey, marginRight: 5, width: '100%', height: 45 }}
                            resizeMethod='scale' resizeMode='cover' />
                    </View>
                    <View style={{ width: '70%' }}>
                        <CommonText
                            //@ts-ignore
                            numberOfLines={2} text={item?.order_details[0].coupon?.title}
                            //@ts-ignore
                            style={{ color: Color.Black, fontSize: FontSize.Title, ...FontWithBold.Bold_600 }} />
                    </View>
                </View>
                {item?.order_details && totalCoupons > 1 && <>
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: Color.BlurBorder, marginVertical: 7 }} />
                    <CommonText
                        numberOfLines={2} text={totalCoupons - 1 + " " + (totalCoupons > 1 ? I18n.trans('more_coupons') : I18n.trans('one_more_coupon'))}
                        //@ts-ignore
                        style={{ color: Color.Red, fontSize: FontSize.Normal, width: '100%', textAlign: 'center' }} />
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: Color.BlurBorder, marginVertical: 7 }} />
                </>}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <View style={{ width: '40%', flexDirection: 'row', alignItems: 'center' }}>
                        <CommonText numberOfLines={1} text='total_Price' multiLanguage style={{ color: Color.Grey, fontSize: FontSize.SmallTitle }} />
                        <CommonText
                            numberOfLines={1} text={item?.total_coupon + " " + (item?.total_coupon && item?.total_coupon > 1 ? I18n.trans('coupons') : I18n.trans('coupon'))}
                            //@ts-ignore
                            style={{ color: Color.Black, fontSize: FontSize.SmallTitle, ...FontWithBold.Bold_600, marginLeft: 2 }} />
                    </View>
                    <View style={{ width: '60%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <CommonText
                            numberOfLines={1} text={"฿" + item?.total_amount}
                            //@ts-ignore
                            style={{ color: Color.Red, fontSize: FontSize.BigTitle, ...FontWithBold.Bold_600 }} />
                    </View>
                </View>
            </View >
        </TouchableOpacity >
    )
}
