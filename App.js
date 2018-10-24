/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { Root } from "native-base";
import Navigation from './config/router'
import { Provider } from 'react-redux'
import store from './store/store'

export default () =>

  <Provider store={store}>
    <Root>
      <Navigation
        initialRoute={{ statusBarHidden: true }}
      />
    </Root>
  </Provider>;