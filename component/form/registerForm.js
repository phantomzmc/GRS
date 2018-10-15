import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import { Form, Item, Input, Label, Tabs, Tab, TabHeading, Icon } from 'native-base'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import req from '../../config/uri_req'
import api_key from '../../config/api_key'
import SegmentedControlTab from 'react-native-segmented-control-tab'


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
      date: new Date,
      bloodtype: "",
      nation: "",
      gen: "M",
      genText: "",
      status: "",
      showToast: false,
      status_userid: true,
      selectedIndex: 0,
    };
  }

  sendData = (fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, date, bloodtype, nation, gen) => {
    this.props.goEvent(fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, date, bloodtype, nation, gen);
  };

  checkUsernmae() {
    let uri = req[0].uspCheckUsername
    let apikey = api_key[0].api_key
    let data = ({
      params: {
        value: this.state.userid,
      }
    })
    axios.post(uri, data, {
      headers: {
        "X-DreamFactory-API-Key": apikey,
        "X-DreamFactory-Session-Token": this.props.getToken,
      },
      responseType: 'json'
    })
      .then((response) => {
        this.setState({ isLoading: false, status: response.data });
        console.log(this.state.status[0].UsernameStatus)
        this.alertCheckUsername()
      }).catch((error) => {
        console.error(error);
      });
  }
  checkEmail() {
    let uri = req[0].uspCheckEmail
    let apikey = api_key[0].api_key
    let data = ({
      params: [
        { name: "Email", value: this.state.email },
        { name: "EncodeURL", value: "" }
      ]
    })
    axios.post(uri, data, {
      headers: {
        "X-DreamFactory-API-Key": apikey,
        "X-DreamFactory-Session-Token": this.props.getToken,
      },
      responseType: 'json'
    })
      .then((response) => {
        this.setState({ isLoading: false, status: response.data });
        console.log(this.state.status[0].Status)
        // this.alertCheckEmail()
      }).catch((error) => {
        console.error(error);
      });
  }
  checkValueInput(fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, date, bloodtype, nation, gen) {
    if (fullname == "") {
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
    else if (gen == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณาเลือกเพศ', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })

    }
    else if (userid == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกรหัสบัตรประจำตัวประชาชน / หนังสือเดินทาง', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (bloodtype == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกกรุ๊ปเลือด', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (nation == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกสัญชาติ', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })

    }
    else if (password == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกรหัสผ่าน', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (confirmpassword == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกรหัสผ่านที่เหมือนกันอีกครั้ง', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (date == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอก วัน/เดือน/ปีเกิด', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (tel == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกเบอร์โทรศัพท์', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })

    }
    else if (email == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอก Email', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (password != confirmpassword) {
      Alert.alert('กรุณากรอกข้อมูลให้ถูกต้อง', 'กรุณากรอก Email และ ConfirmPassword ให้ถูกต้อง', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else {
      this.sendData(fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, date, bloodtype, nation, gen)
    }
  }

  alertCheckUsername = () => {
    let { status, userid } = this.state
    if (status[0].UsernameStatus == "1") {
      Alert.alert('นำเข้าผู้ใช้งานจากระบบเก่า (GRS ฟรี)', 'ควรยืนยัน Username และตั้งรหัสผ่าน', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (status[0].UsernameStatus == "2") {
      this.setState({ status_userid: false })
      Alert.alert('มีผู้ใช้งานนี้ในระบบเเล้ว', 'กรุณาเปลี่ยนใหม่ให้ถูกต้อง', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    // else if (userid.length < 13 || userid > 13){
    //   Alert.alert('กรุณากรอกข้อมูลให้ถูกต้อง', 'กรุณาเปลี่ยนใหม่ให้ถูกต้อง', [
    //     {
    //       text: 'ตกลง'
    //     }
    //   ], { cancelable: false })
    // }
    else if (status[0].UsernameStatus == "0") {
      this.setState({ status_userid: true })

    }
  }

  setGenMan() {
    this.setState({ selectedIndex: 0 })
    if (this.state.selectedIndex == 0) {
      this.setState({ gen: "M" })
      console.log(this.state.gen)
    }
    setTimeout(() => {
      this.setState({ gen: "M" })
    }, 100)
  }
  setGenWoMan() {
    this.setState({ selectedIndex: 1 })
    if (this.state.selectedIndex == 1) {
      this.setState({ gen: "F" })
      console.log(this.state.gen)
    }
    setTimeout(() => {
      this.setState({ gen: "F" })
    }, 100)
  }
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
    if (index === 0) {
      this.setState({ gen: "M", genText: "ชาย" })
    }
    else if (index === 1) {
      this.setState({ gen: "F", genText: "หญิง" })
    }
  }

  render() {
    let { fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, date, bloodtype, nation, gen } = this.state;
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
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>ชื่อ - นามสกุล</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          <Item floatingLabel>
            <Label style={styles.textLabel}>ชื่อ</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={fullname => this.setState({ fullname })}
            />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>นามสกุล</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={lastname => this.setState({ lastname })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>ชื่อเล่น</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>ชื่อเล่น</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={nickname => this.setState({ nickname })}
            />
          </Item>
        </Form>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>เพศ : {this.state.selectedIndex == 0 ? "ชาย" : "หญิง"}</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <View style={styles.conlorsegment}>
          <SegmentedControlTab
            values={['ชาย', 'หญิง']}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
            tabsContainerStyle={{ height: 50, backgroundColor: '#f2f2f2' }}
            tabStyle={{ backgroundColor: '#f2f2f2', borderWidth: 0, borderColor: 'transparent' }}
            activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
            tabTextStyle={{ color: '#444444', fontFamily: "Kanit" }}
            activeTabTextStyle={{ color: '#FC561F', fontFamily: "Kanit" }}
          />
          {/* <Tabs
            initialPage={this.state.selectedIndex}
            tabBarUnderlineStyle={{ backgroundColor: "#FC561F", height: 2 }}
          >
            <Tab heading={
              <TabHeading>
                <TouchableOpacity style={styles.gender} onPress={() => this.setGenMan()}>
                  <Icon name="ios-man" style={{ color: "#FC561F" }} onPress={() => this.setGenMan()} />
                  <Text style={styles.tabGender} onPress={() => this.setGenMan()}>ชาย</Text>
                </TouchableOpacity>
              </TabHeading>}>
            </Tab>
            <Tab heading={
              <TabHeading>
                <TouchableOpacity style={styles.gender} onPress={() => this.setGenWoMan()}>
                  <Icon name="ios-woman" style={{ color: "#FC561F" }} onPress={() => this.setGenWoMan()} />
                  <Text style={styles.tabGender} onPress={() => this.setGenWoMan()}>หญิง</Text>
                </TouchableOpacity>
              </TabHeading>}>
            </Tab>
          </Tabs> */}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>รหัสบัตรประชาชน/หนังสือเดินทาง</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          {this.state.status_userid == true ?
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex.15099999xxxxx</Label>
              <Input
                style={{ fontFamily: "Kanit" }}
                onChangeText={userid => this.setState({ userid })}
                onEndEditing={this.checkUsernmae.bind(this)}
                keyboardType="phone-pad" />
            </Item>
            :
            <Item error floatingLabel last>
              <Label style={styles.textLabel}>Ex.15099999xxxxx</Label>
              <Input
                style={{ fontFamily: "Kanit" }}
                onChangeText={userid => this.setState({ userid })}
                onEndEditing={this.checkUsernmae.bind(this)}
                keyboardType="phone-pad" />

            </Item>
          }

        </Form>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>กรุ๊ปเลือด</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex. A,B,O,AB</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={bloodtype => this.setState({ bloodtype })}
            />
          </Item>
        </Form>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>สัญชาติ</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.ไทย,อเมริกัน</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={nation => this.setState({ nation })} />
          </Item>
        </Form>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>รหัสผ่าน</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        {password.length < 6 ?
          <Form>
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex.xxxxxxxxxxxx</Label>
              <Input
                style={{ fontFamily: "Kanit" }}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
          </Form>
          :
          <Form>
            <Item success floatingLabel last>
              <Label style={styles.textLabel}>Ex.xxxxxxxxxxxx</Label>
              <Input
                style={{ fontFamily: "Kanit" }}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
          </Form>
        }
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>ยืนยันรหัสผ่าน</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        {confirmpassword.length < 6 ?

          <Form>
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex.xxxxxxxxxxxx</Label>
              <Input
                style={{ fontFamily: "Kanit" }}
                secureTextEntry={true}
                onChangeText={confirmpassword => this.setState({ confirmpassword })} />
            </Item>
          </Form>
          :
          <Form>
            <Item success floatingLabel last>
              <Label style={styles.textLabel}>Ex.xxxxxxxxxxxx</Label>
              <Input
                style={{ fontFamily: "Kanit" }}
                secureTextEntry={true}
                onChangeText={confirmpassword => this.setState({ confirmpassword })} />
            </Item>
          </Form>
        }
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>วันเกิด</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <View style={styles.containerDatePicker}>
          <DatePicker
            style={styles.datePickerText}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1900-01-01"
            maxDate="2100-12-31"
            confirmBtnText="ตกลง"
            cancelBtnText="ยกเลิก"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => { this.setState({ date: date }) }}
          />
        </View>

        <Text style={styles.headForm}>ชื่อทีม</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.Team...</Label>
            <Input
              style={{ fontFamily: "Kanit" }}

              onChangeText={teamname => this.setState({ teamname })} />
          </Item>
        </Form>
        <Text style={styles.headForm}>BIBName</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.bibname.</Label>
            <Input
              style={{ fontFamily: "Kanit" }}

              onChangeText={bib => this.setState({ bib })} />
          </Item>
        </Form>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>เบอร์โทรศัพท์</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.090-xxxxxx</Label>
            <Input
              style={{ fontFamily: "Kanit" }}

              keyboardType="phone-pad"
              onChangeText={tel => this.setState({ tel })} />
          </Item>
        </Form>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>Email</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.abc@gmail.com</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
              onEndEditing={this.checkEmail.bind(this)} />
          </Item>
        </Form>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              this.checkValueInput(
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
                date,
                bloodtype,
                nation,
                gen
              )
            }
          >
            <Text style={styles.textButton}>ถัดไป</Text>
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
    fontFamily: "Kanit",
    color: "#fc561f"
  },
  contectTitle: {
    alignItems: "center"
  },
  icon: {
    width: 25,
    height: 25
  },
  conlorsegment: {
    backgroundColor: '#fff',
    alignContent: 'center',
    marginTop: 20
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
    fontFamily: "Kanit"
  },

  datePickerText: {
    paddingTop: 10,
    paddingLeft: 30,
    width: "80%",
    justifyContent: "center",
    fontFamily: "Kanit"
  },
  containerDatePicker: {
    flexDirection: 'row'
  },
  headForm: {
    fontFamily: "Kanit",
    fontSize: 16,
    paddingTop: 20
  },
  headdetail: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: "Kanit",
    color: "red"
  },
  textLabel: {
    fontSize: 14,
    fontFamily: "Kanit"
  },
  tabStyle: {
    backgroundColor: '#fff'
  },
  tabGender: {
    fontFamily: "Kanit",
    paddingHorizontal: 10,
    color: "#FC561F"
  },
  gender: {
    flexDirection: "row",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 10
  }

});
export default FormRegister;
