import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import { Header, Item, Icon, Input, Thumbnail, Button, Text, Container } from 'native-base'
import Modal from "react-native-modal";
import axios from 'axios';
import { connect } from "react-redux";
import datafriend from '../component/list/listFriend/dataFriend'
import FriendListView from '../component/list/listFriend/friendList'
import HeaderTeam from '../component/items/headerTeam'
import ModalAddFriend from '../component/modal/addFriend'
import ErrorModalAddFriend from '../component/modal/addFriend_error'
import req from '../config/uri_req'
import api_key from '../config/api_key'

var uri = req[0].uspSearchFriend
var uri2 = req[0].uspAddFriendLists
var uri3 = req[0].uspGetFriendLists
var apikey = api_key[0].api_key

class FriendList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "Friend List",
            isRefresh: true,
            isModalVisible: false,
            isModalVisibleError: false,
            searchText: "",
            friendOutput: [],
            addStatus: [],
            datafriendlist: [],
        }
    }
    componentDidMount() {
        this.getFriend()
    }
    getFriend() {
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "PageNo", value: "1" },
                { name: "RowPerPage", value: "12" }
            ]
        })
        axios.post(uri3, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, dataSource: response.data });
                console.log(this.state.dataSource)
            }).catch((error) => {
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                console.error(error);
            });
        return this.state.dataSource
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
                this.setState({ isLoading: false, friendOutput: response.data });
                console.log(this.state.friendOutput[0])
                this.checkRegisStatus()
            }).catch((error) => {
                this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                // console.error(error);
            });
    }
    addFriend = (newitem) => {
        // datafriend.push(newitem)
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "FriendID", value: newitem.RunnerID }
            ]
        })
        axios.post(uri2, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: true, addStatus: response.data });
                console.log(this.state.addStatus[0])
                this.getFriend()
            }).catch((error) => {
                this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                // console.log(error);
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
    gotoAddFriendDetail() {
        this.props.navigation.navigate('AddEventFriend')
    }
    gotoTeamList() {
        this.props.navigation.navigate('FriendInEvent')
    }
    gotoRegister = () => {
        this.props.navigation.navigate('Register')
        this.hideModalError()
    }


    render() {
        let { searchText } = this.state
        return (
            <Container style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <HeaderTeam
                    title={this.state.title}
                    menu={true}
                    goback={() => this.props.navigation.navigate('ControlDistance')}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}

                />

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

                <Modal isVisible={this.state.isModalVisible}>
                    <ModalAddFriend
                        toggleModal={this.hideModal}
                        outputfriend={this.state.friendOutput[0]}
                        friend={datafriend}
                        getAddFriend={this.addFriend.bind(this)}
                        textAdd="เพิ่มเพื่อน"
                    />
                </Modal>
                <Modal isVisible={this.state.isModalVisibleError}>
                    <ErrorModalAddFriend
                        toggleModal={this.hideModalError}
                        goRegister={this.gotoRegister.bind(this)}
                    />
                </Modal>

                <FriendListView
                    AddFriendDetail={() => this.gotoAddFriendDetail()}
                    TeamList={() => this.gotoTeamList()}
                    datafriend={this.state.dataSource}
                />
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.token,
        userprofile: state.userprofile,
        event: state.event
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    text: {
        fontSize: 20,
        padding: 15,
    },
})

export default connect(mapStateToProps)(FriendList);
