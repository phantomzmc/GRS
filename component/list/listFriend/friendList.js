import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert, TouchableOpacity, ListView, Icon } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'
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

        }
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    }

    componentDidMount() {
        this.getFriend()
        setTimeout(() => {
            this.getFriend()
        }, 500)

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
    alertShow(item) {
        console.log(item)
        Alert.alert(item.name, " เพศ : " + item.gen + " อายุ : " + item.age,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.props.AddFriendDetail() },
                { text: 'หน้าหลัก', onPress: () => this.props.TeamList() }
            ],
            { cancelable: false }
        )
        this.props.addFriend(item)
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
                    data={this.state.dataSource}
                    refreshing={this.state.isRefesh}
                    onRefresh={this.onRefesh}
                    renderItem={({ item}) => (
                        <View style={styles.container}>
                            <View style={styles.cellFriend}>
                                <View>
                                    <Image
                                        source={require("../../icon/boy.png")}
                                        style={styles.avatar} />
                                </View>
                                <TouchableOpacity>
                                    <View style={styles.textListFriend}>
                                        <Text style={styles.textName}>{item.FirstName} - {item.LastName}</Text>
                                        {/* <Text style={styles.textAge}>อายุ : {item.NickName} - {item.Gender}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    data={this.state.dataSource}
                    renderHiddenItem={({ item }) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => this.deleteFriend(item)}>
                                <Text style={{ fontFamily: 'kanit', color: '#fff' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    // leftOpenValue={75}
                    rightOpenValue={-75}
                />

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
        resizeMode: 'contain'

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
