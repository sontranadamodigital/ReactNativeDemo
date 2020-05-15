/** 
 * @author: Tytv1  
 * @Since 2019-10-15 10:58:58  
 * @Last Modified by: Adamo HungTD
 * @Last Modified time: 2020-03-09 16:29:12
*/

import React from 'react'
import { View, Alert } from 'react-native'
import GlobalUIManager from './GlobalUIManager'
import { showMessage } from 'react-native-flash-message'
import { Loading } from '../Loading'
import { Alert as AlertComponent } from '../Alert'
import { CommonImage } from '../../assets'


export interface GloballUIState {
    isLoading: boolean,
    alertVisible: boolean,
    alertIcon: any,
    alertIsSuccess: boolean,
    alertMess: string,
    alertTitle: string,
    alertOnPress: () => void
}

export class GloballUI extends React.PureComponent<any, GloballUIState> {


    constructor(props: any) {
        super(props)
        this.state = {
            isLoading: false,
            alertVisible: false,
            alertIcon: CommonImage.Success,
            alertIsSuccess: true,
            alertMess: "Success",
            alertTitle: "",
            alertOnPress: () => {
                this.setState({ alertVisible: false })
            }
        }
        GlobalUIManager.view = this
    }

    isLoading = () => { return this.state.isLoading }

    showLoading = () => {
        this.setState({ isLoading: true })
    }

    hideLoading = () => {
        this.setState({ isLoading: false })
    }

    showAlert = (props: {
        alertVisible: boolean,
        alertIcon: any,
        alertTitle: string,
        alertIsSuccess: boolean,
        alertMess: string,
        alertOnPress: () => void
    }) => {
        this.setState({
            ...props,
            alertOnPress: () => {
                props.alertOnPress();
                this.setState({ alertVisible: false })
            }
        })
    }

    hideAlert = () => {
        this.setState({
            alertVisible: false,
        })
    }

    showSuccessMessage = (message?: string) => {
        if (message && message != '') {
            showMessage({
                message: message || '',
                type: 'success',
                backgroundColor: '#38B779',
                titleStyle: {
                    fontFamily: 'Averta',
                    textAlign: 'center',
                    alignSelf: 'center',
                    lineHeight: 20,
                    fontSize: 16
                },
                hideStatusBar: true
            })
        }
    }

    showDangerMessage = (message?: string, duration: number = 2000) => {
        if (message && message != '') {
            showMessage({
                message: message || '',
                type: 'danger',
                backgroundColor: '#F4000C',
                titleStyle: {
                    fontFamily: 'Averta',
                    textAlign: 'center',
                    alignSelf: 'center',
                    lineHeight: 20,
                    fontSize: 16
                },
                duration: duration,
                hideStatusBar: true
            })
        }
    }

    render() {
        return (
            <>
                <AlertComponent title={this.state.alertTitle} icon={this.state.alertIcon} isSuccess={this.state.alertIsSuccess} message={this.state.alertMess} onPress={this.state.alertOnPress} visible={this.state.alertVisible} />
                <Loading
                    isLoading={this.state.isLoading}
                />
            </>
        )
    }
}