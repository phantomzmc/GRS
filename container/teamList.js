import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, RefreshControl, ImageBackground } from 'react-native';
import { Container, Header, Item, Input, Button, Tab, Tabs, TabHeading, Icon, Text, CardItem } from 'native-base';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import axios from 'axios'
import { connect } from 'react-redux'
import datafriend from '../component/list/listFriend/dataFriend'
import RegisterDistance from '../container/registerDistance'
import HeaderTeam from '../component/items/headerTeam'
import HeaderProfile from '../component/items/header_profile.js'
import EventListFriend from '../component/list/listFriend/eventListFriend'
import ModalAddFriend from '../component/modal/addFriend'
import ErrorModalAddFriend from '../component/modal/addFriend_error'
import AddError from '../component/modal/addStatus_error'
import AddStatus from '../component/modal/addStatus'
import FriendDistance from '../container/friendDistance'
import req from '../config/uri_req'
import api_key from '../config/api_key'
import datafriendRegis from '../component/list/listFriend/dataFriend-regis'
import SummaryTotal from '../component/items/summary'

var uri = req[0].uspSearchFriend
var uri2 = req[0].uspAddFriendLists
var uri3 = req[0].uspGetFriendSuggestion
var apikey = api_key[0].api_key

class TeamList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "ลงทะเบียนแบบกลุ่ม",
            isModalVisible: false,
            isModalVisibleError: false,
            isAddStatusError: false,
            isAddStatus: false,
            pageNumber: 0,
            activeTab: 0,
            searchText: "",
            friendOutput: [],
            addStatus: [],
            datafriendlist: [],
            refreshing: false,
            friendlist: true,
            frienddistance: true,

        }
        this.getFriend = this.getFriend.bind(this)
    }
    componentDidMount() {
        this.getFriend()
        this._onRefresh()

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource != this.state.dataSource) {
            console.log("update")
            this.setState({ dataSource: this.state.dataSource })
            this._onRefresh()
        }

    }
    showModal = () => {
        let { searchText } = this.state
        let data = ({
            params: [
                { name: "RunnerID", value: "" },
                { name: "Keyword", value: searchText },
                { name: "EventID", value: "" }
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
                this.setState({ isLoading: false, friendOutput: response.data });
                console.log(this.state.friendOutput[0])
                this.checkRegisStatus()
            }).catch((error) => {
                this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                // console.error(error);
            });
    }
    getFriend() {
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "ShowAmount", value: null },
                { name: "EventID", value: this.props.event.event.EventID }
            ]
        })
        axios.post(uri3, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, dataSource: response.data });
                console.log(this.state.dataSource)
            })
            .catch((error) => {
                this.setState({ isLoading: true })
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                // console.error(error);
            });
    }
    _checkAddFriend(newitem, status) {
        var data = datafriendRegis
        var str_newitem = newitem
        for (i = 0; i <= data.length; i++) {
            if (JSON.stringify(str_newitem) == JSON.stringify(data[i])) {
                console.log("ซ้ำ")
                status = false
                break;
            }
            else if (JSON.stringify(str_newitem) != JSON.stringify(data[i])) {
                status = true
            }
        }
        setTimeout(() => {
            this._addFriend(newitem, status)
        }, 1500)
        return status
    }
    _addFriend(newitem, status) {
        // this._checkAddFriend(newitem)
        var value = status
        console.log(value)
        if (value == false) {
            this.setState({ isAddStatusError: true })
        }
        else if (value == true) {
            datafriendRegis.push(newitem)
            this.props.setFriendRegister(datafriendRegis)
            this.setState({ frienddistance: true })
            this.setState({ frienddistance: false })
            setTimeout(() => {
                this.setState({ frienddistance: true })
            }, 500)
        }
    }
    checkAddFriendStatus() {
        console.log("checkAddFriendStatus")
        if (this.state.addStatus[0].AddStatus == "0") {
            this.setState({ isAddStatusError: true })
        }
        else if (this.state.addStatus[0].AddStatus == "1") {
            this.setState({ isAddStatus: true })
            this.getFriend()
            setTimeout(() => {
                this.setState({ isAddStatus: false })
            }, 3000)
        }
    }
    _onRefresh() {
        this.setState({ refreshing: true })
        this.getFriend()
        setTimeout(() => {
            this.setState({ refreshing: false })
        }, 1000)
    }
    checkRegisStatus = () => {
        if (this.state.friendOutput[0] == undefined || this.state.friendOutput[0] == null) {
            this.hideModalError()
        }
        else {
            this.hideModal()
        }
    }
    hideModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    hideModalError = () => {
        this.setState({
            isModalVisibleError: !this.state.isModalVisibleError,
            isAddStatusError: false
        })
    }

    gotoTeamList = () => {
        this.props.navigation.navigate('TabRouter')
    }
    gotoRegisterDistance = () => {
        this.props.navigation.navigate('FriendInEvent')
    }
    gotoRegister = () => {
        this.props.navigation.navigate('Register')
        this.hideModalError()
    }
    gotoSingleRegis = () => {
        this.props.navigation.navigate('ControlDistance')
    }
    goLogin = () => {
        this.props.navigation.navigate('Login')
    }
    gotoAddress = () => {
        this.props.navigation.navigate("AddressLayout")
    }
    gotoFriendList = () => {
        this.props.navigation.navigate("FriendList")
    }

    render() {
        const { navigate } = this.props.navigation;
        let { searchText } = this.state
        return (
            <Container style={styles.container}>
                <HeaderTeam
                    title={this.state.title}
                    menu={true}
                    goback={this.goLogin.bind(this)}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <Tabs
                    initialPage={1}
                    page={1}
                    tabBarUnderlineStyle={{ backgroundColor: "#FC561F", height: 2 }}>
                    <Tab
                        heading={<TabHeading><Text style={styles.textLabel} onPress={() => this.gotoSingleRegis()}>ลงทะเบียนแบบเดียว</Text></TabHeading>}>
                        <RegisterDistance />
                    </Tab>
                    <Tab
                        heading={<TabHeading><Text style={styles.textLabel}>ลงทะเบียนแบบกลุ่ม</Text></TabHeading>}>
                        <Container>
                            <View>
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={this._onRefresh.bind(this)}
                                        />}
                                >
                                    <View style={styles.container}>
                                        <HeaderProfile />
                                        <ImageBackground style={{ width: "100%", opacity: 0.8 }} source={{ uri: 'https://register.shutterrunning2014.com/assets/img/theme/bg.jpg' }}>
                                            <View style={styles.boxBackground}>
                                                <TouchableOpacity onPress={() => this.setState({ frienddistance: !this.state.frienddistance })} style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Icon name="ios-search" style={{ padding: 10, color: "#fff", fontSize: 16 }} />
                                                        <Text style={styles.text}>ค้นหาเพื่อนของคุณเพื่อเพิ่มในการสมัคร</Text>

                                                    </View>
                                                    {/* {this.state.frienddistance == true ?
                                                        <Icon name="ios-arrow-up" style={{ padding: 10, color: "#fff", fontSize: 16 }} type="Ionicons" /> :
                                                        <Icon name="ios-arrow-down" style={{ padding: 10, color: "#fff", fontSize: 16 }} type="Ionicons" />
                                                    } */}
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>
                                        <Header searchBar rounded>
                                            <Item>
                                                <Icon name="ios-people" />
                                                <Input
                                                    placeholder="ค้นหาเลขบัตรประชาชน/หนังสือเดินทาง"
                                                    style={{ fontFamily: 'kanit', fontSize: 14, paddingHorizontal: 10 }}
                                                    returnKeyType={"next"}
                                                    onChangeText={(searchText) => this.setState({ searchText })}
                                                    onSubmitEditing={this.showModal}
                                                />
                                            </Item>
                                            <Button small iconLeft transparent primary onPress={this.showModal}>
                                                <Icon name="ios-search" />
                                                <Text style={{ fontFamily: 'kanit' }}>ค้นหา</Text>
                                            </Button>
                                        </Header>
                                        <ImageBackground style={{ width: "100%", opacity: 0.8 }} source={{ uri: 'https://register.shutterrunning2014.com/assets/img/theme/bg.jpg' }}>
                                            <View style={styles.boxBackground}>
                                                <TouchableOpacity onPress={() => this.setState({ friendlist: !this.state.friendlist })} style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Icon name="list-bullet" style={{ padding: 10, color: "#fff", fontSize: 16 }} type="Foundation" />
                                                        <Text style={styles.text}>เลือกเพื่อนของคุณจาก FriendList</Text>
                                                    </View>
                                                    {this.state.frienddistance == true ?
                                                        <Icon name="ios-arrow-up" style={{ padding: 10, color: "#fff", fontSize: 16 }} type="Ionicons" /> :
                                                        <Icon name="ios-arrow-down" style={{ padding: 10, color: "#fff", fontSize: 16 }} type="Ionicons" />
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>
                                        {this.state.friendlist &&
                                            <View>
                                                <View style={{ paddingHorizontal: 10, paddingTop: 30 }}>
                                                    <Button rounded block success onPress={() => this.gotoFriendList()} >
                                                        <Text style={styles.text}> + เพิ่มเพื่อนจาก FriendList</Text>
                                                    </Button>
                                                </View>
                                                <EventListFriend
                                                    friend={this.state.dataSource}
                                                />
                                            </View>
                                        }
                                        <ImageBackground style={{ width: "100%", opacity: 0.8 }} source={{ uri: 'https://register.shutterrunning2014.com/assets/img/theme/bg.jpg' }}>
                                            <View style={styles.boxBackground}>
                                                <TouchableOpacity onPress={() => this.setState({ frienddistance: !this.state.frienddistance })} style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Icon name="group" style={{ padding: 10, color: "#fff", fontSize: 16 }} type="FontAwesome" />
                                                        <Text style={styles.text}>รายชื่อเพื่อนที่สมัคร (2-10 คน)</Text>

                                                    </View>
                                                    {this.state.frienddistance == true ?
                                                        <Icon name="ios-arrow-up" style={{ padding: 10, color: "#fff", fontSize: 16 }} type="Ionicons" /> :
                                                        <Icon name="ios-arrow-down" style={{ padding: 10, color: "#fff", fontSize: 16 }} type="Ionicons" />
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>
                                        {this.state.frienddistance &&
                                            <View>
                                                <FriendDistance
                                                    goAddress={() => this.gotoAddress()}
                                                />
                                            </View>
                                        }
                                        <Modal isVisible={this.state.isModalVisible}>
                                            <ModalAddFriend
                                                toggleModal={this.hideModal}
                                                outputfriend={this.state.friendOutput[0]}
                                                friend={datafriend}
                                                getAddFriend={this._checkAddFriend.bind(this)}
                                                textAdd="เพิ่มในการสมัคร"
                                            />
                                        </Modal>
                                        <Modal isVisible={this.state.isModalVisibleError}>
                                            <ErrorModalAddFriend
                                                toggleModal={this.hideModalError}
                                                goRegister={this.gotoRegister.bind(this)}
                                            />
                                        </Modal>
                                        <Modal isVisible={this.state.isAddStatusError}>
                                            <AddError
                                                toggleModal={this.hideModalError}
                                            />
                                        </Modal>
                                        <Modal isVisible={this.state.isAddStatus}>
                                            <AddStatus />
                                        </Modal>

                                    </View>
                                </ScrollView>
                            </View>
                        </Container>
                        <SummaryTotal />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setFriendRegister: (datafriend) => {
            dispatch({
                type: 'setFriendRegister',
                payload: datafriend
            })
        }
    }
}
const mapStateToProps = state => {
    return {
        token: state.token,
        userprofile: state.userprofile,
        friendlist: state.friendlist,
        event: state.event
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    addFriend: {
        marginTop: 30,
        alignItems: 'center',
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Kanit',
    },
    textTile: {
        padding: 10,
        fontSize: 26,
        fontWeight: '700',
        fontFamily: 'kanit',
        color: '#000',
    },
    textLabel: {
        color: '#FC561F',
        fontSize: 12,
        fontFamily: 'kanit',
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        padding: 5,
        color: "#fff",
        fontFamily: 'kanit',
    },
    boxBackground: {
        backgroundColor: "#000",
        opacity: 0.8,
        width: '100%',
        height: 35
    },
    boxCount: {
        backgroundColor: "#fff",
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }

})
export default connect(mapStateToProps, mapDispatchToProps)(TeamList);