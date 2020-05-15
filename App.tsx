/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StatusBar, Platform,
} from 'react-native';

import { AppFlowNav } from "./src/navigation";
import { store, ReduxState } from "./src/redux";
import { Provider, connect } from 'react-redux';
// import { GloballUI } from './src/components';
import FlashMessage from 'react-native-flash-message';
import './src/instances/i18n';
import { PureComponent } from 'react';
import { GloballUI } from './src/common';
import { Color } from './src/assets';
class App extends PureComponent {
  componentDidMount() {
  }
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <Provider
          store={store}
        >
          <AppFlowNav />
        </Provider>
        <GloballUI />
        <FlashMessage position="top"
          floating={true}
          hideStatusBar={false}
          style={{
            backgroundColor: Color.White,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        />
      </>
    )
  }
}

export default App
