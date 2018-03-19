import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SegmentedControlIOS,
  TouchableOpacity,
  DatePickerIOS,
  Image
} from "react-native";
import { StackNavigator } from "react-navigation";

class FormRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      nickname: "",
      userid: "",
      password: "",
      confirmpassword: "",
      gen: "",
      teamname: "",
      bib: "",
      tel: "",
      email: "",
      chosenDate: new Date()
    };
    this.setDate = this.setDate(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  sendData = (
    fullname,
    nickname,
    password,
    confirmpassword,
    teamname,
    bib,
    userid,
    tel,
    email
  ) => {
    this.props.goEvent(
      fullname,
      nickname,
      password,
      confirmpassword,
      teamname,
      bib,
      userid,
      tel,
      email
    );
    console.log(this.state.fullname);
    console.log(this.state.userid);
  };

  render() {
    let {
      fullname,
      nickname,
      password,
      confirmpassword,
      teamname,
      bib,
      userid,
      tel,
      email
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contectTitle}>
          <View style={styles.textTitle}>
            <Image
              source={require("../icon/man-user.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.titleText}>ข้อมูลส่วนตัว</Text>
        </View>
        {/* <Text>ชื่อ-นามสกุล</Text> */}
        <TextInput
          placeholder="ชื่อ - นามสกุล"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={fullname => this.setState({ fullname })}
        />
        <TextInput
          placeholder="ชื่อเล่น"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={nickname => this.setState({ nickname })}
        />
        <TextInput
          placeholder="รหัสบัตรประชาชน/หนังสือเดินทาง"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={userid => this.setState({ userid })}
        />
        <TextInput
          placeholder="รหัสผ่าน"
          returnKeyType="next"
          secureTextEntry
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
        />
        <TextInput
          placeholder="ยืนยันรหัสผ่าน"
          returnKeyType="next"
          secureTextEntry
          style={styles.textInput}
          onChangeText={confirmpassword => this.setState({ confirmpassword })}
        />

        <View style={styles.conlorsegment}>
          <SegmentedControlIOS values={["ชาย", "หญิง"]} tintColor="#FC561F" />
        </View>
        {/* <DatePickerIOS
                    style={styles.datepicker}
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                /> */}
        <TextInput
          placeholder="ชื่อทีม"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={teamname => this.setState({ teamname })}
        />
        <TextInput
          placeholder="BIB"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={bib => this.setState({ bib })}
        />
        <TextInput
          placeholder="เบอร์โทรศัพท์"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={tel => this.setState({ tel })}
        />
        <TextInput
          placeholder="Email"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
        />
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              this.sendData(
                fullname,
                nickname,
                password,
                confirmpassword,
                teamname,
                bib,
                userid,
                tel,
                email
              )
            }
          >
            <Text style={styles.textButton}>ถัดไป</Text>
          </TouchableOpacity>
        </View>
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
  conlorsegment: {
    marginTop: 10
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textAddressInput: {
    width: "45%",
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
  datepicker: {
    padding: 50
  }
});
export default FormRegister;
