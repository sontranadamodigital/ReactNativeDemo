import * as React from 'react'
import { Text as ReactNativeText, TextProps as TextProperties, TextStyle, Platform, TouchableOpacity, View, Image, ViewStyle } from 'react-native'
import { Color as valueColor, FontSize, Color, CommonImage } from '../../assets'
import { I18n } from '../../instances'
import { CommonText } from '../CommonText'

export interface HeaderProps {
    multiLanguage?: boolean,
    title?: string,
    leftTitle?: string,
    leftIcon?: any,
    leftOnPress?: () => void,
    rightOnPress?: () => void,
    rightTitle?: string,
    rightIcon?: any,
    rightComponent?: any
    leftComponent?: any,
    headerStyle?: ViewStyle
}

export function Header(props: HeaderProps) {
    const { multiLanguage, title, leftComponent, leftTitle, leftIcon, leftOnPress, rightOnPress, headerStyle, rightTitle, rightIcon, rightComponent, ...rest } = props
    let widthStyle = !!title ? { width: "15%" } : {}
    return (
        <View style={{ height: 50, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%', ...headerStyle }}>
            {(!!leftTitle || leftIcon || !!leftComponent) && <View style={{ ...widthStyle }}>
                {!!leftTitle && <CommonText numberOfLines={1} text={leftTitle} style={{ fontSize: FontSize.Large, fontWeight: '600', fontFamily: "DMSans-Bold", textAlignVertical: 'center' }} multiLanguage={multiLanguage} />}
                {leftIcon && <TouchableOpacity onPress={leftOnPress}>
                    <Image source={leftIcon} style={{ width: 20, height: 20 }} resizeMode='contain' resizeMethod='scale' />
                </TouchableOpacity>}
                {!!leftComponent ? leftComponent() : null}
            </View>}
            {title && <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%' }}>
                <CommonText numberOfLines={1} style={{ fontSize: FontSize.BigTitle, fontWeight: '600', fontFamily: "DMSans-Bold", textAlignVertical: 'center' }} text={title} multiLanguage={multiLanguage} />
            </View>}
            {(!!rightTitle || rightIcon || !!rightComponent) && <View style={{ alignItems: 'flex-end', ...widthStyle }}>
                {!!rightTitle && <CommonText numberOfLines={1} style={{ fontSize: FontSize.Large, fontWeight: '600', fontFamily: "DMSans-Bold", textAlignVertical: 'center' }} text={rightTitle} multiLanguage={multiLanguage} />}
                {rightIcon && <TouchableOpacity onPress={rightOnPress}>
                    <Image source={rightIcon} style={{ width: 20, height: 20 }} resizeMode='contain' resizeMethod='scale' />
                </TouchableOpacity>}
                {!!rightComponent ? rightComponent() : null}
            </View>}


        </View>
    )
}
