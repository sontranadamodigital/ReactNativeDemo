

import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImagePropsCustom, Device } from '../../../assets';
import { requestCameraPermission } from '../../../utils';
import { User } from '../../../instances';
import * as Yup from 'yup';
import { GlobalUIManager } from '../../../common';
import { Route } from '@react-navigation/native';

interface Props {
    navigation: StackNavigationProp<any>
    route: Route<any>
    changeScreen: (screen: number) => void
    userInfo: User
    updateProfile: (body: any, callback: (isErr: any, res?: any) => void) => void
}

interface State {
    gender: number,
    image: ImagePropsCustom
}

const initState = {
    gender: 1,
    image: {}
}

export class UserProfileLogic extends React.PureComponent<Props, State> {

    state = {
        ...initState,
    }

    componentDidMount() {
        let { gender, avatar } = this.props.userInfo
        this.setState({
            gender: gender === 0 ? 1 : gender,
            image: {
                path: avatar || '',
                uri: avatar || '',
            }
        })
    }


    updateValidate = Yup.object().shape({
        name: Yup.string()
            .required('validate_name'),
        email: Yup.string()
            .email("validate_email"),
    });

    openImage = () => {
        requestCameraPermission((image: any) => {
            this.setState({
                image: {
                    name: Device.isIos ? image.filename : image.path.replace(/^.*[\\\/]/, ''),
                    width: image.width,
                    uri: image.sourceURL || image.path,
                    path: image.path,
                    size: image.size,
                    type: 'image/jpeg'
                }
            })
        })
    }

    update = (values: any) => {
        GlobalUIManager.view.showLoading()
        let form = new FormData();
        form.append("full_name", values.name)
        !!values.email && form.append("email", values.email)
        form.append("gender", this.state.gender)
        //@ts-ignore
        if (Device.isIos) !!this.state.image.name && form.append("avatar", this.state.image)
        //@ts-ignore
        else !!this.state.image.uri && form.append("avatar", this.state.image)
        this.props.updateProfile(form, (isErr, res) => {
            if (!isErr) this.props.navigation.goBack()
            GlobalUIManager.view.hideLoading()
        })
    }

}
