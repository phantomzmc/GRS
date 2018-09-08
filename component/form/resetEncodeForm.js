import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'
import { connect } from 'react-redux'
import MailGunEncode from '../../config/encode-mailgun'
class ResetEncodeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: "",
            password: "",
            email: "",
            verifycode : "",
            verifycode2: "8KPzd9cGcy"

        }
    }
    async sentEncode(email) {
        const data = await MailGunEncode.onSendEncode({
            'from': 'Guurun Support Team. <support@guurun.com>',
            'to': email,
            'subject': 'Guurun Support Team รหัสในการเปลี่ยนรหัสผ่าน',
            'text': 'สวัสดีคุณ ' + email + ' รหัสที่ใช้ในการเปลี่ยนรหัสผ่านของผู้ใช้งานคือ : ' + this.props.profile.newpassword
        })
        console.log(data)
    }
    checkResetVerify() {
        let { password, email, userid } = this.state
        if (email != "" && userid != "") {
            this.sentEncode(email)
            this.props.setEmail(email)
            setTimeout(()=>{
                this.alertSuccess()
                this.props.sendNewCode(userid, email)
            },1000)
        }
        else if (email == "" && userid == "") {
            Alert.alert('ร้องขอรหัสไม่สำเร็จ', 'กรุณากรอก Emailและรหัสบัตรประจำตัวประชาชน ของท่าน', [
                { text: 'ตกลง' },
            ])
        }
        else if (email == "") {
            Alert.alert('ร้องขอรหัสไม่สำเร็จ', 'กรุณากรอก Email ของท่าน', [
                { text: 'ตกลง' },
            ])
        }
        else if (userid == "") {
            Alert.alert('ร้องขอรหัสไม่สำเร็จ', 'กรุณากรอกรหัสบัตรประจำตัวประชาชนของท่าน', [
                { text: 'ตกลง' },
            ])
        }
    }
    alertSuccess() {
        Alert.alert('ร้องขอรหัสสำเร็จ', 'กรุณาตรวจสอบ Email ของท่าน', [
            { text: 'ยืนยัน', onPress: () => this.props.goLogin() },
        ])
    }

    render() {
        let { password, email, userid } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.textTitle}>กรอก Email และรหัสผ่านใหม่ เพื่อใช้ในการเข้าสู่ระบบครั้งต่อไป : {this.props.profile.newpassword}</Text>
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
        },
        setEmail: (email) => {
            dispatch({
                type: "setEmail",
                payload: email
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetEncodeForm)