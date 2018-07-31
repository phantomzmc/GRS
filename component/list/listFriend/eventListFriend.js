import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
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
        }
    }

    addFriendEvent = (datafriend) => {
        this.props.setFriendRegister(datafriend)
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
            <View
                style={{
                    flex: 1,
                    padding: 20
                }}>
                <FlatList
                    horizontal
                    refreshControl={this._refreshControl()}
                    data={this.props.friend}
                    renderItem={({ item, index }) =>
                        <CellEventListFriend
                            items={item}
                            idkey={index}
                            getAddFriend={this.addFriendEvent.bind(this)}
                        />
                    }

                    keyExtractor={(item, index) => index} />
            </View >
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

