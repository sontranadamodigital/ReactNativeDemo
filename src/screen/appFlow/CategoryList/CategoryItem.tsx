import * as React from 'react'
import { View, Image as RNImage, TouchableWithoutFeedback, Animated } from 'react-native'
import { Color, CommonImage, FontSize } from '../../../assets'
import { useState, useEffect } from 'react'
import { CommonText } from '../../../common'
import { Category } from '../../../instances'

export interface CategoryItemProps {
    onPress?: () => void
    item: Category
    selectedCate: number
}

export function CategoryItem(props: CategoryItemProps) {
    const { onPress, item, selectedCate } = props
    let [opacity, setOpacity] = useState(new Animated.Value(0))
    let [opacityName, setopacityName] = useState(new Animated.Value(1))
    useEffect(() => {
        if (props.selectedCate === item.id) {
            Animated.timing(
                opacity,
                {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }
            ).start()
        }
        else {
            Animated.timing(
                opacity,
                {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }
            ).start()
        }
        if (props.selectedCate !== -1) {
            Animated.timing(
                opacityName,
                {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }
            ).start()
        }
        else {
            Animated.timing(
                opacityName,
                {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }
            ).start()
        }
    }, [props.selectedCate])
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ flexDirection: "row", paddingVertical: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: "20%", justifyContent: 'center', }}>
                    <Animated.View style={{ width: 50, height: 50, backgroundColor: Color.BlurSilver, borderRadius: 8, overflow: 'hidden', alignSelf: 'center', position: 'absolute', opacity: opacity }} />
                    <RNImage source={{ uri: item.icon_path }} style={{ width: 40, height: 40, alignSelf: 'center' }} resizeMethod='scale' resizeMode='contain' />
                </View>
                <Animated.View style={{
                    width: '76%',
                    opacity: opacityName,
                }}>
                    <CommonText
                        text={item.name}
                        style={{
                            fontSize: FontSize.Title
                        }}
                    />
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}
