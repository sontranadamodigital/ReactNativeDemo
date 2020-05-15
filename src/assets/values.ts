import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get('window');

export const Device = {
    width: width,
    height,
    isIos: Platform.OS === 'ios'
}

export const ScreenType = {
    Login: 1,
    Register: 2,
    ForgotPass: 3,
}


export interface ImagePropsCustom {
    // exif: any
    // localIdentifier: string
    filename?: string
    width?: number
    // modificationDate: any
    mime?: string
    path?: string
    size?: number
    type?: string
    name?: string // required for upload img
    uri?: string // required for upload img
    id?: number
    isFromServer?: boolean
    // cropRect: { y: number, width: number, height: number, x: number }
    // data: any
    sourceURL?: string
    height?: number
    // creationDate: string
}


