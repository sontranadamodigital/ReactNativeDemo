
import { RFPercentage } from "react-native-responsive-fontsize";
import { Device } from "./values";
import { StyleSheet } from "react-native";

const BASE_FONT_SIZE = 2
function ReduceTextFor18_9(number: number) {
    return Math.ceil(Device.width / Device.height * 100) === 52 ? number - 0.5 : number;
}

function calculateFontsize(current: number, max: number) {
    return current <= max ? current : max;
}

export const Spacing = {

}

export const FontWithBold = StyleSheet.create({
    Bold_600: {
        fontWeight: "600",
        fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Bold',
    },
    Bold_700: {
        fontWeight: "700",
        fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Bold',
    },
    Bold_800: {
        fontWeight: "800",
        fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Bold',
    },
    Bold_900: {
        fontWeight: "900",
        fontFamily: Device.isIos ? 'DM Sans' : 'DMSans-Bold',
    }
})

export const FontSize = {
    Small: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(-0.5)), 11),
    Normal: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0)), 13),
    SmallTitle: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0.25)), 15),
    Title: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0.5)), 17),
    InputTitle: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(0.75)), 19),
    BigTitle: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(1)), 21),
    LargeTitle: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(1.5)), 25),
    Large: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(2)), 27),
    Giant: calculateFontsize(RFPercentage(BASE_FONT_SIZE + ReduceTextFor18_9(2.5)), 32)
}