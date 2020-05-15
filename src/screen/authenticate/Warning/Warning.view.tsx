

import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    SafeAreaView,
} from 'react-native';
import { WarningLogic } from './Warning.logic';
import { CommonImage, FontSize, Device, Color } from '../../../assets';
import { CommonText, BGWithScroll, CommonBtn } from '../../../common';

export class Warning extends WarningLogic {



    render() {
        let { isSuccess } = this.state
        let params: any = this.props.route.params
        return (
            <BGWithScroll showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                backgroundColor={['#FDCF2C', '#FDCF2C']}
            >
                <SafeAreaView style={{ ...styles.scrollView, backgroundColor: 'transparent' }}>
                    <View style={styles.content}>
                        <Image source={isSuccess ? CommonImage.Success : CommonImage.Fail} style={{ width: 180, height: 130 }} resizeMethod='scale' resizeMode='center' />
                        <CommonText text={isSuccess ? "success" : "error"} multiLanguage style={styles.bigTitle} />
                        <CommonText text={this.state.mess} style={{ ...styles.title, color: isSuccess ? Color.Green : Color.Red }} />
                        <CommonBtn title={isSuccess ? 'confirm' : "try_again"}
                            containerStyle={{
                                ...styles.btn,
                                backgroundColor: isSuccess ? Color.Yellow : Color.Orange
                            }}
                            titleStyle={{ color: isSuccess ? Color.Black : Color.White }}
                            onPress={() => {
                                if (isSuccess) {
                                    !!params && !!params.nextOnpress && params.nextOnpress()
                                } else {
                                    this.props.navigation.goBack()
                                }
                            }} multiLanguage />
                    </View>
                </SafeAreaView>
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
        fontSize: FontSize.Giant,
        fontWeight: '500'
    },
    title: {
        fontSize: FontSize.Title,
        fontWeight: '500',
        marginVertical: 10
    },
    btn: {
        marginTop: 20, marginBottom: 20,
        width: Device.width - 24 * 4,

    },
    text: {
        fontSize: FontSize.SmallTitle,
        marginVertical: 10,
        color: Color.DarkGray,
        textAlign: 'center'
    },
    content: {
        padding: 24, backgroundColor: 'white', borderRadius: 15, marginTop: 50,
        width: '100%',
        alignItems: 'center'
    },
});

