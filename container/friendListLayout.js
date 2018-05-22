import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Item, Icon, Input, Thumbnail, Button, Text } from 'native-base'
import Modal from "react-native-modal";
import datafriend from '../component/list/listFriend/dataFriend'

import FriendListView from '../component/list/listFriend/friendList'
import HeaderTeam from '../component/items/headerTeam'
import ModalAddFriend from '../component/modal/addFriend'
import ErrorModalAddFriend from '../component/modal/addFriend_error'

class FriendList extends Component {
    state = {
        title: "รายชื่อเพื่อน",
        isModalVisible: false,
        isModalVisibleError: false,
        searchText: "",
    }
    showModal = () => {
        if (this.state.searchText == "1509901688799") {
            this.setState({ isModalVisible: !this.state.isModalVisible })
        }
        else if (this.state.searchText == "k") {
            this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
        }
    }
    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible }) || this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
    }
    addFriend = (newitem) => {
        datafriend.push(newitem)
    }
    gotoAddFriendDetail() {
        this.props.navigation.navigate('AddEventFriend')
    }
    gotoTeamList() {
        this.props.navigation.navigate('FriendInEvent')
    }

    render() {
        let { searchText } = this.state
        return (
            <View style={styles.container}>
                <HeaderTeam title={this.state.title} />
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="ค้นหาเพื่อน"
                            returnKeyType={"next"}
                            onChangeText={(searchText) => this.setState({ searchText })}
                            onSubmitEditing={this.showModal} />
                        <Icon name="ios-people" />
                    </Item>
                </Header>

                <Modal isVisible={this.state.isModalVisible}>
                    <ModalAddFriend toggleModal={this._toggleModal}
                                    friend={datafriend}
                                    getAddFriend={this.addFriend.bind(this)} />
                </Modal>
                <Modal isVisible={this.state.isModalVisibleError}>
                    <ErrorModalAddFriend toggleModal={this._toggleModal} />
                </Modal>

                <FriendListView AddFriendDetail={() => this.gotoAddFriendDetail()}
                    TeamList={() => this.gotoTeamList()}
                    friend={datafriend} />
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
    },
})

export default FriendList;
