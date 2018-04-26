import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Button} from 'react-native';
import { StackNavigator } from 'react-navigation';

import ButtonChage from '../component/items/bottonChage'
import HeaderProfile from '../component/items/header_profile.js'
import EventListFriend from '../component/list/listFriend/eventListFriend'


class TeamList extends Component {
    static navigationOptions = {
        title: 'ลงทะเบียนแบบกลุ่ม',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: "Kanit",
            fontWeight: '500',
        },
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    };
    gotoTeamList = () => {
        this.props.navigation.navigate('TabRouter')
    }
    gotoRegisterDistance = () => {
        this.props.navigation.navigate('RegisterDistance')
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <HeaderProfile />
                    <Text style={styles.textTile}>รายชื่อเพื่อน</Text>
                    <EventListFriend />
                    <View style={styles.addFriend}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => navigate('FriendList')}>
                            <Text style={styles.textButton}>เพิ่มรายชื่อเพื่อน</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => navigate('AddEventFriend')}>
                            <Text style={styles.textButton}>ถัดไป</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addFriend: {
        marginTop: 30,
        alignItems: 'center',
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 100,
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
    },
    textTile: {
        padding: 10,
        fontSize: 26,
        fontWeight: '700',
        fontFamily: 'kanit',
        color: '#000',
    },

})
export default TeamList;