import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Container } from 'native-base'
import randomstringPromise from 'randomstring-promise/react-native';
import { connect } from "react-redux";
import HeaderUser from "../component/items/header_profile";
import HeaderRegis from '../component/items/header_register'
import FormRegister from "../component/form/registerForm";
import HeaderTeam from '../component/items/headerTeam'

class UserRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "สมัครสมาชิก",
      profile: {},
      verifycode: ""
    };
  }
  componentDidMount() {
    randomstringPromise(10)
      .then((verifycode) => {
        this.setState({ verifycode: verifycode })
        // console.log(code);  // u8KNs7aAw0DCOKO1MdEgVIcF2asajrdd
        console.log("componentdidmouth : " + verifycode)
        this.props.setVerify(this.state.verifycode)
      });
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
    nation,
    gen
  ) => {

    this.props.setProfile({
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
      nation,
      gen
    });
    this.props.navigation.navigate("UserAddressRegister");


  };
  gotoBack = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <Container>
        <HeaderTeam
          title={this.state.title}
          goback={this.gotoBack.bind(this)} />
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
        />
        <ScrollView>
          <View style={styles.container}>
            <HeaderRegis Name={this.props.fullname} UserID={this.props.userid} />
            <FormRegister
              goEvent={this.gotoListEvent.bind(this)}
              getToken={this.props.token.token} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
const mapStateToProps = state => {
  return {
    token: state.token,
    userprofile: state.userprofile
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setProfile: profile => {
      dispatch({
        type: "setProfile",
        payload: profile
      });
    },
    setVerify: verifycode => {
      dispatch({
        type: "setVerify",
        payload: verifycode
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
