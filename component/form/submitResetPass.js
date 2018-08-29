import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'
import { connect } from 'react-redux'
import CodeInput from 'react-native-confirmation-code-input';

class SubmitResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: "",
            password: "",
            email: "",
            verifycode: ""

        }
    }

    async sentVerifyCode(email) {
        const data = await MailGunSend.onSendMail({
            'from': 'Guurun Support Team. <support@guurun.com>',
            'to': email,
            'subject': 'Guurun Support Team รหัสในการเปลี่ยนรหัสผ่าน',
            'text': 'สวัสดีคุณ รหัสที่ใช้ในการเปลี่ยนรหัสผ่านของผู้ใช้งานคือ : ' + this.props.profile.newpassword
        })
        console.log(data)
    }
    checkResetVerify() {
    }

    render() {
        let { password, email, userid } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.inputWrapper1}>
                    <Text style={styles.textTitle}>กรอก Email และรหัสผ่านใหม่ เพื่อใช้ในการเข้าสู่ระบบครั้งต่อไป</Text>

                        <CodeInput
                            ref="codeInputRef1"
                            secureTextEntry
                            className={'border-b'}
                            codeLength={6}
                            space={5}
                            size={30}
                            inputPosition='center'
                            activeColor="#000"
                            inactiveColor="#c0c0c0"
                            onFulfill={(code) => this.setState(code)}
                        />
                    </View>


                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => this.checkResetVerify(userid, email)}
                        >
                            <Text style={styles.textButton}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userprofile: state.userprofile,
        profile: state.profile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setVerify: (verifycode) => {
            dispatch({
                type: "setVerify",
                payload: verifycode
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10
    },
    content: {
        padding: 20
    },
    textTitle: {
        fontFamily: 'kanit',
        fontSize: 16,
        textAlign: 'center'
    },
    textLabel: {
        fontFamily: 'kanit'
    },
    submitContainer: {
        marginTop: 30,
        alignItems: "center",
        marginBottom: 30,
        marginHorizontal: 20
    },
    buttonContainer: {
        height: 40,
        width: "100%",
        backgroundColor: "#FC561F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    textButton: {
        fontWeight: "700",
        fontSize: 16,
        color: "#fff",
        fontFamily: "kanit"
    },
    inputWrapper1: {
        paddingVertical: 50,
        paddingHorizontal: 20,
      },
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitResetPassword)