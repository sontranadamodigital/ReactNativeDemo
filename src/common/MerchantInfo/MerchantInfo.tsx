import * as React from 'react'
import { Text as ReactNativeText, TextProps as TextProperties, TextStyle, Platform, ViewStyle, View, Image, TouchableWithoutFeedback, Text } from 'react-native'
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
    merchant?: any,
}

type InfoLine = {
    icon: any,
    title: string,
    information: string,
}

export function MerchantInfo(props: MerchantInfoProps) {
    let { containerStyle, onBuy = () => { }, merchant, oldPrice, onPressDetail, ...rest } = props

    const Line = (props: InfoLine) => {
        let { icon, information, title } = props
        return (
            <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
                <Image source={icon} style={{ height: 15, width: 15, marginRight: 5 }} resizeMode='contain' resizeMethod='scale' />
                <CommonText multiLanguage text={title} style={{ fontSize: FontSize.Normal, color: Color.DarkGray }} />
                <CommonText text={information} style={{ fontSize: FontSize.Normal, color: Color.Black }} />
            </View>
        )
    }

    const Address = (props: { address: string }) => {
        return (
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                {/* <TouchableOpacity style={{ flexDirection: 'row' }}> */}
                <Image source={CommonImage.Location} style={{ height: 15, width: 15, marginRight: 5 }} resizeMode='contain' resizeMethod='scale' />
                <Text>
                    <CommonText text='address_title' multiLanguage style={{ fontSize: FontSize.Normal, color: Color.DarkGray }} />
                    <CommonText text={`${props.address}  `} style={{ fontSize: FontSize.Normal, color: Color.Black }} />
                    {/* <CommonText text={"view_map"} multiLanguage style={{ fontSize: FontSize.Normal, color: Color.Red, textDecorationLine: 'underline' }} /> */}
                </Text>
                {/* </TouchableOpacity> */}
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={onPressDetail}>
            <View style={{ ...containerStyle, borderRadius: 8, backgroundColor: Color.White, overflow: 'hidden', padding: 15 }}>
                <CommonText
                    text="merchant_information_title" multiLanguage
                    style={{ fontSize: FontSize.SmallTitle, fontWeight: '600', fontFamily: "DMSans-Bold" }} />
                <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                    <Image source={merchant.image_path ? { uri: merchant.image_path } : CommonImage.Dish2} style={{ height: 50, width: 50, borderRadius: 25, }} resizeMode='cover' resizeMethod='scale' />
                    <View style={{ justifyContent: 'space-evenly', paddingLeft: 10 }}>
                        <CommonText text={merchant.name} style={{ fontSize: FontSize.Title, fontWeight: '600', fontFamily: "DMSans-Bold" }} />
                        <CommonText text={merchant.category} style={{ fontSize: FontSize.SmallTitle, color: Color.Red }} />
                    </View>
                </View>
                <Divider style={{ backgroundColor: Color.BlurBorder, marginBottom: 10 }} />
                <Line icon={CommonImage.Hotline} title="hotline_title" information={merchant.hot_line || ""} />
                <Line icon={CommonImage.Line} title="line_title" information={merchant.line || ""} />
                <Address address={merchant.address || ""} />
                <Line icon={CommonImage.Clock} title="operating_time_title" information={merchant.open_time || ""} />
                <View style={{ marginBottom: 1 }} />
            </View>
        </TouchableWithoutFeedback>
    )
}
