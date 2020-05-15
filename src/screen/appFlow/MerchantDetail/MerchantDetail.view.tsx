

import React from 'react';
import {
    StyleSheet,
    View,
    RefreshControl,
    Image,
    Text,
    Animated,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { MerchantDetailLogic } from './MerchantDetail.logic';
import { CommonImage, FontSize, Device, Color } from '../../../assets';
import { BGWithScroll, CommonText, CommonFlatlist, VoucherItem, MerchantInfo, CouponTerm, CommonBtn, LargeVoucher } from '../../../common';
import { I18n } from '../../../instances';
import { Divider } from 'react-native-elements';
import { AppFlowRouteName } from '../../../navigation';

export class MerchantDetail extends MerchantDetailLogic {

    renderRightHeader = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity style={{ marginRight: 5 }}>
                    <Image source={CommonImage.Share} style={{ height: 22, width: 22 }} resizeMethod="scale" resizeMode="contain" />
                </TouchableOpacity>
            </View>
        )
    }


    render() {
        let { loading, detailMerchant, firstLoading, paging } = this.state
        return (
            <>
                <BGWithScroll showsVerticalScrollIndicator={false}
                    style={{ ...styles.scrollView, }}
                    // hasSafeArea
                    headerProps={{
                        leftIcon: CommonImage.ArrowLeft,
                        leftOnPress: this.props.navigation.goBack,
                        multiLanguage: true,
                        rightComponent: this.renderRightHeader
                    }}
                    scrollEventThrottle={12}
                    onScroll={(value) => {
                        if (Number(value.nativeEvent.contentOffset.y) >= 575) {
                            Animated.timing(
                                this.state.opacity,
                                {
                                    toValue: 1,
                                    duration: 200,
                                    useNativeDriver: true,
                                }
                            ).start()
                        } else {
                            Animated.timing(
                                this.state.opacity,
                                {
                                    toValue: 0,
                                    duration: 200,
                                    useNativeDriver: true,
                                }
                            ).start()
                        }
                    }}
                    headerStyle={{ paddingHorizontal: 15 }}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={this.refresh} tintColor={Color.Black} />}
                >

                    {!firstLoading && <>
                        <CommonFlatlist
                            data={detailMerchant.merchantCoupons}
                            ListHeaderComponent={() => {
                                return (
                                    <>
                                        <MerchantInfo merchant={detailMerchant.merchant} containerStyle={{ marginHorizontal: 20, marginTop: 20, }} />
                                        <CommonText
                                            //@ts-ignore
                                            text={I18n.trans('deal_from') + ` ${detailMerchant.merchant.name.toUpperCase()}`} style={{
                                                paddingHorizontal: 20, marginTop: 20, marginBottom: 15,
                                                fontSize: FontSize.Title, fontWeight: '500'
                                            }} />
                                    </>
                                )
                            }}
                            ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
                            ListFooterComponent={() => {
                                if (paging.total >= 20 && paging.last_page > paging.current_page) return (
                                    <View style={{ width: '100%', paddingHorizontal: 20, marginVertical: 20 }}>
                                        <CommonBtn title={'loadmore'} multiLanguage
                                            onPress={this.loadmore}
                                            containerStyle={{
                                                marginVertical: 15, height: 'auto', paddingVertical: 12,
                                                borderRadius: 5, backgroundColor: 'transparent', borderColor: Color.Red, borderWidth: 1
                                            }}
                                            titleStyle={{ fontSize: FontSize.SmallTitle, color: Color.Red }} />
                                    </View>
                                )
                                else if (this.state.loadingMore) {
                                    return (<View style={{ paddingVertical: 8, alignItems: 'center' }} >
                                        <ActivityIndicator color={Color.Black} size='small' />
                                    </View>)
                                }
                                else return (<View style={{ height: 15 }} />)
                            }}
                            renderItem={({ item, index }) => <View style={{ paddingHorizontal: 20 }}>
                                <LargeVoucher item={item}
                                    onPressDetail={() => {
                                        this.props.navigation.push(AppFlowRouteName.DetailCouponScreen, { id: item.id })
                                    }}
                                    onBuy={() => {
                                        this.props.addToCart([{ id: item.id, quantity: 1 }], () => {
                                            this.props.navigation.navigate(AppFlowRouteName.CartScreen, { id: item.id })
                                        })
                                    }} />
                            </View>}
                        />
                        <View style={{ height: 15 }} />
                    </>}
                </BGWithScroll >
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
        backgroundColor: 'white', borderRadius: 15, marginTop: 30,
        // height: Device.height - 300,
        marginHorizontal: 24,
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

