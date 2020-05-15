import PushNotification, { PushNotification as NotificationObject } from 'react-native-push-notification'
import AsyncStorage from '@react-native-community/async-storage'
import { Alert, Platform } from 'react-native';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import fbMessages from "@react-native-firebase/messaging";
import firebase from "@react-native-firebase/app";
import { store } from '../redux';
import { AppServices } from '../services';
import { AuthenActionImp } from '../redux/user';
import { StackNavigationProp } from '@react-navigation/stack';
import { Device, Color, FontWithBold } from '../assets';
import { showMessage } from 'react-native-flash-message';

class AppPushNotification {

    canShowChatMessage = true

    badgeCount: number = 0;
    navigation: StackNavigationProp<any> | undefined
    routers: any
    handlePopup: any
    apnToken: string = ''
    fcmToken: string = ''
    // messageListener

    init = (delegate: any) => {
        console.log('Init notification');
        this.navigation = delegate.navigation
        this.routers = delegate.routers
        this.handlePopup = delegate.handlePopup
        console.log("-----Platform.OS", Platform.OS);
        console.log("-----Platform.Platform.Version", Platform.Version);
        this.configurePushNotification();
        this.updateDeviceToken();
        fbMessages().onTokenRefresh(token => {
            console.log('-----token11', token);
            this.fcmToken = token;
            this.updateDeviceToken();
        })
        PushNotificationIOS.requestPermissions(['alert', 'badge', 'sound']);
        PushNotificationIOS.addEventListener('register', (x: any) => {
            console.log('----------eeeeeeeeee', x)
        })
        fbMessages().hasPermission().then(enabled => {
            if (enabled) {
                console.log("----------enabled", enabled)
                // this.messageListener = fbMessages().onMessage((message: any) => {
                //     console.log('message-------', message)
                //     // Process your message as required
                // });
            } else {
                fbMessages().requestPermission()
                    .then(() => {
                        console.log("----------requested")


                        // this.messageListener = fbMessages().onMessage((message: any) => {
                        //     console.log('message-------', message)
                        //     // Process your message as required
                        // });
                    })
                    .catch(error => {
                        console.log("----------requested error", error)
                        // User has rejected permissions  
                    });
                console.log("---------not---enabled", enabled)
                // user doesn't have permission
            }
        });


    }

    updateDeviceToken = async () => {
        const token = await this.getFcmToken()
        console.log('-----token', token);
        if (!token) return
        this.fcmToken = token;
        store.dispatch(AuthenActionImp.refreshFireBaseToken({
            "token": token,
            "type": Platform.OS === 'ios' ? 0 : 1,
            "os_version": Platform.Version,
            "app_version": "1.0.1",
            "os_name": Platform.OS,
            "api_version": 1,
            "locale": store.getState().user.language,
            "user_type": "0"

        }))
    }

    getFcmToken = async () => {
        if (!!this.fcmToken) return Promise.resolve(this.fcmToken)
        const grant = await fbMessages().hasPermission()
        if (!grant) {
            return Promise.reject()
        }
        return fbMessages().getToken().then(token => {
            this.fcmToken = token;
            return Promise.resolve(token);
        })

    }

    setBadgeCount = (count: number) => {
        console.log('count badge', count)
        this.badgeCount = count;
        PushNotification.setApplicationIconBadgeNumber(count)
    }

    getInitNoti = () => {
        PushNotification.popInitialNotification(notif => {
            console.log('init notif', notif)
            if (notif) {
                // this.handleUserInteractionNotification(notif)
            }
        })
    }

    configurePushNotification = () => {
        PushNotification.configure({
            onRegister: ({ token }) => {
                console.log('onRegister', token)
                this.updateDeviceToken()
                // this.fcmToken = token
            },
            onNotification: this.onNotification,
            senderID: "880064665252",
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }

    onNotification = (notification: NotificationObject) => {
        console.log('-----------NOTIFICATION:', notification);

        this.setBadgeCount(this.badgeCount + 1)

        const { userInteraction, foreground } = notification;
        const clicked = notification.userInteraction;

        if (clicked) {
            try {
                if (Device.isIos) {
                    //@ts-ignore
                    PushNotification.cancelLocalNotifications({ id: notification.data.id });
                } else {
                    //@ts-ignore
                    PushNotification.cancelLocalNotifications({ id: notification.id });
                }
            } catch (error) {

            }
            this.setBadgeCount(0)
        }

        if (foreground) {
            this.handleNotiOnForeground(notification)

        } else if (userInteraction) {
            this.handleUserInteractionNotification(notification)
        }
        notification.finish("UIBackgroundFetchResultNoData");
    }

    handleUserInteractionNotification = (notification: NotificationObject) => {

    }

    handleNotiOnForeground = (notification: NotificationObject) => {
        console.log("-----notification", notification)
        let params = JSON.parse(notification.data.param)
        showMessage({
            onPress: () => {
                console.log("-----notification.data.screen", notification.data.screen);
                console.log("-----notification.data.param.id", params.id);
                this.navigation?.navigate(notification.data.screen, { id: params.id })
            },
            type: "warning",
            // ,
            duration: 3000,
            message: notification.message.title,
            description: notification.message.body,
            //@ts-ignore
            titleStyle: {
                color: Color.Red,
                ...FontWithBold.Bold_600
            },
            textStyle: {
                color: Color.Black,
                fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Regular',
            }
        })
    }

}



export const AppNotification = new AppPushNotification()



