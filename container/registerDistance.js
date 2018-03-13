import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { connect } from 'react-redux'
import ButtonChage from '../component/items/bottonChage'
import HeaderProfile from '../component/items/header_profile.js'
import ListDistance from '../component/list/event/listdistance'
import ButtonSubmit from '../component/items/buttonSubmit';

class RegisterDistance extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    static navigationOptions = {
        title: 'ลงทะเบียนวิ่ง',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: 'kanit',
        }
    };
    constructor(props) {
        super(props)
        this.state = {
            event : {
                name: "name",
                date: "date"
            },
            distanceEvent : {
                distanceName: "",
                distance: "",
                price: ""
            }
        }
        this.gotoShirtPhotoPlus = this.gotoShirtPhotoPlus.bind(this)
    }

    gotoTeamList = () => {
        this.props.navigation.navigate('TabRouter')
    }
    gotoRegisterDistance = () => {
        this.props.navigation.navigate('RegisterDistance')
    }
    gotoShirtPhotoPlus = (dispatchEvent) => {
        this.setState ({distanceEvent : dispatchEvent})
        console.log(this.state.distanceEvent)
        this.props.navigation.navigate('ShirtPhotoPlus')
        this.props.addDistance(this.state.distanceEvent)
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <ButtonChage Team={this.gotoTeamList.bind(this)}
                        Single={this.gotoRegisterDistance.bind(this)} />
                    <HeaderProfile title={this.state.event.name}
                                    detail={this.state.event.date} />
                    <Text style={styles.text}>
                        โปรดเลือกระยะทาง
                     </Text>
                    <ListDistance onGotoshirt={this.gotoShirtPhotoPlus.bind(this)}/>
                    <ButtonSubmit PhotoPlus={this.gotoShirtPhotoPlus.bind(this)} />
                </View>
            </ScrollView>
        );
    }
}
const mapDisPatchToProps = (dispatch) => {
    return {
        addDistance : (distanceEvent) => {
            dispatch({
                type : "addDistance",
                payload : distanceEvent
            })
        }
    }
}
const mapStatetoProps = (state) => {
    return {
        event: state.event
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
export default connect(null,mapDisPatchToProps)(RegisterDistance);