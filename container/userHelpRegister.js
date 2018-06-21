import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, StatusBar } from "react-native";
import { connect } from "react-redux";
import { Container } from 'native-base'

import HeaderUser from "../component/items/header_profile";
import FormHelpRegister from "../component/form/registerHelpForm";
import HeaderTeam from '../component/items/headerTeam'
import axios from 'axios'

var uri = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspCreateAccount"
var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
  'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
  '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
  'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
  '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='

class UserHelpRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "สมัครสมาชิก",
      help: {
        firstname: "jintana",
        lastname: "",
        relation: "",
        tel: "",
        verifycode: "",
        statusVerify: 0,
        test: "asdaffg"
      }
    };
  }
  createAccount = (ecfirstname, eclastname, ecrelation, ectel, activecode) => {
    // let activecode = activecode
    let firstname = this.props.profile.profile.fullname
    let lastname = this.props.profile.profile.lastname
    let nickname = this.props.profile.profile.nickname
    let userid = this.props.profile.profile.userid
    let password = this.props.profile.profile.password
    let journeyDate = this.props.profile.profile.journeyDate
    let nation = this.props.profile.profile.nation
    let teamname = this.props.profile.profile.teamname
    let bib = this.props.profile.profile.bib
    let email = this.props.profile.profile.email
    let tel = this.props.profile.profile.tel
    let address = this.props.profile.address.address
    let t = this.props.profile.address.t
    let a = this.props.profile.address.a
    let city = this.props.profile.address.city
    let country = this.props.profile.address.country
    let postnumber = this.props.profile.address.postNumber
    // let ecfirstname = ecfirstname
    // let eclastname = eclastname
    // let ecrelation = ecrelation
    // let ectel = ectel

    let data = ({
      params: {
        value: "{\"ActivateCode\":\"" + activecode + "\",\"FirstName\":\"" + firstname + "\",\"LastName\":\"" + lastname + "\",\"NickName\":\"" + nickname + "\",\"IdentityType\":\"1\",\"CitizenshipID\":\"" + userid + "\",\"PassportID\":\"123\",\"Password\":\"" + password + "\",\"Gender\":\"F\",\"DateOfBirth\":\"" + journeyDate + "\",\"Nationality\":\"" + nation + "\",\"TeamName\":\"" + teamname + "\",\"BIBName\":\"" + bib + "\",\"Email\":\"" + email + "\",\"Phone\":\"" + tel + "\",\"Address\":\"" + address + "\",\"SubDistric\":\"" + t + "\",\"Distric\":\"" + a + "\",\"Province\":\"" + city + "\",\"Country\":\"" + country + "\",\"PostCode\":\"" + postnumber + "\",\"PicProfile\":\"1\",\"BackgroundProfile\":\"1\",\"PicGroup\":\"1\",\"ECFirstName\":\"" + ecfirstname + "\",\"ECLastName\":\"" + eclastname + "\",\"ECRelation\":\"" + ecrelation + "\",\"ECPhone\":\"" + ectel + "\"}"
      }
    })
    axios.post(uri, data, {
      headers: {
        "X-DreamFactory-API-Key": api_key,
        "X-DreamFactory-Session-Token": sessionToken,
        "Authorization": auth
      },
      responseType: 'json'
    })
      .then((response) => {
        this.setState({ isLoading: false, status: response.data });
        console.log("success")
        this.gotoListEvent()
      }).catch((error) => {
        console.error(error);
      });
  }

  gotoListEvent = () => {
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
  };
  gotoVerify = () => {
    this.props.navigation.navigate("Verify");
  };
  gotoBack = () => {
    this.props.navigation.navigate('UserAddressRegister')
  }

  render() {
    return (
      <Container>
        <HeaderTeam
          title={this.state.title}
          goback={this.gotoBack.bind(this)}
        />
        <StatusBar
          barStyle="light-content"
          hidden={false}
          translucent={true}
        />
        <ScrollView>
          <View style={styles.container}>
            <HeaderUser Name={this.props.fullname} UserID={this.props.userid} />
            <FormHelpRegister goEvent={this.createAccount.bind(this)} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 60
  }
});
const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(UserHelpRegister);
