

import React from 'react';
import {
    StyleSheet,
    View,
    Animated,
} from 'react-native';
import { RegisterLogic, RegisterType } from './Register.logic';
import { FontSize, InputIcon, Color, ScreenType } from '../../../assets';
import { CommonText, CommonInputWrapper, CommonBtn } from '../../../common';
import { PhoneInput } from '../../../common/CommonInputWrapper';
import VerifyCodeScreen from '../VerifyCode';
import {
    Formik,
} from 'formik';

export class Register extends RegisterLogic {
    render() {
        let firstScreen = this.state.screen === RegisterType.EnterPhone
        return (
            <Animated.View style={{ opacity: this.state.opacity, ...styles.content }} >
                {firstScreen ?

                    <Formik
                        initialValues={{
                            phone: '',
                            pass: '',
                            rePass: ''
                        }}
                        validationSchema={this.registerValidate}
                        onSubmit={values => {
                            this.sendCode(values)
                        }}
                    >
                        {({ errors, setFieldValue, submitForm, }) => (
                            <>
                                <CommonText style={{ ...styles.bigTitle, marginTop: 32, marginBottom: 40 }} multiLanguage text='create_account' />
                                <PhoneInput
                                    Err={errors.phone}
                                    errStyle={styles.errStyle}
                                    placeholder='phone_holder'
                                    onChangeText={(value) => {
                                        setFieldValue('phone', value, false)
                                    }}
                                    containerStyleWrapper={{ marginBottom: 30 }} titleStyle={{ fontWeight: "500" }}
                                    title={'phone_title'} multiLanguage />
                                <CommonInputWrapper
                                    textContentType='password'
                                    Err={errors.pass}
                                    contextMenuHidden={true}
                                    // caretHidden={true}
                                    errStyle={{ ...styles.errStyle, bottom: -15 }}
                                    onChangeText={(value) => {
                                        setFieldValue('pass', value, false)
                                    }}
                                    containerStyleWrapper={{ marginBottom: 30 }} titleStyle={{ fontWeight: "500" }}
                                    rightIconActive={InputIcon.Eye}
                                    rightIconInActive={InputIcon.EyeOff}
                                    placeholder='pass_holder'
                                    title="pass_title" multiLanguage />
                                <CommonInputWrapper
                                    textContentType='password'
                                    Err={errors.rePass}
                                    contextMenuHidden={true}
                                    // caretHidden={true}
                                    errStyle={{ ...styles.errStyle, bottom: -15 }}
                                    onChangeText={(value) => {
                                        setFieldValue('rePass', value, false)
                                    }}
                                    containerStyleWrapper={{ marginBottom: 30 }} titleStyle={{ fontWeight: "500" }}
                                    rightIconActive={InputIcon.Eye}
                                    rightIconInActive={InputIcon.EyeOff}
                                    placeholder='re_enter_pass_holder'
                                    title="re_pass_title" multiLanguage />
                                <CommonBtn title='sign_up_title' onPress={submitForm} multiLanguage />
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <CommonText style={{ ...styles.textNormal }} multiLanguage text='have_account' />
                                    <CommonText onPress={() => this.props.changeScreen(ScreenType.Login)} style={{ ...styles.textNormal, color: Color.Red }} multiLanguage text='sign_in_title' />
                                </View>
                            </>
                        )}
                    </Formik> :
                    < VerifyCodeScreen
                        resendCode={this.resendCode}
                        changeScreen={this.register}
                        navigation={this.props.navigation} />}
            </Animated.View >
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
        width: '100%',
        textAlign: 'right',
        marginVertical: 20
    },
    errStyle: {
        position: 'absolute',
        bottom: -20,
    },
    textNormal: {
        fontSize: FontSize.SmallTitle,
        color: Color.Grey,
        marginVertical: 20
    }
});

