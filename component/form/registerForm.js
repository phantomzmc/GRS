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
  Image,
  Alert
} from "react-native";
import { StackNavigator } from "react-navigation";
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment';


class FormRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      lastname: "",
      nickname: "",
      userid: "",
      password: "",
      confirmpassword: "",
      teamname: "",
      bib: "",
      tel: "",
      email: "",
      journeyText: '',
      journeyDate: null,
      bloodtype: "",
      nation: "",
      selectedIndex: 0
    };
  }
  sendData = (fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, journeyDate, bloodtype, nation) => {
    this.props.goEvent(fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, journeyDate, bloodtype, nation);
    console.log(this.state.fullname);
    console.log(this.state.userid);
    console.log(this.state.journeyDate)
  };

  onJourneyDatePress = () => {
    let journeyDate = this.state.journeyDate;
    if (!journeyDate || journeyDate == null) {
      journeyDate = new Date();
      this.setState({
        journeyDate: journeyDate
      });
    }
    //To open the dialog
    this.refs.journeyDialog.open({
      date: journeyDate,
      minDate: new Date() //To restirct past date
    });
  }
  onJourneyDatePicked = (date) => {
    this.setState({
      journeyDate: date,
      journeyText: moment(date).format('DD MMM, YYYY')
    });
  }
  // checkinput = () => {
  //   if(this.state.password.length < 8){
  //     Alert.alert("Password ต้องมากกว่า 8 ตัว")
  //   }
  // }

  render() {
    let { fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, journeyDate, bloodtype, nation } = this.state;
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
        <View style={styles.addressContainer}>
          <TextInput
            placeholder="ชื่อ"
            returnKeyType="next"
            style={styles.textAddressInput}
            onChangeText={fullname => this.setState({ fullname })}
          />
          <TextInput
            placeholder="นามสกุล"
            returnKeyType="next"
            style={styles.textAddressInput}
            onChangeText={lastname => this.setState({ lastname })}
          />
        </View>
        <View style={styles.addressContainer}>
          <TextInput
            placeholder="ชื่อเล่น"
            returnKeyType="next"
            style={styles.textAddressInput}
            onChangeText={nickname => this.setState({ nickname })}
          />
          <View style={styles.conlorsegment}>
            <SegmentedControlIOS values={["ชาย", "หญิง"]}
              selectedIndex={this.state.selectedIndex}
              onChange={(event) => {
                this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex })
              }}
              tintColor="#FC561F" />
          </View>
        </View>
        <TextInput
          placeholder="รหัสบัตรประชาชน/หนังสือเดินทาง"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={userid => this.setState({ userid })}
        />
        <View style={styles.addressContainer}>
          <TextInput
            placeholder="กร๊ปเลือด"
            returnKeyType="next"
            style={styles.textAddressInput}
            onChangeText={bloodtype => this.setState({ bloodtype })}
          />
          <TextInput
            placeholder="สัญชาติ"
            returnKeyType="next"
            style={styles.textAddressInput}
            onChangeText={nation => this.setState({ nation })}
          />
        </View>
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
        <TouchableOpacity onPress={this.onJourneyDatePress.bind(this)} >
          <View style={styles.datePickerBox}>
            <Text style={styles.datePickerText}>วัน/เดือน/ปีเกิด : {this.state.journeyText}</Text>
          </View>
        </TouchableOpacity>

        <DatePickerDialog ref="journeyDialog" onDatePicked={this.onJourneyDatePicked.bind(this)} />
        <View style={styles.addressContainer}>
          <TextInput
            placeholder="ชื่อทีม"
            returnKeyType="next"
            style={styles.textAddressInput}
            onChangeText={teamname => this.setState({ teamname })}
          />
          <TextInput
            placeholder="BIB"
            returnKeyType="next"
            style={styles.textAddressInput}
            onChangeText={bib => this.setState({ bib })}
          />
        </View>
        <View style={styles.addressContainer}>
          <TextInput
            placeholder="เบอร์โทรศัพท์"
            returnKeyType="next"
            style={styles.textAddressInput}
            onChangeText={tel => this.setState({ tel })}
          />
          <TextInput
            placeholder="Email"
            returnKeyType="next"
            style={styles.textAddressInput}
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              this.sendData(
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
    width: "48%",
    marginTop: 20
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textAddressInput: {
    width: "48%",
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
  datePickerBox: {
    marginTop: 9,
    borderColor: '#fc561f',
    borderWidth: 1.5,
    padding: 0,
    borderRadius: 10,
    height: 35,
    justifyContent: 'center'
  },
  datePickerText: {
    fontSize: 14,
    paddingLeft: 15,
    color: '#d9d9d9',
    fontFamily: 'kanit'
  },
});
export default FormRegister;
