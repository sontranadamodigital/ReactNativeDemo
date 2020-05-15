

import React from 'react';
import {
    StyleSheet,
    View,
    RefreshControl,
    Image,
} from 'react-native';
import { SavedCouponLogic } from './SavedCoupon.logic';
import { CommonImage, FontSize, Device, Color, FontWithBold } from '../../../assets';
import { CommonText, BGWithScroll, CommonFlatlist, LargeVoucher } from '../../../common';
import { AppFlowRouteName } from '../../../navigation';

export class SavedCoupon extends SavedCouponLogic {



    render() {
        return (
            <BGWithScroll showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                // hasSafeArea
                isNormalView
                headerProps={{
                    leftIcon: CommonImage.ArrowLeft,
                    leftOnPress: this.props.navigation.goBack,
                    title: 'savedCoupon',
                    multiLanguage: true,
                    rightComponent: () => { }
                }}
                headerStyle={{ paddingHorizontal: 15 }}
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} tintColor={Color.Black} />}
            >
                <CommonFlatlist

                    ListHeaderComponent={() => <View style={{ marginTop: 15 }} />}
                    style={{ flex: 1 }}
                    ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
                    onRefreshCustom={this.refresh}
                    onLoadmore={this.loadMore}
                    data={this.state.data}
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
                    renderItem={({ item }) =>
                        <LargeVoucher
                            item={item}
                            onDelete={() => {
                                this.removeCoupon(item.id)
                            }}

                            onPressDetail={() => {
                                this.props.navigation.navigate(AppFlowRouteName.DetailCouponScreen, { id: item.id })
                            }}
                            onBuy={() => {
                                this.props.addToCart([{ id: item.id, quantity: 1 }], () => {
                                    this.props.navigation.navigate(AppFlowRouteName.CartScreen, { id: item.id })
                                })
                            }} />
                    }
                />
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
        paddingHorizontal: 24, backgroundColor: 'white', borderRadius: 15, marginTop: 30,
        height: Device.height - 300
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
    errStyle: {
        position: 'absolute',
        bottom: -20,
    }
});

