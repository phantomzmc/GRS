import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, StatusBar, Easing, Dimensions, TouchableHighlight, Image, AsyncStorage, ScrollView, Platform } from "react-native";
import { Thumbnail, Header, Left, Body, Right, Button, Icon, Title, Text, View } from 'native-base';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Drawer from 'react-native-drawer-menu';
import { connect } from "react-redux";

const { width, height } = Dimensions.get('window');

class HeaderTeam extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    state = {
        iconBack: false,
        statusModal: false,
        nameUser: "ข้อมูลส่วนตัว",
        statusMenu: false,
        statusCheckLogin: false,
        statusCheckLogin2: true,
        uri: "",
        statusLogin: "",
        profile: {
            FirstName: "ชื่อ",
            LastName: "นามสกุล",
            Gender: "เพศ",
            DateOfBirth: "อายุ",
            PicProfile: "",
            BackgroundProfile: "",
            Username: ""
        }
    }
    _menu = null;
    componentWillMount() {
        this.getUsername()

    }
    componentDidMount() {
        {
            this.props.userprofile.userprofile.PicProfile == "" ?
                this.setState({ nameUser: "ข้อมูลส่วนตัว" }) :
                this.setState({ uri: this.props.userprofile.userprofile.PicProfile, nameUser: this.props.userprofile.userprofile.FirstName })
        }
        this.setState({ title: this.props.title, statusMenu: this.props.menu, })
    }
    async getUsername() {
        try {
            const value = await AsyncStorage.getItem('login');
            if (value !== null) {
                let pared = JSON.parse(value)
                console.log(pared.statusLogin);
                this.setState({ statusLogin: pared.statusLogin })
            }

        } catch (error) {
            // Error retrieving data
        }
    }
    onPressGoBack() {
        this.props.goback()
    }
    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };
    checkStatusLogin() {
        this.setState({ nameUser: this.props.userprofile.userprofile.FirstName, uri: this.props.userprofile.userprofile.PicProfile })
        if (this.state.statusLogin == "1") {
            this.setState({ statusCheckLogin2: true, statusCheckLogin: false })
            console.log(this.state.statusCheckLogin)
            // this._menu.show();
        }
        else if (this.state.statusLogin == "0") {
            this.setState({ statusCheckLogin: true, statusCheckLogin2: false })
            console.log(this.state.statusCheckLogin)
            // this.props.goLogin()
        }
    }
    showMenu = () => {
        this._menu.show();
        this.checkStatusLogin()
    };
    gotoProfile = () => {
        this.props.goEditProfile()
        this._menu.hide();
        // this.checkLogin(goSuccess)
    }
    gotoFriendlist = () => {
        this.props.goFriendlist()
        this._menu.hide();
        // this.checkLogin(goSuccess)
    }
    gotoHistory = () => {
        this.props.goHistory()
        this._menu.hide();
        // this.checkLogin(goSuccess)
    }
    gotoRegis = () => {
        this.props.goRegis()
        this._menu.hide();
        // this.checkLogin(goSuccess)
    }
    gotoLogout = () => {
        this.props.goLogin()
        this.userLogout()
        this._menu.hide();
    }
    gotoContacts = () => {
        this.props.goContacts()
        this._menu.hide()
    }
    async userLogout() {
        let friendEvent = {
            RunnerID: "",
            CourseID: "",
            JerseySize: "",
            PhotoPlusService: "",
            PromoCode: "",
            CourseFee: "",
        }
        let fullfriendEvent = [{
            RunnerID: "",
            firstname: "",
            lastname: "",
            CourseID: "",
            JerseySize: "",
            PhotoPlusService: "",
            PromoCode: "",
            nameRegis: "",
            CourseFee: "",
        }]
        await AsyncStorage.removeItem('login');
        this.props.setUsername("")
        this.props.setImageProfile("")
        this.props.setImageBackground("")
        this.props.addFriendInEvent(friendEvent)
        this.props.addFullFriendInEvent(fullfriendEvent)
        this.props.setUserProfile(this.state.profile)
        this.props.setFriendRegister("")
    }

    render() {
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <Header androidStatusBarColor="#FC561F" style={styles.header}>
                    <Left>
                        {this.props.goback == false ?
                            <View></View>
                            :
                            <Button transparent onPress={this.onPressGoBack.bind(this)}>
                                <Icon name='arrow-back' style={{ color: "#fff" }} />
                            </Button>
                        }
                    </Left>
                    <Body>
                        <Title style={styles.title}>{this.props.title}</Title>
                    </Body>
                    <Right>
                        {this.state.statusMenu &&
                            <Menu
                                ref={this.setMenuRef}
                                style={{ width: 300, height: 400 }}
                                button=
                                {
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name='options-vertical' type='SimpleLineIcons' style={{ fontSize: 18, color: "#fff" }} onPress={this.showMenu} />
                                    </View>
                                }
                            >


                                <ScrollView>
                                    {this.props.statusRegis == false ?
                                        <View></View> :
                                        <MenuItem onPress={this.gotoProfile} >
                                            <Icon name='user-circle' type='FontAwesome' style={{ fontSize: 18 }} />
                                            {/* // <Image source={{ uri: this.state.uri }} style={{ width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center" }} /> */}

                                            <Text style={styles.item_menu}>  {this.state.nameUser}</Text>
                                        </MenuItem>
                                    }
                                    <MenuDivider />
                                    <MenuItem onPress={this.gotoProfile}>
                                        <Icon name='user-circle' type='FontAwesome' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  ข้อมูลส่วนตัว</Text>
                                    </MenuItem>
                                    <MenuItem onPress={this.gotoFriendlist}>
                                        <Icon name='group' type='FontAwesome' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  Friends List</Text>
                                    </MenuItem>
                                    {this.props.statusRegis == false ?
                                        <MenuItem >
                                            <Icon name='edit' type='FontAwesome' style={{ fontSize: 18, color: "#c0c0c0" }} />
                                            <Text style={[styles.item_menu, { color: "#c0c0c0" }]}>  ลงทะเบียน</Text>
                                        </MenuItem>
                                        :
                                        <MenuItem onPress={this.gotoRegis} >
                                            <Icon name='edit' type='FontAwesome' style={{ fontSize: 18 }} />
                                            <Text style={styles.item_menu}>  ลงทะเบียน</Text>
                                        </MenuItem>
                                    }
                                    <MenuItem onPress={this.gotoHistory} >
                                        <Icon name='history' type='FontAwesome' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  History</Text>
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onPress={this.gotoContacts} >
                                        <Icon name='ios-call' type='Ionicons' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  ติดต่อสอบถาม</Text>
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onPress={this.gotoLogout} >
                                        <Icon name='log-out' type='Entypo' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  ออกจากระบบ</Text>
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onPress={this.hideMenu} >
                                        <Icon name='close' type='FontAwesome' style={{ fontSize: 18, color: "#FF0000" }} />
                                        <Text style={styles.item_menu_close}>   ปิด</Text>
                                    </MenuItem>
                                </ScrollView>


                            </Menu>
                        }
                    </Right>
                </Header>
            </View >
        );
    }
}
const mapStateToProps = state => {
    return {
        userprofile: state.userprofile,
        profile: state.profile
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setUsername: (username) => {
            dispatch({
                type: "setUsername",
                payload: username
            })
        },
        setImageProfile: (imgProfile) => {
            dispatch({
                type: "setImageProfile",
                payload: imgProfile
            })
        },
        setImageBackground: (imgBG) => {
            dispatch({
                type: "setImageBackground",
                payload: imgBG
            })
        },
        addFriendInEvent: (friendEvent) => {
            dispatch({
                type: "addFriendInEvent",
                payload: friendEvent
            })
        },
        addFullFriendInEvent: (fullfriendEvent) => {
            dispatch({
                type: "addFullFriendInEvent",
                payload: fullfriendEvent
            })
        },
        setFriendRegister: (friendRegis) => {
            dispatch({
                type: "setFriendRegister",
                payload: friendRegis
            })
        },
        setUserProfile: (profile) => {
            dispatch({
                type: "setUserProfile",
                payload: profile
            })
        }
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FC561F',
        ...Platform.select({
            ios: {
                
            },
            android: {
                paddingTop: 15,
                paddingBottom : 0
            },
        })
    },
    title: {
        fontFamily: "Kanit",
        color: "#fff",
        fontSize: 14
    },
    title2: {
        fontFamily: "Kanit",
        color: "#fff",
        fontSize: 14,
        paddingLeft: 10,
    },
    item_menu: {
        fontFamily: "Kanit",
        fontSize: 18,
    },
    item_menu_close: {
        fontFamily: "Kanit",
        fontSize: 18,
        color: "#FF0000"
    },
    titleHead2: {
        fontFamily: "Kanit",
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 10
    },
    imgAvatar: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    item:  { 
        padding : 10
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(HeaderTeam)