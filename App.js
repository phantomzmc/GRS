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
// import Span from './Span.js'
// import ListEvent from './component/list/listevent/listevent'
// import Login from './component/login/login.js'
// import RegisterDistance from './component/register/registerDistance.js'
// import UserRegister from './component/register/userRegister'
// import CouponForm from './component/form/couponForm'
// import ListShirt from './component/list/listShirt/listShirt'
// import ShirtPhotoPlus from './component/layout/shirtphotoplus'
// import CreditPayment from './component/layout/creditPayment'
// import AddressLayout from './component/layout/addressLayout'
// import TotalLayout from './component/layout/totalLayout'

import Navigation from './config/router'
// import ChoiceSend from './component/items/choiceSend'
import { Provider } from 'react-redux'
import store from './store/store'


export default () =>

  <Provider store={store}>
    <Navigation />
  </Provider>;