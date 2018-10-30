import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import SubmitResetPassword from '../component/form/submitResetPass'
import ResetPasswordForm from '../component/form/resetPasswordForm'
import HeaderTeam from '../component/items/headerTeam'
import axios from 'axios'
import req from '../config/uri_req';
import api_key from '../config/api_key'


class SubmitEncode extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            title: "ขอรหัสผ่านใหม่",
            password: "",
            userid: "",
            password: "",
            statusVerify: 0,
            resetform: false,
            submitform: true
        }
    }

    gotoLogin = () => {
        this.props.navigation.navigate("Login")
    }
    resetPassword(password) {
        let uri = req[0].uspResetPassword
        let apikey = api_key[0].api_key
        let data = ({
            params: [
                { name: "Email", value: this.props.userprofile.email },
                { name: "Password", value: password },
                { name: "EncodeURL", value: this.state.encode }
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, status: response.data[0] });
                console.log(this.state.status)
                this.checkStatusReset(this.state.status.ResetStatus)
            }).catch((error) => {
                this.gotoLogin()
            });
    }
    
    setEncode(code) {
        console.log(code)
        this.setState({
            encode: code,
            submitform: false,
            resetform: true
        })
        // this.checkEncode(code)

    }
    setNewPassword(password) {
        console.log(password)
        this.setState({
            password: password
        })
        this.resetPassword(password)
    }
    checkStatusReset(status) {
        if (status == 0) {
            Alert.alert('การตั้งรหัสผ่านใหม่ไม่สำเร็จ', 'กรุณาตรวจสอบรหัสยืนยันทาง Email หรือตรวจสอบรหัสผ่านให้ถูกต้อง', [
                { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
            ])
        }
        else if (status == 1) {
            this.gotoLogin()
        }
    }

    render() {
        return (
            <Container>
                <HeaderTeam
                    title={this.state.title}
                    menu={false}
                    statusRegis={true}
                    goEvent={() => this.props.navigation.navigate("EventList")}
                    goback={() => this.props.navigation.navigate("ResetEncode")}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}
                    goContacts={() => this.props.navigation.navigate('Contacts')}
                />
                <View style={styles.cardView}>
                    {/* <ResetPasswordForm
                    sendNewCode={this.sendResetPassword.bind(this)}
                    goLogin={this.gotoLogin.bind(this)} /> */}
                    {
                        this.state.submitform &&
                        <SubmitResetPassword
                            codesubmit={this.setEncode.bind(this)}
                        />
                    }
                    {
                        this.state.resetform &&
                        <ResetPasswordForm
                            sendNewCode={this.setNewPassword.bind(this)}
                        />
                    }
                </View>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        profile: state.profile,
        token: state.token,
        userprofile: state.userprofile,
        username: state.username
    }
}
const mapDisPatchToProps = (dispatch) => {
    return {
        resetPassword: password => {
            dispatch({
                type: "resetPassword",
                payload: password
            });
        }
    }

}
const styles = StyleSheet.create({
    cardView: {
        padding: 20
    }
})

export default connect(mapStateToProps, mapDisPatchToProps)(SubmitEncode);