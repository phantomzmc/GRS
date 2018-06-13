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
import DatePicker from 'react-native-datepicker'

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
      date: new Date,
      bloodtype: "",
      nation: "",
      gen: "M",
      selectedIndex: 0
    };
  }
  componentWillUnmount() {
    console.log("componentWillUnmount")
  }
  sendData = (fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, date, bloodtype, nation,gen) => {
    this.props.goEvent(fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, date, bloodtype, nation,gen);
  };

  render() {
    let { fullname, lastname, nickname, password, confirmpassword, teamname, bib, userid, tel, email, date, bloodtype, nation,gen } = this.state;
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
            <Tab heading={<TabHeading ><Icon name="ios-man" onPress={() => this.setState({ selectedIndex: 0, gen: "M" })} /></TabHeading>}>
            </Tab>
            <Tab heading={<TabHeading><Icon name="ios-woman" onPress={() => this.setState({ selectedIndex: 1, gen: "F" })} /></TabHeading>}>
            </Tab>
          </Tabs>
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

});
export default FormRegister;
