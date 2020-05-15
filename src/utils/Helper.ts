
import ImagePickerLib from 'react-native-image-crop-picker';
import { Alert, PermissionsAndroid } from 'react-native';
import { Device } from '../assets';

export function requestCameraPermission(callback: (image: any) => void) {
    if (Device.isIos) {
        openFullPicker(callback);
        return;
    }
    try {
        PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]).then((result) => {
            if (result['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
                && result['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                openFullPicker(callback);
            }
        })
    } catch (err) {

    }
}


function openFullPicker(callback: (image: any) => void) {
    Alert.alert(
        "Please choose a photo from:",
        "",
        [
            {
                text: "Camera",
                onPress: () => {
                    ImagePickerLib.openCamera({
                        cropping: false,
                        forceJpg: true,
                    }).then((image: any) => {
                        callback && callback(image);
                    });
                }
            },
            {
                text: "Gallery",
                onPress: () => {
                    ImagePickerLib.openPicker({
                        // width: 300,
                        // height: 400,
                        cropping: false,
                        forceJpg: true
                    }).then((image: any) => {
                        callback && callback(image);
                    });
                }
            }
        ]
    )
}