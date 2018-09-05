import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';

import { connect } from 'react-redux'
import HeaderProfile from '../component/items/header_profile.js'
import ListDistance from '../component/list/event/listdistance'
import ButtonSubmit from '../component/items/buttonSubmit';
import axios from 'axios'
import req from '../config/uri_req'
import api_key from '../config/api_key'


class RegisterDistance extends Component {

    constructor(props) {
        super(props)
        this.state = {
            event: {
                name: "name",
                date: "date"
            },
            distanceEvent: {
                distanceName: "",
                distance: "",
                price: ""
            },
            refreshing: false,
            statusList: false,
            loading: true
        }
        // this.gotoShirtPhotoPlus = this.gotoShirtPhotoPlus.bind(this)
    }
    componentWillMount() {
        // setTimeout(() => {
        //     this.setState({ statusList: true })
        // }, 1000)
    }
    componentDidMount() {
        this._onRefresh()
        setTimeout(() => {
            this.fetchRegisEvent()
        }, 1000)
        console.log(this.props.statusRegis)
    }
    fetchRegisEvent() {
        let userprofile = this.props.userprofile.userprofile
        let event = this.props.event.event
        const uri = req[0].uspCheckRegisterEvent
        const apikey = api_key[0].api_key
        let data = ({
            params: [
                { name: "EventID", value: event.EventID },
                { name: "RunnerID", value: userprofile.RunnerID }
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
                this.setState({ data: responseJson.data[0], loading: false, statusList: true });
                console.log(responseJson.data)
                if (responseJson.data[0].RegisterStatus == "0") {
                    this.setState({ statusRegis: 0 })
                    console.log("statusRegis: true")
                }
                else if (responseJson.data[0].RegisterStatus == "1") {
                    this.setState({ statusRegis: 1 })
                    console.log("statusRegis: false")

                }
            }).catch((error) => {
                this.setState({ loading: true })
                this.fetchRegisEvent()
            });
    }
    _onRefresh() {
        this.setState({ refreshing: true })
        setTimeout(() => {
            this.setState({ refreshing: false })
        }, 1000)
    }
    nextState = () => {
        console.log("ShirtPhotoPlus")
        this.props.navigation.navigate("ShirtPhotoPlus")
    }
    gotoShirtPhotoPlus(distanceEvent) {
        this.setState({ distanceEvent: distanceEvent })
        this.props.setTotalEvent(distanceEvent.price)
        this.props.setTotal(distanceEvent.price)
        this.props.setTotalRegister(distanceEvent.price)
        this.props.addDistance(distanceEvent)
        this.props.nextState()
    }
    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />}>
                <View style={styles.container}>
                    <HeaderProfile />
                    <Text style={styles.text}>
                        โปรดเลือกระยะทาง
                     </Text>
                    {this.state.loading &&
                        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <ActivityIndicator size="large" />
                        </View>
                    }
                    {this.state.statusList &&
                        <View>
                            {this.state.statusRegis == 0 ?
                                <ListDistance onGotoshirt={this.gotoShirtPhotoPlus.bind(this)} />
                                :
                                <View style={styles.container2}>
                                    <Icon name="ios-information-circle-outline" style={{ color: "red" }} />
                                    <Text style={{ fontFamily: "kanit" }}>ลงทะเบียนงานนี้แล้ว</Text>
                                </View>
                            }
                        </View>
                    }
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userprofile: state.userprofile,
        event: state.event,
        token: state.token
    }
}
const mapDisPatchToProps = (dispatch) => {
    return {
        addDistance: (distanceEvent) => {
            dispatch({
                type: "addDistance",
                payload: distanceEvent
            })
        },
        setTotal: (totalPrice) => {
            dispatch({
                type: "setTotal",
                payload: totalPrice
            })
        },
        setTotalRegister: (total) => {
            dispatch({
                type: "setTotalRegister",
                payload: total
            })
        },
        setTotalEvent: (totalEvent) => {
            dispatch({
                type: "setTotalEvent",
                payload: totalEvent
            })
        }
    }
}


const styles = StyleSheet.create({
    container: {

    },
    container2: {
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        padding: 10,
        fontFamily: 'kanit',
    },

})
export default connect(mapStateToProps, mapDisPatchToProps)(RegisterDistance);