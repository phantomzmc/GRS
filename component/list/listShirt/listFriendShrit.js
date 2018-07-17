import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux'
import req from '../../../config/uri_req'
import api_key from '../../../config/api_key'

var uri = req[0].uspGetJerseyLists
var apikey = api_key[0].api_key


class ListShirt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            size: "",

        }
        this.teamGetShirt = this.teamGetShirt.bind(this)
    }
    componentDidMount() {
        let data = ({
            params: [
                { name: "CourseID", value: this.props.friendlist.dataDis[0].CourseID },
                { name: "Gender", value: this.props.userprofile.userprofile.Gender }
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, dataSource: responseJson.data, });
                console.log(this.state.dataSource)
            }).catch((error) => {
                console.error(error);
            });

    }

    teamGetShirt(item) {
        this.props.getShirt(item)
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
                    paddingTop: 20
                }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <View style={styles.container}>
                        <TouchableHighlight
                            onPress={() => this.teamGetShirt(item)}
                            activeOpacity={0.5}
                            underlayColor="#FC561F">
                            <View style={styles.sizeshirt}>
                                <Text style={{ fontFamily: "Kanit", }}>{item.JerseySizeValue} </Text>
                                <Text style={{ fontFamily: "Kanit", }}> ({item.JerseySizeDesc})</Text>
                            </View>
                        </TouchableHighlight>
                    </View>}
                    keyExtractor={(item, index) => index.toString()} />
            </View >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        friendlist: state.friendlist,
        userprofile: state.userprofile,
        token : state.token
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        setSizeShirt: (size) => {
            dispatch({
                type: 'setSizeShirt',
                payload: size
            })
        },
        setImageShirt: shirt => {
            dispatch({
                type: 'setImageShirt',
                payload: shirt
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {

    },
    sizeshirt: {
        borderColor: '#f1f1f1',
        padding: 15,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    ListView: {
        backgroundColor: '#fff',
    }

})
export default connect(mapStateToProps, mapDispatchtoProps)(ListShirt)