import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,StatusBar
} from "react-native";
import { StackNavigator } from "react-navigation";
import {Container} from 'native-base'
import { connect } from "react-redux";
import HeaderUser from "../../items/header_register";
import FormAddressRegister from "./edit-registerAddressForm";
import HeaderTeam from '../../items/headerTeam'

class UserAddressRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = {
      title: "แก้ไขข้อมูลส่วนตัว",
      address: {
        number: "",
        t: "",
        a: "",
        city: "",
        country: "",
        postNumber: ""
      }
    }
  }


  gotoListEvent = (number, t, a, city, country, postNumber) => {
    this.props.setAddress({ address: number, t, a, city, country, postNumber });
    this.props.navigation.navigate("EditProfileHelp");
  };
  gotoBack = () => {
    this.props.navigation.navigate('EditProfile')
  }

  render() {
    return (
      <Container>
        <HeaderTeam
          title={this.state.title}
          goback={this.gotoBack.bind(this)}
        />
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
        />
        <ScrollView>
          <View style={styles.container}>
            <HeaderUser Name={this.props.fullname} UserID={this.props.userid} />
            <FormAddressRegister goEvent={this.gotoListEvent.bind(this)} />
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

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setAddress: (address) => {
      dispatch({
        type: "setAddress",
        payload: address
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddressRegister);
