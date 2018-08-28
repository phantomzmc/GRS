import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Alert, StatusBar, AsyncStorage, RefreshControl } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Button } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import Login from '../container/login'
import axios from "axios";
import req from '../config/uri_req'
import api from '../config/api_key'
import RegisterDistance from '../container/registerDistance'
import SummaryTotal from '../component/items/summary'
import HeaderTeam from '../component/items/headerTeam'

class ControlDistance extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            title: "ลงทะเบียนวิ่ง",
            pageNumber: 0,
            login: 1,
            register: false,
        }
        this.goAddTeam = this.goAddTeam.bind(this)
    }
    componentDidMount() {
        setTimeout(()=> {
            this.fetchRegisEvent()
        },2000)
        this.fetchRegisEvent()
    }

    fetchRegisEvent() {
        let userprofile = this.props.userprofile.userprofile
        let event = this.props.event.event
        const uri = req[0].uspCheckRegisterEvent
        const apikey = api[0].api_key
        let data = ({
            params: [
                { name: "EventID", value: event.EventID },
                { name: "RunnerID", value: userprofile.RunnerID }
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, data: responseJson.data[0], });
                console.log(this.state.data)
                this.props.setRegisterStatus(this.state.data)
                this.checkRegisEvent(this.state.data)
            }).catch((error) => {
                this.goListEvent()
            });
    }

    checkRegisEvent(data) {
        if (data.RegisterStatus == "1") {
            this.setState({ register: false })
            Alert.alert("มีการสมัครลงทะเบียนแล้ว", "ผู้ใช้ได้ทำการสมัครรายการ " + this.props.event.event.EventName + " แล้ว", [
                {
                    text: "ไปยังรายการวิ่ง",
                    onPress: () => this.goListEvent()
                },
                {
                    text: "ลงทะเบียนแบบกลุ่ม",
                    onPress: () => this.goAddTeam()
                },
            ], { cancelable: true })

        }
        else if (data.RegisterStatus == "0") {
            this.setState({ register: true })

        }
    }
    goListEvent = () => {
        this.props.navigation.navigate("EventList")
    }
    goLogin = () => {
        console.log(this.state.login)
        this.props.setLogin(this.state.login)
        this.props.navigation.navigate("Login")
    }
    goNextState = () => {
        if (this.state.register == true) {
            this.props.navigation.navigate('ShirtPhotoPlus')
        }
        else if (this.state.register == false) {
            console.log("flase")
        }
    }


    goSingleLogin = () => {
        this.props.navigation.navigate('SingleLogin')
    }
    goAddTeam() {
        console.log("Team")
        if (this.props.profile.statuslogin == 1) {
            this.props.navigation.navigate('TeamList')
        }
        else {
            Alert.alert("ลงทะเบียนแบบกลุ่ม", "การลงทะเบียนแบบกลุ่มจะต้องทำการเข้าสู่ระบบก่อน", [
                {
                    text: "Cancel"
                },
                {
                    text: "เข้าสู่ระบบ",
                    onPress: () => this.goLogin()
                },
            ], { cancelable: false })
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderTeam
                    title={this.state.title}
                    menu={true}
                    statusRegis={true}
                    goback={this.goSingleLogin.bind(this)}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}
                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <Tabs
                    initialPage={this.state.pageNumber}
                    tabBarUnderlineStyle={{ backgroundColor: "#FC561F", height: 2 }}>
                    <Tab
                        heading={<TabHeading><Text style={styles.textLabel}>ลงทะเบียนแบบเดียว</Text></TabHeading>}>
                        <RegisterDistance
                            nextState={this.goNextState.bind(this)}
                            statusRegis={this.state.statusRegis}
                        />
                    </Tab>
                    <Tab
                        heading={<TabHeading><Text style={styles.textLabel} onPress={() => this.goAddTeam()}>ลงทะเบียนแบบกลุ่ม</Text></TabHeading>}
                    >
                    </Tab>
                </Tabs>
                <SummaryTotal />
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        profile: state.profile,
        event: state.event,
        userprofile: state.userprofile,
        token: state.token
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setLogin: (login) => {
            dispatch({
                type: "setLogin",
                payload: login
            })
        },
        setRegisterStatus: (status) => {
            dispatch({
                type: "setRegisterStatus",
                payload: status
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    textLabel: {
        color: '#FC561F',
        fontSize: 12,
        fontFamily: 'kanit',
    },
    button: {
        padding: 5,
        fontSize: 10,
        fontFamily: 'kanit',
        borderColor: '#FC561F',
        borderRadius: 5,
        borderWidth: 1,
        color: '#FC561F',
        backgroundColor: '#fff',
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlDistance);
