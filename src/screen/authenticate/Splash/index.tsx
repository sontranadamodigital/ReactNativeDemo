

import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import { Color, Device, CommonImage } from '../../../assets';
import { ReduxState } from '../../../redux';
import { connect } from 'react-redux';
import { CommonText } from '../../../common';
import DeviceInfo from 'react-native-device-info';
//@ts-ignore
import simpleStore from 'react-native-simple-store'
import { StorageConstant, RequestConfigProperties, SavedVoucher, CartItem } from '../../../instances';
import { AuthenActionImp } from '../../../redux/user';
import { LOGIN_ACTION } from '../../../redux/user/types';
import { AppServices } from '../../../services';
import { AppNotification } from '../../../instances/notification';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppFlowRouteName } from '../../../navigation';
type Props = {
    navigation: StackNavigationProp<any>
    changeSplash: (type: boolean) => void
    login: (body: any, callback: (isErr: any, res?: any) => void, config?: RequestConfigProperties) => void
    changeLanguage: (language: string) => void
    getResource: (page: number, callback: (isErr: any, res?: any) => void) => void
    getViewedVoucher: (body: any, callback?: (isErr: any, res?: any) => void) => void
    saveCart: (cart: Array<CartItem>, callback: () => void) => void
}
class Splash extends React.PureComponent<Props> {

    componentDidMount() {
        this.getRecentlyViewedVoucher();
    }
    coupons: Array<SavedVoucher> = []

    getRecentlyViewedVoucher = () => {
        simpleStore.get(StorageConstant.CART).then((cart: Array<CartItem>) => {
            this.props.saveCart(cart || [], () => { })
        });
        simpleStore.get(StorageConstant.RECENTLY_VIEWED_VOUCHER).then((coupons: Array<SavedVoucher>) => {
            if (!!coupons && coupons.length > 0) this.coupons = coupons
            this.getCommonResource();
        }).catch((err: any) => {
            console.log("-----err getRecentlyViewedVoucher", err)
            this.getCommonResource();
        })
    }

    getCommonResource = () => {
        this.props.getResource(1, (isErr: any, res?: any) => {
            this.checkLanguage();
        })
    }

    checkLanguage = () => {
        simpleStore.get(StorageConstant.LANGUAGE).then((lang: string) => {
            if (!!lang) this.props.changeLanguage(lang)
            this.checkAuthen();
        }).catch((err: any) => {
            console.log("-----err LANGUAGE", err)
            this.checkAuthen();
        })
    }

    checkAuthen = () => {
        simpleStore.get(StorageConstant.ACCOUNT).then((account: any) => {
            if (!account) {
                this.props.getViewedVoucher({ coupons: this.coupons }, () => {
                    this.props.changeSplash(false)
                })
                return;
            }
            this.props.login(account, (isErr: any, res: any) => {

                this.props.getViewedVoucher({ coupons: this.coupons }, () => {

                    AppNotification.init({
                        navigation: this.props.navigation,
                        routers: AppFlowRouteName,
                        handlePopup: () => { }
                    })
                    this.props.changeSplash(false)
                })
            }, { showMessage: false, showMessageError: false })
        }).catch((err: any) => {
            console.log("-----err checkAuthen", err)
            this.props.changeSplash(false)
        })
    }


    render() {
        return (
            <>
                <StatusBar barStyle='dark-content' backgroundColor={Device.isIos ? 'transparent' : Color.White} />
                <View style={styles.container}>
                    <Image source={CommonImage.Logo} style={styles.image} resizeMethod='scale' resizeMode='cover' />
                </View>
                <View style={styles.loading}>
                    <ActivityIndicator size='small' />
                    <CommonText style={{ marginTop: 15 }} text={`Version ${DeviceInfo.getVersion()}`} />
                </View>
            </>
        );
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
    }
}

const mapDispatchToProp = {
    changeSplash: AuthenActionImp.changeSplash,
    login: AuthenActionImp.login,
    saveCart: AuthenActionImp.saveCart,
    changeLanguage: (language: string) => {
        return (dispatch: any) => {
            dispatch({
                type: LOGIN_ACTION,
                payload: {
                    language,
                }
            })
        }
    },
    getResource: AuthenActionImp.getResource,
    getViewedVoucher: AuthenActionImp.getViewedVoucher
}

let SplashScreen = connect(mapStateToProps, mapDispatchToProp)(Splash)
export default SplashScreen

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.White, alignItems: 'center', justifyContent: 'center' },
    image: { width: Device.width * 0.7, height: Device.width * 0.2, marginBottom: 100 },
    loading: { position: 'absolute', bottom: 70, alignSelf: 'center' }
});

