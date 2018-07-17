import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Item, Input, Button, Tab, Tabs, TabHeading, Icon } from 'native-base';
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
import req from '../config/uri_req'
import api_key from '../config/api_key'

var uri = req[0].uspSearchFriend
var uri2 = req[0].uspAddFriendLists
var apikey = api_key[0].api_key

class TeamList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "ลงทะเบียนแบบกลุ่ม",
            isModalVisible: false,
            isModalVisibleError: false,
            pageNumber: 0,
            activeTab: 0,
            searchText: "",
            friendOutput: [],
            addStatus: [],
            datafriendlist: []
        }
    }
    showModal() {
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
    addFriend = (newitem) => {
        datafriend.push(newitem)
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "FriendID", value: newitem.RunnerID }
            ]
        })
        axios.post(uri2, data, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, addStatus: response.data });
                console.log(this.state.addStatus[0])
            }).catch((error) => {
                this.props.navigation.navigate('EventList')
            });

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
        this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={styles.container}>
                <HeaderTeam
                    title={this.state.title}
                    goback={this.goLogin.bind(this)} />
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
                                <ScrollView>
                                    <View style={styles.container}>
                                        <HeaderProfile />
                                        <Header searchBar rounded>
                                            <Item>
                                                <Icon name="ios-search" />
                                                <Input
                                                    placeholder="ค้นหาเพื่อน"
                                                    returnKeyType={"next"}
                                                    onChangeText={(searchText) => this.setState({ searchText })}
                                                    onSubmitEditing={this.showModal.bind(this)}
                                                />
                                                <Icon name="ios-people" />
                                            </Item>
                                        </Header>
                                        <View>
                                            <EventListFriend friend={datafriend} />

                                        </View>
                                        {/* <Tabs>
                                            <Tab heading={<TabHeading><Icon name="ios-people" /></TabHeading>}>
                                                <EventListFriend friend={datafriend} />
                                            </Tab>
                                            <Tab heading={<TabHeading><Icon name="ios-heart" /></TabHeading>}>
                                                <Text>No Icon</Text>
                                                <EventListFriend friend={datafriend} />
                                            </Tab>
                                        </Tabs> */}
                                        <View style={styles.submitContainer}>
                                            <TouchableOpacity style={styles.buttonContainer}
                                                onPress={() => navigate('FriendDistance')}>
                                                <Text style={styles.textButton}>+ เพิ่มในการสมัคร</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Modal isVisible={this.state.isModalVisible}>
                                            <ModalAddFriend
                                                toggleModal={this.hideModal}
                                                outputfriend={this.state.friendOutput[0]}
                                                friend={datafriend}
                                                getAddFriend={this.addFriend.bind(this)} />
                                        </Modal>
                                        <Modal isVisible={this.state.isModalVisibleError}>
                                            <ErrorModalAddFriend
                                                toggleModal={this.hideModalError}
                                                goRegister={this.gotoRegister.bind(this)}
                                            />
                                        </Modal>

                                    </View>
                                </ScrollView>
                            </View>
                        </Container>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.token,
        userprofile: state.userprofile
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
        marginBottom: 100,
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

})
export default connect(mapStateToProps)(TeamList);