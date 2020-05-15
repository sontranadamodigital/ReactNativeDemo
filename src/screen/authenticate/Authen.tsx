

import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Animated,
} from 'react-native';
import { AuthenLogic } from './Authen.logic';
import { FontSize, Device, Color, ScreenType } from '../../assets';
import { BGWithScroll } from '../../common';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import ForgotPassScreen from './ForgetPassword';

export class Authen extends AuthenLogic {

    renderContent = () => {
        switch (this.state.screen) {
            case ScreenType.Login:
                return <LoginScreen changeScreen={this.changeScreen} navigation={this.props.navigation} />
            case ScreenType.Register:
                return <RegisterScreen changeScreen={this.changeScreen} navigation={this.props.navigation} />
            case ScreenType.ForgotPass:
                return <ForgotPassScreen changeScreen={this.changeScreen} navigation={this.props.navigation} />
            default:
                break;
        }
    }

    render() {
        return (
            <BGWithScroll showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                hasBack
                onBack={this.props.navigation.goBack}
            >
                <SafeAreaView style={{ ...styles.scrollView, backgroundColor: 'transparent' }}>
                    <Animated.View style={{ opacity: this.state.opacity }}>
                        {this.renderContent()}
                        <View style={{ height: 30 }} />
                    </Animated.View>
                </SafeAreaView>
            </BGWithScroll >
        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        flex: 1,
    },
    bigTitle: {
        fontSize: FontSize.Giant, fontFamily: "DMSans-Bold",
        fontWeight: '600'
    },
    content: {
        padding: 24, backgroundColor: 'white', borderRadius: 15, marginTop: Device.height * 0.07
    },
    forgotStyle: {
        fontSize: FontSize.SmallTitle,
        color: Color.Grey,
        width: '100%',
        textAlign: 'right',
        marginVertical: 20
    },
    textNormal: {
        fontSize: FontSize.SmallTitle,
        color: Color.Grey,
        marginVertical: 20
    }
});

