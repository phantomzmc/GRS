import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'
import { connect } from 'react-redux'
import MailGunSend from '../../config/send-mailgun'

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid : "",
            password: "",
            email: "",
            verifycode: ""

        }
    }
    componentWillMount() {
        console.log(this.props.userprofile.userprofile.Password)
        console.log(this.props.userprofile.userprofile.Email)
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
        let { password, email } = this.state
        this.sentVerifyCode(email)
        this.props.sendNewCode(password, email)

        // let { password , email} = this.state
        // if (this.state.password === this.props.userprofile.userprofile.Password && this.state.email === this.props.userprofile.userprofile.Email) {
        //     this.alertSuccess()
        // }
        // else if (this.state.password !== this.props.userprofile.userprofile.Password) {
        //     this.alertUserIDError()
        // }
        // else if (this.state.email !== this.props.userprofile.userprofile.Email) {
        //     this.alertEmailError()
        // }
        // else if (this.state.password !== this.props.userprofile.userprofile.Password && this.state.email === this.props.userprofile.userprofile.Email) {
        //     this.alertAllError()
        // }
    }
    alertSuccess() {
        Alert.alert('ร้องขอรหัสสำเร็จ', 'กรุณาตรวจสอบ Email ของท่าน', [
            { text: 'ยืนยัน', onPress: () => this.props.goLogin() },
        ])
    }
    alertUserIDError() {
        Alert.alert('รหัสประชาชนไม่ถูกต้อง', 'กรุณากรอกรหัสประชาชนให้ถูกต้อง', [
            { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
        ])
    }
    alertEmailError() {
        Alert.alert('Email ไม่ถูกต้อง', 'กรุณากรอก Email ให้ถูกต้อง', [
            { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
        ])
    }
    alertAllError() {
        Alert.alert('รหัสประชาชนเเละEmail ไม่ถูกต้อง', 'กรุณากรอกรหัสประชาชนเเละ Email ให้ถูกต้อง', [
            { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
        ])
    }

    render() {
        let { password, email,userid } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.textTitle}>กรอก Email และรหัสผ่านใหม่ เพื่อใช้ในการเข้าสู่ระบบครั้งต่อไป</Text>
                    <Form style={styles.formInput}>
                        <Item floatingLabel>
                            <Label style={styles.textLabel}>รหัสบัตรประจำตัวประชาชน</Label>
                            <Input
                                onChangeText={userid => this.setState({ userid })}
                            />
                        </Item>
                    </Form>
                    <Form style={styles.formInput}>
                        <Item floatingLabel>
                            <Label style={styles.textLabel}>Email</Label>
                            <Input
                                onChangeText={email => this.setState({ email })}
                            />
                        </Item>
                    </Form>

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
        profile : state.profile
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm)