

import React from 'react';
import {
    StyleSheet,
    View,
    RefreshControl,
    Image
} from 'react-native';
import { CartLogic } from './Cart.logic';
import { CommonImage, FontSize, Device, Color, FontWithBold } from '../../../assets';
import { CommonText, BGWithScroll, CommonFlatlist, LargeVoucher, CartItem, CommonBtn } from '../../../common';
import { LangugeType, CartDetailItem } from "../../../instances";
import { Divider } from 'react-native-elements';
import { AppFlowRouteName } from '../../../navigation';

export class Cart extends CartLogic {



    render() {

        return (
            <>
                <BGWithScroll showsVerticalScrollIndicator={false}
                    style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                    hasSafeArea
                    isNormalView
                    headerProps={{
                        leftIcon: CommonImage.Delete,
                        leftOnPress: this.props.navigation.goBack,
                        title: 'shopping_cart',
                        multiLanguage: true,
                        rightComponent: () => { }
                    }}
                    headerStyle={{ paddingHorizontal: 15 }}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} tintColor={Color.Black} />}
                >
                    <CommonFlatlist
                        style={{ flex: 1, }}
                        ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
                        onRefreshCustom={this.refresh}
                        onLoadmore={this.loadMore}
                        data={this.state.cart}
                        ListHeaderComponent={() => <View style={{ marginTop: 15}} />}
                        renderItem={({ item }) =>
                            <CartItem
                                item={item} onDelete={(id: number) => {
                                    this.setState({
                                        cart: this.state.cart.filter((i: CartDetailItem) => i.id !== id)
                                    })
                                    this.props.updateQuantOfCart({ id, quantity: 0 }, () => { })
                                }}
                                onUpdate={this.updateQuant}
                            />
                        }
                        ListEmptyComponent={() => {
                            return (
                                <>
                                    {this.state.firstLoading || <View style={{ width: '100%', marginTop: 15, borderRadius: 8, backgroundColor: Color.White, alignItems: 'center', paddingVertical: 30 }}>
                                        <Image source={CommonImage.EmptyIcon} />
                                        <CommonText multiLanguage
                                            style={{ width: '100%', textAlign: 'center', fontSize: FontSize.BigTitle, ...FontWithBold.Bold_600 }} text='no_coupon_found' />
                                    </View>}
                                </>
                            )
                        }}
                        ListFooterComponent={() => <View style={{ height: 200 }} />}
                    />
                </BGWithScroll >
                <View style={{ position: 'absolute', bottom: 0, width: Device.width, backgroundColor: Color.White, padding: 15 }}>
                    <View style={{ alignItems: 'baseline', flexDirection: 'row' }}>
                        <View style={{ width: '30%' }}>
                            <CommonText text='total' multiLanguage
                                //@ts-ignore
                                style={{
                                    ...FontWithBold.Bold_600,
                                    textAlignVertical: 'bottom',
                                    color: Color.DarkGray,
                                    fontSize: FontSize.BigTitle, marginRight: 5
                                }} />
                        </View>
                        <View style={{ width: '70%', alignItems: "flex-end" }}>

                            <CommonText text={`฿${this.calculateTotalMoney()}`}
                                //@ts-ignore
                                style={{
                                    ...FontWithBold.Bold_800,
                                    textAlignVertical: 'bottom',
                                    color: Color.Red,
                                    fontSize: FontSize.LargeTitle, marginRight: 5
                                }} />
                        </View>
                    </View>
                    <View style={{ paddingVertical: 15 }}>
                        <CommonBtn title={this.calculateTotalMoney() > 0 ? 'proceed_payment' : "continue_shopping"} multiLanguage
                            onPress={this.confirm}
                            containerStyle={{ height: 'auto', paddingVertical: 12, borderRadius: 5, paddingHorizontal: 12 }}
                            titleStyle={{ fontSize: FontSize.Title }} />
                    </View>
                </View>
            </>
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

