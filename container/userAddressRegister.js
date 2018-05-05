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
import FormAddressRegister from "../component/form/registerAddressForm";

class UserAddressRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props)
    this.state = {
      address: {
        number : "",
        t : "",
        a : "",
        city : "",
        country : "",
        postNumber : ""
      }
  }
}

  gotoListEvent = (number, t, a, city, country, postNumber) => {
    this.props.setAddress({address: number, t, a, city, country, postNumber});
    this.props.navigation.navigate("UserHelpRegister");
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderUser Name={this.props.fullname} UserID={this.props.userid} />
          <FormAddressRegister goEvent={this.gotoListEvent.bind(this)} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});

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

export default connect(null, mapDispatchToProps)(UserAddressRegister);
