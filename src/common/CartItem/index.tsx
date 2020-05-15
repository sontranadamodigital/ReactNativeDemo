import * as React from 'react'
import { Text as ReactNativeText, TextProps as TextProperties, TextStyle, Platform, ViewStyle, View, Image, ViewPropTypes, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Color as valueColor, FontSize, Color, CommonImage, Device } from '../../assets'
import { I18n, Voucher, CartDetailItem } from '../../instances'
import { CommonText } from '../CommonText'
import { useState, useEffect } from 'react'
import { CommonInput } from '../CommonInput'

export interface CartItemProps {
    item: CartDetailItem
    onPressDetail?: () => void
    containerStyle?: ViewStyle
    onDelete?: (id: number) => void
    onUpdate?: (props: { id: number, quantity: number }) => void
}

export function CartItem(props: CartItemProps) {
    const { item, onPressDetail, containerStyle, onUpdate, onDelete, ...rest } = props
    let [quant, setQuant] = useState(0)

    useEffect(() => {
        setQuant(item.quantity || 0)
    }, [props.item])

    return (
        <TouchableWithoutFeedback onPress={onPressDetail}>
            <View style={{ ...containerStyle, borderRadius: 8, padding: 15, backgroundColor: Color.White, overflow: 'hidden' }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: '40%' }}>
                        <Image source={{ uri: item.coupon.image_path || "" }} style={{ width: "100%", height: 100, borderRadius: 8 }} resizeMode='cover' resizeMethod='scale' />
                    </View>
                    <View style={{ width: '50%', paddingLeft: 10 }}>
                        <CommonText
                            numberOfLines={3}
                            text={item.coupon.title || ''}
                            style={{
                                fontSize: FontSize.Title,
                                fontWeight: '500'
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 }}>
                            <CommonText text={`฿ ${item.coupon.cp_sale_price}`} style={{ fontWeight: "400", color: Color.Red, fontSize: FontSize.Title, marginRight: 5 }} />
                            <CommonText text={`฿${item.coupon.cp_price}`} style={{ paddingBottom: Device.isIos ? 0 : 1, fontWeight: "400", color: Color.BorderGray, fontSize: FontSize.SmallTitle, textDecorationLine: 'line-through' }} />
                        </View>
                    </View>
                    <View style={{ width: '10%', alignItems: "flex-end", justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={() => { onDelete && onDelete(item.id) }}>
                            <Image source={CommonImage.Delete} style={{ width: 10, height: 10, opacity: 0.3, marginTop: 6 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                    <View style={{ width: '30%', justifyContent: 'center' }}>
                        <CommonText text={`quantity`} multiLanguage style={{ fontWeight: "400", color: Color.BorderGray, fontSize: FontSize.Title, marginRight: 5 }} />
                    </View>
                    <View style={{ width: '70%', alignItems: "flex-end" }}>
                        <View style={{ flexDirection: 'row' }}>
                            <CommonText text="-" onPress={() => {
                                if (quant === 1) {
                                    setQuant(quant - 1)
                                    onDelete && onDelete(item.id)
                                    return;
                                }
                                setQuant(quant - 1)
                                onUpdate && onUpdate({ id: item.id, quantity: quant - 1 })
                            }}
                                containerStyle={{ alignItems: 'center', justifyContent: 'center', height: 30, paddingHorizontal: 10, backgroundColor: Color.Red, borderRadius: 6 }}
                                style={{ color: Color.White, fontSize: FontSize.LargeTitle }} />
                            <CommonInput
                                containerStyleWrapper={{ width: 40, marginHorizontal: 5, height: 30, borderWidth: 1, borderColor: Color.BorderGray, borderRadius: 8 }}
                                inputContainerStyle={{ borderBottomWidth: 0, width: 40, height: 30, marginVertical: 0 }}
                                inputStyle={{ textAlign: 'center', width: 40, height: 30, fontSize: FontSize.Normal }}
                                value={quant + ""}
                                keyboardType='numeric'
                                numberOfLines={1}
                                onChangeText={(value) => {
                                    //@ts-ignore
                                    if (!!Number(value) && Number(value) <= (item.coupon.quantity)) {
                                        setQuant(Number(value))
                                        onUpdate && onUpdate({ id: item.id, quantity: Number(value) })
                                    }
                                    //@ts-ignore
                                    else if (!!Number(value) && Number(value) > (item.coupon.quantity)) {
                                        setQuant(Number(item.coupon.quantity))
                                        onUpdate && onUpdate({ id: item.id, quantity: Number(item.coupon.quantity) })
                                    }
                                    else {
                                        setQuant(Number(1))
                                        onUpdate && onUpdate({ id: item.id, quantity: 1 })
                                    }
                                }} />
                            {
                                //@ts-ignore
                                quant < (item.coupon.quantity) && <CommonText text="+" onPress={() => {
                                    setQuant(quant + 1)
                                    onUpdate && onUpdate({ id: item.id, quantity: quant + 1 })
                                }}
                                    containerStyle={{ alignItems: 'center', justifyContent: 'center', height: 30, paddingHorizontal: 10, backgroundColor: Color.Red, borderRadius: 6 }}
                                    style={{ color: Color.White, fontSize: FontSize.LargeTitle }} />}
                        </View>
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>
    )

}
