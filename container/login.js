import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert, TextInput, StatusBar, AsyncStorage, Platform } from 'react-native';
import { Header, Left, Right, Icon, Button, Body, Title, Container, Form, Item, Input, Label } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import randomstringPromise from 'randomstring-promise/react-native';
import { connect } from 'react-redux'
import axios from 'axios'
import req from '../config/uri_req'
import api_key from '../config/api_key'

class Login extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username !== null ? "" : this.props.profile.profile.userid,
            password: "",
            status: [],
            login: 1,
            title: "เข้าสู่ระบบ"
        }
    }
    componentWillMount() {
        this.getUsername()
        if (this.props.username.username == "" && this.props.profile.profile.userid == "") {
            this.setState({ username: "" })
        }
    }
    componentDidMount() {
        this.onConnect()
    }
    onConnect() {
        let uri = req[0].session_token;
        return axios.post(uri, {
            email: "admin@guurun.com",
            password: "WXbrD28LtIR3MYm"
        },
            {
                responseType: 'json'
            })
            .then((response) => {
                console.log(response)
                token = response.data.session_token
                this.props.setCreateToken(response.data.session_token)
            })
    }

    checkLoginSever() {
        let { username, password } = this.state
        console.log(username + password)
        let uri = req[0].uspSignIn
        let apikey = api_key[0].api_key
        let data = ({
            params: [
                { name: "Username", value: username },
                { name: "Password", value: password }
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
                this.setState({ isLoading: false, status: response.data });
                console.log(this.state.status)
                console.log(this.state.status[0].SignInStatus)
                // this.checkLogin()

                // ระบบ login error
                this.getUserProfile()
                this.props.setUsername(this.state.username)
                this.props.setUserStatus(status[0])
                this.props.setStatusLogin(login)
                this.setLogin()
                this.gotoEvent()
                // ระบบ login error


            }).catch((error) => {
                this.props.navigation.navigate('EventList')
            });
    }
    getUserProfile() {
        let { username } = this.state
        let uri = req[0].uspGetUserProfile
        let apikey = api_key[0].api_key

        let data = ({
            params: {
                value: username,
            }
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((responseJson) => {
                this.setState({ isLoading: false, user: responseJson.data });
                console.log(this.state.user)
                this.props.setUserProfile(this.state.user[0])
                this.setData()
            }).catch((error) => {
                this.setState({
                    fullname: "ชื่อ",
                    lastname: "นามสกุล",
                    gen: "เพศ",
                    age: "อายุ",
                })
            });
    }
    checkLogin() {
        let { status, login } = this.state
        if (status[0].SignInStatus === "1" && status[0].ActivateStatus === "1") {
            this.getUserProfile()
            this.props.setUsername(this.state.username)
            this.props.setUserStatus(status[0])
            this.props.setStatusLogin(login)
            this.setLogin()
            this.gotoEvent()
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

    async setLogin() {
        let username = {
            username: this.state.username,
            password: this.state.password,
            statusLogin: 1
        }
        await AsyncStorage.setItem('login', JSON.stringify(username));
    }
    async getUsername() {
        try {
            const value = await AsyncStorage.getItem('login');
            if (value !== null) {
                let pared = JSON.parse(value)
                console.log(pared.username);
                this.setState({ username: pared.username })
            }

        } catch (error) {
            // Error retrieving data
        }
    }
    setData() {
        var date1 = new Date()
        var date2 = new Date(this.props.userprofile.userprofile.DateOfBirth)
        var age = parseInt((date1 - date2) / 31557600000)

        this.setState({
            fullname: this.props.userprofile.userprofile.FirstName,
            lastname: this.props.userprofile.userprofile.LastName,
            gen: this.props.userprofile.userprofile.Gender,
            age: age
        })
    }
    gotoVerify = () => {
        this.props.navigation.navigate('Verify')
    }
    gotoTabTeam = () => {
        this.props.navigation.navigate("TeamList")
    }
    gotoControlDistance = () => {
        this.props.navigation.navigate("ControlDistance")
    }
    gotoDistance = () => {
        console.log(this.state.username)
        this.props.navigation.navigate('ControlDistance')
    }
    gotoRegister = () => {
        this.props.navigation.navigate('Register')
    }
    gotoResetPassword = () => {
        this.props.navigation.navigate('ResetEncode')
    }
    gotoEvent = () => {
        this.props.navigation.navigate('EventList')
    }
    gotoRegisInfo = () => {
        this.props.navigation.navigate('RegisterInfo')
    }
    render() {
        return (
            <ImageBackground source={{ uri: "http://register.shutterrunning2014.com/assets/img/theme/dongtanbg.jpg" }}
                style={{ width: '100%', height: '115%', opacity: 1 }}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />

                <Header androidStatusBarColor="#2c3e50" style={{ backgroundColor: 'none', marginTop: Platform.OS === 'ios' ? 0 : 15 }}>
                    <Left>

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
                            <Text style={styles.textTitle}>
                                ShutterRuning Service
                             </Text>
                        </View>
                        <View style={styles.formcontainer}>
                            <View style={styles.formcontainer2}>
                                <Form>
                                    <Item floatingLabel>
                                        <Label style={{ fontFamily: 'Kanit' }}>รหัสบัตรประจำตัวประชาชน : {this.state.username}</Label>
                                        <Input
                                            returnKeyType="next"
                                            onSubmitEditing={() => this.passwordInput}
                                            onChangeText={(username) => this.setState({ username: username })}
                                            style={Platform.OS === 'ios' ? styles.input : styles.inputAndroid}
                                        />
                                    </Item>
                                    <Item floatingLabel>
                                        <Label style={{ fontFamily: 'Kanit' }}>รหัสผ่าน : </Label>
                                        <Input
                                            returnKeyType="go"
                                            secureTextEntry
                                            style={Platform.OS === 'ios' ? styles.input : styles.inputAndroid}
                                            ref={(input) => this.passwordInput = input}
                                            onChangeText={(password) => this.setState({ password })}
                                        />
                                    </Item>
                                </Form>

                                <View style={styles.loginContainer}>
                                    {/* <TouchableOpacity style={styles.buttonContainer}
                                        onPress={this.checkLoginSever.bind(this)}>
                                        <Text style={styles.textButton}>Login</Text>
                                    </TouchableOpacity> */}
                                    <Button block success onPress={this.checkLoginSever.bind(this)}>
                                        <Text style={styles.textButton}>Login</Text>
                                    </Button>
                                </View>
                                <TouchableOpacity onPress={this.gotoRegister.bind(this)}>
                                    <Text style={styles.regisButton}>สมัครสมาชิก</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.gotoResetPassword.bind(this)}>
                                    <Text style={styles.regisButton}>ขอรหัสผ่านใหม่</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </Container>
                </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        login: state.login,
        token: state.token,
        username: state.username,
        userprofile: state.userprofile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUsername: (username) => {
            dispatch({
                type: "setUsername",
                payload: username
            })
        },
        setUserStatus: (staus) => {
            dispatch({
                type: "setUserStatus",
                payload: staus
            })
        },
        setCreateToken: (token) => {
            dispatch({
                type: "setCreateToken",
                payload: token
            })
        },
        setStatusLogin: (login) => {
            dispatch({
                type: "setStatusLogin",
                payload: login
            })
        },
        setUserProfile: (userprofile) => {
            dispatch({
                type: "setUserProfile",
                payload: userprofile
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
        fontFamily: 'Kanit',
        fontSize: 34,
        color: '#fff',
    },
    formcontainer: {
        flex: 4,
        paddingHorizontal: 20,

    },
    formcontainer2: {
        marginTop: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingBottom: 20
    },
    regisButton: {
        marginTop: 20,
        color: '#000',
        alignSelf: 'center',
        fontFamily: 'Kanit'
    },
    input: {
        fontFamily: 'Kanit',
        marginBottom: 10,
    },
    inputAndroid: {
        fontFamily: 'Kanit',
        marginBottom: 10,
    },
    loginContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 10
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
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Kanit'
    },
    title: {
        fontFamily: "Kanit",
        color: "#fff",
        fontSize: 16,
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
