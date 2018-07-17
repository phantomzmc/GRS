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
import { Form, Item, Input, Label, Tabs, Tab, TabHeading, Icon, Toast } from 'native-base'
import { connect } from 'react-redux'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import req from '../../../config/uri_req'
import api_key from '../../../config/api_key'

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
      selectedIndex: 0,
      status: "",
      showToast: false
    };
  }
  componentDidMount = () => {
    let userprofile = this.props.userprofile.userprofile
    this.setState({
      fullname: userprofile.FirstName,
      lastname: userprofile.LastName,
      nickname: userprofile.NickName,
      userid: userprofile.CitizenshipID,
      teamname: userprofile.TeamName,
      bib: userprofile.BIBName,
      tel: userprofile.Phone,
      email: userprofile.Email,
      date: userprofile.DateOfBirth,
      nation: userprofile.Nationality,
      gen: userprofile.Gender,
    })
    if (this.state.gen == "M") {
      this.setState({ selectedIndex: 0 })
    }
    else if (this.state.gen == "F") {
      this.setState({ selectedIndex : 1})
    }
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
        "X-DreamFactory-Session-Token": this.props.token.token,
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
  alertCheckUsername = () => {
    let { status } = this.state
    if (status[0].UsernameStatus == "1") {
      Alert.alert('นำเข้าผู้ใช้งานจากระบบเก่า (GRS ฟรี)', 'ควรยืนยัน Username และตั้งรหัสผ่าน', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (status[0].UsernameStatus == "2") {
      Alert.alert('มีผู้ใช้งานนี้ในระบบเเล้ว', 'กรุณาเปลี่ยนใหม่ให้ถูกต้อง', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (status[0].UsernameStatus == "0") {

    }
  }
  setGenMan() {
    this.setState({ selectedIndex: 0 })
    if (this.state.selectedIndex == 0) {
      this.setState({ gen: "M" })
      console.log(this.state.gen)
    }
  }
  setGenWoMan() {
    this.setState({ selectedIndex: 1 })
    if (this.state.selectedIndex == 1) {
      this.setState({ gen: "F" })
      console.log(this.state.gen)
    }
  }

  render() {
    let { fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, date, bloodtype, nation, gen } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contectTitle}>
          <View style={styles.textTitle}>
            <Image
              source={require("../../icon/man-user.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.titleText}>ข้อมูลส่วนตัว</Text>
        </View>
        <Text style={styles.headForm}>ชื่อ - นามสกุล</Text>
        <Form>
          <Item floatingLabel>
            <Label style={styles.textLabel}>{fullname}</Label>
            <Input
              onChangeText={fullname => this.setState({ fullname: fullname })}
            />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{lastname}</Label>
            <Input
              onChangeText={lastname => this.setState({ lastname: lastname })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>ชื่อเล่น</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{nickname}</Label>
            <Input
              onChangeText={nickname => this.setState({ nickname: nickname })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>เพศ</Text>
        <View style={styles.conlorsegment}>
          <Tabs
            initialPage={this.state.selectedIndex}
            page={this.state.selectedIndex}
            tabBarUnderlineStyle={{ backgroundColor: "#FC561F", height: 2 }}>
            <Tab heading={
              <TabHeading>
                <Icon name="ios-man" style={{ color: "#FC561F" }} />
                <Text style={styles.tabGender} onPress={() => this.setGenMan()}>ชาย</Text>
              </TabHeading>}>
            </Tab>
            <Tab heading={
              <TabHeading>
                <Icon name="ios-woman" style={{ color: "#FC561F" }} />
                <Text style={styles.tabGender} onPress={() => this.setGenWoMan()}>หญิง</Text>
              </TabHeading>}>
            </Tab>
          </Tabs>
        </View>
        {/* <Text style={styles.headForm}>รหัสบัตรประชาชน/หนังสือเดินทาง</Text>

        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{userid}</Label>
            <Input
              onChangeText={userid => this.setState({ userid: userid })}
              onEndEditing={this.checkUsernmae.bind(this)}
              keyboardType="phone-pad" />
          </Item>
        </Form> */}
        {/* <Text style={styles.headForm}>กรุ๊ปเลือด</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex. A,B,O,AB</Label>
            <Input
              onChangeText={bloodtype => this.setState({ bloodtype })}
            />
          </Item>
        </Form> */}
        <Text style={styles.headForm}>สัญชาติ</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{nation}</Label>
            <Input
              onChangeText={nation => this.setState({ nation: nation })} />
          </Item>
        </Form>
        <Text style={styles.headForm}>รหัสผ่าน</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.xxxxxxxxxxxx</Label>
            <Input
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
        </Form>

        <Text style={styles.headForm}>ยืนยันรหัสผ่าน</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.xxxxxxxxxxxx</Label>
            <Input
              secureTextEntry={true}
              onChangeText={confirmpassword => this.setState({ confirmpassword })} />
          </Item>
        </Form>
        <Text style={styles.headForm}>วันเกิด</Text>
        <View style={styles.containerDatePicker}>
          <DatePicker
            style={styles.datePickerText}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1920-01-01"
            maxDate={this.state.date}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
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
            <Label style={styles.textLabel}>{teamname}</Label>
            <Input
              onChangeText={teamname => this.setState({ teamname: teamname })} />
          </Item>
        </Form>

        <Text style={styles.headForm}>เบอร์โทรศัพท์</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{tel}</Label>
            <Input
              keyboardType="phone-pad"
              onChangeText={tel => this.setState({ tel: tel })} />
          </Item>
        </Form>

        <Text style={styles.headForm}>Email</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{email}</Label>
            <Input
              keyboardType="email-address"
              onChangeText={email => this.setState({ email: email })} />
          </Item>
        </Form>
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
const mapStateToProps = (state) => {
  return {
    username: state.username,
    userprofile: state.userprofile,
    token: state.token
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
    fontFamily: "kanit"
  },

  datePickerText: {
    paddingTop: 10,
    paddingLeft: 30,
    width: "80%",
    justifyContent: "center",
    fontFamily: "kanit"
  },
  containerDatePicker: {
    flexDirection: 'row'
  },
  headForm: {
    fontFamily: "kanit",
    fontSize: 16,
    paddingTop: 20
  },
  textLabel: {
    fontSize: 14,
    fontFamily: "kanit"
  },
  tabStyle: {
    backgroundColor: '#fff'
  },
  tabGender: {
    fontFamily: "kanit",
    paddingHorizontal: 10,
    color: "#FC561F"
  }

});
export default connect(mapStateToProps)(FormRegister);