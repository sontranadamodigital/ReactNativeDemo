

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Animated } from 'react-native';
import { AppFlowRouteName } from '../../../navigation';

interface Props {
    navigation: StackNavigationProp<any>
    changeScreen: (code: string) => void
    resendCode: () => void
}

interface State {
    code: string,
    isErr: boolean,
}

const initState = {
    code: '',
    isErr: false
}

export class VerifyCodeLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState
    }

    checkCode = () => {
        if (!this.state.code) {
            this.setState({ isErr: true })
        } else {
            this.props.changeScreen(this.state.code)

        }
    }

}
