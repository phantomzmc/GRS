import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';


import HeaderUser from '../component/items/header_profile'
import FormRegister from '../component/form/registerForm'

class UserRegister extends Component {
  static navigationOptions = {
    title: 'สมัครสมาชิก',
    headerStyle: {
      backgroundColor: '#FC561F'
    },
    headerTitleStyle: {
      color: '#fff'
    }
  };


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderUser />
          <FormRegister />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom : 60
  }
})

export default UserRegister 
