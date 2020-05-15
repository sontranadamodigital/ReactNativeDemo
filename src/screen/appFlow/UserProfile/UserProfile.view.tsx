

import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { UserProfileLogic } from './UserProfile.logic';
import { CommonImage, FontSize, Color } from '../../../assets';
import { CommonText, BGWithScroll, CommonInput } from '../../../common';
import { Image as ImageLib, ButtonGroup } from "react-native-elements";
import {
    Formik,
} from 'formik';

export class UserProfile extends UserProfileLogic {


    genderList = [
        { element: () => this.renderGender(1) },
        { element: () => this.renderGender(2) },
    ]


    renderGender = (gender: number) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={gender === this.state.gender ? CommonImage.CheckedBox : CommonImage.UnCheckBox} style={{ height: 15, width: 15 }} />
                <CommonText text={gender === 1 ? 'male' : 'female'} style={{ marginLeft: 5, fontSize: FontSize.SmallTitle }} multiLanguage />
            </View>
        )
    }

    render() {
        let params: any = this.props.route.params
        let leftComponent = !!params && params.required ? {
            leftComponent: () => <View />
        } : {
                leftIcon: CommonImage.ArrowLeft,
                leftOnPress: this.props.navigation.goBack,
            }
        let { full_name, email } = this.props.userInfo
        return (
            <Formik
                initialValues={{
                    name: full_name,
                    email: email,
                }}
                validationSchema={this.updateValidate}
                onSubmit={values => {
                    this.update(values)
                }}
            >
                {({ errors, setFieldValue, submitForm, values }) => (
                    <BGWithScroll showsVerticalScrollIndicator={false}
                        style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                        // hasSafeArea
                        headerProps={{
                            ...leftComponent,
                            title: 'user_profile_title',
                            rightComponent: () => {
                                return (
                                    <TouchableOpacity onPress={submitForm}>
                                        <CommonText text={'save'} style={{ fontSize: FontSize.Title }} multiLanguage />
                                    </TouchableOpacity>
                                )
                            },
                            multiLanguage: true,
                        }}
                        headerStyle={{ paddingHorizontal: 15 }}
                        refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} tintColor={Color.Black} />}
                    >

                        <View style={styles.content}>
                            <View style={{ alignItems: 'center', marginBottom: 25 }}>
                                <TouchableOpacity style={{ overflow: 'hidden' }} onPress={this.openImage}>
                                    <View style={{ height: 80, width: 80, borderRadius: 40, overflow: 'hidden' }}>
                                        <ImageLib
                                            //@ts-ignore
                                            source={(!!this.state.image && this.state.image.path) ? { uri: this.state.image.path } : CommonImage.DefaultAvatar}
                                            style={{ height: 80, width: 80, borderRadius: 40, overflow: 'hidden' }} resizeMethod='scale' resizeMode='cover' />
                                    </View>
                                    <CommonText text='change' multiLanguage style={{ color: Color.Red, textDecorationLine: 'underline', alignSelf: 'center', marginTop: 8 }} />
                                </TouchableOpacity>
                            </View>
                            <CommonInput
                                value={values.name + ""}
                                Err={errors.name}
                                errStyle={styles.errStyle}
                                onChangeText={(value) => {
                                    setFieldValue('name', value, false)
                                }}
                                maxLength={50}
                                containerStyleWrapper={{ marginBottom: 15 }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                clearButtonMode='while-editing'
                                placeholder='fullname' multiLanguage />
                            <CommonInput
                                value={values.email + ""}
                                Err={errors.email}
                                maxLength={50}
                                errStyle={styles.errStyle}
                                onChangeText={(value) => {
                                    setFieldValue('email', value, false)
                                }}
                                containerStyleWrapper={{ marginBottom: 15 }}
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                clearButtonMode='while-editing'
                                placeholder='email' multiLanguage />
                            <CommonInput
                                inputContainerStyle={{ borderBottomWidth: 0.5 }}
                                containerStyleWrapper={{ marginBottom: 15 }}
                                clearButtonMode='while-editing'
                                value={this.props.userInfo.phone_number}
                                disabled
                                placeholder='phone_title' multiLanguage />
                            <ButtonGroup
                                onPress={(val) => {
                                    this.setState({ gender: Number(val) + 1 })
                                }}
                                selectedButtonStyle={{ backgroundColor: 'transparent' }}
                                buttonStyle={{ alignItems: 'flex-start', borderWidth: 0, marginLeft: 0 }}
                                innerBorderStyle={{ width: 0 }}
                                lastBorderStyle={{ width: 0 }}
                                selectedIndex={this.state.gender}
                                buttons={this.genderList}
                                containerStyle={{ borderWidth: 0, alignItems: 'flex-start', marginLeft: 0 }}
                            />
                        </View>
                        <View style={{ height: 30 }} />
                    </BGWithScroll >
                )}
            </Formik>

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
        padding: 24, backgroundColor: 'white', borderRadius: 15, marginTop: 15, paddingBottom: 5
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
        bottom: -18,
    }
});

