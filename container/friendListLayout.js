import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Item, Icon, Input } from 'native-base'

import FriendListView from '../component/list/listFriend/friendList'

class FriendList extends Component {
    gotoAddFriendDetail() {
        this.props.navigation.navigate('AddEventFriend')
    }
    gotoTeamList() {
        this.props.navigation.navigate('FriendInEvent')
    }
    render() {
        return (
            <View style={styles.container}>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="ค้นหาเพื่อน" />
                        <Icon name="ios-people" />
                    </Item>
                </Header>
                {/* <Text style={styles.text}> รายชื่อเพื่อน </Text> */}
                <FriendListView AddFriendDetail={() => this.gotoAddFriendDetail()}
                    TeamList={() => this.gotoTeamList()} />
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
