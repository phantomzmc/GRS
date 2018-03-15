import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';


import HeaderUser from '../component/items/header_profile'
import FormRegister from '../component/form/registerForm'

class UserRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }
  static navigationOptions = {
    title: 'สมัครสมาชิก',
    headerStyle: {
      backgroundColor: '#FC561F'
    },
    headerTitleStyle: {
      color: '#fff'
    }
  };

  gotoListEvent = () => {
    this.props.navigation.navigate('ListEvent')
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderUser />
          <FormRegister goEvent={this.gotoListEvent.bind(this)}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 60
  }
})

export default UserRegister 
