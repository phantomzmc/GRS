import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Conatainer } from 'native-base'
import { connect } from 'react-redux'
import randomstringPromise from 'randomstring-promise';
import axios from 'axios'
import req from '../config/uri_req';
import api_key from '../config/api_key'

import ResetPasswordForm from "../component/form/resetPasswordForm"

class ResetVerify extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            userid : "",
            password : "",
            statusVerify: 0
        }
    }
    componentWillMount() {
        let { password } = this.state
        console.log("verfity")
        randomstringPromise(10)
            .then((password) => {
                this.setState({ password })
                this.props.resetPassword(password)
                console.log(password)
            });
    }
    gotoLogin = () => {
        this.props.navigation.navigate("Login")
    }
    sendResetPassword(email,password) {
        let uri = req[0].uspResetPassword
        let apikey = api_key[0].api_key
        let data = ({
            params: [
                { name: "Email", value: email },
                { name: "Password", value: password },
                { name : "EncodeURL" , value : this.props.profile.newpassword}
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
                this.gotoLogin()
            }).catch((error) => {
                this.props.navigation.navigate('EventList')
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <ResetPasswordForm
                    sendNewCode={this.sendResetPassword.bind(this)}
                    goLogin={this.gotoLogin.bind(this)} />

            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        profile : state.profile,
        token : state.token
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
    container: {
        padding: 20
    }
})

export default connect(mapStateToProps, mapDisPatchToProps)(ResetVerify);