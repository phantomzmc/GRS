import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Alert, StatusBar, AsyncStorage, Linking } from 'react-native';
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
        }
        this.goAddTeam = this.goAddTeam.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.checkEventStatus()
        }, 1000)
        this.props.setTotal(0)
        this.props.setTotalEvent(0)
        this.props.setTotalPromo(0)
        this.props.setTotalRegister(0)

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
            if (this.props.event.event.GroupRegister == 1) {
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
            else if (this.props.event.event.GroupRegister == 0) {
                Alert.alert("มีการสมัครลงทะเบียนแล้ว", "ผู้ใช้ได้ทำการสมัครรายการ " + this.props.event.event.EventName + " แล้ว", [
                    {
                        text: "ไปยังรายการวิ่ง",
                        onPress: () => this.goListEvent()
                    }
                ], { cancelable: true })
            }
        }
    }
    checkEventStatus() {
        let event = this.props.event.event
        const uri = req[0].uspGetEvent
        const apikey = api[0].api_key
        let data = ({
            params: [
                { name: "EventID", value: event.EventID },
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
                this.setState({ status: responseJson.data, });
                console.log(this.state.status)
                this.alertStatusEvent(responseJson.data)
            }).catch((error) => {
                this.goListEvent()
            });
    }
    alertStatusEvent(status) {
        if (status[0].EventStatus == "2") {
            Alert.alert("รายการนี้มีผู้สมัครเต็มจำนวนแล้ว", "ผุ้ใช้งานสามารถสมัครรายการอื่นหรือตรวจสอบรายชื่อได้ที่นี่ ", [
                {
                    text: "รายการวิ่งอื่น",
                    onPress: () => Linking.openURL('http://shutterrunning2014.com/')
                },
                {
                    text: "ตรวจสอบรายชื่อ",
                    onPress: () => this.goRegisterInfo()
                },
            ], { cancelable: true })
        }
        else if ((status[0].EventStatus == "1")) {
            this.fetchRegisEvent()
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
        this.props.navigation.navigate('ShirtPhotoPlus')

    }
    goSingleLogin = () => {
        this.props.navigation.navigate('SingleLogin')
    }
    goRegisterInfo = () => {
        this.props.navigation.navigate('RegisterInfo')
    }
    async goAddTeam() {
        if (this.props.event.event.GroupRegister == 1) {
            try {
                const value = await AsyncStorage.getItem('login');
                if (value !== null) {
                    this.props.navigation.navigate('TeamList')
                }
                else if (value === null) {
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
            catch (error) {
            }
        }
        else if (this.props.event.event.GroupRegister == 2) {
            Alert.alert("ไม่มีลงทะเบียนแบบกลุ่ม", "รายการวิ่งนี้ไม่ได้เปิดให้ลงทะเบียนแบบกลุ่ม", [
                {
                    text: "ตกลง"
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
                    goback={() => this.props.navigation.navigate("EventList")}
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
                {this.props.event.event.GroupRegister == 1 ?
                    <Tabs
                        initialPage={this.state.pageNumber}
                        tabBarUnderlineStyle={{ backgroundColor: "#FC561F", height: 2 }}>
                        <Tab
                            heading={<TabHeading><Text style={styles.textLabel}>ลงทะเบียนแบบเดียว</Text></TabHeading>}>
                            <RegisterDistance
                                nextState={this.goNextState.bind(this)}
                            />
                        </Tab>
                        <Tab
                            heading={<TabHeading><Text style={styles.textLabel} onPress={() => this.goAddTeam()}>ลงทะเบียนแบบกลุ่ม</Text></TabHeading>}>
                        </Tab>
                    </Tabs>
                    :
                    <RegisterDistance
                        nextState={this.goNextState.bind(this)}
                    />
                }

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
        },
        setTotalEvent: (totalEvent) => {
            dispatch({
                type: "setTotalEvent",
                payload: totalEvent
            })
        },
        setTotal: (total) => {
            dispatch({
                type: "setTotal",
                payload: total
            })
        },
        setTotalPromo: (totalPromo) => {
            dispatch({
                type: "setTotalPromo",
                payload: totalPromo
            })
        },
        setTotalRegister: (totalRegeis) => {
            dispatch({
                type: "setTotalRegister",
                payload: totalRegeis
            })
        },
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
