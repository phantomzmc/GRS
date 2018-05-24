import React, { Component } from 'react'
import PropTypes from "prop-types"
import { StyleSheet, View, Text, TouchableOpacity, Alert,StatusBar } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'
import { connect } from 'react-redux'

import FormVerifyCode from '../component/form/verifyForm'
import HeaderTeam from '../component/items/headerTeam'


class VerifyCode extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };
    state = {
        title: "ยืนยันตัวตน"
    }

    gotoLogin = () => {
        this.props.navigation.navigate("Login")
    }
    sendDataVerify(verifycode, statusVerify) {
        console.log({ verifycode, statusVerify })
        this.props.setVerify({ verifycode, statusVerify })
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
                <FormVerifyCode goLogin={this.gotoLogin.bind(this)}
                    sendData={this.sendDataVerify.bind(this)}
                    resetVerify={this.gotoResetVerify.bind(this)} />
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