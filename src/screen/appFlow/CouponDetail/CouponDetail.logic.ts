

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { requestCameraPermission } from '../../../utils';
import { E_Wallet } from '../../../instances';
import { Route } from '@react-navigation/native';

interface Props {
    navigation: StackNavigationProp<any>
    route: Route<any>
    getWalletDetail: (id: number, callback: (isErr: any, res?: any) => void) => void
}

interface State {
    coupon: E_Wallet
    firstLoading: boolean,
    refreshing: boolean,
}


export class CouponDetailLogic extends React.PureComponent<Props, State> {

    state = {
        firstLoading: true,
        refreshing: false,
        coupon: {}
    }


    componentDidMount() {
        console.log("-------this.props.route", this.props.route);
        this.refresh();
    }

    refresh = () => {
        let param: any = this.props.route.params
        this.setState({ refreshing: true })
        this.props.getWalletDetail(param.id, (isErr, res) => {
            console.log("----res getWalletDetail", res);
            if (!isErr) {
                this.setState({
                    coupon: res.e_wallet,
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
