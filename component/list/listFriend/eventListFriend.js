import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Icon, Text, Button, CardItem, Container, Card } from 'native-base';
import { connect } from 'react-redux'
import axios from 'axios'
import CellEventListFriend from './cell-eventListFriend'
import datafriend from './dataFriend'
import req from '../../../config/uri_req'
import api_key from '../../../config/api_key'
import { colors } from '../../../node_modules/react-native-elements';

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
                        padding: 10,
                        flexDirection: "row"
                    }}>
                    <View>
                        <Card style={{ justifyContent: "center", backgroundColor: "#fff" ,opacity : 0.5}}>
                            <CardItem style={{ alignItems: "center" ,backgroundColor: "#fff", opacity: 0.9}}>
                                <Icon type="Ionicons" name="ios-add-circle-outline" style={{ color: "#000" }} onPress={() => this.props.goAddFriendList()} />
                                <Text style={{ fontFamily: "kanit", color: "#000" }} onPress={() => this.props.goAddFriendList()}>เพิ่ม Friend List</Text>
                            </CardItem>
                        </Card>
                    </View>
                    <FlatList
                        horizontal
                        refreshControl={this._refreshControl()}
                        data={this.props.friend}
                        renderItem={({ item, index }) =>

                            <CellEventListFriend
                                items={item}
                                idkey={index}
                                sendStatusCheck={this.props.changeCheck}
                            // getAddFriend={this.addFriendEvent.bind(this)}
                            />
                        }

                        keyExtractor={(item, index) => index}
                    />
                </View >

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

