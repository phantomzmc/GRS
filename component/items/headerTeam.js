import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, StatusBar, Easing, Dimensions, TouchableHighlight, Image } from "react-native";
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
    }
    _menu = null;

    componentDidMount() {
        this.setState({ title: this.props.title, statusMenu: this.props.menu})
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

    showMenu = () => {
        this.setState({ nameUser: this.props.userprofile.userprofile.FirstName, uri: this.props.userprofile.userprofile.PicProfile })
        if (this.props.profile.statuslogin == 1) {
            this._menu.show();
        }
        else if (this.props.profile.statuslogin == 0) {
            this.props.goLogin()
        }
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
                    <Header style={{ backgroundColor: "#FC561F" }}>
                        <Left>
                            <Button transparent onPress={this.onPressGoBack.bind(this)}>
                                <Icon name='arrow-back' style={{ color: "#fff" }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.title}>{this.props.title}</Title>
                        </Body>
                        <Right>
                            {this.state.statusMenu &&
                                <Menu
                                    ref={this.setMenuRef}
                                    style={{ width: 250, height: 300 }}
                                    button=
                                    {
                                        <View style={{ flexDirection: "row" }}>
                                            {/* <Icon name='user-circle' type='FontAwesome' style={{ fontSize: 18, paddingRight: 10 }} /> */}
                                            <Image source={{ uri: this.state.uri }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                                            <Text onPress={this.showMenu} style={styles.title2}>{this.state.nameUser}</Text>
                                        </View>
                                    }
                                >
                                    <MenuItem onPress={this.gotoProfile} style={{ padding: 10 }}>
                                        <Icon name='user-circle' type='FontAwesome' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  {this.state.nameUser}</Text>
                                    </MenuItem>
                                    <MenuItem onPress={this.gotoFriendlist} style={{ padding: 10 }}>
                                        <Icon name='group' type='FontAwesome' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  Friends List</Text>
                                    </MenuItem>
                                    <MenuItem onPress={this.gotoRegis} style={{ padding: 10 }}>
                                        <Icon name='edit' type='FontAwesome' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  ลงทะเบียน</Text>
                                    </MenuItem>
                                    <MenuItem onPress={this.gotoHistory} style={{ padding: 10 }}>
                                        <Icon name='history' type='FontAwesome' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  History</Text>
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onPress={() => this.props.goLogin()} style={{ padding: 10 }}>
                                        <Icon name='log-out' type='Entypo' style={{ fontSize: 18 }} />
                                        <Text style={styles.item_menu}>  ออกจากระบบ</Text>
                                    </MenuItem>
                                </Menu>
                            }
                        </Right>
                    </Header>
            </View>
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
        paddingTop: 5
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