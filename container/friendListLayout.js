import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FriendListView from '../component/list/listFriend/friendList'
import { Item } from 'native-base';

class FriendList extends Component {
    static navigationOptions = {
        title: 'รายชื่อเพื่อน',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: "Kanit",
            fontWeight: '500',
        }
    };
    gotoAddFriendDetail() {
        this.props.navigation.navigate('AddEventFriend')
    }
    gotoTeamList(){
        this.props.navigation.navigate('TeamList')
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> รายชื่อเพื่อน </Text>
                <FriendListView AddFriendDetail={() => this.gotoAddFriendDetail()} 
                                TeamList={() => this.gotoTeamList()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    text: {
        fontSize: 20,
        padding: 15,
    }
})

export default FriendList;
