

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { requestCameraPermission } from '../../../utils';
import { GlobalUIManager } from '../../../common';
import { OrderType, Paging } from '../../../instances';

interface Props {
    navigation: StackNavigationProp<any>
    changeScreen: (screen: number) => void,
    getMyOrder: (page: number, callback: (isErr: any, res?: any) => void) => void
}

interface State {
    orderList: Array<OrderType>,
    paging: Paging,
    firsLoading: boolean,
}

const initState = {
    orderList: [],
    paging: {
        total: 1,
        current_page: 1,
        last_page: 1
    },
    firsLoading: true
}

export class MyOrderLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState
    }

    componentDidMount() {
        GlobalUIManager.view.showLoading();
        this.props.getMyOrder(this.state.paging.current_page, (isErr, res) => {
            console.log("----res", res);
            if (!isErr) {
                this.setState({
                    firsLoading: false,
                    orderList: res.data,
                    paging: res.paging,
                })
            } else {
                this.setState({
                    firsLoading: false
                })
                this.props.navigation.goBack();
            }
            GlobalUIManager.view.hideLoading();
        })
    }

    refresh = (callback: () => void) => {
        this.props.getMyOrder(1, (isErr, res) => {
            console.log("----res", res);
            if (!isErr) {
                this.setState({
                    orderList: res.data,
                    paging: res.paging,
                })
            } else {
                this.props.navigation.goBack();
            }
            callback && callback()
        })
    }

    loadmore = (callback: () => void) => {
        let { paging, orderList } = this.state
        if (paging.current_page < paging.last_page && paging.total > 20) this.props.getMyOrder(paging.current_page + 1, (isErr, res) => {
            console.log("----res", res);
            if (!isErr) {
                this.setState({
                    orderList: orderList.concat(res.data),
                    paging: res.paging,
                })
            } else {
                this.props.navigation.goBack();
            }
            callback && callback()
        })
        else callback && callback()
    }

}
