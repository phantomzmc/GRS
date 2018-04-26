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
import { Form, Item, Input, Label, Tabs, Tab, TabHeading, Icon } from 'native-base'
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
    console.log(this.state.journeyDate);
    console.log(this.state.selectedIndex);
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
        <Text style={styles.headForm}>ชื่อ - นามสกุล</Text>
        <Form>
          <Item floatingLabel>
            <Label style={styles.textLabel}>ชื่อ</Label>
            <Input
              onChangeText={fullname => this.setState({ fullname })}
            />
          </Item>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>นามสกุล</Label>
            <Input
              onChangeText={lastname => this.setState({ lastname })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>ชื่อเล่น</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>ชื่อเล่น</Label>
            <Input
              onChangeText={nickname => this.setState({ nickname })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>เพศ</Text>
        <View style={styles.conlorsegment}>
          <Tabs initialPage={this.state.selectedIndex}>
            <Tab heading={<TabHeading ><Icon name="ios-man" onPress={() => this.setState({selectedIndex : 0})} /></TabHeading>}>
            </Tab>
              <Tab heading={<TabHeading><Icon name="ios-woman" onPress={() => this.setState({selectedIndex : 1})} /></TabHeading>}>
              </Tab>
          </Tabs>
          {/* <SegmentedControlIOS values={["ชาย", "หญิง"]}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex })
            }}
            tintColor="#FC561F" /> */}
        </View>
          <Text style={styles.headForm}>รหัสบัตรประชาชน/หนังสือเดินทาง</Text>

          <Form>
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex.15099999xxxxx</Label>
              <Input
                onChangeText={userid => this.setState({ userid })} />
            </Item>
          </Form>
          <Text style={styles.headForm}>กรุ๊ปเลือด</Text>
          <Form>
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex. A,B,O,AB</Label>
              <Input
                onChangeText={bloodtype => this.setState({ bloodtype })}
              />
            </Item>
          </Form>
          <Text style={styles.headForm}>สัญชาติ</Text>
          <Form>
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex.ไทย,อเมริกัน</Label>
              <Input
                onChangeText={nation => this.setState({ nation })} />
            </Item>
          </Form>
          <Text style={styles.headForm}>รหัสผ่าน</Text>
          <Form>
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex.xxxxxxxxxxxx</Label>
              <Input
                onChangeText={password => this.setState({ password })}
              />
            </Item>
          </Form>

          <Text style={styles.headForm}>ยืนยันรหัสผ่าน</Text>
          <Form>
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex.xxxxxxxxxxxx</Label>
              <Input
                onChangeText={confirmpassword => this.setState({ confirmpassword })} />
            </Item>
          </Form>
          <Text style={styles.headForm}>วันเกิด</Text>
          <TouchableOpacity onPress={this.onJourneyDatePress.bind(this)} >
            <Text style={styles.datePickerText}>วัน/เดือน/ปีเกิด : {this.state.journeyText}</Text>
          </TouchableOpacity>

          <DatePickerDialog ref="journeyDialog" onDatePicked={this.onJourneyDatePicked.bind(this)} />

          <Text style={styles.headForm}>ชื่อทีม</Text>
          <Form>
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex.Team...</Label>
              <Input
                onChangeText={teamname => this.setState({ teamname })} />
            </Item>
          </Form>

          <Text style={styles.headForm}>เบอร์โทรศัพท์</Text>
          <Form>
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex.090-xxxxxx</Label>
              <Input
                onChangeText={tel => this.setState({ tel })} />
            </Item>
          </Form>

          <Text style={styles.headForm}>Email</Text>
          <Form>
            <Item floatingLabel last>
              <Label style={styles.textLabel}>Ex.abc@gmail.com</Label>
              <Input
                onChangeText={email => this.setState({ email })} />
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
          backgroundColor : '#fff',
        alignContent : 'center',
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
        paddingTop: 10,
        paddingLeft: 15,
        // color: '#d9d9d9',
        fontFamily: 'kanit'
      },
  headForm: {
          fontFamily: 'kanit',
        fontSize: 16,
        paddingTop: 20
      },
  textLabel: {
          fontSize: 14,
        fontFamily: 'kanit'
      },
  tabStyle : {
          backgroundColor : '#fff'
      }
    });
    export default FormRegister;
