

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Yup from 'yup';
import { AppFlowRouteName } from '../../../navigation';
import { GlobalUIManager } from '../../../common';
//@ts-ignore
import simpleStore from 'react-native-simple-store'
import { StorageConstant, Category } from '../../../instances';
import { Animated } from 'react-native';

interface Props {
    navigation: StackNavigationProp<any>,
    categories: Array<Category>
}

interface State {
    selectedMainCate: number
    positionRightSubCate: Animated.Value
}

export class CategoryListLogic extends React.PureComponent<Props, State> {
    state = {
        selectedMainCate: -1,
        positionRightSubCate: new Animated.Value(900)
    }

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
    }

    refresh = (calback?: () => void) => {
        calback && calback()

    }


    loadMore = (calback?: () => void) => {
        calback && calback()
    }

    showDetail = (item: Category) => () => {
        let { positionRightSubCate, selectedMainCate } = this.state
        let { sub_categories } = item
        if (selectedMainCate !== item.id) {
            if (sub_categories.length < 1) {
                Animated.timing(
                    positionRightSubCate,
                    {
                        toValue: 900,
                        duration: 200,
                        useNativeDriver: true,
                    }
                ).start()
                this.setState({ selectedMainCate: -1 })
                this.props.navigation.navigate(AppFlowRouteName.CouponByCateScreen, { cateID: item.id, link: [item.name] })
                return
            }
            Animated.timing(
                positionRightSubCate,
                {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }
            ).start()
            this.setState({ selectedMainCate: item.id })
        } else {
            Animated.timing(
                positionRightSubCate,
                {
                    toValue: 900,
                    duration: 200,
                    useNativeDriver: true,
                }
            ).start()
            this.setState({ selectedMainCate: -1 })

        }
    }

    animatedSubCate = () => {

    }

}
