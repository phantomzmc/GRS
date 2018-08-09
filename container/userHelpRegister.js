import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, StatusBar } from "react-native";
import { connect } from "react-redux";
import { Container } from 'native-base'
import axios from 'axios'
import MailGunSend from '../config/send-mailgun'
import HeaderUser from "../component/items/header_profile";
// import HeaderUser from "../component/items/header_register";
import FormHelpRegister from "../component/form/registerHelpForm";
import HeaderTeam from '../component/items/headerTeam'
import req from '../config/uri_req'
import api_key from '../config/api_key'



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

    componentDidMount() {
        console.log(this.props.profile.verify)
    }
    async sentVerifyCode() {
        const data = await MailGunSend.onSendMail({
            'from': 'Guurun Support Team. <support@guurun.com>',
            'to': this.props.profile.profile.email,
            'subject': 'Guurun Support Team รหัสในการยืนยันตัวตน',
            'text': 'สวัสดีคุณ ' + this.props.profile.profile.fullname + ' รหัสที่ใช้ในการยืนยันตัวตนขอผู้ใช้งานคือ : ' + this.props.profile.verify
        })
        console.log(data)
    }
    createAccount = (ecfirstname, eclastname, ecrelation, ectel) => {
        let activecode = this.props.profile.verify
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
        let gen = this.props.profile.profile.gen
        let picprofile = this.props.userprofile.imgprofile
        let picBackground = this.props.userprofile.imgbackground

        let uri = req[0].uspCreateAccount
        let apikey = api_key[0].api_key
        let data = ({
            params:
                [
                    {
                        name: "ParamJSON",
                        value: "{\"ActivateCode\":\"" + activecode + "\",\"FirstName\":\"" + firstname + "\",\"LastName\":\"" + lastname + "\",\"NickName\":\"" + nickname + "\",\"IdentityType\":\"1\",\"CitizenshipID\":\"" + userid + "\",\"PassportID\":\"123\",\"Password\":\"" + password + "\",\"Gender\":\"" + gen + "\",\"DateOfBirth\":\"" + journeyDate + "\",\"Nationality\":\"" + nation + "\",\"TeamName\":\"" + teamname + "\",\"BIBName\":\"" + bib + "\",\"Email\":\"" + email + "\",\"Phone\":\"" + tel + "\",\"Address\":\"" + address + "\",\"SubDistric\":\"" + t + "\",\"Distric\":\"" + a + "\",\"Province\":\"" + city + "\",\"Country\":\"" + country + "\",\"PostCode\":\"" + postnumber + "\",\"PicProfile\":\"" + picprofile + "\",\"BackgroundProfile\":\"" + picBackground + "\",\"PicGroup\":\"1\",\"ECFirstName\":\"" + ecfirstname + "\",\"ECLastName\":\"" + eclastname + "\",\"ECRelation\":\"" + ecrelation + "\",\"ECPhone\":\"" + ectel + "\"}"
                    }
                ]
        })
        console.log(JSON.stringify(data))
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, status: response.data });
                console.log(this.state.status)
                this.gotoListEvent()
            }).catch((error) => {
                console.log(error)
                Alert.alert(
                    "ไม่สำเร็จ",
                    "ขั้นตอนการลงทะเบียนไม่สมบูรณ์ กรุณาตรวจสอบข้อมูลของท่าน",
                    [
                        {
                            text: "ยกเลิก"
                        },
                        {
                            text: "ตกลง",
                        }
                    ],
                    { cancelable: false }
                );
            });
    }

    gotoListEvent = () => {
        if (this.state.status[0].CreateAccountStatus == 1) {
            this.sentVerifyCode()
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
        }
        else if (this.state.status[0].CreateAccountStatus == 0) {
            Alert.alert(
                "ไม่สำเร็จ",
                "ขั้นตอนการลงทะเบียนไม่สมบูรณ์ กรุณาตรวจสอบข้อมูลของท่าน",
                [
                    {
                        text: "ยกเลิก"
                    },
                    {
                        text: "ตกลง",
                    }
                ],
                { cancelable: false }
            );
        }

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
                        <FormHelpRegister
                            goEvent={this.createAccount.bind(this)}
                        />
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
        profile: state.profile,
        token: state.token,
        userprofile: state.userprofile
    }
}


export default connect(mapStateToProps)(UserHelpRegister);