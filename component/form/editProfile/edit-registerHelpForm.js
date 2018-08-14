import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity, Image, } from "react-native";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Form, Item, Input, Label, Picker, Icon } from 'native-base'
import { connect } from 'react-redux'


class FormAddressRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    email: PropTypes.string

  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      relation: "ความสัมพันธ์",
      tel: "",
      email: ""
    };
  }
  componentDidMount = () => {
    let userprofile = this.props.userprofile.userprofile
    this.setState({
      firstname: userprofile.ECFirstName,
      lastname: userprofile.ECLastName,
      relation: userprofile.ECRelation,
      tel: userprofile.ECPhone,
    })
  }
  sendData = (firstname, lastname, relation, tel) => {
    this.props.setHelp({ firstname, lastname, relation, tel });
    this.props.goEvent(firstname, lastname, relation, tel);
  };

  render() {
    let { firstname, lastname, relation, tel } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contectTitle}>
          <View style={styles.textTitle}>
            <Image
              source={require("../../icon/heartbeat.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.titleText}>กรณีฉุกเฉิน</Text>
        </View>
        {/* <View style={styles.addressContainer}> */}
        <Text style={styles.headForm}>ชื่อ-นามสกุล</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{firstname}</Label>
            <Input
              style={{ fontFamily: "kanit" }}
              onChangeText={firstname => this.setState({ firstname: firstname })}
            />
          </Item>
        </Form>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{lastname}</Label>
            <Input
              style={{ fontFamily: "kanit" }}
              onChangeText={lastname => this.setState({ lastname: lastname })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>หมายเลขโทรศัพท์</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{tel}</Label>
            <Input
              keyboardType="phone-pad"
              style={{ fontFamily: "kanit" }}
              onChangeText={tel => this.setState({ tel: tel })}
            />
          </Item>
        </Form>
        <View style={styles.viewPicker}>
          <Text style={styles.headForm}>ความสัมพันธ์</Text>
          <Form>
            <Picker
              mode="dropdown"
              iosHeader="เลือกความสัมพันธ์"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={styles.picker}
              selectedValue={this.state.relation}
              onValueChange={(itemValue, itemIndex) => this.setState({ relation: itemValue })}
            >
              <Picker.Item label="ความสัมพันธ์" value="ความสัมพันธ์" />
              <Picker.Item label="คู่สมรส" value="คู่สมรส" />
              <Picker.Item label="เพื่อนสนิท" value="เพื่อนสนิท" />
              <Picker.Item label="พ่อแม่" value="พ่อแม่" />
              <Picker.Item label="ผู้ปกครอง" value="ผู้ปกครอง" />
              <Picker.Item label="สมาชิกในครอบครัว" value="สมาชิกในครอบครัว" />
              <Picker.Item label="เพื่อน" value="เพื่อน" />
              <Picker.Item label="ญาติ" value="ญาติ" />
              <Picker.Item label="อื่นๆ" value="อื่นๆ" />
            </Picker>
          </Form>
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.sendData(firstname, lastname, relation, tel)}
          >
            <Text style={styles.textButton}>บันทึกการเปลี่ยนแปลง</Text>
          </TouchableOpacity>
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff"
  },
  textTitle: {
    backgroundColor: "#fc561f",
    padding: 10,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 15,
    fontFamily: "kanit",
    color: "#fc561f"
  },
  contectTitle: {
    alignItems: "center"
  },
  icon: {
    width: 25,
    height: 25
  },
  textInput: {
    borderColor: "#FC561F",
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    height: 35,
    marginTop: 15,
    fontFamily: "kanit"
  },

  submitContainer: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 30
  },
  buttonContainer: {
    height: 40,
    width: "100%",
    backgroundColor: "#FC561F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  textButton: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
    fontFamily: "kanit"
  },
  viewPicker: {
    flexDirection: 'row'
  },
  picker: {
    paddingTop: 15,
    padding: 30
  },

  headForm: {
    fontFamily: 'kanit',
    fontSize: 16,
    paddingTop: 20
  },
  textLabel: {
    fontSize: 14,
    fontFamily: 'kanit'
  }
});

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    userprofile: state.userprofile
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHelp: help => {
      dispatch({
        type: "setHelp",
        payload: help
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormAddressRegister);
