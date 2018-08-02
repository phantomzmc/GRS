import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, StatusBar, Easing, Dimensions, TouchableHighlight } from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, View } from 'native-base';
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
        statusMenu: false
    }
    _menu = null;

    componentDidMount() {
        this.setState({ title: this.props.title, statusMenu: this.props.menu })
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
                                button={<Text onPress={this.showMenu} style={styles.title2}>{this.state.nameUser}</Text>}
                            >
                                <MenuItem onPress={this.checkLogin} style={{ padding: 10 }}>
                                    <Icon name='user-circle' type='FontAwesome' style={{ fontSize: 18 }} />
                                    <Text style={styles.item_menu}>  ข้อมูลส่วนตัว</Text>
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
        fontSize: 14
    },
    item_menu: {
        fontFamily: "kanit",
        fontSize: 18,
    }
})
export default connect(mapStateToProps)(HeaderTeam)