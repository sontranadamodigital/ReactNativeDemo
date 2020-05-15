

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { requestCameraPermission } from '../../../utils';

interface Props {
    navigation: StackNavigationProp<any>
    changeScreen: (screen: number) => void
}

interface State {
}

const initState = {
}

export class DeliveryInfoLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState
    }

}
