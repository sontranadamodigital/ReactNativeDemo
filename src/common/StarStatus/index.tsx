import * as React from 'react'
import { Text as ReactNativeText, TextProps as TextProperties, TextStyle, TouchableOpacity, ViewStyle, View, Image, ViewPropTypes, ActivityIndicator } from 'react-native'
import { Color as valueColor, FontSize, Color, CommonImage } from '../../assets'
import { I18n } from '../../instances'
import { CommonText } from '../CommonText'
import { useState, useEffect } from 'react'

export interface StartStatusProps {
    onPress?: (isSaved: boolean, callback: (isErr: boolean) => void) => void
    isSavedProps?: boolean
}

export function StartStatus(props: StartStatusProps) {
    const { onPress, isSavedProps = false, ...rest } = props
    let [isSaved, setSave] = useState(isSavedProps)
    let [clickable, setClick] = useState(true)
    useEffect(() => {
        setSave(props.isSavedProps || false)
    }, [props.isSavedProps])
    if (clickable) return (
        <TouchableOpacity onPress={() => {
            setClick(false)
            onPress && onPress(!isSaved, (isErr: boolean) => {
                setClick(true)
                !isErr && setSave(!isSaved)
            })
        }}>
            <Image source={isSaved ? CommonImage.Saved : CommonImage.Favourite} style={{ height: 25, width: 25 }} resizeMethod="scale" resizeMode="contain" />
        </TouchableOpacity>
    )
    else return (
        <View >
            {/* <Image source={isSaved ? CommonImage.Saved : CommonImage.Favourite} style={{ height: 25, width: 25 }} resizeMethod="scale" resizeMode="contain" /> */}
            <ActivityIndicator style={{ width: 25, height: 25 }} color={Color.Black} />
        </View>
    )
}
