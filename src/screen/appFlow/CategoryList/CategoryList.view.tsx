

import React from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image as RNImage,
    Animated
} from 'react-native';
import { CategoryListLogic } from './CategoryList.logic';
import { CommonImage, FontSize, Device, Color, InputIcon } from '../../../assets';
import { CommonText, BGWithScroll, CommonFlatlist, LargeVoucher, CommonInput } from '../../../common';
import { LangugeType, Category } from "../../../instances";
import { Divider } from 'react-native-elements';
import { AppFlowRouteName } from '../../../navigation';
import { isIPhoneX } from 'react-native-status-bar-height';
import { CategoryItem } from './CategoryItem';

export class CategoryList extends CategoryListLogic {

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
                        placeholder='search_holder'
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

    renderCategoryItem = (props: { item: Category, index: number }) => {
        let { index, item } = props
        let { selectedMainCate } = this.state
        return (
            <CategoryItem onPress={this.showDetail(item)} item={item} selectedCate={selectedMainCate} />
        )
    }

    renderSubItem = (props: { item: Category, index: number }) => {
        let { index, item } = props
        let chosenItem = this.state.selectedMainCate !== -1 ? this.props.categories.find((item => item.id === this.state.selectedMainCate)) : null
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.navigation.navigate(AppFlowRouteName.CouponByCateScreen, { cateID: item.id, link: [!!chosenItem ? chosenItem.name : '', item.name] })
            }}>
                <View style={{ flexDirection: "row", paddingVertical: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: "20%", justifyContent: 'center', }}>
                        <RNImage source={{ uri: item.icon_path }} style={{ width: 30, height: 30, alignSelf: 'center' }} resizeMethod='scale' resizeMode='contain' />
                    </View>
                    <View style={{ width: '76%', }}>
                        <CommonText
                            text={item.name}
                            style={{
                                fontSize: FontSize.Normal
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderSubCategory = () => {
        let chosenItem = this.state.selectedMainCate !== -1 ? this.props.categories.find((item => item.id === this.state.selectedMainCate)) : null
        let { categories } = this.props
        return (
            <Animated.View style={{
                width: Device.width - 140, height: '98%',
                backgroundColor: Color.BlurGrey, borderRadius: 12,
                position: 'absolute', zIndex: 10, top: 0, right: 0,
                paddingHorizontal: 15,
                transform: [{ translateX: this.state.positionRightSubCate }, { translateY: 0 }]
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: Color.BlurBorder, borderBottomWidth: 0.5 }}>
                    <View style={{ width: '75%' }}>
                        <CommonText text={!!chosenItem ? chosenItem.name : ''} style={{ marginTop: 20, marginBottom: 5, fontSize: FontSize.Title, fontWeight: '600' }} />
                    </View>
                    <View style={{ width: '25%', alignItems: 'flex-end' }}>
                        <CommonText text={'view_all'} multiLanguage onPress={() => {
                            this.props.navigation.navigate(AppFlowRouteName.CouponByCateScreen, { cateID: !!chosenItem ? chosenItem.id : -1, link: [!!chosenItem ? chosenItem.name : ''] })
                        }} style={{ marginTop: 20, marginBottom: 5, fontSize: FontSize.Normal, fontWeight: '600', color: Color.Red }} />
                    </View>
                </View>
                <CommonFlatlist
                    style={{ flex: 1 }}
                    onRefreshCustom={this.refresh}
                    onLoadmore={this.loadMore}
                    //@ts-ignore
                    data={!!chosenItem ? chosenItem.sub_categories : []}
                    renderItem={this.renderSubItem}
                />
            </Animated.View>
        )
    }

    render() {
        let { categories } = this.props
        return (
            <BGWithScroll showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollView, }}
                hasSafeArea
                isNormalView
            >
                {this.renderSearchBar()}
                <View style={styles.content}>
                    <CommonText text={'categories'} multiLanguage style={{ marginTop: 20, marginBottom: 5, fontSize: FontSize.LargeTitle, fontWeight: '600' }} />
                    <View style={{ flex: 1 }}>
                        {this.renderSubCategory()}
                        <CommonFlatlist
                            style={{ flex: 1 }}
                            onRefreshCustom={this.refresh}
                            // ListHeaderComponent={() => {
                            //     return (
                            // )
                            // }}
                            onLoadmore={this.loadMore}
                            data={categories}
                            renderItem={this.renderCategoryItem}
                        />
                    </View>
                </View>
            </BGWithScroll>
        );
    }
}

