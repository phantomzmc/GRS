import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar
} from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";

import HeaderUser from "../component/items/header_profile";
import FormHelpRegister from "../component/form/registerHelpForm";
import verify from "./verify";

class UserHelpRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  static navigationOptions = {
    title: "สมัครสมาชิก",
    headerStyle: {
      backgroundColor: "#FC561F"
    },
    headerTitleStyle: {
      color: "#fff"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      help: {
        firstname: "",
        lastname: "",
        relation: "",
        tel: "",
        verifycode: "",
        statusVerify: 0
      }
    };
  }


  gotoListEvent = (firstname, lastname, relation, tel, verfitycode, statusVerify) => {
    Alert.alert(
      "สำเร็จ",
      "ขั้นตอนการลงทะเบียนเกือบเสร็จสมบูรณ์แล้ว กรุณาตรวจสอบอีเมล์เพื่อยืนยันตัวตน",
      [
        {
          text: "ยกเลิก"
        },
        {
          text: "ตกลง",
          onPress: () => this.gotoVerify()
        }
      ],
      { cancelable: false }
    );
    this.props.setHelp({ help: firstname, lastname, relation, tel });
    this.props.setVerify({ verfitycode, statusVerify })
  };
  gotoVerify = () => {
    this.props.navigation.navigate("Verify");
  };

  render() {
    return (
      <ScrollView>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
        />
        <View style={styles.container}>
          <HeaderUser Name={this.props.fullname} UserID={this.props.userid} />
          <FormHelpRegister goEvent={this.gotoListEvent.bind(this)} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 60
  }
});

const mapDispatchToProps = dispatch => {
  return {
    setHelp: help => {
      dispatch({
        type: "setHelp",
        payload: help
      });
    },
    setVerify: verify => {
      dispatch({
        type: "setVerify",
        payload: verify
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(UserHelpRegister);
