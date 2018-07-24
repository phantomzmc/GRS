import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native'
import { Conatainer } from 'native-base'
import { connect } from 'react-redux'
import randomstringPromise from 'randomstring-promise/react-native';
import MailGunSend from '../config/send-mailgun'

import ResetVerifyForm from "../component/form/resetVerifyForm"
import HeaderTeam from '../component/items/headerTeam'

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
    gotoLogin = () => {
        this.props.navigation.navigate("Verify")
    }
    sendResetVerify() {
        this.sentVerifyCode()        
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
                        sendNewCode={this.sentVerifyCode.bind(this)}
                        goLogin={this.gotoLogin.bind(this)} />
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
        userprofile : state.userprofile
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