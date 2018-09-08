import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Conatainer } from 'native-base'
import { connect } from 'react-redux'
import randomstringPromise from 'randomstring-promise/react-native';
import SubmitResetPassword from '../component/form/submitResetPass'
import axios from 'axios'
import req from '../config/uri_req';
import api_key from '../config/api_key'

import ResetPasswordForm from "../component/form/resetEncodeForm"

class ResetEncode extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            userid : "",
            verifycode : "",
            statusVerify: 0
        }
    }
    componentWillMount() {
        randomstringPromise(6)
            .then((verifycode) => {
                this.props.resetPassword(verifycode)
                this.setState({ verifycode : verifycode})
                console.log(this.state.verifycode)
            });
    }
    gotoLogin = () => {
        this.props.navigation.navigate("SubmitEncode")
    }
    sendUpdateEncode(userid,email) {
        let uri = req[0].uspUpdateEncodeURL
        let apikey = api_key[0].api_key
        let data = ({
            params: [
                { name: "Username", value: userid },
                { name: "Email", value: email },
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
                // this.props.navigation.navigate('SubmitEncode')
            }).catch((error) => {
                // this.props.navigation.navigate('EventList')
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <ResetPasswordForm
                    sendNewCode={this.sendUpdateEncode.bind(this)}
                    goLogin={this.gotoLogin.bind(this)} 
                    />
                {/* <SubmitResetPassword /> */}

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

export default connect(mapStateToProps, mapDisPatchToProps)(ResetEncode);