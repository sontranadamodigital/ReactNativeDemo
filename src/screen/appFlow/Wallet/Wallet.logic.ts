

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { requestCameraPermission } from '../../../utils';
import { GlobalUIManager } from '../../../common';
import { E_Wallet, Paging } from '../../../instances';
import { Route } from '@react-navigation/native';

interface Props {
    navigation: StackNavigationProp<any>
    route: Route<any>,
    changeScreen: (screen: number) => void
    getWallet: (page: number, callback: (isErr: any, res?: any) => void) => void
    getWalletByOrder: (id: number, page: number, callback: (isErr: any, res?: any) => void) => void
}

interface State {
    wallet: Array<E_Wallet>,
    paging: Paging,
    firstLoading: boolean
}

const initState = {
    wallet: [],
    paging: {
        total: 1,
        current_page: 1,
        last_page: 1
    },
    firstLoading: true
}
export class WalletLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState
    }

    componentDidMount() {
        GlobalUIManager.view.showLoading();
        let param: any = this.props.route.params
        if (!!param && !!param.id) {
            this.props.getWalletByOrder(param.id, this.state.paging.current_page, (isErr, res) => {
                if (!isErr) {
                    this.setState({
                        wallet: res.data,
                        paging: res.paging,
                        firstLoading: false
                    })
                } else {
                    this.setState({
                        firstLoading: false
                    })
                    this.props.navigation.goBack();
                }
                GlobalUIManager.view.hideLoading();
            })
        }
        else this.props.getWallet(this.state.paging.current_page, (isErr, res) => {
            if (!isErr) {
                this.setState({
                    wallet: res.data,
                    paging: res.paging,
                })
            } else {
                this.props.navigation.goBack();
            }
            GlobalUIManager.view.hideLoading();
        })
    }

    refresh = (callback: () => void) => {
        let param: any = this.props.route.params
        if (!!param && !!param.id) {
            this.props.getWalletByOrder(param.id, 1, (isErr, res) => {
                if (!isErr) {
                    this.setState({
                        wallet: res.data,
                        paging: res.paging,
                    })
                } else {
                    this.props.navigation.goBack();
                }
                callback && callback()
            })
        }
        else this.props.getWallet(1, (isErr, res) => {
            if (!isErr) {
                this.setState({
                    wallet: res.data,
                    paging: res.paging,
                })
            } else {
                this.props.navigation.goBack();
            }
            callback && callback()
        })
    }

    loadmore = (callback: () => void) => {
        let { paging, wallet } = this.state
        let param: any = this.props.route.params
        if (!!param && !!param.id) {
            if (paging.current_page < paging.last_page && paging.total > 20) this.props.getWalletByOrder(param.id, paging.current_page + 1, (isErr, res) => {
                console.log("----res", res);
                if (!isErr) {
                    this.setState({
                        wallet: wallet.concat(res.data),
                        paging: res.paging,
                    })
                } else {
                    this.props.navigation.goBack();
                }
                callback && callback()
            })
            else callback && callback()
        }
        else {
            if (paging.current_page < paging.last_page && paging.total > 20) this.props.getWallet(paging.current_page + 1, (isErr, res) => {
                console.log("----res", res);
                if (!isErr) {
                    this.setState({
                        wallet: wallet.concat(res.data),
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

}
