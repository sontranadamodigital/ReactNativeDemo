

import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { VerifyCodeLogic } from './VerifyCode.logic';
import { FontSize, Device, Color } from '../../../assets';
import { CommonText, CommonBtn } from '../../../common';
import OTPInputView from '@twotalltotems/react-native-otp-input'

export class VerifyCode extends VerifyCodeLogic {

    render() {
        let { isErr } = this.state
        return (
            <View style={{}}>
                <CommonText style={{ ...styles.bigTitle, marginTop: 32, marginBottom: 24 }}
                    multiLanguage text={'enter_verify_code'} />
                <CommonText
                    style={{ ...styles.instruction }}
                    multiLanguage text={'verify_code_instruction'}
                />
                <OTPInputView
                    style={{ width: '100%', height: 80 }}
                    pinCount={6}
                    autoFocusOnLoad
                    codeInputFieldStyle={{
                        width: 30,
                        height: Device.isIos ? 45 : 75,
                        borderWidth: 0,
                        borderBottomColor: isErr ? Color.Red : Color.Silver,
                        borderBottomWidth: 1,
                        color: Color.Black,
                        fontSize: FontSize.Large
                    }}
                    onCodeChanged={(code) => {
                        if (!Number(code)) return
                        this.setState({ isErr: false, code })
                    }}
                    code={this.state.code}
                    codeInputHighlightStyle={{ borderColor: isErr ? Color.Red : Color.Silver, }}
                    onCodeFilled={(code => {
                        if (!Number(code)) return
                        this.setState({ code })
                    })}
                />
                <CommonBtn
                    title={'confirm'} multiLanguage
                    containerStyle={{ marginTop: 40, marginBottom: 20 }}
                    onPress={this.checkCode}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <CommonText style={{ ...styles.textNormal }} multiLanguage text='did_not_receive_code' />
                    <CommonText onPress={this.props.resendCode} style={{ ...styles.textNormal, color: Color.Red }} multiLanguage text='request_code_again' />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        flex: 1,
    },
    bigTitle: {
        fontSize: FontSize.Giant, fontFamily: "DMSans-Bold",
        fontWeight: '600'
    },
    instruction: {
        color: Color.BorderGray,
        marginBottom: 0
    },
    content: {
        padding: 24, backgroundColor: 'white', borderRadius: 15, marginTop: 30
    },
    forgotStyle: {
        fontSize: FontSize.SmallTitle,
        color: Color.Grey,
        width: '100%',
        textAlign: 'right',
        marginVertical: 20
    },
    textNormal: {
        fontSize: FontSize.SmallTitle,
        color: Color.Grey,
        marginVertical: 20
    }
});

