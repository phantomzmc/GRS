import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import datafriend from './dataFriend'

import ListFriendDistance from '../event/listFriendDistance'
import ListShirth from '../listShirt/listShirt'
import DropDownShirth from '../listShirt/dropdownShirt'
import CardFriendDistance from '../../items/cardFriendDistance'


class FriendInEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            container: true
        }
        this.hideShow = this.hideShow.bind(this)
    }
    componentDidMount() {
        this.setState({
            dataSource: datafriend
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.container != this.state.container) {
            this.setState({ container: !this.state.container })
            console.log("nextProps")
        }
    }
    hideShow() {
        if (this.state.container === false) {
            this.setState({ container: true })
            console.log(this.state.container)

        }
        else if (this.state.container === true) {
            this.setState({ container: false })
            console.log(this.state.container)
        }

    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={styles.container}>
                            <CardFriendDistance distance={item}/>
                        </View>}
                    keyExtractor={(item, index) => index} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    listDistance: {
        width: '100%',
        justifyContent: 'center'
    },
    textLabelSize: {
        fontFamily: 'Kanit'
    },
    dropdownstyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

})

export default FriendInEvent