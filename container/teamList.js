import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,StatusBar } from 'react-native';
import { Container, Header, Item, Input, Button, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';
import Modal from "react-native-modal";

import datafriend from '../component/list/listFriend/dataFriend'

import ButtonChage from '../component/items/bottonChage'
import HeaderProfile from '../component/items/header_profile.js'
import EventListFriend from '../component/list/listFriend/eventListFriend'
import HeaderTeam from '../component/items/headerTeam'
import ModalAddFriend from '../component/modal/addFriend'
import ErrorModalAddFriend from '../component/modal/addFriend_error'


class TeamList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "ลงทะเบียนแบบกลุ่ม",
            isModalVisible: false,
            isModalVisibleError: false,
            searchText: "",
        }
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
    gotoTeamList = () => {
        this.props.navigation.navigate('TabRouter')
    }
    gotoRegisterDistance = () => {
        this.props.navigation.navigate('FriendInEvent')
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <HeaderTeam title={this.state.title} />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <ScrollView>
                    <View style={styles.container}>
                        <HeaderProfile />
                        {/* <Text style={styles.textTile}>รายชื่อเพื่อน</Text> */}
                        <Header searchBar rounded>
                            <Item>
                                <Icon name="ios-search" />
                                <Input
                                    placeholder="ค้นหาเพื่อน"
                                    returnKeyType={"next"}
                                    onChangeText={(searchText) => this.setState({ searchText })}
                                    onSubmitEditing={this.showModal}
                                />
                                <Icon name="ios-people" />
                            </Item>
                        </Header>
                        <Tabs>
                            <Tab heading={<TabHeading><Icon name="ios-people" /></TabHeading>}>
                                <EventListFriend friend={datafriend} />
                            </Tab>
                            <Tab heading={<TabHeading><Icon name="ios-heart" /></TabHeading>}>
                                <Text>No Icon</Text>
                                <EventListFriend friend={datafriend} />
                            </Tab>
                        </Tabs>
                        <Modal isVisible={this.state.isModalVisible}>
                            <ModalAddFriend toggleModal={this._toggleModal}
                                friend={datafriend}
                                getAddFriend={this.addFriend.bind(this)} />
                        </Modal>
                        <Modal isVisible={this.state.isModalVisibleError}>
                            <ErrorModalAddFriend toggleModal={this._toggleModal} />
                        </Modal>
                        <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={() => navigate('FriendDistance')}>
                                <Text style={styles.textButton}>+ เพิ่มในการสมัคร</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
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