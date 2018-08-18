import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    Alert,
    TextInput,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Header, Left, Right, Icon, Button, Body, Title, Container } from "native-base";
import axios from 'axios'
import HeaderTeam from '../component/items/headerTeam'
import api from '../config/api_key'
import req from '../config/uri_req'

class SingleLogin extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            status: [],
            title: "เข้าสู่ระบบ"
        }
    }
    checkLoginSever() {
        let { status, username } = this.state
        let uri = req[0].uspCheckUsername
        let data = ({
            params: {
                value: username,
            }
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": api[0].api_key,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, status: response.data });
                this.checkLogin()
            }).catch((error) => {
                this.gotoEvent()
            });
    }
    checkLogin() {
        if (this.state.status[0].UsernameStatus == "2") {
            this.props.setUsername(this.state.username)
            this.gotoListEvent()
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
    gotoEvent = () => {
        this.props.navigation.navigate('EventList')
    }
    gotoListEvent = () => {
        this.props.navigation.navigate('ControlDistance')
    }
    gotoRegister = () => {
        this.props.navigation.navigate('Register')
    }
    gotoVerify = () => {
        this.props.navigation.navigate('Vefify')
    }
    gotoRegisInfo = () => {
        this.props.navigation.navigate('RegisterInfo')
    }

    render() {
        return (
            <View>

                <ImageBackground
                    source={{
                        uri: "http://register.shutterrunning2014.com/assets/img/theme/dongtanbg.jpg"
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        opacity: 1
                    }}>
                    <StatusBar
                        barStyle="light-content"
                        hidden={false}
                        translucent={true}
                    />
                    <Header style={{ backgroundColor: 'transparent' }}>
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back' style={{ color: "#fff" }} onPress={this.gotoEvent.bind(this)} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.title}>{this.state.title}</Title>
                        </Body>
                        <Right>

                        </Right>
                    </Header>
                    <KeyboardAwareScrollView>
                        <Container>
                            <View style={styles.container}>
                                <Text style={styles.textTitle} onPress={this.gotoListEvent}>
                                    ShutterRuning Service
                    </Text>
                            </View>
                            <View style={styles.formcontainer}>
                                <TextInput
                                    placeholder="เลขบัตรประชาชน"
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.passwordInput}
                                    onChangeText={(username) => this.setState({ username })}
                                    style={styles.input} />
                                <View style={styles.loginContainer}>
                                    <TouchableOpacity
                                        onPress={this.checkLoginSever.bind(this)}>
                                        <View style={styles.buttonContainer}>
                                            <Text style={styles.textButton}>เข้าร่วมกิจกรรม</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={this
                                        .gotoRegister
                                        .bind(this)}>
                                    <Text style={styles.regisButton}>
                                        สมัครสมาชิก
                        </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this
                                        .gotoRegisInfo
                                        .bind(this)}>
                                    <Text style={styles.regisButton}>
                                        ตรวจสอบรายชื่อ
                        </Text>
                                </TouchableOpacity>
                            </View>
                        </Container>
                    </KeyboardAwareScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
    },
    textTitle: {
        fontSize: 34,
        color: '#fff',
        fontWeight: '700',
        fontFamily: 'kanit'
    },
    formcontainer: {
        flex: 2,
        padding: 20,
        borderRadius: 15
    },
    regisButton: {
        padding: 10,
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
        borderRadius: 20
    },
    loginContainer: {
        margin: 20,
        alignItems: 'center'
    },
    buttonContainer: {
        paddingHorizontal: 50,
        height: 40,
        width: '100%',
        backgroundColor: '#4CD946',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        fontFamily: 'kanit'

    },
    title: {
        fontFamily: "kanit",
        color: "#fff",
        fontSize: 16,
    }
})

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        token: state.token
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleLogin)
