import React from 'react'
import { ViewProps, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export interface Loading extends ViewProps {
    isLoading: boolean,
    color?: string,
    mini?: boolean,
    borderRadius?: number
}

export const Loading: React.FC<Loading> = (props) => {
    let { isLoading, color, mini = false, borderRadius = 0 } = props
    if (isLoading) {
        return (
            <View style={[styles.container, { borderRadius: borderRadius }]}>
                <View style={[styles.background, mini ? { backgroundColor: 'transparent' } : {}]}>
                    <ActivityIndicator color={mini ? '#fff' : color} />
                </View>
            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(51,51,51,0.3)",
        zIndex: 99,
    },
    background: {
        height: 60,
        width: 60,
        borderRadius: 3,
        backgroundColor: 'rgba(214, 214, 229, 0.87)',
        justifyContent: "center",
        alignItems: 'center',
        zIndex: 99
    }
})