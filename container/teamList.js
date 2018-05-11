import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Item, Input, Button, Tab, Tabs, TabHeading,Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';

import ButtonChage from '../component/items/bottonChage'
import HeaderProfile from '../component/items/header_profile.js'
import EventListFriend from '../component/list/listFriend/eventListFriend'


class TeamList extends Component {

    gotoTeamList = () => {
        this.props.navigation.navigate('TabRouter')
    }
    gotoRegisterDistance = () => {
        this.props.navigation.navigate('FriendInEvent')
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <HeaderProfile />
                    {/* <Text style={styles.textTile}>รายชื่อเพื่อน</Text> */}
                    <Header searchBar rounded>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="ค้นหาเพื่อน" />
                            <Icon name="ios-people" />
                        </Item>
                    </Header>
                    <Tabs>
                        <Tab heading={<TabHeading><Icon name="ios-people" /></TabHeading>}>
                            <EventListFriend />
                        </Tab>
                        <Tab heading={<TabHeading><Icon name="ios-heart"/></TabHeading>}>
                            <Text>No Icon</Text>
                            <EventListFriend />
                        </Tab>
                    </Tabs>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => navigate('FriendDistance')}>
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