const Image =
{
    id: 1,
    coupon_id: 1,
    title: null,
    image_path: "http://snapad-api.adamo.tech/uploads/api/1588736332_IMG_0008.JPG",
}
const TestData = [
    {
        id: 1,
        title: "501% OFF for Italian Shrimp Pasta",
        product_id: 1,
        merchant_id: 2,
        merchant_name: "Shop 1",
        image_path: "http://snapad-api.adamo.tech/uploads/api/1588736332_IMG_0008.JPG",
        sales: 0,
        cp_price: 1,
        category: "Food",
        category_id: 1,
        cp_sale_price: 1,
        discount_type: 0,
        description: `Japanese eating"(or kappō(ja: 割烹)), is based on rice with miso soup and other dishes; there is an emphasis on seasonal ingredients.Side dishes often consist of fish, pickled vegetables, and vegetables cooked in broth..`,
        quantity: 1,
        coupon_code: "111",
        is_hot_deal: 1,
        language: "en",
        medias: [{ ...Image, id: 1 }, { ...Image, id: 2 }, { ...Image, id: 3 }],
        discount_amount: 1,
        is_saved: true
    },
    {
        id: 2,
        title: "503% OFF for Italian Shrimp Pasta",
        product_id: 1,
        merchant_id: 2,
        merchant_name: "Shop 1",
        image_path: "http://snapad-api.adamo.tech/uploads/api/1588736332_IMG_0008.JPG",
        sales: 0,
        cp_price: 1,
        category: "Food",
        category_id: 1,
        cp_sale_price: 1,
        discount_type: 0,
        description: `Japanese eating"(or kappō(ja: 割烹)), is based on rice with miso soup and other dishes; there is an emphasis on seasonal ingredients.Side dishes often consist of fish, pickled vegetables, and vegetables cooked in broth..`,
        quantity: 1,
        coupon_code: "111",
        is_hot_deal: 1,
        language: "en",
        medias: [{ ...Image, id: 1 }, { ...Image, id: 2 }, { ...Image, id: 3 }],
        discount_amount: 1,
        is_saved: true
    },
    {
        id: 3,
        title: "50% OFF for Italian Shrimp Pasta",
        product_id: 1,
        merchant_id: 2,
        merchant_name: "Shop 1",
        image_path: "http://snapad-api.adamo.tech/uploads/api/1588736332_IMG_0008.JPG",
        sales: 0,
        cp_price: 1,
        category: "Food",
        category_id: 1,
        cp_sale_price: 1,
        discount_type: 0,
        description: `Japanese eating"(or kappō(ja: 割烹)), is based on rice with miso soup and other dishes; there is an emphasis on seasonal ingredients.Side dishes often consist of fish, pickled vegetables, and vegetables cooked in broth..`,
        quantity: 1,
        coupon_code: "111",
        is_hot_deal: 1,
        language: "en",
        medias: [{ ...Image, id: 1 }, { ...Image, id: 2 }, { ...Image, id: 3 }],
        discount_amount: 1,
        is_saved: true
    },
]

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
        position: 'relative',
        marginHorizontal: 20, borderRadius: 15, marginTop: 10,
        paddingHorizontal: 20, backgroundColor: 'white',
        flex: 1, marginBottom: 15
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

