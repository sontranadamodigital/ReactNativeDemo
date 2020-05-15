

import React from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Clipboard,
} from 'react-native';
import { LoginLogic, LoginScreen } from './Login.logic';
import { FontSize, InputIcon, Color, ScreenType } from '../../../assets';
import { CommonText, CommonInputWrapper, CommonBtn } from '../../../common';
import { PhoneInput } from '../../../common/CommonInputWrapper';
import {
    Formik,
} from 'formik';
import VerifyCodeScreen from '../VerifyCode';

export class Login extends LoginLogic {


    renderContent = () => {
        switch (this.state.screen) {
            case LoginScreen.Login:
                return (
                    <Formik
                        initialValues={{
                            phone: '',
                            pass: ''
                        }}
                        validationSchema={this.loginValidate}
                        onSubmit={values => {
                            this.login(values)
                        }}
                    >
                        {({ errors, setFieldValue, submitForm, }) => (
                            <View style={{}}>
                                <CommonText style={{ ...styles.bigTitle, marginTop: 32, marginBottom: 40 }} multiLanguage text='sign_in_title' />
                                <PhoneInput
                                    selectTextOnFocus={false}
                                    Err={errors.phone}
                                    errStyle={styles.errStyle}
                                    placeholder='phone_holder'
                                    containerStyleWrapper={{ marginBottom: 30 }} titleStyle={{ fontWeight: "500" }}
                                    title={'phone_title'} multiLanguage
                                    onChangeText={(value) => {
                                        setFieldValue('phone', value, false)
                                    }}
                                />
                                <CommonInputWrapper
                                    textContentType='password'
                                    selectTextOnFocus={false}
                                    onFocus={() => Clipboard.setString('')}
                                    onSelectionChange={() => Clipboard.setString('')}
                                    contextMenuHidden={true}
                                    Err={errors.pass}
                                    errStyle={{ ...styles.errStyle, bottom: -15 }}
                                    onChangeText={(value) => {
                                        setFieldValue('pass', value, false)
                                    }}
                                    // caretHidden={true}
                                    keyboardType='ascii-capable'
                                    containerStyleWrapper={{}} titleStyle={{ fontWeight: "500" }}
                                    rightIconActive={InputIcon.Eye}
                                    rightIconInActive={InputIcon.EyeOff}
                                    placeholder='pass_holder'
                                    title="pass_title" multiLanguage />
                                <View style={{ width: '100%', alignItems: 'flex-end' }}>
                                    <CommonText onPress={() => this.props.changeScreen(ScreenType.ForgotPass)} style={{ ...styles.forgotStyle }} multiLanguage text='forgot_pass' />
                                </View>
                                <CommonBtn title='sign_in_title' onPress={submitForm} multiLanguage />
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <CommonText style={{ ...styles.textNormal }} multiLanguage text='not_a_member' />
                                    <CommonText onPress={() => this.props.changeScreen(ScreenType.Register)} style={{ ...styles.textNormal, color: Color.Red }} multiLanguage text='sign_up_now' />
                                </View>
                            </View>
                        )}
                    </Formik>
                )
            case LoginScreen.ConfirmCode:
                return (
                    <VerifyCodeScreen resendCode={this.resendCode} changeScreen={this.confirmCode} navigation={this.props.navigation} />
                )
        }
    }


    render() {

        return (
            <Animated.View style={{ opacity: this.state.opacity, ...styles.content }}>
                {this.renderContent()}
            </Animated.View>
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
    content: {
        padding: 24, backgroundColor: 'white', borderRadius: 15, marginTop: 30
    },
    forgotStyle: {
        fontSize: FontSize.SmallTitle,
        color: Color.Grey,
        textAlign: 'right',
        marginVertical: 20
    },
    textNormal: {
        fontSize: FontSize.SmallTitle,
        color: Color.Grey,
        marginVertical: 20
    },
    errStyle: {
        position: 'absolute',
        bottom: -20,
    }
});

