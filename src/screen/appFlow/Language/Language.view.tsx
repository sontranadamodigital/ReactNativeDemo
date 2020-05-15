

import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { LanguageLogic } from './Language.logic';
import { CommonImage, FontSize, Device, Color } from '../../../assets';
import { CommonText, BGWithScroll } from '../../../common';
import { LangugeType } from "../../../instances";
import { Divider } from 'react-native-elements';

export class Language extends LanguageLogic {


    renderLanguage = (title: string, isChosen: boolean, onChosen: () => void, ) => {
        return (
            <TouchableOpacity onPress={onChosen}>
                <View style={{ flexDirection: "row", alignItems: 'center', paddingVertical: 18 }}>
                    <View style={{ width: '80%' }}>
                        <CommonText text={title} multiLanguage
                            style={{
                                fontSize: FontSize.Title
                            }}
                        />
                    </View>
                    <View style={{ width: '20%', alignItems: "flex-end", paddingRight: 2 }}>
                        {isChosen && <Image source={CommonImage.CheckCircle} style={{ width: 15, height: 15 }} resizeMethod='scale' resizeMode='contain' />}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <BGWithScroll showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                // hasSafeArea
                headerProps={{
                    leftIcon: CommonImage.ArrowLeft,
                    leftOnPress: this.props.navigation.goBack,
                    title: 'language',
                    rightComponent: () => {
                        return (
                            <TouchableOpacity onPress={this.chosenLang}>
                                <CommonText text={'save'} style={{ fontSize: FontSize.Title }} multiLanguage />
                            </ TouchableOpacity>
                        )
                    },
                    multiLanguage: true,
                }}
                headerStyle={{ paddingHorizontal: 15 }}
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} tintColor={Color.Black} />}
            >
                <View style={styles.content}>
                    {this.renderLanguage(
                        'language_english',
                        this.state.language === LangugeType.English,
                        () => { this.setState({ language: LangugeType.English }) }
                    )}
                    <Divider style={{ backgroundColor: Color.BorderGray, }} />
                    {this.renderLanguage(
                        'language_thai',
                        this.state.language === LangugeType.Thai,
                        () => { this.setState({ language: LangugeType.Thai }) }
                    )}
                    <Divider style={{ backgroundColor: Color.BorderGray, }} />
                </View>
                <View style={{ height: 100 }} />
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

