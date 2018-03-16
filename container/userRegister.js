import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {connect} from 'react-redux'


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
  constructor (props) {
    super(props)
    this.state ={
      profile : {}
    }
  }

  gotoListEvent = (fullname,userid,age,number,t,a,city,country,postNumber,tel,email) => {
    this.props.setProfile({ profile : fullname,userid,age,number,t,a,city,country,postNumber,tel,email})
    this.props.navigation.navigate('SingleLogin')
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderUser Name={this.props.fullname}
                      UserID={this.props.userid}/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setProfile: (profile) => {
      dispatch({
        type : "setProfile",
        payload : profile
      })
    }
  }
}

export default connect(null,mapDispatchToProps)(UserRegister) 
