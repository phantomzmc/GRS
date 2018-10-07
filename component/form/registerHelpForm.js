import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
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
  checkInputValue(firstname, lastname, relation, tel) {
    if (firstname == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกชื่อ', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (lastname == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกนามสกุล', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (relation == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'ระบุความสัมพันธ์', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (tel == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกเบอร์โทรศัพท์ฉุกเฉิน', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else {
      this.sendData(firstname, lastname, relation, tel)
    }
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
              source={require("../icon/heartbeat.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.titleText}>ผู้ที่สามารถติดต่อได้ในกรณีฉุกเฉิน</Text>
        </View>
        {/* <View style={styles.addressContainer}> */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>ชื่อ-นามสกุล</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.ชื่อ</Label>
            <Input
              style={{ fontFamily: "kanit" }}
              onChangeText={firstname => this.setState({ firstname })}
            />
          </Item>
        </Form>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.นามสกุล</Label>
            <Input
              style={{ fontFamily: "kanit" }}
              onChangeText={lastname => this.setState({ lastname })}
            />
          </Item>
        </Form>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>หมายเลขโทรศัพท์</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.090-xxxxxx</Label>
            <Input
              style={{ fontFamily: "kanit" }}
              keyboardType="phone-pad"
              onChangeText={tel => this.setState({ tel })}
            />
          </Item>
        </Form>
        <View style={styles.viewPicker}>
          <Text style={styles.headForm2}>ความสัมพันธ์</Text>
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
            <Text style={styles.textButton}>ยืนยัน</Text>
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
    flexDirection: 'row',
    justifyContent : "space-between"
  },
  

  headForm: {
    fontFamily: 'kanit',
    fontSize: 16,
    paddingTop: 20
  },
  headForm2: {
    fontFamily: 'kanit',
    fontSize: 16,
    paddingTop: 10

  },
  headdetail: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: "kanit",
    color: "red"
  },
  textLabel: {
    fontSize: 14,
    fontFamily: 'kanit'
  }
});

const mapStateToProps = (state) => {
  return {
    profile: state.profile
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
