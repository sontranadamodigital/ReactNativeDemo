

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { GlobalUIManager } from '../../../common';
import { AppFlowRouteName } from '../../../navigation';
import { User } from '../../../instances';

interface Props {
    token: string,
    navigation: StackNavigationProp<any>
    changeLanguage: (language: string) => void
    language: string,
    logout: (callback: (isErr: any, res?: any) => void) => void,
    userInfo: User
}

interface State {

}

export class AccountLogic extends React.PureComponent<Props, State> {


    logout = () => {
        GlobalUIManager.view.showLoading();
        this.props.logout(() => {
            GlobalUIManager.view.hideLoading();
            this.props.navigation.navigate(AppFlowRouteName.HomeScreen)
        });
    }

    changeLanguage = () => {
        this.props.navigation.navigate(AppFlowRouteName.LanguageScreen);
    }

    moveToProfile = () => {
        this.props.navigation.navigate(AppFlowRouteName.UserProfileScreen)
    }

    moveToDeliveryProfile = () => {
        this.props.navigation.navigate(AppFlowRouteName.DeliveryInfoScreen)
    }

}
