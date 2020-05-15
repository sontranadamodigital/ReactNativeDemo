

import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { AccountLogic } from './Account.logic';
import { CommonImage, FontSize, InputIcon, Device, Color } from '../../../assets';
import { CommonText, CommonInputWrapper, BGWithScroll, CommonBtn, Header } from '../../../common';
import { I18n, LangugeType } from "../../../instances";
import { PhoneInput } from '../../../common/CommonInputWrapper';
import { Divider } from 'react-native-elements';
import { AppFlowRouteName } from '../../../navigation';

export class Account extends AccountLogic {

    renderHeader = () => {
        let { token, userInfo } = this.props
        let name = !!token ? (userInfo.full_name || I18n.trans('welcome')) : I18n.trans('welcome')
        let phone = !!token ? userInfo.phone_number : `${I18n.trans('sign_in_title')}/ ${I18n.trans('sign_up_title')}`
        return (
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <View style={{ width: 40 }}>
                    <Image source={userInfo.avatar ? { uri: userInfo.avatar } : CommonImage.DefaultAvatar}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                        resizeMode='cover' resizeMethod='scale' />
                </View>
                {!!token ? <View style={{ justifyContent: 'space-evenly', paddingLeft: 10, width: '80%' }}>
                    <CommonText text={name} style={{ color: Color.DarkGray, width: '100%' }} numberOfLines={1} />
                    <CommonText text={phone} style={{ color: Color.Red, fontSize: FontSize.SmallTitle, fontWeight: '500' }} />
                </View> :
                    <View style={{ justifyContent: 'space-evenly', paddingLeft: 10 }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppFlowRouteName.AuthenScreen) }}>
                            <CommonText text={name} style={{ color: Color.DarkGray }} />
                            <CommonText text={phone} style={{ color: Color.Red, fontSize: FontSize.SmallTitle, fontWeight: '500' }} />
                        </TouchableOpacity>
                    </View>}
            </View>
        )
    }

    renderRow = (icon: any, title: string, onPress: () => void) => {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={{ flexDirection: "row", paddingVertical: 12, alignItems: 'center' }}>
                    <View style={{ width: "10%" }}>
                        <Image source={icon} style={{ width: 25, height: 25 }} resizeMethod='scale' resizeMode='contain' />
                    </View>
                    <View style={{ width: '80%' }}>
                        <CommonText text={title}
                            style={{
                                marginLeft: 10,
                                fontSize: FontSize.Title
                            }}
                            multiLanguage />
                    </View>
                    <View style={{ width: '10%', alignItems: "flex-end" }}>
                        <Image source={CommonImage.ArrowRight} style={{ width: 15, height: 15 }} resizeMethod='scale' resizeMode='contain' />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderLanguage = () => {
        return (
            <View style={{ backgroundColor: Color.White, marginTop: 15, paddingHorizontal: 15, paddingVertical: 5, width: '100%', borderRadius: 8 }} >
                <TouchableOpacity onPress={this.changeLanguage}>
                    <View style={{ flexDirection: "row", paddingVertical: 12, alignItems: 'center' }}>
                        <View style={{ width: "10%" }}>
                            <Image source={CommonImage.Languge} style={{ width: 25, height: 25 }} resizeMethod='scale' resizeMode='contain' />
                        </View>
                        <View style={{ width: '45%' }}>
                            <CommonText text={'language'}
                                style={{
                                    marginLeft: 10,
                                    fontSize: FontSize.Title
                                }}
                                multiLanguage />
                        </View>
                        <View style={{ width: '45%', alignItems: "center", flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <CommonText text={this.props.language === LangugeType.English ? 'language_english' : 'language_thai'}
                                multiLanguage
                                style={{
                                    marginRight: 10,
                                    fontSize: FontSize.Title,
                                    color: Color.DarkGray
                                }} />
                            <Image source={CommonImage.ArrowRight} style={{ width: 15, height: 15 }} resizeMethod='scale' resizeMode='contain' />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderLogout = () => {
        return (
            <View style={{ backgroundColor: Color.White, height: 59, marginVertical: 15, paddingHorizontal: 15, paddingVertical: 5, width: '100%', borderRadius: 8 }} >
                <TouchableOpacity style={{ width: '100%', justifyContent: 'center', height: '100%' }} onPress={this.logout}>
                    <CommonText text={'sign_out'}
                        style={{
                            marginLeft: 10,
                            fontSize: FontSize.Title,
                            color: Color.DarkGray
                        }}
                        multiLanguage />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let { token } = this.props

        return (
            <BGWithScroll showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                headerProps={{
                    leftTitle: 'account',
                    multiLanguage: true,
                    rightComponent: () => {
                        return (<TouchableOpacity onPress={() => { this.props.navigation.navigate(AppFlowRouteName.CartScreen) }}>
                            <Image source={CommonImage.ShoppingBag} style={{ width: 30, height: 30 }} resizeMethod='scale' resizeMode='contain' />
                        </TouchableOpacity>)
                    }
                }}
                hasSafeArea
                headerStyle={{ paddingHorizontal: 15 }}
                refreshControl={<RefreshControl tintColor='black' refreshing={false} onRefresh={() => { }} />}
            >
                <SafeAreaView style={{ ...styles.scrollView, backgroundColor: 'transparent' }}>
                    <View style={{ backgroundColor: Color.White, paddingHorizontal: 15, paddingTop: 15, marginTop: 15, paddingBottom: 5, width: '100%', borderRadius: 8 }} >
                        {this.renderHeader()}
                        {!!token && <>
                            <Divider style={{ backgroundColor: Color.BorderGray, marginVertical: 2 }} />
                            {this.renderRow(CommonImage.User, 'profile', this.moveToProfile)}
                        </>}
                    </View>
                    {!!token && <>
                        <View style={{ backgroundColor: Color.White, marginTop: 15, paddingHorizontal: 15, paddingVertical: 5, width: '100%', borderRadius: 8 }} >
                            {this.renderRow(CommonImage.Star, 'saved', () => { this.props.navigation.navigate(AppFlowRouteName.SavedCouponScreen) })}
                            <Divider style={{ backgroundColor: Color.BorderGray, marginVertical: 2 }} />
                            {this.renderRow(CommonImage.ColorBag, 'my_order', () => { this.props.navigation.navigate(AppFlowRouteName.MyOrderScreen) })}
                        </View>

                        <View style={{ backgroundColor: Color.White, marginTop: 15, paddingHorizontal: 15, paddingVertical: 5, width: '100%', borderRadius: 8 }} >
                            {this.renderRow(CommonImage.Wallet, 'wallet', () => { this.props.navigation.navigate(AppFlowRouteName.WalletScreen) })}
                        </View>
                    </>}
                    {/* <View style={{ backgroundColor: Color.White, marginTop: 15, paddingHorizontal: 15, paddingVertical: 5, width: '100%', borderRadius: 8 }} >
                        {this.renderRow(CommonImage.Setting, 'setting', () => { })}
                    </View> */}
                    {this.renderLanguage()}
                    <View style={{ backgroundColor: Color.White, marginTop: 15, paddingHorizontal: 15, paddingVertical: 5, width: '100%', borderRadius: 8 }} >
                        {this.renderRow(CommonImage.Term, 'term', () => { this.props.navigation.navigate(AppFlowRouteName.TermScreen) })}
                        <Divider style={{ backgroundColor: Color.BorderGray, marginVertical: 2 }} />
                        {this.renderRow(CommonImage.Hotline, 'customer_services', () => { this.props.navigation.navigate(AppFlowRouteName.CustomerServicesScreen) })}
                    </View>
                    {!!token && this.renderLogout()}
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
});

