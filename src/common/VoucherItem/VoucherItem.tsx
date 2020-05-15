import * as React from 'react'
import { Text as ReactNativeText, TextProps as TextProperties, TextStyle, TouchableOpacity, ViewStyle, View, Image, TouchableWithoutFeedback, Text } from 'react-native'
import { Color as valueColor, FontSize, Color, CommonImage, Device } from '../../assets'
import { I18n, Voucher } from '../../instances'
import { CommonText } from '../CommonText'
import { CommonBtn } from '../CommonButton'

export interface VoucherItemProps {
    image?: string,
    offPercent?: number,
    merchantName?: string,
    currentPrice?: number,
    oldPrice?: number,
    saleQuantity?: number,
    containerStyle?: ViewStyle,
    onBuy?: () => void
    onPressDetail?: () => void,
    item: Voucher
}

export function VoucherItem(props: VoucherItemProps) {
    let { containerStyle, item, onBuy = () => { }, oldPrice, onPressDetail, ...rest } = props
    return (
        <TouchableOpacity onPress={onPressDetail}>
            <View style={{ ...containerStyle, borderRadius: 8, backgroundColor: Color.White, overflow: 'hidden' }}>
                <Image source={CommonImage.Dish} style={{ width: '100%' }} resizeMethod='scale' resizeMode='cover' />
                <View style={{}}>
                    <View style={{ height: 100, marginLeft: 15, position: "absolute", top: -22 }}>
                        <Image source={CommonImage.Popup} style={{ height: 10, width: 10, position: 'absolute', top: 20, left: 9 }} />
                        <CommonText
                            text={!!item.discount_percent ? `- ${item.discount_percent}%` : `- ${item.discount_amount} Baht`}
                            style={{
                                fontWeight: '700', fontFamily: "DMSans-Bold",
                                color: Color.White, position: 'absolute', top: 2, left: 9,
                                minHeight: 20,
                                backgroundColor: Color.Orange, paddingHorizontal: 10, paddingVertical: 2,
                                borderRadius: 4, overflow: 'hidden'
                            }} />
                    </View>
                    <CommonText numberOfLines={2} text={`${item.title}`} style={{ marginHorizontal: 5, fontWeight: "500", fontSize: FontSize.Title, marginVertical: 8 }} />
                    <View style={{
                        flexDirection: 'row', alignItems: 'baseline', marginHorizontal: 5,
                    }}>
                        <CommonText text={`฿ ${item.cp_sale_price}`}
                            style={{
                                textAlignVertical: 'bottom',
                                fontWeight: "400", color: Color.Red,
                                fontSize: FontSize.SmallTitle, marginRight: 5
                            }} />
                        {!!item.cp_price && <CommonText text={`฿ ${item.cp_price}`}
                            style={{
                                paddingBottom: Device.isIos ? 0 : 1,
                                textAlignVertical: 'bottom',
                                fontWeight: "400", color: Color.BorderGray,
                                fontSize: FontSize.Small, textDecorationLine: 'line-through'
                            }} />}
                        <CommonText text={!!item.sales && item.sales > 1 ? `${item.sales} ${I18n.t('sales')}` : `${item.sales} ${I18n.t('sale')}`}
                            style={{
                                textAlignVertical: 'bottom',
                                fontWeight: "400", color: Color.BorderGray, fontSize: FontSize.Normal,
                                marginRight: 5, position: 'absolute', right: 0, bottom: 0
                            }} />
                    </View>

                </View>
                <View style={{ paddingHorizontal: 5, }}>
                    <CommonBtn title={'buy_now'} onPress={onBuy} multiLanguage containerStyle={{ marginVertical: 15, height: 'auto', paddingVertical: 8, borderRadius: 5 }} titleStyle={{ fontSize: FontSize.Normal }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}
