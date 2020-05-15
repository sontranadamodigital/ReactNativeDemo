

import React from 'react';
import {
    StyleSheet,
    View,
    RefreshControl,
} from 'react-native';
import { TermLogic } from './Term.logic';
import { CommonImage, FontSize, Device, Color, FontWithBold } from '../../../assets';
import { CommonText, BGWithScroll } from '../../../common';
//@ts-ignore
import HTML from 'react-native-render-html';

export class Term extends TermLogic {



    render() {
        let { description, title } = this.props.term
        return (
            <BGWithScroll showsVerticalScrollIndicator={false}
                style={{ ...styles.scrollView, paddingHorizontal: 24 }}
                hasSafeArea
                headerProps={{
                    leftIcon: CommonImage.ArrowLeft,
                    leftOnPress: this.props.navigation.goBack,
                    title: 'term',
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
                    <CommonText text={title} style={{ ...FontWithBold.Bold_700, fontSize: FontSize.BigTitle }} numberOfLines={1} />
                    <HTML html={description} imagesMaxWidth={Device.width} containerStyle={{ marginBottom: 20 }} />
                </View>
            </BGWithScroll >
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
        paddingHorizontal: 15, backgroundColor: 'white', borderRadius: 15, marginTop: 15, paddingBottom: 5, paddingTop: 10, marginBottom: 25
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

