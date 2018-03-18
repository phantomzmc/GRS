import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Alert, TextInput } from 'react-native';
import LoginForm from '../component/form/loginForm'

class Login extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor (props){
        super (props)
        this.state = {
            username : "" ,
            password : ""   
        }
    }
    checkLogin() {
        if (this.state.username === "Admin" && this.state.password === "1234") {
            this.gotoListEvent()
        } else {
            Alert.alert(
                'เกิดข้อผิดพลาด',
                'การเข้าสู่ระบบผิดพลาด',
                [
                    { text: 'Cancel' },
                    { text: 'สมัครสมาชิก'},
                ],
                { cancelable: false }
            )
        }
    }
    gotoListEvent = () => {
        this.props.navigation.navigate('ListEvent')
    }
    gotoRegister = () => {
        this.props.navigation.navigate('Register')
    }
    render() {
        return (
            <ImageBackground source={{ uri: "http://register.shutterrunning2014.com/assets/img/theme/dongtanbg.jpg" }}
                style={{ width: '100%', height: '100%', opacity: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.textTitle}
                        onPress={this.gotoListEvent}>
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
                    <TouchableOpacity>
                        <Text style={styles.regisButton}>
                            สมัครสมาชิก
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    textTitle: {
        fontSize: 34,
        color: '#fff',
        fontWeight: '700',
    },
    formcontainer: {
        flex: 2,
        padding: 20,
    },
    regisButton: {
        color: '#fff',
        alignSelf: 'center',
        
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        opacity: 0.8,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
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
        borderRadius: 10,
    },
      textButton: {
        fontWeight: '700',
        fontSize: 20,
        color: '#fff',
    
    }
})
export default Login
