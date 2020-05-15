import * as React from 'react'
import { Text as ReactNativeText, TextProps as TextProperties, TouchableWithoutFeedback, TouchableOpacity, ViewStyle, View, Image } from 'react-native'
import { Color as valueColor, FontSize, Color, CommonImage, Device } from '../../assets'
import { I18n, Voucher } from '../../instances'
import { CommonText } from '../CommonText'
import { CommonBtn } from '../CommonButton'

export interface LargeVoucherProps {
    image?: string,
    offPercent?: number,
    title?: string,
    currentPrice?: number,
    oldPrice?: number,
    saleQuantity?: number,
    containerStyle?: ViewStyle,
    onBuy?: () => void,
    onPressDetail?: () => void,
    item: Voucher,
    onDelete?: () => void
}

export function LargeVoucher(props: LargeVoucherProps) {
    let { containerStyle, item, onBuy = () => { }, onPressDetail = () => { }, onDelete, ...rest } = props

    let title = () => {
        return (
            <CommonText
                numberOfLines={4}
                text={item.title}
                style={{
                    fontSize: FontSize.BigTitle,
                    fontWeight: '500'
                }}
            />
        )
    }

    let titleWithDelete = () => {
        return (
            <View style={{ flexDirection: 'row', }}>
                <View style={{ width: '90%' }}>
                    <CommonText
                        numberOfLines={4}
                        text={item.title}
                        style={{
                            fontSize: FontSize.BigTitle,
                            fontWeight: '500'
                        }}
                    />
                </View>
                <View style={{ width: '10%', alignItems: "flex-end", justifyContent: 'flex-start' }}>
                    <TouchableOpacity onPress={onDelete}>
                        <Image source={CommonImage.Delete} style={{ width: 10, height: 10, opacity: 0.3, marginTop: 9 }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={onPressDetail}>
            <View style={{ ...containerStyle, borderRadius: 8, padding: 15, backgroundColor: Color.White, overflow: 'hidden' }}>
                {!!onDelete ? titleWithDelete() : title()}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 }}>
                    <CommonText text={`฿ ${item.cp_sale_price}`} style={{ fontWeight: "400", color: Color.Red, fontSize: FontSize.Title, marginRight: 5 }} />
                    <CommonText text={`฿${item.cp_price}`} style={{ paddingBottom: Device.isIos ? 0 : 1, fontWeight: "400", color: Color.BorderGray, fontSize: FontSize.SmallTitle, textDecorationLine: 'line-through' }} />
                    <CommonText
                        //@ts-ignore
                        text={item.sales > 1 ? `${item.sales} ${I18n.t('sales')}` : `${item.sales} ${I18n.t('sale')}`}
                        style={{ fontWeight: "400", color: Color.BorderGray, fontSize: FontSize.SmallTitle, marginRight: 5, position: 'absolute', right: 0, bottom: 0 }} />
                </View>
                {!!item.medias && item.medias.length > 0 && <View style={{ flexDirection: 'row', height: 160, justifyContent: 'space-between', marginVertical: 15 }}>
                    <Image source={{ uri: item.medias[0].image_path }} style={{ borderRadius: 4, width: item.medias.length > 1 ? '67%' : '100%', height: '100%' }} resizeMethod='scale' resizeMode='cover' />
                    {item.medias.length > 1 && <View style={{ height: '100%', width: "30%", flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Image source={{ uri: item.medias[1].image_path }} style={{ borderRadius: 4, height: '47%', width: '100%' }} resizeMethod='scale' resizeMode='cover' />
                        {item.medias.length > 2 && < Image source={{ uri: item.medias[2].image_path }} style={{ borderRadius: 4, height: '47%', width: '100%' }} resizeMethod='scale' resizeMode='cover' />}
                    </View>}
                </View>}
                <CommonBtn title={'buy_now'} onPress={onBuy} multiLanguage containerStyle={{ height: 'auto', paddingVertical: 8, borderRadius: 5 }} titleStyle={{ fontSize: FontSize.Normal }} />
            </View>
        </TouchableWithoutFeedback>
    )
}
