import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, StatusBar, Easing, Dimensions, TouchableHighlight, Image, AsyncStorage } from "react-native";
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
        statusLogin: ""
    }
    _menu = null;

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
        if (this.props.profile.statuslogin == 1) {
            this.setState({ statusCheckLogin2: true, statusCheckLogin: false })
            console.log(this.state.statusCheckLogin)
            // this._menu.show();
        }
        else if (this.props.profile.statuslogin == 0) {
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
        let goSuccess = this.props.goEditProfile()
        this.checkLogin(goSuccess)
    }
    gotoFriendlist = () => {
        let goSuccess = this.props.goFriendlist()
        this.checkLogin(goSuccess)
    }
    gotoHistory = () => {
        let goSuccess = this.props.goHistory()
        this.checkLogin(goSuccess)
    }
    gotoRegis = () => {
        let goSuccess = this.props.goRegis()
        this.checkLogin(goSuccess)
    }
    gotoLogout = () => {
        let goSuccess = this.props.goSingleLogin()
        this.userLogout()
    }
    async userLogout() {
        await AsyncStorage.removeItem('login');
    }

    checkLogin = (goSuccess) => {
        console.log("checkLogin")
        let statusLogin = this.props.userprofile.userstatus
        if (statusLogin === "") {
            this.hideMenu()
            this.props.goLogin()
            console.log(" don't ok")
            value = false
        }
        else if (statusLogin !== "") {
            this.hideMenu()
            console.log("ok")
            this.goSuccess
            value = true
        }
        console.log(value)
        return value
    }

    render() {
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <Header style={{ backgroundColor: "#FC561F" }}>
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
                                style={{ width: 300, height: 350 }}
                                button=
                                {
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name='options-vertical' type='SimpleLineIcons' style={{ fontSize: 18, color: "#fff" }} onPress={this.showMenu} />
                                    </View>
                                }
                            >
                                {/* <View>
                                    <MenuItem style={{ padding: 10 }} onPress={() => this.props.goLogin()}>
                                        <Icon name='login' type='Entypo' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  เข้าสู่ระบบ</Text>
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem style={{ padding: 10 }}>
                                        <Icon name='user-circle' type='FontAwesome' style={{ fontSize: 18, color: "#c0c0c0" }} />
                                        <Text style={[styles.item_menu, { color: "#c0c0c0" }]}>  ข้อมูลส่วนตัว</Text>
                                    </MenuItem>
                                    <MenuItem style={{ padding: 10 }}>
                                        <Icon name='group' type='FontAwesome' style={{ fontSize: 18, color: "#c0c0c0" }} />
                                        <Text style={[styles.item_menu, { color: "#c0c0c0" }]}>  Friends List</Text>
                                    </MenuItem>
                                    <MenuItem style={{ padding: 10 }}>
                                        <Icon name='edit' type='FontAwesome' style={{ fontSize: 18, color: "#c0c0c0" }} />
                                        <Text style={[styles.item_menu, { color: "#c0c0c0" }]}>  ลงทะเบียน</Text>
                                    </MenuItem>
                                    <MenuItem style={{ padding: 10 }}>
                                        <Icon name='history' type='FontAwesome' style={{ fontSize: 18, color: "#c0c0c0" }} />
                                        <Text style={[styles.item_menu, { color: "#c0c0c0" }]}>  History</Text>
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onPress={this.hideMenu} style={{ padding: 10 }}>
                                        <Icon name='close' type='FontAwesome' style={{ fontSize: 18, color: "#FF0000" }} />
                                        <Text style={[styles.item_menu, { color: "#FF0000" }]}>   ปิด</Text>
                                    </MenuItem>
                                </View> */}


                                    <View>
                                        < MenuItem onPress={this.gotoProfile} style={{ padding: 10 }}>
                                            <Icon name='user-circle' type='FontAwesome' style={{ fontSize: 18 }} />
                                            {/* // <Image source={{ uri: this.state.uri }} style={{ width: 30, height: 30, borderRadius: 15, justifyContent: "center", alignItems: "center" }} /> */}

                                            <Text style={styles.item_menu}>  {this.state.nameUser}</Text>
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem onPress={this.gotoProfile} style={{ padding: 10 }}>
                                            <Icon name='user-circle' type='FontAwesome' style={{ fontSize: 18 }} />
                                            <Text style={styles.item_menu}>  ข้อมูลส่วนตัว</Text>
                                        </MenuItem>
                                        <MenuItem onPress={this.gotoFriendlist} style={{ padding: 10 }}>
                                            <Icon name='group' type='FontAwesome' style={{ fontSize: 18 }} />
                                            <Text style={styles.item_menu}>  Friends List</Text>
                                        </MenuItem>
                                        {this.props.statusRegis == false ?
                                            <MenuItem style={{ padding: 10 }}>
                                                <Icon name='edit' type='FontAwesome' style={{ fontSize: 18, color: "#c0c0c0" }} />
                                                <Text style={[styles.item_menu, { color: "#c0c0c0" }]}>  ลงทะเบียน</Text>
                                            </MenuItem>
                                            :
                                            <MenuItem onPress={this.gotoRegis} style={{ padding: 10 }}>
                                                <Icon name='edit' type='FontAwesome' style={{ fontSize: 18 }} />
                                                <Text style={styles.item_menu}>  ลงทะเบียน</Text>
                                            </MenuItem>
                                        }
                                        <MenuItem onPress={this.gotoHistory} style={{ padding: 10 }}>
                                            <Icon name='history' type='FontAwesome' style={{ fontSize: 18 }} />
                                            <Text style={styles.item_menu}>  History</Text>
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem onPress={this.gotoLogout} style={{ padding: 10 }}>
                                            <Icon name='log-out' type='Entypo' style={{ fontSize: 18 }} />
                                            <Text style={styles.item_menu}>  ออกจากระบบ</Text>
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem onPress={this.hideMenu} style={{ padding: 10 }}>
                                            <Icon name='close' type='FontAwesome' style={{ fontSize: 18, color: "#FF0000" }} />
                                            <Text style={[styles.item_menu, { color: "#FF0000" }]}>   ปิด</Text>
                                        </MenuItem>
                                    </View>
                                

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

const styles = StyleSheet.create({
    title: {
        fontFamily: "kanit",
        color: "#fff",
        fontSize: 14
    },
    title2: {
        fontFamily: "kanit",
        color: "#fff",
        fontSize: 14,
        paddingLeft: 10,
    },
    item_menu: {
        fontFamily: "kanit",
        fontSize: 18,
    },
    titleHead2: {
        fontFamily: "kanit",
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
})
export default connect(mapStateToProps)(HeaderTeam)