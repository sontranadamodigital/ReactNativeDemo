import React, { useState, LegacyRef, useEffect } from 'react'
import { TextStyle, Platform, ViewStyle, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Input as LibInput, InputProps as InputLibProps } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal'
import { CommonText } from "../CommonText";
import { FontSize, Color, Device } from '../../assets';
import { I18n } from "../../instances";
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
    countryCodeStyle?: ViewStyle
}

function handlePhone(countrycode: Array<string>, phone: string) {
    let code = "";
    countrycode.map(i => {
        code = i;
    })
    let number = '';
    if (!!phone && phone[0] === "0") {
        number = phone.slice(1)
    } else number = phone;
    return "+" + code + number
}

export function PhoneInput(props: InputProps) {
    const { children, text, onFocus, onBlur, multiLanguage = false, countryCodeStyle = {}, title = null, titleStyle = {}, containerStyleWrapper, onChangeText, disableBotBorder, errStyle, Err = '', ...rest } = props
    const content = text || children
    const [showModal, setShowModal] = useState(false)
    const [code, setCode] = useState({
        callingCode: ['84'],
        cca2: 'VN',
        name: "Vietnam"
    })
    let inputRef: LibInput;
    let inputRefAction = (ref: any) => { inputRef = ref }
    return (
        <View style={{ ...containerStyleWrapper }}>
            {title && <CommonText multiLanguage={multiLanguage} style={[{
                fontSize: FontSize.InputTitle,
                fontWeight: "600",
                fontFamily: "DMSans-Bold"
            }, titleStyle]} text={title}>{title}</CommonText>}
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ flexDirection: 'row', borderBottomColor: Color.BorderGray, borderBottomWidth: 1, width: "20%", alignItems: 'center', ...countryCodeStyle }}>
                    <CountryPicker
                        containerButtonStyle={{ display: "none" }}
                        withCallingCodeButton
                        //@ts-ignore
                        countryCode={code.cca2}
                        withFilter
                        withAlphaFilter
                        withCallingCode
                        onClose={() => setShowModal(false)}
                        onSelect={(countryCode1) => {
                            //@ts-ignore
                            setCode(countryCode1)
                        }}
                        visible={showModal}
                    />
                    <TouchableOpacity style={{}} onPress={() => { setShowModal(true) }}>
                        <CommonText style={{ fontSize: FontSize.SmallTitle, textAlignVertical: 'center', alignSelf: 'center' }}>{"+" + code.callingCode[0]}</CommonText>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "80%", paddingLeft: 5 }}>
                    <LibInput {...rest}
                        keyboardType='numeric'
                        // caretHidden={true}
                        contextMenuHidden={true}
                        placeholderTextColor={props.placeholderTextColor || Color.Grey}
                        ref={props.innerRef || inputRefAction}
                        onChangeText={(value) => {
                            if (!value) onChangeText && onChangeText('')
                            else if (!Number(value) && Number(value) !== 0) {
                                inputRef && inputRef.clear();
                                return;
                            }
                            else onChangeText && onChangeText(handlePhone(code.callingCode, value))
                        }}
                        placeholder={multiLanguage ? I18n.trans(`${props.placeholder}`) : props.placeholder}
                        inputStyle={[{
                            fontFamily: "DMSans-Regular",
                            fontSize: FontSize.SmallTitle,
                            paddingHorizontal: 0
                        }, props.inputStyle]}
                        inputContainerStyle={[{ marginVertical: 5, borderBottomWidth: 0, paddingHorizontal: 0 }, props.inputContainerStyle]}
                        containerStyle={[{ paddingHorizontal: 0, borderBottomColor: Color.BorderGray, borderBottomWidth: 1, }, props.containerStyle]}
                    >
                        {content}
                    </LibInput>
                </View>
            </View>
            {!!Err && <CommonText multiLanguage={multiLanguage} style={{ fontSize: FontSize.Normal, color: 'red', ...errStyle }} text={Err} />}
        </View >
    )
}
