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
      genText : "",
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
      genText : userprofile.Gender == "M" ? "ชาย" : "หญิง",
      selectedIndex: userprofile.Gender == "M" ? 0 : 1
    })
    // if (this.state.gen == "M") {
    //   this.setState({ selectedIndex: 0 })
    // }
    // else if (this.state.gen == "F") {
    //   this.setState({ selectedIndex: 1 })
    // }
  }
  sendData = (fullname, lastname, nickname, teamname, bib, userid, tel, email, date, bloodtype, nation, gen) => {
    const { password, confirmpassword } = this.state
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
    let { fullname, lastname, nickname, teamname, bib, userid, tel, email, date, bloodtype, nation, gen } = this.state;
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
              style={{ fontFamily: "Kanit" }}
              onChangeText={fullname => this.setState({ fullname: fullname })}
            />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{lastname}</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={lastname => this.setState({ lastname: lastname })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>ชื่อเล่น</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{nickname}</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={nickname => this.setState({ nickname: nickname })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>เพศ : {this.state.genText}</Text>
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
            page={this.state.selectedIndex}
            tabBarUnderlineStyle={{ backgroundColor: "#FC561F", height: 2 }}>
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
        <Text style={styles.headForm}>รหัสบัตรประชาชน/หนังสือเดินทาง</Text>
        <Form>
          <Item disabled floatingLabel last>
            <Label style={styles.textLabel}>{userid}</Label>
            <Input
              disabled
              onChangeText={userid => this.setState({ userid: userid })}
              onEndEditing={this.checkUsernmae.bind(this)}
              keyboardType="phone-pad" />
          </Item>
        </Form>

        <Text style={styles.headForm}>สัญชาติ</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{nation}</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={nation => this.setState({ nation: nation })} />
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
              style={{ fontFamily: "Kanit" }}
              onChangeText={teamname => this.setState({ teamname: teamname })} />
          </Item>
        </Form>

        <Text style={styles.headForm}>เบอร์โทรศัพท์</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{tel}</Label>
            <Input
              keyboardType="phone-pad"
              style={{ fontFamily: "Kanit" }}
              onChangeText={tel => this.setState({ tel: tel })} />
          </Item>
        </Form>

        <Text style={styles.headForm}>Email</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{email}</Label>
            <Input
              keyboardType="email-address"
              style={{ fontFamily: "Kanit" }}
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
export default connect(mapStateToProps)(FormRegister);
