import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Alert, TextInput } from 'react-native';
import LoginForm from '../component/form/loginForm'
import { connect } from 'react-redux'
import axios from 'axios'

var uri = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspSignIn"
var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='

class Login extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            status: [],
        }
    }
    checkLoginSever() {
        let { status, username, password } = this.state
        let data = ({
            params: [
                { name: "Username", value: username },
                { name: "Password", value: password }
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
                console.log(this.state.status)
                console.log(this.state.status[0].SignInStatus)
                this.checkLogin()
            }).catch((error) => {
                console.error(error);
            });
    }
    checkLogin() {
        let { status } = this.state
        if (status[0].SignInStatus === "1" && status[0].ActivateStatus === "1") {
            this.props.setUsername(this.state.username)
            this.gotoTabTeam()
        }
        else if (status[0].SignInStatus === "1" && status[0].ActivateStatus === "0") {
            Alert.alert('กรุณายืนยันตัวตน', 'ผู้ใช้งานยังไม่ได้ทำการยืนยันตัวตน กรุณายืนยันตัวตนด้วย', [
                {
                    text: 'Cancel'
                }, {
                    text: 'ยืนยันตัวตน',
                    onPress: () => this.gotoVerify()
                }
            ], { cancelable: false })
        }
        else if (this.state.status[0].SignInStatus === "0") {
            Alert.alert('ชื่อผู้ใช้หรือรหัสผ่านผิด!', 'กรุณากรอกชื่อผู้ใช้เเละรหัสผ่านให้ถูกต้อง', [
                {
                    text: 'ตกลง'
                }
            ], { cancelable: false })
        }
        else {
            Alert.alert('ยังไม่มีข้อมูลผู้ใช้งาน', 'กรุณาลงทะเบียนเพื่อเข้าใช้งาน', [
                {
                    text: 'Cancel'
                }, {
                    text: 'สมัครสมาชิก',
                    onPress: () => this.gotoRegister()
                }
            ], { cancelable: false })
        }
    }
    gotoVerify = () => {
        this.props.navigation.navigate('Verify')
    }
    gotoTabTeam = () => {
        this.props.navigation.navigate("TabRouter")
    }
    gotoDistance = () => {
        console.log(this.state.username)
        this.props.navigation.navigate('ControlDistance')
    }
    gotoRegister = () => {
        this.props.navigation.navigate('Register')
    }
    gotoResetPassword = () => {
        this.props.navigation.navigate('ResetPassword')
    }
    render() {
        return (
            <ImageBackground source={{ uri: "http://register.shutterrunning2014.com/assets/img/theme/dongtanbg.jpg" }}
                style={{ width: '100%', height: '100%', opacity: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.textTitle}>
                        ShutterRuning Service
                    </Text>
                </View>
                <View style={styles.formcontainer}>
                    <TextInput
                        placeholder="เลขบัตรประชาชน"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput}
                        onChangeText={(username) => this.setState({ username })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="รหัสผ่าน"
                        returnKeyType="go"
                        secureTextEntry
                        style={styles.input}
                        ref={(input) => this.passwordInput = input}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    <View style={styles.loginContainer}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={this.checkLoginSever.bind(this)}>
                            <Text style={styles.textButton}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={this.gotoRegister.bind(this)}>
                        <Text style={styles.regisButton}>
                            สมัครสมาชิก
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.gotoResetPassword.bind(this)}>
                        <Text style={styles.regisButton}>
                            ขอรหัสผ่านใหม่
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        login: state.login
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        setUsername: (username) => {
            dispatch({
                type: "setUsername",
                payload: username
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    textTitle: {
        fontFamily: 'kanit',
        fontSize: 34,
        color: '#fff',
        fontWeight: '700',
    },
    formcontainer: {
        flex: 2,
        padding: 20,
    },
    regisButton: {
        marginTop: 20,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: 'kanit'
    },
    input: {
        fontFamily: 'kanit',
        height: 40,
        backgroundColor: '#fff',
        opacity: 0.8,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    loginContainer: {
        alignItems: 'center',
    },
    buttonContainer: {
        height: 40,
        width: '75%',
        backgroundColor: '#4CD946',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '700',
        fontSize: 20,
        color: '#fff',
        fontFamily: 'kanit'
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
