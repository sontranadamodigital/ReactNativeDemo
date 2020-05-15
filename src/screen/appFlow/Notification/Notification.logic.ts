

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { requestCameraPermission } from '../../../utils';

interface Props {
    navigation: StackNavigationProp<any>
    changeScreen: (screen: number) => void
}

interface State {
    isLoadMore: boolean,
    refreshing: boolean,
}

const initState = {
    isLoadMore: false,
    refreshing: false,
}

export class NotificationLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState
    }

    refresh = () => {
    }

    loadmore = () => {
    }

}
