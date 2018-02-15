import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Header from '../component/items/header_profile'
import EventListFriend from '../component/list/listFriend/eventListFriend'

class TeamList extends Component {
    static navigationOptions = {
        title: 'ลงทะเบียนแบบกลุ่ม',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff'
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <EventListFriend />
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={this.goTotalPayment}>
                        <Text style={styles.textButton}>ถัดไป</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Kanit',

    }

})
export default TeamList