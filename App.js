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
import Span from './Span.js'
import ListEvent from './component/listevent/listevent.js'
import Login from './component/login/login.js'
import RegisterDistance from './component/register/registerDistance.js'
import UserRegister from './component/register/userRegister'

export default class App extends Component<{}> {
  render() {
    return (
      <UserRegister />
    );
  }
}