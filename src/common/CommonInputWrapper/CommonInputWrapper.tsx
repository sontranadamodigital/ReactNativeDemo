import React, { useState, LegacyRef } from 'react'
import { TextStyle, Platform, ViewStyle, View, Image, TouchableOpacity } from 'react-native'
import { Input as LibInput, InputProps as InputLibProps } from 'react-native-elements';

import { CommonText } from "../CommonText";
import { FontSize, Color } from '../../assets';
import { InputProps, CommonInput } from '../CommonInput';

export interface CommonInputWrapperProps extends InputProps {
    rightIconInActive: any,
    rightIconActive: any,

}

export function CommonInputWrapper(props: CommonInputWrapperProps) {
    let { rightIconActive, rightIconInActive, ...rest } = props
    const [activeIcon, setActiveIcon] = useState(true)

    return (
        <CommonInput
            secureTextEntry={activeIcon} {...rest} rightIcon={
                <TouchableOpacity onPress={() => setActiveIcon(!activeIcon)}>
                    <Image source={activeIcon ? rightIconActive : rightIconInActive} />
                </TouchableOpacity>
            } />
    )
}
