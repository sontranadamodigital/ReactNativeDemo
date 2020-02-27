import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import { unauthenFlow, appflow, splashFlow } from './flows'
import {  } from './flows'
import { RouterNames } from './routes';

const AppNavigation = createSwitchNavigator({
    appflow,
    unauthenFlow,
    splashFlow
}, {
    initialRouteName: "unauthenFlow"
})

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

export {
    setTopLevelNavigator,
    navigate
}
export default createAppContainer(AppNavigation)

export * from './routes'