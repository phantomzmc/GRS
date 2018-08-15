import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Icon, Text, Button, CardItem, Container, Card } from 'native-base';
import { connect } from 'react-redux'
import axios from 'axios'
import CellEventListFriend from './cell-eventListFriend'
import CellProfile from './cell-profile'
import datafriend from './dataFriend'
import req from '../../../config/uri_req'
import api_key from '../../../config/api_key'
import { colors } from '../../../node_modules/react-native-elements';

var uri = req[0].uspSearchFriend
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
    componentDidMount() {
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "Keyword", value: this.props.userprofile.userprofile.Username },
                { name: "EventID", value: this.props.event.event.EventID }
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ dataSource: response.data[0] });
                console.log(this.state.dataSource)
            })
            .catch((error) => {

            });
        return (this.state.dataSource)
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
                        <Card style={{ justifyContent: "center", backgroundColor: "#fff", opacity: 0.5 }}>
                            <CardItem style={{ alignItems: "center", backgroundColor: "#fff", opacity: 0.9 }}>
                                <Icon type="Ionicons" name="ios-add-circle-outline" style={{ color: "#000" }} onPress={() => this.props.goAddFriendList()} />
                                <Text style={{ fontFamily: "kanit", color: "#000" }} onPress={() => this.props.goAddFriendList()}>เพิ่ม Friend List</Text>
                            </CardItem>
                        </Card>
                    </View>
                    <View>
                        <CellProfile
                            items={this.state.dataSource}
                            sendStatusCheck={this.props.changeCheck}
                        />
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
        token: state.token,
        event: state.event
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

