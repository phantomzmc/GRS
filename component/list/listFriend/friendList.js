import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, RefreshControl, Alert, TouchableOpacity, ListView, Icon } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from "react-native-modal";
import ModalAddFriend from '../../modal/addFriend'
import AddStatusError from '../../modal/addStatus_error'
import datafriend from '../../../component/list/listFriend/dataFriend'
import datafriendRegis from '../../../component/list/listFriend/dataFriend-regis'
import { SwipeListView } from 'react-native-swipe-list-view';
import req from '../../../config/uri_req'
import api_key from '../../../config/api_key'

let uri2 = req[0].uspDeleteFriendLists
var uri = req[0].uspGetFriendLists
var apikey = api_key[0].api_key


class FriendListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefesh: false,
            isModalVisible: false,
            friend: {},
            datafriendlist: [],
            isAddStatusError: false
        }
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    componentDidMount() {
        this.getFriend()
    }
    shouldComponentUpdate(nextProps) {
        let { datafriend } = this.props
        if (datafriend != nextProps.datafriend ) {
            console.log("refresh list")
            this.getFriend()
            return true
        }
        return true
    }
    getFriend() {
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "PageNo", value: "1" },
                { name: "RowPerPage", value: "12" }
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
                this.setState({ isLoading: false, dataSource: response.data });
                console.log(this.state.dataSource)
            }).catch((error) => {
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                console.error(error);
            });
    }
    deleteFriend(item) {
        console.log("test : " + item)
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "FriendID", value: item.RunnerID }
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
                this.setState({ isLoading: false, dataSource: response.data });
                console.log(this.state.dataSource)
                this.onRefesh()
            }).catch((error) => {
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                console.error(error);
            });
    }
    onRefesh = () => {
        this.componentDidMount()
    }
    hideModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    hideModalError = () => {
        this.setState({
            isAddStatusError: false
        })
    }
    _refreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={() => this._refreshListView()} />
        )
    }

    _refreshListView() {

        this.setState({ isLoading: true })
        this.getFriend()
        this.setState({ isLoading: false }) //Stop Rendering Spinner
    }
    _checkAddFriendList(item, status) {
        var data = datafriendRegis
        var str_item = item
        for (i = 0; i <= data.length; i++) {
            if (JSON.stringify(str_item) == JSON.stringify(data[i])) {
                console.log("ซ้ำ")
                status = false
                break;
            }
            else if (JSON.stringify(str_item) != JSON.stringify(data[i])) {
                status = true
            }
        }
        setTimeout(() => {
            this._addFriendList(item, status)
        }, 1500)
        return status
    }
    _addFriendList(item, status) {
        // this._checkAddFriend(item)
        var value = status
        console.log(value)
        if (value == false) {
            this.setState({ isAddStatusError: true })
        }
        else if (value == true) {
            datafriendRegis.push(item)
            this.props.setFriendRegister(datafriendRegis)
            this.setState({ frienddistance: true })
            setTimeout(() => {
                this.setState({ frienddistance: false })
            }, 1000)
        }
    }
    alertShow(item) {
        this.setState({ friend: item })
        console.log(item)
        this.hideModal()
        // this._checkAddFriendList(item)
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        padding: 20
                    }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View
                style={{
                    flex: 1,
                    // paddingTop: 20
                }}>
                <SwipeListView
                    useFlatList
                    refreshControl={this.props.refreshlist}
                    data={this.state.dataSource}
                    refreshing={this.state.isRefesh}
                    onRefresh={this.onRefesh}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <View style={styles.cellFriend}>
                                <View>
                                    <Image
                                        source={{ uri: item.PicProfile }}
                                        style={styles.avatar} />
                                </View>
                                <TouchableOpacity>
                                    <View style={styles.textListFriend}>
                                        <Text style={styles.textName}>{item.FirstName} - {item.LastName}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    data={this.state.dataSource}
                    renderHiddenItem={({ item }) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => this.deleteFriend(item)}>
                                <Text style={{ fontFamily: 'Kanit', color: '#fff' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    // leftOpenValue={75}
                    rightOpenValue={-75}
                />

                <Modal isVisible={this.state.isModalVisible}>
                    <ModalAddFriend
                        toggleModal={this.hideModal}
                        outputfriend={this.state.friend}
                        friend={datafriend}
                        getAddFriend={this._checkAddFriendList.bind(this)}
                        textAdd="เพิ่มลงในการสมัคร"
                    />
                </Modal>
                <Modal isVisible={this.state.isAddStatusError}>
                    <AddStatusError
                        title="คุณได้เพิ่มเพื่อนคนนี้ในรายการวิ่งแล้ว"
                        toggleModal={this.hideModalError}
                    />
                </Modal>

            </View >

        );
    }
}
const mapStateToProps = state => {
    return {
        userprofile: state.userprofile,
        token: state.token
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addFriend: (profile) => {
            dispatch({
                type: 'addFriend',
                payload: profile
            })
        },
        setFriendRegister: (datafriend) => {
            dispatch({
                type: 'setFriendRegister',
                payload: datafriend
            })
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    listview: {
        backgroundColor: '#fff',
    },
    cellFriend: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderColor: '#f1f1f1',
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 1,
    },
    textListFriend: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
    },
    textName: {

        fontSize: 17
    },
    textAge: {
        fontSize: 10,
        color: '#666666'
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendListView);
