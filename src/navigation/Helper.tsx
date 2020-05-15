
import React from 'react'
import { Image, View, ImageStyle } from "react-native"

export function getIconRoute(
    activeIcon: any,
    inactiveIcon: any,
    style?: ImageStyle
) {
    return ({ focused = false }) => {
        const icon = focused ? activeIcon : inactiveIcon
        return (
            <View style={{ marginTop: 15, overflow: 'visible' }}>
                <Image
                    source={icon}
                    style={{ overflow: 'visible', height: 20, width: 20, ...style }}
                    progressiveRenderingEnabled={true}
                    resizeMode='contain'
                    resizeMethod='scale'

                />
            </View>
        )
    }
}

