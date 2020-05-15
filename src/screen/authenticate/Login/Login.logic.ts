

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Yup from 'yup';
import { AppFlowRouteName } from '../../../navigation';
import { GlobalUIManager } from '../../../common';
import { Animated } from 'react-native';

interface Props {
    navigation: StackNavigationProp<any>
    changeScreen: (screen: number) => void
    login: (body: any, callback: (isErr: any, res?: any) => void) => void
    confirmCode: (body: any, callback: (isErr: any, res?: any) => void) => void
    resendCode: (body: any, callback: (isErr: any, res?: any) => void) => void
}

interface State {
    opacity: Animated.Value
    screen: number
}

export const LoginScreen = {
    Login: 1,
    ConfirmCode: 2,
}

export class LoginLogic extends React.PureComponent<Props, State> {

    state = {
        opacity: new Animated.Value(1),
        screen: LoginScreen.Login
    }

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
    }

    data: any

    loginValidate = Yup.object().shape({
        phone: Yup.string()
            .required('validate_phone_number')
            .min(12, 'validate_phone_length')
            .max(12, 'validate_phone_length'),
        pass: Yup.string()
            .required('validate_pass')
            .min(6, 'validate_pass_min_length'),
    });

    confirmCode = (code: string) => {
        GlobalUIManager.view.showLoading();
        this.props.confirmCode({
            phone: this.data.phone,
            password: this.data.pass,
            token: code,
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

        })
    }

    login = (values: any) => {
        GlobalUIManager.view.showLoading();
        this.props.login({
            phone: values.phone,
            password: values.pass
        }, (isErr, res) => {
            if (isErr) {
                GlobalUIManager.view.hideLoading()
                return;
            }
            let name = !!res && !!res.data && !!res.data.full_name ? res.data.full_name : ""
            let status = !!res && !!res.data ? res.data.status : -1
            if (status === 0) {
                this.data = values;
                this.animatedScreen(LoginScreen.ConfirmCode)
            } else if (!name) {
                setTimeout(() => {
                    this.props.navigation.navigate(AppFlowRouteName.UserProfileScreen, {
                        required: true
                    })
                }, 200)
            }
            GlobalUIManager.view.hideLoading()
        })
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
