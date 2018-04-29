import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Alert, TextInput } from 'react-native';
import LoginForm from '../component/form/loginForm'

import { connect } from 'react-redux'

class Login extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }
    componentWillMount() {
        console.log("statusVerify : " + this.props.profile.verify.statusVerify)
    }
    checkLogin() {
        if (this.state.username === this.props.profile.profile.userid && this.state.password === this.props.profile.profile.password && this.props.profile.verify.statusVerify === 1) {
            this.gotoListEvent()
        }
        else if (this.props.profile.verify.statusVerify === 0) {
            Alert.alert('ยังไม่มีข้อมูลผู้ใช้งาน', 'ผู้ใช้งานยังไม่ได้ทำการยืนยันตัวตน กรุณายืนยันตัวตนด้วย', [
                {
                    text: 'Cancel'
                }, {
                    text: 'ยืนยันตัวตน',
                    onPress: () => this.gotoVerify()
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
    gotoListEvent = () => {
        console.log(this.state.username)
        this.props.navigation.navigate('EventList')
    }
    gotoRegister = () => {
        this.props.navigation.navigate('Register')
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
                            onPress={this.checkLogin.bind(this)}>
                            <Text style={styles.textButton}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this.gotoRegister.bind(this)}>
                        <Text style={styles.regisButton}>
                            สมัครสมาชิก
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
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
export default connect(mapStateToProps)(Login)
