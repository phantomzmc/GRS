import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native'
import { Conatainer } from 'native-base'
import { connect } from 'react-redux'
import axios from 'axios'
import randomstringPromise from 'randomstring-promise/react-native';
import MailGunSend from '../config/send-mailgun'

import ResetVerifyForm from "../component/form/resetVerifyForm"
import HeaderTeam from '../component/items/headerTeam'

import req from '../config/uri_req'
import apikey from '../config/api_key'

class ResetVerify extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            title: "ขอรหัสยืนยันตัวตนใหม่",
            verifycode: "",
            statusVerify: 0
        }
    }
    componentDidMount() {
        randomstringPromise(10)
            .then((verifycode) => {
                this.setState({ verifycode: verifycode })
                // console.log(code);  // u8KNs7aAw0DCOKO1MdEgVIcF2asajrdd
                console.log("componentdidmouth : " + verifycode)
                this.props.setVerify(this.state.verifycode)
            });
    }
    async sentVerifyCode(email) {
        const data = await MailGunSend.onSendMail({
            'from': 'Guurun Support Team. <support@guurun.com>',
            'to': email,
            'subject': 'Guurun Support Team รหัสในการยืนยันตัวตน',
            'text': 'สวัสดีคุณ รหัสที่ใช้ในการยืนยันตัวตนขอผู้ใช้งานคือ : ' + this.props.profile.verify
        })
        console.log(data)
    }
    sendResetVerify(userid , email) {
        let uri = req[0].uspResetActivecode
        let api_key = apikey[0].api_key
        let data = ({
            params: [
                { name: "Username", value: userid },
                { name: "ActivateCode", value: this.props.profile.verify }
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, data: responseJson.data[0], });
                console.log(this.state.data)
                this.sentVerifyCode(email)
            }).catch((error) => {
            });
    }
    gotoLogin = () => {
        this.props.navigation.navigate("Verify")
    }
    gotoBack = () => {
        this.props.navigation.navigate('Verify')
    }

    render() {
        return (
            <View>
                <HeaderTeam
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)}
                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <View style={styles.container}>
                    <ResetVerifyForm
                        sendNewCode={this.sendResetVerify.bind(this)}
                        goLogin={this.gotoLogin.bind(this)}
                        goback={this.gotoBack.bind(this)}
                    />
                    {/* <TouchableOpacity onPress={this.sendResetVerify.bind(this)}>
                    <Text>test</Text>
                </TouchableOpacity> */}
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        profile: state.profile,
        userprofile: state.userprofile,
        token: state.token
    }
}
const mapDisPatchToProps = (dispatch) => {
    return {
        setVerify: verify => {
            dispatch({
                type: "setVerify",
                payload: verify
            });
        }
    }

}
const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

export default connect(mapStateToProps, mapDisPatchToProps)(ResetVerify);