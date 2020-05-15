

import React from 'react';
import {
    StyleSheet,
    View,
    Image as RNImage,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import { CouponByCateLogic } from './CouponByCate.logic';
import { CommonImage, FontSize, Device, Color, FontWithBold, InputIcon, TabsIcon } from '../../../assets';
import { CommonText, BGWithScroll, CommonFlatlist, LargeVoucher, CartItem, CommonBtn, CommonInput } from '../../../common';
import { LangugeType, Banner } from "../../../instances";
import { Divider } from 'react-native-elements';
import { AppFlowRouteName } from '../../../navigation';
import { isIPhoneX } from 'react-native-status-bar-height';
import Carousel from 'react-native-snap-carousel';
import { Image as ImageLib } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';

export class CouponByCate extends CouponByCateLogic {

    renderSearchBar = () => {
        let { route, } = this.props
        let params: any = route.params
        console.log('----', params);
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 10, marginTop: isIPhoneX() ? 0 : 10 }}>
                <View style={{ width: "10%", justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <RNImage source={CommonImage.ArrowLeft} style={{ width: 25, height: 25 }} resizeMethod='scale' resizeMode='contain' />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "75%" }}>
                    <CommonInput
                        containerStyle={{ backgroundColor: 'white', borderRadius: 8, height: 40, justifyContent: 'center' }}
                        inputContainerStyle={{ borderBottomWidth: 0, marginVertical: 0, }}
                        leftIconContainerStyle={{ marginRight: 10 }}
                        leftIcon={() => {
                            return (
                                <RNImage source={InputIcon.Search} />
                            )
                        }}
                        placeholder={params.link[params.link.length - 1]}
                    // multiLanguage
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

    renderLink = () => {
        let { route, } = this.props
        let params: any = route.params
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 20, flexWrap: 'wrap' }}>
                <RNImage source={TabsIcon.HomeInactive} style={{ height: 15, width: 15 }} resizeMethod='scale' resizeMode='contain' />
                <RNImage source={CommonImage.ArrowLeft} style={{ height: 10, width: 10, transform: [{ rotate: `180deg` }], marginHorizontal: 10 }} resizeMethod='scale' resizeMode='contain' />
                <CommonText text='Categories' />
                {params.link.map((props: string) => {
                    return (
                        <>
                            <RNImage source={CommonImage.ArrowLeft} style={{ height: 10, width: 10, transform: [{ rotate: `180deg` }], marginHorizontal: 10 }} resizeMethod='scale' resizeMode='contain' />
                            <CommonText text={props} />
                        </>
                    )
                })}
            </View>
        )
    }


    renderBanner = () => {
        return (
            <Carousel
                // ref={(ref: any) => this.carouselRef = ref}
                data={this.props.banner}
                removeClippedSubviews={false}
                enableSnap
                renderItem={(props: { item: Banner, index: number }) => {
                    return (
                        <ImageLib
                            key={props.item.id}
                            source={{ uri: props.item.image_path }}
                            style={{ width: '100%', height: 150 }}
                            containerStyle={{ borderRadius: 8, overflow: 'hidden' }}
                            placeholderStyle={{ borderRadius: 8 }}
                            resizeMode='cover' resizeMethod='scale' />
                    )
                }}
                sliderWidth={Device.width}
                itemWidth={Device.width - 34}
            />

        )
    }

    renderSubCategories = () => {
        let { categories } = this.props
        let { route, } = this.props
        let params: any = route.params
        return (
            <View style={{
                shadowColor: 'white', borderRadius: 16,
                paddingTop: 15, backgroundColor: 'white',
                width: "100%",
                justifyContent: 'center'
            }}>
                <CommonText
                    text='Sub-categories'
                    //@ts-ignore
                    style={{ marginLeft: 25, ...FontWithBold.Bold_600, marginVertical: 5, fontSize: FontSize.Title }} />
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
                    items={this.state.categories}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }} key={item.id}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.push(AppFlowRouteName.CouponByCateScreen, { cateID: item.id, link: params.link.concat(item.name) })
                            }}
                                style={{ alignItems: 'center', height: 80, minWidth: 40, }}>
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

    render() {
        return (
            <BGWithScroll showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollView, }}
                // hasSafeArea
                isNormalView
            >
                {this.state.firstLoading || <>
                    {this.renderSearchBar()}
                    <View style={{ flex: 1 }}>
                        {this.renderLink()}
                        <CommonFlatlist
                            style={{ flex: 1 }}
                            onRefreshCustom={this.refresh}
                            ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
                            ListHeaderComponent={() => {
                                return (
                                    <>
                                        {this.renderBanner()}
                                        <View style={{ paddingHorizontal: 15, marginVertical: 15 }}>
                                            {this.state.categories.length > 0 && this.renderSubCategories()}
                                            <CommonText text={'deal_today'} multiLanguage
                                                //@ts-ignore
                                                style={{ marginTop: 20, paddingHorizontal: 5, fontSize: FontSize.Title, ...FontWithBold.Bold_600, }} />
                                        </View>
                                    </>
                                )
                            }}
                            onLoadmore={this.loadMore}
                            data={this.state.voucherList}
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

                        />
                    </View>
                </>}
            </BGWithScroll>
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

