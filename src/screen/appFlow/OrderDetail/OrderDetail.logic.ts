

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { requestCameraPermission } from '../../../utils';
import { GlobalUIManager } from '../../../common';
import { OrderType, Paging } from '../../../instances';
import { Route } from '@react-navigation/native';

interface Props {
    navigation: StackNavigationProp<any>
    route: Route<any>
    changeScreen: (screen: number) => void,
    getMyOrderDetail: (id: number, callback: (isErr: any, res?: any) => void) => void
}

interface State {
    detailOrder: OrderType,
    firstLoading: boolean,
    refreshing: boolean,
}

const initState = {
    detailOrder: {},
    firstLoading: true,
    refreshing: false
}

export class OrderDetailLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState
    }

    componentDidMount() {
        console.log("-------this.props.route", this.props.route);
        this.refresh();
    }

    refresh = () => {
        let param: any = this.props.route.params
        this.setState({ refreshing: true })
        this.props.getMyOrderDetail(param.id, (isErr, res) => {
            console.log("----res", res);
            if (!isErr) {
                this.setState({
                    detailOrder: res.order,
                    firstLoading: false,
                    refreshing: false
                })
            } else {
                this.setState({ refreshing: false })
                this.props.navigation.goBack();
            }
        })
    }

}
