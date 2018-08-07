import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { Icon, Text, Button, CardItem } from 'native-base';
import { connect } from 'react-redux'
import axios from 'axios'
import CellEventListFriend from './cell-eventListFriend'
import req from '../../../config/uri_req'
import api_key from '../../../config/api_key'

var uri = req[0].uspGetFriendLists
var apikey = api_key[0].api_key

class EventListFriend extends Component {
    constructor(state) {
        super(state)
        this.state = {
            datafriend: [],
            isLoading: false,
            statusCheck: true
        }
    }

    // addFriendEvent = (datafriend) => {
    //     this.props.setFriendRegister(datafriend)
    // }
    saveDataFriend = (datafriend) => {
        this.setState({ datafriend: datafriend })
    }
    addFriendEvent() {
        this.props.setFriendRegister(this.state.datafriend)
        this.setState({ statusCheck: false })
    }
    _refreshControl() {
        console.log("refersh")
        return (
            <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={() => this._refreshListView()} />
        )
    }
    _refreshListView = () => {
        this.setState({ isLoading: true })
        console.log("_refreshListView")
        this.setState({ isLoading: false })

    }

    render() {
        let { selected, favorite } = this.state
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
            <View>
                <View
                    style={{
                        flex: 1,
                        padding: 20,
                        flexDirection: "row"
                    }}>
                    <FlatList
                        horizontal
                        refreshControl={this._refreshControl()}
                        data={this.props.friend}
                        renderItem={({ item, index }) =>

                            <CellEventListFriend
                                items={item}
                                idkey={index}
                                // getAddFriend={this.addFriendEvent.bind(this)}
                                submitAddFriend={this.saveDataFriend.bind(this)}
                                sendStatusCheck={this.state.statusCheck}
                            />
                        }

                        keyExtractor={(item, index) => index}
                    />
                </View >
                <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                    <Button rounded block warning onPress={() => this.addFriendEvent()} >
                        <Text style={{ fontFamily: 'kanit' }}> + เพิ่มเพื่อนลงในรายการวิ่ง</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friendlist: state.friendlist,
        userprofile: state.userprofile,
        token: state.token
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



export default connect(mapStateToProps, mapDispatchToProps)(EventListFriend)

