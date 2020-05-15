

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenType } from '../../assets';
import { Animated } from 'react-native';

interface Props {
    navigation: StackNavigationProp<any>

}

interface State {
    screen: number,
    opacity: Animated.Value
}

const initState = {
    screen: ScreenType.Login,
    opacity: new Animated.Value(1)
}

export class AuthenLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState
    }

    changeScreen = (screen: number) => {
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
