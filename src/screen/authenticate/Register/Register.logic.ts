

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Animated } from 'react-native';
import { AppFlowRouteName } from '../../../navigation';
import * as Yup from 'yup';
import { GlobalUIManager } from '../../../common';
import { RequestConfigProperties } from '../../../instances';

interface Props {
    navigation: StackNavigationProp<any>
    changeScreen: (screen: number) => void
    register: (body: any, callback: (isErr: any, res?: any) => void) => void
    confirmCode: (body: any, callback: (isErr: any, res?: any) => void) => void
    login: (body: any, callback: (isErr: any, res?: any) => void, config?: RequestConfigProperties) => void
    resendCode: (body: any, callback: (isErr: any, res?: any) => void) => void
}

export const RegisterType = {
    EnterPhone: 1,
    EnterCode: 2
}

interface State {
    screen: number,
    opacity: Animated.Value,
}

const initState = {
    screen: RegisterType.EnterPhone,
    opacity: new Animated.Value(1)
}

export class RegisterLogic extends React.PureComponent<Props, State> {

    state = { ...initState }

    register = (code: string) => {
        GlobalUIManager.view.showLoading();
        this.props.confirmCode({
            phone: this.data.phone,
            token: code,
        }, (isErr, res) => {
            GlobalUIManager.view.hideLoading()
            this.props.navigation.navigate(AppFlowRouteName.WarningScreen, {
                isSuccess: !isErr,
                message: res.message,
                nextOnpress: this.login,
            })

        })

    }
    data: any = {}


    registerValidate = Yup.object().shape({
        phone: Yup.string()
            .required('validate_phone_number')
            .min(12, 'validate_phone_length')
            .max(12, 'validate_phone_length'),
        pass: Yup.string()
            .required('validate_pass')
            .min(6, 'validate_pass_min_length'),
        rePass: Yup.string()
            .required('validate_confirm_pass')
            .oneOf([Yup.ref('pass'), null], 'validate_match_pass')
    });

    // moveToRegister = () => {
    //     this.props.navigation.navigate(AppFlowRouteName.Register)
    // }

    sendCode = (values: any) => {
        GlobalUIManager.view.showLoading();
        this.props.register({
            "phone": values.phone,
            "password": values.pass,
            "password_confirmation": values.rePass
        }, (isErr, res) => {
            if (!isErr) {
                this.animatedScreen(RegisterType.EnterCode)
                this.data = values
            }
            GlobalUIManager.view.hideLoading()
        })
        // this.props.login({
        //     phone: values.phone,
        //     password: values.pass
        // }, (isErr, res) => {
        // })
    }

    login = () => {
        GlobalUIManager.view.showLoading();
        this.props.login({
            phone: this.data.phone,
            password: this.data.pass
        }, (isErr, res) => {
            if (isErr) {
                GlobalUIManager.view.hideLoading()
                return;
            }
            let name = !!res && !!res.data && !!res.data.full_name ? res.data.full_name : ""
            if (!name) {
                setTimeout(() => {
                    this.props.navigation.navigate(AppFlowRouteName.UserProfileScreen, {
                        required: true
                    })
                }, 200)
            }
            GlobalUIManager.view.hideLoading()
        }, { showMessage: false, showMessageError: true })
    }

    resendCode = () => {
        GlobalUIManager.view.showLoading();
        this.props.resendCode({
            phone: this.data.phone,
        }, (isErr, res) => {
            GlobalUIManager.view.hideLoading()
        });

    }

    animatedScreen = (screen: number) => {
        Animated.timing(
            this.state.opacity,
            {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }
        ).start(() => {
            this.setState({ screen }, () => {
                Animated.timing(
                    this.state.opacity,
                    {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }
                ).start();
            })
        });
    }

}
