import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'

class ResetEncodeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "",
            confirmpassword: ""
        }
    }

    checkPassword() {
        let { password, confirmpassword } = this.state
        if (password === confirmpassword) {
            this.props.sendNewCode(password)
        }
        else if (password !== confirmpassword) {
            this.alertError()
        }
        else if ((password !== "" || password.length < 8) || (confirmpassword !== "" || confirmpassword.length < 8)) {
            this.alertError1()

        }
    }
    alertError() {
        Alert.alert('รหัสผ่านไม่ตรงกัน', 'กรุณากรอกรหัสผ่านให้ตรงกัน', [
            { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
        ])
    }
    alertError1() {
        Alert.alert('รหัสผ่านไม่ถูกต้อง', 'กรุณากรอกรหัสผ่านให้มากกว่า 8 ตัว', [
            { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
        ])
    }


    render() {
        let { password, confirmpassword } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.textTitle}>กรอก รหัสผ่านใหม่ เพื่อใช้ในการเข้าสู่ระบบครั้งต่อไป</Text>
                    <Form style={styles.formInput}>
                        <Item floatingLabel>
                            <Label style={styles.textLabel}>รหัสผ่านใหม่</Label>
                            <Input
                                secureTextEntry
                                onChangeText={password => this.setState({ password })}
                            />
                        </Item>
                    </Form>
                    <Form style={styles.formInput}>
                        <Item floatingLabel>
                            <Label style={styles.textLabel}>ยืนยันรหัสผ่าน</Label>
                            <Input
                                secureTextEntry
                                onChangeText={confirmpassword => this.setState({ confirmpassword })}
                            />
                        </Item>
                    </Form>

                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => this.checkPassword(password, confirmpassword)}
                        >
                            <Text style={styles.textButton}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
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

export default ResetEncodeForm