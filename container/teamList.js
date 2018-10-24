import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, RefreshControl, ImageBackground } from 'react-native';
import { Container, Header, Item, Input, Button, Tab, Tabs, TabHeading, Icon, Text, CardItem, Card } from 'native-base';
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
import datafriendSug from '../component/list/listFriend/dataFriendSug-regis'
import dataSmartFriend from '../component/list/listFriend/dataSmartFriend'
import SummaryTotal from '../component/items/summary'

import SegmentedControlTab from 'react-native-segmented-control-tab'


var uri = req[0].uspSearchFriend
var uri2 = req[0].uspAddFriendLists
var uri3 = req[0].uspGetFriendSuggestion
var apikey = api_key[0].api_key

class TeamList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleHead: "ลงทะเบียนวิ่ง",
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
            statusCheck: true,
            totalRegister: 0,
            selectedIndex: 1,
            teamlayout: true,
            singlelayout: false,
        }
        this.getFriend = this.getFriend.bind(this)
    }
    componentWillMount() {
        clearInterval(this._interval);
    }
    componentDidMount() {
        this.getFriend()
        this._onRefresh()
        this._interval = setInterval(() => {
            this.setState({ totalRegister: this.props.event.totalRegister })
        }, 500);
    }

    addFriendEvent() {
        this.props.setFriendRegister(datafriendRegis)
        this.loopObIndex()
        this.setState({ frienddistance: false })
        setTimeout(() => {
            this.setState({ frienddistance: true })
        }, 500)
        this.setState({ statusCheck: false })
    }
    loopObIndex() {
        const obIndex = []
        datafriendRegis.map((item, index) => {
            var key = {
                key: item.key
            }
            obIndex.splice(index, 1, key)
        })
        console.log(obIndex)
        this.setNewRegisStatus(obIndex)
    }
    setNewRegisStatus(dataOb) {
        dataOb.map((item, index) => {
            var status = {
                RegisterStatus: "-1"
            }
            dataSmartFriend[item.key].RegisterStatus = "-1"
            console.log(dataSmartFriend)
        })
        this._toggleFriendList()
    }
    _toggleFriendList = () => {
        this.setState({ friendlist: false })
        setTimeout(() => {
            this.setState({ friendlist: true })
        })
    }
    showModal = () => {
        let { searchText } = this.state
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "Keyword", value: searchText },
                { name: "EventID", value: this.props.event.event.EventID }
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
                this.setState({ isLoading: false, friendOutput: response.data, searchText: '' });
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
                this.setDataSmartFriend(response.data)
            })
            .catch((error) => {
                this.setState({ isLoading: true })
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                // console.error(error);
            });
    }
    setDataSmartFriend(data) {
        data.map((item, index) => {
            var friend = {
                RunnerID: item.RunnerID,
                Email: item.Email,
                FirstName: item.FirstName,
                LastName: item.LastName,
                Gender: item.Gender,
                PicProfile: item.PicProfile,
                RegisterStatus: item.RegisterStatus,
                FriendStatus: item.FriendStatus
            }
            dataSmartFriend.splice(index, 1, friend)
        })
        console.log(dataSmartFriend)
    }

    _checkAddFriend(newitem, status) {
        var data = datafriendRegis
        dataitem = {
            RunnerID: newitem.RunnerID,
            FirstName: newitem.FirstName,
            LastName: newitem.LastName,
            PicProfile: newitem.PicProfile
        }
        var str_newitem = dataitem

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
            this._addFriend(dataitem, status)
        }, 1500)
        return status
    }
    _addFriend(dataitem, status) {
        var value = status
        console.log(value)
        if (value == false) {
            this.setState({ isAddStatusError: true })
        }
        else if (value == true) {
            datafriendRegis.push(dataitem)
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
        else if (this.state.friendOutput[0].Himself == 1) {
            this.setState({ isAddStatusError: true, titleError: "รหัสประชาชนนี้คือตัวท่านเอง" })
        }
        else if (this.state.friendOutput[0].RegisterStatus == 1) {
            this.setState({ isAddStatusError: true, titleError: "บุคคลนี้ได้ทำการสมัครงานวิ่งนี้แล้ว" })
        }
        else if (this.state.friendOutput[0].RegisterStatus == 0 && this.state.friendOutput[0].Himself == 0) {
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
    handleIndexChange = (index) => {
        this.setState({
            ...this.state,
            selectedIndex: index,
        });
        if (index === 0) {
            this.setState({ singlelayout: true, teamlayout: false })
        }
        else if (index === 1) {
            this.setState({ singlelayout: false, teamlayout: true })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        let { searchText } = this.state
        return (
            <Container style={styles.container}>
                <HeaderTeam
                    title={this.state.titleHead}
                    menu={true}
                    goback={() => this.props.navigation.navigate('EventList')}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}
                    goContacts={() => this.props.navigation.navigate('Contacts')}

                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <SegmentedControlTab
                    values={['ลงทะเบียนแบบเดียว', 'ลงทะเบียนแบบกลุ่ม']}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    tabsContainerStyle={{ height: 50, backgroundColor: '#f2f2f2' }}
                    tabStyle={{ backgroundColor: '#f2f2f2', borderWidth: 0, borderColor: 'transparent' }}
                    activeTabStyle={{ backgroundColor: 'white', marginTop: 2 }}
                    tabTextStyle={{ color: '#444444', fontFamily: "Kanit" }}
                    activeTabTextStyle={{ color: '#FC561F', fontFamily: "Kanit" }}
                />
                {this.state.singlelayout &&
                    <Container>
                        <RegisterDistance />
                        <SummaryTotal
                            total={parseFloat(this.state.totalRegister).toFixed(2)}
                        />
                    </Container>
                }

                {this.state.teamlayout &&
                    <Container>
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
                                <Item style={{ flexDirection: "row" }}>
                                    <Icon name="ios-people" style={{ padding: 10 }} />
                                    <Input
                                        placeholder="ค้นหาเลขบัตรประชาชน/หนังสือเดินทาง"
                                        style={{ fontFamily: 'Kanit', fontSize: 14, paddingHorizontal: 10 }}
                                        returnKeyType={"next"}
                                        value={this.state.searchText}
                                        onChangeText={(text) => this.setState({ searchText: text })}
                                        onSubmitEditing={this.showModal}
                                    />
                                    <View>
                                        <Button small iconLeft transparent primary onPress={this.showModal}>
                                            <Icon name="ios-search" />
                                            <Text style={{ fontFamily: 'Kanit' }}>ค้นหา</Text>
                                        </Button>
                                    </View>
                                </Item>

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
                                        <ScrollView
                                            horizontal={true}>
                                            <EventListFriend
                                                isAddFriendEvent={() => this.addFriendEvent()}
                                                goAddFriendList={() => this.gotoFriendList()}
                                                changeCheck={this.state.statusCheck}
                                                friend={dataSmartFriend}
                                            />
                                        </ScrollView>
                                        <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                                            <Button rounded block success onPress={() => this.addFriendEvent()} >
                                                <Text style={styles.text}> + เพิ่มเพื่อนในการสมัคร</Text>
                                            </Button>
                                        </View>
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
                                            toggleList={this._toggleFriendList}
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
                                        title={this.state.titleError}
                                        toggleModal={this.hideModalError}
                                    />
                                </Modal>
                                <Modal isVisible={this.state.isAddStatus}>
                                    <AddStatus />
                                </Modal>

                            </View>
                        </ScrollView>
                        <SummaryTotal
                            total={parseFloat(this.state.totalRegister).toFixed(2)}
                        />
                    </Container>
                }
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
        },

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
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Kanit',
    },
    textTile: {
        padding: 10,
        fontSize: 26,
        fontFamily: 'Kanit',
        color: '#000',
    },
    textLabel: {
        color: '#FC561F',
        fontSize: 12,
        fontFamily: 'Kanit',
    },
    text: {
        fontSize: 16,
        color: '#000',
        padding: 5,
        color: "#fff",
        fontFamily: 'Kanit',
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