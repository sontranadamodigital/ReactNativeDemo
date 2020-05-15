import * as React from 'react'
import { Text as ReactNativeText, TextProps as TextProperties, TextStyle, Platform, ViewStyle, TouchableOpacity } from 'react-native'
import { Color as valueColor, FontSize, Device } from '../../assets'
import { I18n } from '../../instances'
import { useEffect } from 'react'
import { useState } from 'react'

export interface TextProps extends TextProperties {
    children?: React.ReactNode

    /**
     * Optional options to pass to i18n. Useful for interpolation
     * as well as explicitly setting locale or translation fallbacks.
     */
    txOptions?: object

    /**
     * The text to display if not using `tx` or nested components.
     */
    text?: string

    /**
     * An optional style override useful for padding & margin.
     */
    style?: TextStyle | TextStyle[]

    color?: string

    bold?: boolean,
    multiLanguage?: boolean,
    onPress?: () => void
    containerStyle?: ViewStyle
}

export function CommonText(props: TextProps) {

    // grab the props
    let [funcText, setText] = useState('')
    const { txOptions, text, children, style, bold, color, multiLanguage = false, onPress = null, containerStyle = {}, ...rest } = props
    const content = multiLanguage ? (I18n.trans(`${text}`) || I18n.trans(`${children}`)) : (text || children)
    if (onPress)
        return (
            <TouchableOpacity onPress={onPress} style={containerStyle}>
                <ReactNativeText {...rest} allowFontScaling={false} style={[{
                    color: color ? color : valueColor.Black,
                    fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Regular',
                    fontSize: FontSize.Normal
                }, style]}>
                    {content}
                </ReactNativeText>
            </TouchableOpacity>
        )
    return (
        <ReactNativeText {...rest} allowFontScaling={false} style={[{
            color: color ? color : valueColor.Black,
            fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Regular',
            fontSize: FontSize.Normal
        }, style]}>
            {content}
        </ReactNativeText>
    )
}
