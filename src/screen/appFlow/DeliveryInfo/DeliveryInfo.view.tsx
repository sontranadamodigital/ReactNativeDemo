

import React from 'react';
import {
    StyleSheet,
    View,
    RefreshControl,
} from 'react-native';
import { DeliveryInfoLogic } from './DeliveryInfo.logic';
import { CommonImage, FontSize, Color } from '../../../assets';
import { BGWithScroll, CommonBtn, CommonInput } from '../../../common';
import { PhoneInput } from '../../../common/CommonInputWrapper';
import { Divider } from "react-native-elements";
import { isIPhoneX } from 'react-native-status-bar-height';

export class DeliveryInfo extends DeliveryInfoLogic {



    render() {

        return (
            <>

                <BGWithScroll showsVerticalScrollIndicator={false}
                    style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                    hasSafeArea
                    headerProps={{
                        leftIcon: CommonImage.ArrowLeft,
                        leftOnPress: this.props.navigation.goBack,
                        title: 'deliver_title',
                        rightComponent: () => {
                            return (
                                <View />
                            )
                        },
                        multiLanguage: true,
                    }}
                    headerStyle={{ paddingHorizontal: 15 }}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} tintColor={Color.Black} />}
                >
                    <View style={styles.content}>
                        <CommonInput
                            title='name'
                            titleStyle={{
                                color: Color.Silver,
                                fontWeight: '400',
                                fontSize: FontSize.SmallTitle,
                                margin: 0
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0, height: 25, minHeight: 25 }}
                            containerStyle={{ height: 35 }}
                            containerStyleWrapper={{ marginVertical: 5 }}
                            clearButtonMode='while-editing'
                            placeholderTextColor={Color.Silver}
                            placeholder='name_input' multiLanguage />
                        <Divider style={{ backgroundColor: Color.Silver, marginVertical: 2 }} />
                        <PhoneInput
                            title='phone_title'
                            titleStyle={{
                                color: Color.Silver,
                                fontWeight: '400',
                                fontSize: FontSize.SmallTitle,
                                margin: 0
                            }}
                            containerStyleWrapper={{ marginVertical: 5 }}
                            placeholderTextColor={Color.Silver}
                            countryCodeStyle={{ borderBottomColor: Color.Silver, borderBottomWidth: 0.4 }}
                            containerStyle={{ borderBottomColor: Color.Silver, borderBottomWidth: 0.4, height: 40 }}
                            inputContainerStyle={{ borderBottomWidth: 0, height: 30, minHeight: 30 }}
                            placeholder='phone_holder' multiLanguage
                        />
                        <CommonInput
                            title='city'
                            titleStyle={{
                                color: Color.Silver,
                                fontWeight: '400',
                                fontSize: FontSize.SmallTitle,
                                margin: 0
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0, height: 25, minHeight: 25 }}
                            containerStyle={{ height: 35 }}
                            containerStyleWrapper={{ marginVertical: 5 }}
                            clearButtonMode='while-editing'
                            placeholderTextColor={Color.Silver}
                            placeholder='city_input' multiLanguage />
                        <Divider style={{ backgroundColor: Color.Silver, marginVertical: 2 }} />
                        <CommonInput
                            title='district'
                            titleStyle={{
                                color: Color.Silver,
                                fontWeight: '400',
                                fontSize: FontSize.SmallTitle,
                                margin: 0
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0, height: 25, minHeight: 25 }}
                            containerStyle={{ height: 35 }}
                            containerStyleWrapper={{ marginVertical: 5 }}
                            clearButtonMode='while-editing'
                            placeholderTextColor={Color.Silver}
                            placeholder='district_input' multiLanguage />
                        <Divider style={{ backgroundColor: Color.Silver, marginVertical: 2 }} />
                        <CommonInput
                            title='address'
                            titleStyle={{
                                color: Color.Silver,
                                fontWeight: '400',
                                fontSize: FontSize.SmallTitle,
                                margin: 0
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0, height: 25, minHeight: 25 }}
                            containerStyle={{ height: 35 }}
                            containerStyleWrapper={{ marginVertical: 5 }}
                            clearButtonMode='while-editing'
                            placeholderTextColor={Color.Silver}
                            placeholder='address_line_1' multiLanguage />
                        <Divider style={{ backgroundColor: Color.Silver, marginVertical: 2 }} />
                        <CommonInput
                            title='address'
                            titleStyle={{
                                color: Color.Silver,
                                fontWeight: '400',
                                fontSize: FontSize.SmallTitle,
                                margin: 0
                            }}
                            inputContainerStyle={{ borderBottomWidth: 0, height: 25, minHeight: 25 }}
                            containerStyle={{ height: 35 }}
                            containerStyleWrapper={{ marginVertical: 5 }}
                            clearButtonMode='while-editing'
                            placeholderTextColor={Color.Silver}
                            placeholder='address_line_2' multiLanguage />
                    </View>
                    <View style={{ height: 100 }} />
                </BGWithScroll >
                <View style={{ ...styles.deliverBtn, bottom: isIPhoneX() ? 30 : 10 }}>
                    <CommonBtn
                        onPress={() => { }} title='deliver_btn'
                        titleStyle={{ fontSize: FontSize.SmallTitle }}
                        containerStyle={{}} multiLanguage
                    />
                </View>

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

