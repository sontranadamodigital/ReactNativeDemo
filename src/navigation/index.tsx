import React from 'react'
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from 'react-redux';
import { ReduxState } from '../redux';
import { Dispatch, Action } from 'redux';
// import { getIconRoute, getLabel } from './Helper';
import { Color, Device, Spacing, TabsIcon, FontSize } from '../assets';
import {
    HomeScreen, AccountScreen, WarningScreen,
    UserProfileScreen, DeliveryInfoScreen, DetailCouponScreen,
    MerchantDetailScreen, SavedCouponScreen,
    CategoryListScreen, CartScreen, CouponByCateScreen, MyOrderScreen, OrderDetailScreen, WalletScreen, CouponDetailScreen, NotificationScreen, TermScreen, CustomerServicesScreen
} from "../screen";
import SplashScreen from '../screen/authenticate/Splash';
import { getIconRoute } from './Helper';
import ForgotPassScreen from '../screen/authenticate/ForgetPassword';
import AuthenScreen from '../screen/authenticate';
import LanguageScreen from '../screen/appFlow/Language';


const Stack = createStackNavigator()
const AppBottomTabBar = createBottomTabNavigator()

const SettingsStack = createStackNavigator();

function HomeTabs() {
    return (
        <AppBottomTabBar.Navigator tabBarOptions={{
            labelStyle: {
                fontSize: FontSize.Normal,
            },
            tabStyle: {
            }
        }
        }>
            <AppBottomTabBar.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    title: "",
                    tabBarIcon: getIconRoute(TabsIcon.HomeActive, TabsIcon.HomeInactive)
                }} />
            <AppBottomTabBar.Screen name="CategoryListScreen" component={CategoryListScreen}
                options={{
                    title: "",
                    tabBarIcon: getIconRoute(TabsIcon.CategoryActive, TabsIcon.CategoryInActive)
                }} />
            <AppBottomTabBar.Screen name="NotificationScreen" component={NotificationScreen}
                options={{
                    title: "",
                    tabBarIcon: getIconRoute(TabsIcon.NotiActive, TabsIcon.NotiInActive)
                }} />
            <AppBottomTabBar.Screen name="AccountScreen" component={AccountScreen}
                options={{
                    title: "",
                    tabBarIcon: getIconRoute(TabsIcon.UserActive, TabsIcon.UserInactive, { width: 35, height: 35 })
                }} />
        </AppBottomTabBar.Navigator>
    );
}

interface AppFLowProps {
    token: string,
    onSplash: boolean,
    language: string
}
class AppFlow extends React.PureComponent<AppFLowProps> {


    render() {
        const { token, onSplash, language } = this.props
        return (
            <NavigationContainer>
                {
                    onSplash ?
                        <Stack.Navigator screenOptions={{
                            headerShown: false
                        }
                        }>
                            <Stack.Screen name="SplashScreen" component={SplashScreen}></Stack.Screen>
                        </Stack.Navigator >
                        : token === '' ?
                            //Authen Flow
                            <Stack.Navigator screenOptions={
                                {
                                    headerShown: false
                                }
                            }>
                                <Stack.Screen name="HomeTabs" component={HomeTabs}></Stack.Screen>
                                <Stack.Screen name="AuthenScreen" component={AuthenScreen}></Stack.Screen>
                                <Stack.Screen name="WarningScreen" component={WarningScreen}></Stack.Screen>
                                <Stack.Screen name="LanguageScreen" component={LanguageScreen}></Stack.Screen>
                                <Stack.Screen name="DetailCouponScreen" component={DetailCouponScreen}></Stack.Screen>
                                <Stack.Screen name="MerchantDetailScreen" component={MerchantDetailScreen}></Stack.Screen>
                                <Stack.Screen name="SavedCouponScreen" component={SavedCouponScreen}></Stack.Screen>
                                <Stack.Screen name="CartScreen" component={CartScreen}></Stack.Screen>
                                <Stack.Screen name="CouponByCateScreen" component={CouponByCateScreen}></Stack.Screen>
                                <Stack.Screen name="NotificationScreen" component={NotificationScreen}></Stack.Screen>
                                <Stack.Screen name="TermScreen" component={TermScreen}></Stack.Screen>
                                <Stack.Screen name="CustomerServicesScreen" component={CustomerServicesScreen}></Stack.Screen>
                            </Stack.Navigator >
                            :
                            // App Flow
                            <Stack.Navigator screenOptions={
                                {
                                    headerShown: false
                                }
                            }>
                                <Stack.Screen name="HomeTabs" component={HomeTabs}></Stack.Screen>
                                <Stack.Screen name="UserProfileScreen" component={UserProfileScreen}></Stack.Screen>
                                <Stack.Screen name="DeliveryInfoScreen" component={DeliveryInfoScreen}></Stack.Screen>
                                <Stack.Screen name="LanguageScreen" component={LanguageScreen}></Stack.Screen>
                                <Stack.Screen name="DetailCouponScreen" component={DetailCouponScreen}></Stack.Screen>
                                <Stack.Screen name="MerchantDetailScreen" component={MerchantDetailScreen}></Stack.Screen>
                                <Stack.Screen name="SavedCouponScreen" component={SavedCouponScreen}></Stack.Screen>
                                <Stack.Screen name="CartScreen" component={CartScreen}></Stack.Screen>
                                <Stack.Screen name="CouponByCateScreen" component={CouponByCateScreen}></Stack.Screen>
                                <Stack.Screen name="MyOrderScreen" component={MyOrderScreen}></Stack.Screen>
                                <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen}></Stack.Screen>
                                <Stack.Screen name="WalletScreen" component={WalletScreen}></Stack.Screen>
                                <Stack.Screen name="WalletDetailScreen" component={CouponDetailScreen}></Stack.Screen>
                                <Stack.Screen name="NotificationScreen" component={NotificationScreen}></Stack.Screen>
                                <Stack.Screen name="TermScreen" component={TermScreen}></Stack.Screen>
                                <Stack.Screen name="CustomerServicesScreen" component={CustomerServicesScreen}></Stack.Screen>
                            </Stack.Navigator>
                }

            </NavigationContainer >
        )
    }
}

const mapStateToProps = (state: ReduxState) => {

    return {
        token: state.user.token,
        onSplash: state.user.onSplash,
        language: state.user.language
    }
}

const mapDispatchToProp = (dispatch: Dispatch<Action>) => {

    return {

    }
}

export const AppFlowNav = connect(mapStateToProps, mapDispatchToProp)(AppFlow)

export const AppFlowRouteName = {
    HomeScreen: "HomeScreen",
    AccountScreen: "AccountScreen",
    AuthenScreen: "AuthenScreen",
    WarningScreen: "WarningScreen",
    UserProfileScreen: "UserProfileScreen",
    DeliveryInfoScreen: "DeliveryInfoScreen",
    LanguageScreen: "LanguageScreen",
    DetailCouponScreen: "DetailCouponScreen",
    MerchantDetailScreen: "MerchantDetailScreen",
    SavedCouponScreen: "SavedCouponScreen",
    CategoryListScreen: "CategoryListScreen",
    CartScreen: "CartScreen",
    CouponByCateScreen: "CouponByCateScreen",
    MyOrderScreen: "MyOrderScreen",
    OrderDetailScreen: "OrderDetailScreen",
    WalletScreen: "WalletScreen",
    CouponDetailScreen: "WalletDetailScreen",
    NotificationScreen: "NotificationScreen",
    TermScreen: "TermScreen",
    CustomerServicesScreen: "CustomerServicesScreen"

}