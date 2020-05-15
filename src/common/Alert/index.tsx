import React from 'react'
import { ViewProps, View, Text, StyleSheet, ActivityIndicator, Modal, Image } from 'react-native';
import { Color, CommonImage, FontSize, Device } from '../../assets';
import { CommonText } from '../CommonText';
import { CommonBtn } from '../CommonButton';

export interface AlertProps extends ViewProps {
    visible: boolean,
    onPress: () => void,
    icon: any,
    isSuccess: boolean,
    message: string,
    title: string,
}

export const Alert: React.FC<AlertProps> = (props) => {
    let { visible, onPress = () => { }, icon, isSuccess, message, title } = props
    return (
        <Modal animated transparent visible={visible}>
            <View style={{ backgroundColor: Color.Yellow, flex: 1, paddingHorizontal: 20, justifyContent: 'center' }}>
                <View style={{ padding: 20, backgroundColor: Color.White, borderRadius: 15, alignItems: 'center', alignSelf: 'center' }}>
                    <Image source={icon || CommonImage.Fail} style={{ width: 180, height: 130 }} resizeMethod='scale' resizeMode='center' />
                    <CommonText text={isSuccess ? "success" : "error"} multiLanguage style={styles.bigTitle} />
                    <CommonText text={title} style={{ ...styles.title, color: isSuccess ? Color.Green : Color.Red }} />
                    <CommonText text={message} style={{ ...styles.text }} />
                    <CommonBtn title={isSuccess ? 'confirm' : "try_again"}
                        containerStyle={{
                            ...styles.btn,
                            backgroundColor: isSuccess ? Color.Yellow : Color.Orange
                        }}
                        titleStyle={{ color: isSuccess ? Color.Black : Color.White }}
                        onPress={onPress} multiLanguage />

                </View>

            </View>
        </Modal>
    )
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
