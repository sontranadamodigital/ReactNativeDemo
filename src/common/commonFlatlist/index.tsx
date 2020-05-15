import React, { useState, LegacyRef } from 'react'
import { TextStyle, Platform, ViewStyle, View, FlatListProps as RNFlatlistProps, FlatList as RNFlatlist, RefreshControl, ActivityIndicator } from 'react-native'
import { debounce } from "lodash";
import { CommonText } from '../CommonText';
import { FontSize } from '../../assets';

export interface FlatlistProps extends RNFlatlistProps<any> {
    onRefreshCustom?: (callback: () => void) => void,
    onLoadmore?: (callback: () => void) => void,
    loadingColor?: string
}

export function CommonFlatlist(props: FlatlistProps) {
    const { onRefreshCustom, onLoadmore, loadingColor, ...rest } = props
    const [refreshing, setRefreshing] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    return (
        <RNFlatlist
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any, index) => item.id + " " + index}
            ListEmptyComponent={() => {
                return (
                    <View style={{ width: '100%', marginTop: 15 }}>
                        <CommonText multiLanguage style={{ width: '100%', textAlign: 'center', fontSize: FontSize.Normal }} text='data_empty' />
                    </View>
                )
            }}
            refreshControl={
                <RefreshControl
                    colors={[loadingColor || 'black']}
                    tintColor={loadingColor || 'black'}
                    refreshing={refreshing}
                    onRefresh={() => {
                        if (!!onRefreshCustom && !loadingMore && !refreshing) {
                            setRefreshing(true)
                            onRefreshCustom(() => {
                                setRefreshing(false)
                            })
                        }
                    }} />}
            onEndReached={debounce(() => {
                if (!!onLoadmore && !loadingMore && !refreshing) {
                    setLoadingMore(true)
                    onLoadmore(() => {
                        setLoadingMore(false)
                    })
                }
            }, 500)}
            data={props.data}
            ListFooterComponent={() => {
                return (
                    <>
                        {loadingMore ?
                            <View style={{ height: 20, width: "100%", marginTop: 15 }}>
                                <ActivityIndicator size='small' color={loadingColor || 'black'} />
                            </View>
                            : <View style={{ height: 20, width: "100%" }} />}
                    </>
                )
            }}
            {...rest}
        />
    )
}
