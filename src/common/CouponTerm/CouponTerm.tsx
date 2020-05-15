import * as React from 'react'
import { Text as ReactNativeText, TextProps as TextProperties, TextStyle, Platform, ViewStyle, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Color as valueColor, FontSize, Color, CommonImage, Device } from '../../assets'
import { I18n } from '../../instances'
import { CommonText } from '../CommonText'
import { CommonBtn } from '../CommonButton'
import { Divider } from 'react-native-elements'

export interface MerchantInfoProps {
    image?: string,
    offPercent?: number,
    merchantName?: string,
    currentPrice?: number,
    oldPrice?: number,
    saleQuantity?: number,
    containerStyle?: ViewStyle,
    onBuy?: () => void
    onPressDetail?: () => void
}

type InfoLine = {
    icon: any,
    title: string,
    information: string,
}

export function CouponTerm(props: MerchantInfoProps) {
    let { containerStyle, onBuy = () => { }, oldPrice, onPressDetail, ...rest } = props

    return (
        <TouchableWithoutFeedback onPress={onPressDetail}>
            <View style={{ ...containerStyle, borderRadius: 8, backgroundColor: Color.White, overflow: 'hidden', padding: 15 }}>
                <CommonText text="voucher_TC" multiLanguage style={{ fontSize: FontSize.InputTitle, fontWeight: '600', fontFamily: "DMSans-Bold", marginBottom: 12 }} />
                <CommonText
                    text="• This voucher is valid until Six months from the date of issuance, and can be redeemed at any Apparel Group stores in UAE"
                    style={{ fontSize: FontSize.SmallTitle, color: Color.DarkGray }} />
                <CommonText
                    text="• This voucher is valid until Six months from the date of issuance, and can be redeemed at any Apparel Group stores in UAE"
                    style={{ fontSize: FontSize.SmallTitle, color: Color.DarkGray }} />
            </View>
        </TouchableWithoutFeedback>
    )
}
