/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import 'babel-polyfill';
import 'regenerator-runtime/runtime'

import Navigation from './config/router'
// import ChoiceSend from './component/items/choiceSend'
import { Provider } from 'react-redux'
import store from './store/store'


export default () =>

  <Provider store={store}>
    <Navigation />
  </Provider>;