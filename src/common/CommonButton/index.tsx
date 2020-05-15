import * as React from 'react'
import { TextStyle, ViewStyle, View, TouchableOpacity } from 'react-native'
import { FontSize, Color } from '../../assets'
import { CommonText } from '../CommonText'

export interface CommonButtonProps {
    multiLanguage?: boolean
    title: string,
    titleStyle?: TextStyle
    containerStyle?: ViewStyle,
    onPress: () => void,
    disabled?: boolean
}

export function CommonBtn(props: CommonButtonProps) {

    const { multiLanguage, title, titleStyle = {}, containerStyle = {}, disabled = false, onPress = () => { } } = props
    if (!disabled) return (
        <TouchableOpacity
            onPress={onPress}
            style={{ height: 45, width: '100%', borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.Yellow, ...props.containerStyle }}>
            <CommonText
                multiLanguage={multiLanguage}
                text={title}
                style={[{
                    color: Color.Black, fontSize: FontSize.InputTitle, fontWeight: '500',
                    fontFamily: "DMSans-Bold"
                }, titleStyle]} />
        </TouchableOpacity>
    )
    return (
        <View
            style={{ height: 45, width: '100%', borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.Yellow, ...props.containerStyle }}>
            <CommonText
                multiLanguage={multiLanguage}
                text={title}
                style={[{
                    color: Color.Black, fontSize: FontSize.InputTitle, fontWeight: '500',
                    fontFamily: "DMSans-Bold"
                }, titleStyle]} />
        </View>
    )
}
