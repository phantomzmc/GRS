import React, { Component } from 'react'
import PropTypes from "prop-types"
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'
import { connect } from 'react-redux'

import FormVerifyCode from '../component/form/verifyForm'


class VerifyCode extends Component {
    static propTypes = {
        navigation: PropTypes.object
    };
    static navigationOptions = {
        title: "ยืนยันตัวตน",
        headerStyle: {
            backgroundColor: "#FC561F"
        },
        headerTitleStyle: {
            color: "#fff"
        }
    };

    componentWillMount() {

    }
    gotoLogin = () => {
        this.props.navigation.navigate("Login")
    }
    sendDataVerify(verifycode, statusVerify) {
        console.log({verifycode, statusVerify})
        this.props.setVerify({ verifycode, statusVerify })
    }

    render() {
        return (
            <Container style={styles.container}>
                <FormVerifyCode goLogin={this.gotoLogin.bind(this)} 
                                sendData={this.sendDataVerify.bind(this)}/>
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