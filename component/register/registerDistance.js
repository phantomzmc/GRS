import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HeaderProfile from '../profile/header_profile.js'
import ListDistance from '../list/event/listdistance'

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
            color: '#fff'
        }
    };

    render() {
        return (
            <ScrollView>
                <View>
                    <HeaderProfile />
                    <Text style={styles.text}>
                        โปรดเลือกระยะทาง
                </Text>
                    <ListDistance />
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000',
        margin: 10,
    }
})
export default RegisterDistance