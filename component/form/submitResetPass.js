import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { Container, Button, Form, Input, Item, Label } from 'native-base'
import { connect } from 'react-redux'
import CodeInput from 'react-native-confirmation-code-input';

class SubmitResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: ""

        }
    }

    checkEncode() {
        let { code } = this.state
        if (code != "" && code.length == 6) {
            console.log(this.state.code)
            this.props.codesubmit(this.state.code)
        }
        else if (code == "" || code.length < 6 || code.length > 6) {
            Alert.alert('กรุณากรอกรหัสยืนยันให้ถูกต้อง', 'กรุณาตรวจสอบรหัสยืนยันทาง Email ให้ถูกต้อง', [
                { text: 'ลองอีกครั้ง', onPress: () => console.log('ลองอีกครั้ง') },
            ])
        }

    }


    render() {
        let { code } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.inputWrapper1}>
                        <Text style={styles.textTitle}>กรอก Code ที่ได้รับจาก Email เพื่อยืนยันการเปลี่ยนรหัสผ่าน</Text>
                    </View>
                    <Form style={styles.formInput}>
                        <Item floatingLabel>
                            <Label style={styles.textLabel}></Label>
                            <Input
                                onChangeText={code => this.setState({ code })}
                            />
                        </Item>
                    </Form>

                    <View style={styles.submitContainer}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => this.checkEncode(code)}
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