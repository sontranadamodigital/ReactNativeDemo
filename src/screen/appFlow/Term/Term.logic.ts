

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { requestCameraPermission } from '../../../utils';
import { StaticArticle } from '../../../instances';

interface Props {
    navigation: StackNavigationProp<any>
    changeScreen: (screen: number) => void
    term: StaticArticle
}

interface State {
}

const initState = {
}

export class TermLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState
    }

}
