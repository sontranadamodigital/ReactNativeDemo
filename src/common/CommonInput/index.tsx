import React, { useState, LegacyRef } from 'react'
import { TextStyle, Platform, ViewStyle, View } from 'react-native'
import { Input as LibInput, InputProps as InputLibProps } from 'react-native-elements';

import { CommonText } from "../CommonText";
import { FontSize, Color, Device } from '../../assets';
import { I18n } from "../../instances";
import { useEffect } from 'react';
import { store } from '../../redux';

export interface InputProps extends InputLibProps {
    children?: React.ReactNode
    text?: string
    disableBotBorder?: boolean
    containerStyleWrapper?: ViewStyle
    title?: string
    titleStyle?: TextStyle,
    errStyle?: TextStyle,
    Err?: string,
    innerRef?: LegacyRef<any>,
    multiLanguage?: boolean,
}

export function CommonInput(props: InputProps) {
    const { children, text, onFocus, onBlur, multiLanguage = false, title = null, titleStyle = {}, containerStyleWrapper, disableBotBorder, errStyle, Err = '', ...rest } = props
    const content = text || children
    let [placeholderFunct, setHolder] = useState("");
    useEffect(() => {
        let text = multiLanguage ? I18n.trans(`${props.placeholder}`) : props.placeholder || ''
        setHolder(text)
    }, [store.getState().user.language])
    return (
        <View style={{ ...containerStyleWrapper }} >
            {title && <CommonText multiLanguage={multiLanguage} style={[{
                fontSize: FontSize.InputTitle,
                fontWeight: "600",
                fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Bold'
            }, titleStyle]} text={title}>{title}</CommonText>}
            <LibInput
                ref={props.innerRef}
                inputStyle={[{
                    fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Regular',
                    fontSize: FontSize.SmallTitle,
                    // color: valueColor.green,
                    paddingHorizontal: 0,
                }, props.inputStyle]}
                inputContainerStyle={[{ marginVertical: 5, paddingHorizontal: 0 }, props.inputContainerStyle]}
                containerStyle={[props.containerStyle, { paddingHorizontal: 0 }]}
                {...rest}
                placeholder={placeholderFunct}
                placeholderTextColor={props.placeholderTextColor || Color.Grey}
            >
                {content}
            </LibInput>
            {!!Err && <CommonText multiLanguage={multiLanguage} style={{ fontSize: FontSize.Normal, color: 'red', ...errStyle }} text={Err} />}
        </View>
    )
}
