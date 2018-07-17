import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { Left, Right } from "native-base";
import { connect } from 'react-redux'
import axios from 'axios'
import req from '../../../config/uri_req'
import api_key from '../../../config/api_key'

var apikey = api_key[0].api_key


class ListFriendDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pressStatus: true,
            id: this.props.event.event.EventID,
            userid: this.props.username.username,
            runnerid: this.props.userprofile.userprofile.RunnerID
        }
    }

    componentDidMount() {
        const uri = req[0].uspGetCourseLists
        let data = ({
            params: [
                {
                    name: "EventID", value: this.props.event.event.EventID
                },
                {
                    name: "Username", value: this.props.username.username
                },
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, dataSource: responseJson.data });
                console.log(this.state.dataSource)
            }).catch((error) => {
                console.error(error);
            });
    }
    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }
    alertShow(item) {
        let { runnerid } = this.state
        // this.props.getRunnerID(runnerid)
        console.log(runnerid)
        this.props.getDistance(item)
        // this.props.getFriend(item)
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <View style={styles.listview}>
                        <TouchableHighlight onPress={() => this.alertShow(item)}
                            activeOpacity={0.5}
                            underlayColor="#FC561F" >
                            <View style={this.state.pressStatus ? styles.cellDistance : styles.cellDistanceOnPress}>
                                <View style={styles.content}>
                                    <Left>
                                        <Text style={styles.title}>
                                            {item.CourseName} {item.Distance}
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text style={styles.detail}>{item.Fee} บาท</Text>
                                    </Right>
                                </View>

                            </View>
                        </TouchableHighlight>
                    </View>}
                    keyExtractor={(item, index) => index.toString()} />
            </View >
        );
    }
}
const mapStateToProps = state => {
    return {
        event: state.event,
        username: state.username,
        userprofile: state.userprofile,
        token: state.token
    }
}


const styles = StyleSheet.create({
    listview: {
        backgroundColor: '#fff',
        paddingBottom: 20
    },
    cellDistance: {
        justifyContent: 'center',
        // borderColor: '#f1f1f1',
        // borderBottomWidth: 1,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    cellDistanceOnPress: {
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        borderColor: '#f1f1f1',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    content: {
    },
    title: {
        fontFamily: 'kanit'
    },
    detail: {
        fontFamily: 'kanit',
        color: '#666666'
    }
})

export default connect(mapStateToProps)(ListFriendDistance);
