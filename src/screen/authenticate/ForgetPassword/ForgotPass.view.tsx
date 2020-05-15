

import React from 'react';
import {
    StyleSheet,
    Animated,
} from 'react-native';
import { ForgotPassLogic, ForgotScreen } from './ForgotPass.logic';
import { FontSize, InputIcon, Color } from '../../../assets';
import { CommonText, CommonInputWrapper, CommonBtn } from '../../../common';
import { PhoneInput } from '../../../common/CommonInputWrapper';
import VerifyCodeScreen from '../VerifyCode';
import {
    Formik,
} from 'formik';


export class ForgotPass extends ForgotPassLogic {

    renderContent = () => {
        switch (this.state.screen) {
            case ForgotScreen.EnterPhone:
                return (
                    <Formik
                        initialValues={{
                            phone: '',
                        }}
                        validationSchema={this.phoneValidate}
                        onSubmit={values => {
                            this.sendCode(values)
                        }}
                    >
                        {({ errors, setFieldValue, submitForm, }) => (
                            <>
                                <CommonText style={{ ...styles.bigTitle, marginTop: 32, marginBottom: 24 }}
                                    multiLanguage text={'forgot_pass_title'} />
                                <CommonText
                                    style={{ ...styles.instruction }}
                                    multiLanguage text={'forgot_pass_text'}
                                />
                                <PhoneInput
                                    Err={errors.phone}
                                    onChangeText={(value) => {
                                        setFieldValue('phone', value, false)
                                    }}
                                    errStyle={styles.errStyle}
                                    placeholder='phone_holder'
                                    containerStyleWrapper={{ marginBottom: 50 }} titleStyle={{ fontWeight: "500" }}
                                    title={'phone_title'} multiLanguage />
                                <CommonBtn title={'request_pass'} onPress={submitForm} multiLanguage />
                            </>
                        )}
                    </Formik>
                )
            case ForgotScreen.EnterPass:
                return (
                    <Formik
                        initialValues={{
                            pass: '',
                            rePass: ''
                        }}
                        validationSchema={this.confirmValidate}
                        onSubmit={values => {
                            this.setPass(values)
                        }}
                    >
                        {({ errors, setFieldValue, submitForm, }) => (
                            <>
                                <CommonText style={{ ...styles.bigTitle, marginTop: 32, marginBottom: 24 }}
                                    multiLanguage text={"new_pass_title"} />
                                <CommonInputWrapper
                                    textContentType='password'
                                    contextMenuHidden={true}
                                    // caretHidden={true}
                                    Err={errors.pass}
                                    onChangeText={(value) => {
                                        setFieldValue('pass', value, false)
                                    }}
                                    errStyle={{ ...styles.errStyle, bottom: -12 }}
                                    containerStyleWrapper={{ marginVertical: 20 }} titleStyle={{ fontWeight: "500" }}
                                    rightIconActive={InputIcon.Eye}
                                    rightIconInActive={InputIcon.EyeOff}
                                    placeholder='pass_holder'
                                    title="pass_title" multiLanguage />
                                <CommonInputWrapper
                                    textContentType='password'
                                    Err={errors.rePass}
                                    contextMenuHidden={true}
                                    // caretHidden={true}
                                    onChangeText={(value) => {
                                        setFieldValue('rePass', value, false)
                                    }}
                                    errStyle={{ ...styles.errStyle, bottom: -12 }}
                                    containerStyleWrapper={{ marginBottom: 50, }} titleStyle={{ fontWeight: "500" }}
                                    rightIconActive={InputIcon.Eye}
                                    rightIconInActive={InputIcon.EyeOff}
                                    placeholder='re_pass_title'
                                    title="re_enter_pass_holder" multiLanguage />
                                <CommonBtn title={'set_new_pass'} onPress={submitForm} multiLanguage />
                            </>
                        )}
                    </Formik>
                )
            case ForgotScreen.EnterCode:
                return (
                    <>
                        <VerifyCodeScreen
                            resendCode={this.resendCode}
                            changeScreen={this.verifying}
                            navigation={this.props.navigation} />
                    </>
                )

            default:
                break;
        }
    }
    render() {
        let { opacity } = this.state
        return (
            <Animated.View style={{ opacity: opacity, ...styles.content }}>
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
    instruction: {
        color: Color.BorderGray,
        marginBottom: 24
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
    },
    errStyle: {
        position: 'absolute',
        bottom: -20,
    }
});

