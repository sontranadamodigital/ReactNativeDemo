

import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    SafeAreaView,
    Button,
    Animated,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { NotificationLogic } from './Notification.logic';
import { CommonImage, FontSize, InputIcon, Device, Color, ScreenType, FontWithBold } from '../../../assets';
import { CommonText, CommonInputWrapper, BGWithScroll, CommonBtn, Header, CommonInput, CommonFlatlist } from '../../../common';
import { I18n } from "../../../instances";
import { PhoneInput } from '../../../common/CommonInputWrapper';
import { AppFlowRouteName } from '../../../navigation';
import { Image as ImageLib, Divider, ButtonGroup, CheckBox } from "react-native-elements";
import { isIPhoneX } from 'react-native-status-bar-height';

export class Notification extends NotificationLogic {


    renderItem = (props: { item: any, index: number }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Color.White, paddingHorizontal: 15 }}>
                {/* <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Color.White, }}> */}
                <View style={{ width: '20%' }}>
                    <Image source={CommonImage.Dish2} style={{ width: '100%', height: 50, borderRadius: 3, overflow: 'hidden', marginTop: 5 }} resizeMode='cover' resizeMethod='scale' />
                </View>
                <View style={{ width: '75%', paddingHorizontal: 5 }}>
                    <CommonText numberOfLines={2} text="50% OFF FOOD COUPON COLLECTIONS" style={{ fontSize: FontSize.SmallTitle, ...FontWithBold.Bold_600 }} />
                    <CommonText text={`Enjoy 50% off all items in this collection with "Half Off" code. FREE SHIPPING on orders over $50 and just $6 to ship everything else!`}
                        style={{ color: Color.Black, marginVertical: 5 }} />
                    <CommonText numberOfLines={1} text="04/20/2020" style={{ color: Color.Grey, fontSize: FontSize.Small, }} />
                </View>
                <View style={{ width: '2%', alignItems: 'flex-end' }}>
                    {props.index < 3 && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: Color.Red, marginTop: 5 }} />}
                </View>
                {/* </TouchableOpacity> */}
            </View>
        )
    }

    renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: Color.White, padding: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, marginTop: 15 }}>
                <View style={{ width: '50%' }}>
                    <CommonText numberOfLines={1} text="newest" multiLanguage style={{ color: Color.DarkGray, ...FontWithBold.Bold_600 }} />
                </View>
                <View style={{ width: '50%', alignItems: 'flex-end' }}>
                    <CommonText numberOfLines={1} text="mark_read" multiLanguage onPress={() => { }} style={{ color: Color.Red, ...FontWithBold.Bold_600 }} />
                </View>
            </View>
        )
    }

    renderFooter = () => {
        return (
            <View style={{ marginBottom: 30 }}>
                <View style={{ width: "100%", height: 15, backgroundColor: Color.White, borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }} />
                {this.state.isLoadMore && <ActivityIndicator color={Color.Black} size='small' style={{ marginTop: 15 }} />}
            </View>
        )
    }

    render() {

        return (
            <>

                <BGWithScroll showsVerticalScrollIndicator={false}
                    style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                    headerProps={{
                        leftTitle: 'notification_title',
                        multiLanguage: true,
                        rightComponent: () => {
                            return (<TouchableOpacity onPress={() => { this.props.navigation.navigate(AppFlowRouteName.CartScreen) }}>
                                <Image source={CommonImage.ShoppingBag} style={{ width: 30, height: 30 }} resizeMethod='scale' resizeMode='contain' />
                            </TouchableOpacity>)
                        }
                    }}
                    hasSafeArea
                    isNormalView
                    headerStyle={{ paddingHorizontal: 15 }}
                    refreshControl={<RefreshControl tintColor='black' refreshing={false} onRefresh={() => { }} />}
                >
                    <FlatList
                        keyExtractor={(item, index) => index + ""}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1, }}
                        refreshing={this.state.refreshing}
                        onRefresh={this.refresh}
                        ItemSeparatorComponent={() => <View style={{ height: 25, backgroundColor: Color.White, paddingHorizontal: 15 }} >
                            <Divider style={{ backgroundColor: Color.BlurBorder, marginVertical: 10 }} />
                        </View>}
                        onEndReached={this.loadmore}
                        data={[1, 2, 3, 4, 5, 6]}
                        renderItem={this.renderItem}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ width: '100%', marginTop: 15, alignItems: 'center', paddingVertical: 30 }}>
                                    <CommonText multiLanguage style={{ width: '100%', textAlign: 'center', fontSize: FontSize.Title, ...FontWithBold.Bold_600 }} text='no_older_notification' />
                                </View>
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

