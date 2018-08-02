import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, StatusBar } from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, View } from 'native-base';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import ModalLogin from '../modal/login_modal'
import { connect } from "react-redux";

class HeaderTeam extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    state = {
        iconBack: false,
        statusModal: false,
        nameUser: "ข้อมูลส่วนตัว",
    }
    _menu = null;

    componentDidMount() {
        this.setState({ title: this.props.title })
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
        this._menu.show();
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
                        <Menu
                            ref={this.setMenuRef}
                            button={<Text onPress={this.showMenu} style={styles.title2}>{this.state.nameUser}</Text>}
                        >
                            <MenuItem onPress={this.checkLogin} >
                                <Icon name='user-circle' type='FontAwesome' style={{ fontSize: 15 }} />
                                <Text style={styles.item_menu}> ข้อมูลส่วนตัว</Text>
                            </MenuItem>
                            <MenuItem onPress={this.gotoFriendlist} >
                                <Icon name='group' type='FontAwesome' style={{ fontSize: 15 }} />
                                <Text style={styles.item_menu}> Friends List</Text>
                            </MenuItem>
                            <MenuItem onPress={this.gotoRegis}>
                                <Icon name='edit' type='FontAwesome' style={{ fontSize: 15 }} />
                                <Text style={styles.item_menu}> ลงทะเบียน</Text>
                            </MenuItem>
                            <MenuItem onPress={this.gotoHistory}>
                                <Icon name='history' type='FontAwesome' style={{ fontSize: 15 }} />
                                <Text style={styles.item_menu}> History</Text>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onPress={() => this.props.goLogin()}>
                                <Icon name='log-out' type='Entypo' style={{ fontSize: 14 }} />
                                <Text style={styles.item_menu}> ออกจากระบบ</Text>
                            </MenuItem>
                        </Menu>
                    </Right>
                </Header>

            </View>

        );
    }
}
const mapStateToProps = state => {
    return {
        userprofile: state.userprofile
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
        fontSize: 12
    },
    item_menu: {
        fontFamily: "kanit",
        fontSize: 12,
    }
})
export default connect(mapStateToProps)(HeaderTeam)