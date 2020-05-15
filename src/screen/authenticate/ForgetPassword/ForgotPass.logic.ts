

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Animated } from 'react-native';
import { AppFlowRouteName } from '../../../navigation';
import { ScreenType } from '../../../assets';
import * as Yup from 'yup';
import { GlobalUIManager } from '../../../common';

interface Props {
    navigation: StackNavigationProp<any>
    changeScreen: (screen: number) => void
    sendCode: (body: any, callback: (isErr: any, res?: any) => void) => void
    verifyCode: (body: any, callback: (isErr: any, res?: any) => void) => void
    changePass: (body: any, callback: (isErr: any, res?: any) => void) => void
}

export const ForgotScreen = {
    EnterPhone: 1,
    EnterCode: 2,
    EnterPass: 3
}

interface State {
    screen: number
    opacity: Animated.Value
}

const initState = {
    screen: ForgotScreen.EnterPhone,
    opacity: new Animated.Value(1)
}

export class ForgotPassLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState
    }

    setPass = (values: any) => {
        GlobalUIManager.view.showLoading()
        this.props.changePass({
            "phone": this.phone,
            "token": this.code,
            "password": values.pass,
            "password_confirmation": values.rePass
        }, (isErr, res) => {
            if (!isErr) {
                this.props.changeScreen(ScreenType.Login)
            }
            GlobalUIManager.view.hideLoading()
        })
    }
    phone: string = ""
    code: string = ""

    phoneValidate = Yup.object().shape({
        phone: Yup.string()
            .required('validate_phone_number')
            .min(12, 'validate_phone_length')
            .max(12, 'validate_phone_length'),
    });

    confirmValidate = Yup.object().shape({
        pass: Yup.string()
            .required('validate_pass')
            .min(6, 'validate_pass_min_length'),
        rePass: Yup.string()
            .required('validate_confirm_pass')
            .oneOf([Yup.ref('pass'), null], 'validate_match_pass')
    });

    sendCode = (values: any) => {
        GlobalUIManager.view.showLoading()
        this.phone = values.phone;
        this.props.sendCode({
            "phone": values.phone
        }, (isErr, res) => {
            if (!isErr) {
                this.animatedScreen(ForgotScreen.EnterCode)
            }
            GlobalUIManager.view.hideLoading()
        })
    }

    resendCode = () => {
        GlobalUIManager.view.showLoading()
        this.props.sendCode({
            "phone": this.phone
        }, (isErr, res) => {
            GlobalUIManager.view.hideLoading()
        })
    }

    verifying = (values: string) => {
        GlobalUIManager.view.showLoading()
        this.code = values
        this.props.verifyCode({
            "phone": this.phone,
            "token": values
        }, (isErr, res) => {
            if (!isErr) {
                this.animatedScreen(ForgotScreen.EnterPass)
            }
            GlobalUIManager.view.hideLoading()
        })
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
