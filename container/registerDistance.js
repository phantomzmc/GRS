import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, ScrollView, RefreshControl, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { connect } from 'react-redux'
import HeaderProfile from '../component/items/header_profile.js'
import ListDistance from '../component/list/event/listdistance'
import ButtonSubmit from '../component/items/buttonSubmit';


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
            refreshing: false
        }
        // this.gotoShirtPhotoPlus = this.gotoShirtPhotoPlus.bind(this)
    }
    componentDidMount() {
        this._onRefresh()
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
                    {this.props.statusRegis == true ?
                        <ListDistance onGotoshirt={this.gotoShirtPhotoPlus.bind(this)} />
                        :
                        <View>
                            <Text>ลงทะเบียนงานนี้แล้ว</Text>
                        </View>
                    }
                </View>
            </ScrollView>
        );
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
    }
}


const styles = StyleSheet.create({
    container: {

    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        padding: 10,
        fontFamily: 'kanit',
    },

})
export default connect(null, mapDisPatchToProps)(RegisterDistance);