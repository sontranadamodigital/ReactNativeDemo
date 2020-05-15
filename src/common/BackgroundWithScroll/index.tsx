import * as React from 'react'
import { ScrollViewProps, View, Image, KeyboardAvoidingView, StatusBar, ViewStyle, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Device, CommonImage, Color } from '../../assets'
import LinearGradient from 'react-native-linear-gradient';
import { HeaderProps, Header } from '../Header'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ReduxState } from '../../redux';
import { connect } from 'react-redux';
export interface BGWithScrollProps extends ScrollViewProps {
    children?: React.ReactNode,
    hasBack?: boolean,
    onBack?: () => void,
    disableScroll?: boolean,
    headerProps?: HeaderProps,
    headerStyle?: ViewStyle,
    backgroundColor?: Array<string>,
    hasSafeArea?: boolean,
    isNormalView?: boolean,
    bottomComponent?: () => void,
}

export function BGWithScroll(props: BGWithScrollProps) {

    const { children, hasBack = false, bottomComponent, hasSafeArea, onBack, isNormalView, disableScroll, backgroundColor, headerStyle, headerProps, ...rest } = props
    let Wraper = !hasSafeArea ? View : SafeAreaView
    let Scroll = isNormalView ? View : ScrollView
    return (
        <KeyboardAvoidingView style={{ backgroundColor: 'transparent', flex: 1 }} behavior={Device.isIos ? "padding" : undefined} keyboardVerticalOffset={0}>
            <LinearGradient colors={backgroundColor || ['#FDCF2C', '#FDCF2C', '#FDCF2C', '#efefef', '#efefef', '#efefef', '#efefef']} style={{ flex: 1 }}>
                <StatusBar barStyle='dark-content' backgroundColor={Device.isIos ? 'transparent' : "#FDCF2C"} />
                <Wraper style={{ backgroundColor: 'transparent', flex: 1 }}>
                    <View style={{ paddingTop: hasSafeArea ? 0 : (Device.isIos ? getStatusBarHeight() : 0) }} />
                    {headerProps &&
                        <View style={{ width: '100%', height: 50, ...headerStyle }}>
                            <Header {...headerProps} headerStyle={headerStyle} />
                        </View>
                    }
                    <Scroll {...rest} style={[props.style, { backgroundColor: 'transparent', flex: 1 }]}>
                        {hasBack &&
                            <View style={{ marginTop: Device.isIos ? 50 : 20, width: 15 }}>
                                <TouchableOpacity onPress={onBack} >
                                    <Image source={CommonImage.Delete} style={{ width: 15 }} resizeMethod="scale" resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                        }
                        {children}
                    </Scroll>
                    {!!bottomComponent && bottomComponent()}
                </Wraper>
            </LinearGradient>
        </KeyboardAvoidingView >
    )

}
