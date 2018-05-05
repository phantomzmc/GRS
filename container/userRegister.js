import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";

import HeaderUser from "../component/items/header_profile";
import FormRegister from "../component/form/registerForm";

class UserRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  gotoListEvent = (
    fullname,
    lastname,
    nickname,
    password,
    confirmpassword,
    teamname,
    bib,
    userid,
    tel,
    email,
    journeyDate,
    bloodtype,
    nation
  ) => {
    this.props.setProfile({
      profile: fullname,
      lastname,
      nickname,
      password,
      confirmpassword,
      teamname,
      bib,
      userid,
      tel,
      email,
      journeyDate,
      bloodtype,
      nation
    });
    this.props.navigation.navigate("UserAddressRegister");
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderUser Name={this.props.fullname} UserID={this.props.userid} />
          <FormRegister goEvent={this.gotoListEvent.bind(this)} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});

const mapDispatchToProps = dispatch => {
  return {
    setProfile: profile => {
      dispatch({
        type: "setProfile",
        payload: profile
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(UserRegister);
