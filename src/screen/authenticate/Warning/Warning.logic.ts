

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route } from '@react-navigation/native';
import { GlobalUIManager } from '../../../common';
import { AppFlowRouteName } from '../../../navigation';

interface Props {
    navigation: StackNavigationProp<any>
    route: Route<any>
    login: (body: any, callback: (isErr: any, res?: any) => void) => void
}

interface State {
    isSuccess: boolean,
    mess: string
}

export class WarningLogic extends React.PureComponent<Props, State> {

    constructor(props: Props) {
        super(props)
        let params: any = props.route.params
        this.state = {
            isSuccess: !!params.isSuccess,
            mess: params.message
        }
    }

}


