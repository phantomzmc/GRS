import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar, ImageBackground, AsyncStorage } from 'react-native';
import List from '../component/list/listevent/listevent'
import HeaderTeam from '../component/items/headerTeam'
import { YellowBox } from 'react-native';
import { connect } from 'react-redux'
import { NetworkInfo } from 'react-native-network-info';
import axios from 'axios'
import api_key from '../config/api_key'
import req from '../config/uri_req'

class ListEvent extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
        this.state = {
            isLoading: true,
            event: {
                name: "",
                date: "",
                tranferBank: ""
            },
            profile: "",
            token: "",
            ip: "",
            lat: "",
            long: "",
            title: "รายการวิ่ง"
        }

    }
    componentWillMount() {
        this.getNetwork()
        setTimeout(() => {
            this.checkLocalLogin()
        }, 500)
    }
    componentDidMount() {
        setTimeout(() => {
            this.getUserProfile()
        }, 2000)
    }

    async checkLocalLogin() {
        try {
            const value = await AsyncStorage.getItem('login');
            const parse = JSON.parse(value)
            if (value !== null) {
                // We have data!!
                console.log(value)
                console.log("test" + parse.username);
                console.log("test2 ")
                this.setState({ username: pared.username })
            }
            else if(value === null) {
                this.gotoLogin()
            }
        } 
        catch (error) {
            // Error retrieving data
        }
    }
    getNetwork() {
        NetworkInfo.getIPAddress(ip => {
            this.props.setIP(ip)
        });
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.props.setLatitude(position.coords.latitude)
                this.props.setLongitude(position.coords.longitude)
            })
    }
    setUserID = () => {
        console.log(this.props.profile.profile.userid)
        this.setState({ profile: this.props.profile.profile.userid })
    }
    checkTeamRegis() {
        if (this.props.event.event == "1") {
            console.log("TeamLogin")
            this.props.navigation.navigate('Login')
        } else if (this.props.event.event == "0") {
            console.log("SingleLogin")
            this.props.navigation.navigate('SingleLogin')
        }
    }
    gotoRegister = () => {
        console.log("gotoRegister")
        this.checkTeamRegis()
    }
    gotoSingleLogin = () => {
        this.props.navigation.navigate("SingleLogin")
    }
    gotoLogin = () => {
        this.props.navigation.navigate("Login")
    }
    checkUser = () => {
        if (this.state.profile == "") {
            console.log("checkLogin")
            this.props.navigation.navigate('ControlDistance')

            // this.gotoLogin()
        }
        else {
            this.props.navigation.navigate('ControlDistance')
        }
    }
    getUserProfile = (username) => {
        console.log(this.props.token.token)
        console.log(this.props.username)
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
                console.log("success")
                this.setState({ isLoading: false, user: responseJson.data });
                console.log(this.state.user)
                this.props.setUserProfile(this.state.user[0])
            }).catch((error) => {
                console.log("error")
                this.setState({
                    fullname: "ชื่อ",
                    lastname: "นามสกุล",
                    gen: "เพศ",
                    age: "อายุ",
                })
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <HeaderTeam
                    title={this.state.title}
                    menu={true}
                    statusRegis={false}
                    goback={false}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={false}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}
                />
                <List
                    CheckLogin={this.checkUser.bind(this)}
                    Profile={this.state.profile}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        event: state.event,
        token: state.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCreateToken: (token) => {
            dispatch({
                type: "setCreateToken",
                payload: token
            })
        },
        setIP: (ip) => {
            dispatch({
                type: "setIP",
                payload: ip
            })
        },
        setLatitude: (lat) => {
            dispatch({
                type: "setLatitude",
                payload: lat
            })
        },
        setLongitude: (long) => {
            dispatch({
                type: "setLongitude",
                payload: long
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
        },
        setUsername: (username) => {
            dispatch({
                type: "setUsername",
                payload: username
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(ListEvent);
