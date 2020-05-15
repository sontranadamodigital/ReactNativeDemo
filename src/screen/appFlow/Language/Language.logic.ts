

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Yup from 'yup';
import { AppFlowRouteName } from '../../../navigation';
import { GlobalUIManager } from '../../../common';
//@ts-ignore
import simpleStore from 'react-native-simple-store'
import { StorageConstant, SavedVoucher } from '../../../instances';

interface Props {
    navigation: StackNavigationProp<any>
    language: string
    changeLanguage: (language: string) => void
    getResource: (page: number, callback: (isErr: any, res?: any) => void) => void
    getViewedVoucher: (body: any, callback?: (isErr: any, res?: any) => void) => void
}

interface State {
    language: string

}

export class LanguageLogic extends React.PureComponent<Props, State> {
    state = {
        language: this.props.language
    }

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
    }

    chosenLang = () => {
        GlobalUIManager.view.showLoading();
        setTimeout(() => {
            this.props.changeLanguage(this.state.language);
            simpleStore.save(StorageConstant.LANGUAGE, this.state.language);
            setTimeout(() => {
                simpleStore.get(StorageConstant.RECENTLY_VIEWED_VOUCHER).then((coupons: Array<SavedVoucher>) => {
                    if (!!coupons && coupons.length > 0) {
                        this.props.getViewedVoucher({
                            coupons
                        }, () => {
                            this.loadResouce();
                        })
                    } else this.loadResouce();
                }).catch((err: any) => {
                    console.log("-----err getRecentlyViewedVoucher", err)
                    this.loadResouce();
                })
            }, 200)
        }, 200)
    }

    loadResouce = () => {
        this.props.getResource(1, (isErr: any, res: any) => {
            GlobalUIManager.view.hideLoading()
        })
    }


}
