

import React from 'react';
import {
    StyleSheet,
    View,
    Image as RNImage,
    TouchableOpacity,
} from 'react-native';
import { HomeLogic } from './Home.logic';
import { CommonImage, FontSize, InputIcon, Device, Color, FontWithBold } from '../../../assets';
import { CommonText, BGWithScroll, CommonInput, VoucherItem, CommonFlatlist, LargeVoucher } from '../../../common';
import { Banner, Voucher } from "../../../instances";
import { Image } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import LinearGradient from 'react-native-linear-gradient';
import { isIPhoneX } from 'react-native-status-bar-height';
import Carousel from 'react-native-snap-carousel';
import { AppFlowRouteName } from '../../../navigation';

export class Home extends HomeLogic {

    renderSearchBar = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 10, marginTop: isIPhoneX() ? 0 : 10 }}>
                <View style={{ width: "85%" }}>
                    <CommonInput
                        containerStyle={{ backgroundColor: 'white', borderRadius: 8, height: 40, justifyContent: 'center' }}
                        inputContainerStyle={{ borderBottomWidth: 0, marginVertical: 0, }}
                        leftIconContainerStyle={{ marginRight: 10 }}
                        leftIcon={() => {
                            return (
                                <RNImage source={InputIcon.Search} />
                            )
                        }}
                        placeholder={'search_holder'}
                        multiLanguage
                    />
                </View>
                <View style={{ width: "10%", justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppFlowRouteName.CartScreen) }}>
                        <RNImage source={CommonImage.ShoppingBag} style={{ width: 30, height: 30 }} resizeMethod='scale' resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderCategories = () => {
        let { categories } = this.props
        return (
            <View style={{
                shadowColor: 'white', borderRadius: 16,
                paddingTop: 15, backgroundColor: 'white',
                width: "100%",
                justifyContent: 'center'
            }}>
                <FlatGrid
                    itemDimension={0.17 * Device.width}
                    style={{ margin: 0, padding: 0 }}
                    // spacing={10}
                    itemContainerStyle={{ margin: 0, padding: 0 }}
                    keyExtractor={(item: any) => item.id}
                    fixed
                    directionalLockEnabled
                    disableVirtualization
                    staticDimension={Device.width - 34}
                    items={categories}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }} key={item.id}>
                            <TouchableOpacity style={{ alignItems: 'center', height: 80, minWidth: 40, }} onPress={() => {
                                this.props.navigation.navigate(AppFlowRouteName.CouponByCateScreen, { cateID: item.id, link: [item.name] })
                            }}>
                                <RNImage source={{ uri: item.icon_path }} style={{ width: 40, height: 40, borderRadius: 10 }} resizeMethod='scale' resizeMode='cover' />
                                <CommonText text={item.name} numberOfLines={2} style={{
                                    marginTop: 5,
                                    fontSize: FontSize.Normal, textAlign: 'center'
                                }} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        )
    }

    renderHotDeal = () => {
        return (
            <LinearGradient
                colors={["#F77636", "#F14E34"]}
                style={{
                    backgroundColor: 'transparent',
                    width: "100%", paddingBottom: 30, marginTop: 15, paddingVertical: 12
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, marginLeft: 8, marginVertical: 4 }}>
                    <RNImage source={CommonImage.Flash} style={{ marginTop: 8, alignItems: 'center', alignSelf: 'center' }} resizeMethod='scale' resizeMode='contain' />
                    <CommonText text='hot_deal' multiLanguage
                        style={{
                            color: 'white', fontWeight: '600', fontFamily: "DMSans-Bold",
                            fontSize: FontSize.Title, fontStyle: 'italic',
                        }} />
                </View>
                <CommonFlatlist
                    style={{ width: '100%', marginTop: 10 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal
                    data={this.props.hotDeal}
                    renderItem={({ item }) => <VoucherItem oldPrice={800}
                        onPressDetail={() => {
                            this.props.navigation.navigate(AppFlowRouteName.DetailCouponScreen, { id: item.id })
                        }}
                        item={item} onBuy={() => {
                            this.props.addToCart([{ id: item.id, quantity: 1 }], () => {
                                this.props.navigation.navigate(AppFlowRouteName.CartScreen, { id: item.id })
                            })
                        }} containerStyle={{ width: 180, marginHorizontal: 5 }} />}
                    ListHeaderComponent={() => <View style={{ width: 16 }} />}
                    ListFooterComponent={() => <View style={{ width: 16 }} />}
                    //@ts-ignore
                    refreshControl={null}
                />
            </LinearGradient>
        )
    }

    renderListVoucherItem = (title: string, array: Array<Voucher>) => {
        return (
            <>
                <CommonText text={title} multiLanguage style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 15, fontSize: FontSize.Title, fontWeight: '500' }} />
                <CommonFlatlist
                    style={{ width: '100%' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal
                    data={array}
                    renderItem={({ item }) => <VoucherItem item={item} oldPrice={800} onPressDetail={() => {
                        this.props.navigation.navigate(AppFlowRouteName.DetailCouponScreen, { id: item.id })
                    }}
                        onBuy={() => {
                            this.props.addToCart([{ id: item.id, quantity: 1 }], () => {
                                this.props.navigation.navigate(AppFlowRouteName.CartScreen, { id: item.id })
                            })
                        }} containerStyle={{ width: 180, marginHorizontal: 5 }} />}
                    ListHeaderComponent={() => <View style={{ width: 18 }} />}
                    ListFooterComponent={() => <View style={{ width: 18 }} />}
                    //@ts-ignore
                    refreshControl={null}
                />
            </>
        )
    }


    _renderItem = (props: { item: Banner, index: number }) => {
        return (
            <Image
                key={props.item.id}
                source={{ uri: props.item.image_path }}
                style={{ width: '100%', height: 150 }}
                containerStyle={{ borderRadius: 8, marginVertical: 15, overflow: 'hidden' }}
                placeholderStyle={{ borderRadius: 8 }}
                resizeMode='cover' resizeMethod='scale' />
        );
    }


    render() {
        let { recentlyViewed, recommendVoucher } = this.props
        return (
            <BGWithScroll showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollView, }}
                hasSafeArea
                isNormalView
            >
                {this.renderSearchBar()}
                {!!this.props.categories && this.props.categories.length > 0 ? <CommonFlatlist
                    style={{ flex: 1 }}
                    ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
                    onRefreshCustom={this.refresh}
                    onLoadmore={this.loadMore}
                    ListHeaderComponent={() => {
                        return (
                            <>
                                <Carousel
                                    ref={(ref: any) => this.carouselRef = ref}
                                    data={this.props.banner}
                                    removeClippedSubviews={false}
                                    enableSnap
                                    renderItem={this._renderItem}
                                    sliderWidth={Device.width}
                                    itemWidth={Device.width - 34}
                                />
                                <View style={{ paddingHorizontal: 15, }}>
                                    {this.renderCategories()}
                                </View>
                                {this.renderHotDeal()}
                                {!!recommendVoucher && recommendVoucher.length > 0 && this.renderListVoucherItem('recommended_you', recommendVoucher)}
                                {!!recentlyViewed && recentlyViewed.length > 0 && this.renderListVoucherItem('recently_viewed', recentlyViewed)}
                                <CommonText text={'deal_today'} multiLanguage style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 15, fontSize: FontSize.Title, fontWeight: '500' }} />
                            </>
                        )
                    }}
                    data={this.props.todayDeal}
                    renderItem={({ item }) => <View style={{ paddingHorizontal: 20 }}>
                        <LargeVoucher item={item}
                            onPressDetail={() => {
                                this.props.navigation.navigate(AppFlowRouteName.DetailCouponScreen, { id: item.id })
                            }}
                            onBuy={() => {
                                this.props.addToCart([{ id: item.id, quantity: 1 }], () => {
                                    this.props.navigation.navigate(AppFlowRouteName.CartScreen, { id: item.id })
                                })
                            }} />
                    </View>}
                /> :
                    <View style={{ width: '100%', alignItems: 'center', paddingVertical: 30 }}>
                        <Image source={CommonImage.Fail} style={{ width: 150, height: 150 }} resizeMethod='scale' resizeMode='contain' />
                        <CommonText multiLanguage
                            //@ts-ignore
                            style={{ width: '100%', textAlign: 'center', fontSize: FontSize.BigTitle, ...FontWithBold.Bold_600 }} text='common_error' />
                        <CommonText multiLanguage
                            onPress={this.refresh}
                            containerStyle={{ width: Device.width - 88, backgroundColor: Color.Orange, marginHorizontal: 20, borderRadius: 5, marginTop: 20, paddingVertical: 8 }}
                            style={{ width: '100%', textAlign: 'center', fontSize: FontSize.BigTitle, color: Color.White }} text='try_again' />
                    </View>}

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

