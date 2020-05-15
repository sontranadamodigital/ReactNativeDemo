

import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    RefreshControl,
} from 'react-native';
import { WalletLogic } from './Wallet.logic';
import { CommonImage, FontSize, Device, Color, FontWithBold } from '../../../assets';
import { CommonText, BGWithScroll, CommonFlatlist, CouponItem } from '../../../common';
import { I18n } from "../../../instances";
import { AppFlowRouteName } from '../../../navigation';

export class Wallet extends WalletLogic {



    render() {
        let param: any = this.props.route.params
        let title = !!param && !!param.orderCode ? (I18n.trans('order_id') + " " + param.orderCode) : I18n.trans('wallet')
        return (
            <>

                <BGWithScroll showsVerticalScrollIndicator={false}
                    style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                    // hasSafeArea
                    isNormalView
                    headerProps={{
                        leftIcon: CommonImage.ArrowLeft,
                        leftOnPress: this.props.navigation.goBack,
                        title: title,
                        rightComponent: () => {
                            return (
                                <View />
                            )
                        },
                        // multiLanguage: true,
                    }}
                    headerStyle={{ paddingHorizontal: 15 }}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} tintColor={Color.Black} />}
                >
                    <CommonFlatlist
                        style={{ flex: 1 }}
                        onRefreshCustom={this.refresh}
                        ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
                        onLoadmore={this.loadmore}
                        data={this.state.wallet}
                        renderItem={({ item }) => <CouponItem item={item} onPress={() => {
                            this.props.navigation.push(AppFlowRouteName.CouponDetailScreen, { id: item.id })
                        }} />}
                        ListHeaderComponent={() => <View style={{ marginTop: 15 }} />}
                        ListEmptyComponent={() => {
                            return (
                                <>
                                    {this.state.firstLoading || <View style={{ width: '100%', marginTop: 15, borderRadius: 8, backgroundColor: Color.White, alignItems: 'center', paddingVertical: 30 }}>
                                        <Image source={CommonImage.EmptyIcon} />
                                        <CommonText multiLanguage
                                            style={{ width: '100%', textAlign: 'center', fontSize: FontSize.BigTitle, ...FontWithBold.Bold_600 }} text='no_coupon_found' />
                                        <CommonText multiLanguage
                                            onPress={() => { this.props.navigation.navigate(AppFlowRouteName.HomeScreen) }}
                                            containerStyle={{ width: Device.width - 88, backgroundColor: Color.Orange, marginHorizontal: 20, borderRadius: 5, marginTop: 20, paddingVertical: 8 }}
                                            style={{ width: '100%', textAlign: 'center', fontSize: FontSize.BigTitle, color: Color.White }} text='continue_shopping' />
                                    </View>}
                                </>
                            )
                        }}

                    />
                </BGWithScroll >

            </>
        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
        flex: 1,
        height: '100%'
    },
    bigTitle: {
        fontSize: FontSize.Giant,
        fontWeight: '600'
    },
    content: {
        paddingHorizontal: 24, backgroundColor: 'white', borderRadius: 15, marginTop: 15, paddingBottom: 5, paddingTop: 10
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
    },
    deliverBtn: {
        position: 'absolute', bottom: 30,
        marginTop: 30, height: 'auto',
        paddingVertical: 15,
        width: '100%', paddingHorizontal: 24
    }
});

