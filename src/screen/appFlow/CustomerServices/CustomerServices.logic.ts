

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { requestCameraPermission } from '../../../utils';
import { StaticArticle } from '../../../instances';

interface Props {
    navigation: StackNavigationProp<any>
    changeScreen: (screen: number) => void
    customerServices: StaticArticle
}

interface State {
}

const initState = {
}

export class CustomerServicesLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState
    }

}
