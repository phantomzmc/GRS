import React, { Component } from 'react'
import PropTypes from "prop-types"
import { StyleSheet, View, Text, TouchableOpacity, Alert, StatusBar } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'
import { connect } from 'react-redux'
import axios from 'axios'

import FormVerifyCode from '../component/form/verifyForm'
import HeaderTeam from '../component/items/headerTeam'

var uri = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspActivateAccount"
var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='

class VerifyCode extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            title: "ยืนยันตัวตน",
            code: "",
            status: {}
        }
        this.alertVerify = this.alertVerify.bind(this)
    }


    getVerifyServer = (code) => {
        // let { code } = this.state
        let data = ({
            params: [
                { name: "ActivateCode", value: code },
            ]
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
                console.log(this.state.status[0].Status)
                this.alertVerify()
            }).catch((error) => {
                console.error(error);
            });
    }

    sendDataVerify(verifycode, statusVerify) {
        this.setState({ code: verifycode })
        this.getVerifyServer()
        console.log({ verifycode, statusVerify })
        this.props.setVerify({ verifycode, statusVerify })
    }

    alertVerify() {
        let { status } = this.state
        if (status[0].Status == "0") {
            Alert.alert('รหัสไม่ตรงกัน', 'กรุณากรอกรหัสที่ได้รับทาง Email อย่างถูกต้อง', [
                { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
            ])
        }
        else if (status[0], Status == "1") {
            this.gotoLogin()
        }
        else {
            console.log("error")
        }
    }

    gotoLogin = () => {
        this.props.navigation.navigate("Login")
    }
    gotoResetVerify = () => {
        this.props.navigation.navigate("ResetVerify")
    }
    gotoBack = () => {
        this.props.navigation.navigate('UserHelpRegister')
    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderTeam
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)}
                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <FormVerifyCode
                    goLogin={this.gotoLogin.bind(this)}
                    sendData={this.sendDataVerify.bind(this)}
                    resetVerify={this.gotoResetVerify.bind(this)}
                    getVerify={this.getVerifyServer.bind(this)} />
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
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

    },
})

export default connect(null, mapDispatchToProps)(VerifyCode)