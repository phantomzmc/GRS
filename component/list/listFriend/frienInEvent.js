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
            index: [],
            deleteCellKey: null
        }
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
    keyExtractor = (item, index) => {
        return index
    }
    deleteItem() {
        let { index, dataSource } = this.state
        Alert.alert(
            'ลบรายชื่อเพื่อน',
            'คุณต้องการลบ ' + dataSource.gen + '' , 
            [
                {text : 'ยกเลิก'},
                {text : 'ตกลง' , onPress : () => {
                    dataSource.splice(index,1)
                    console.log("delete")
                    console.log(dataSource)
                    this.refreshFlatlist()
                }}
            ],{cancelable : true}
        )
    }
    refreshFlatlist = (deleteKey) => {
        let { deleteCellKey } = this.state
        this.setState((prevState) => {
            return {
                deleteCellKey : deleteKey
            }
        })
    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    refreshing={true}
                    renderItem={({ item, index }) =>
                        <View style={styles.container}>
                            <CardFriendDistance distance={item}
                                                delete={this.deleteItem.bind(this)}
                                                 />
                        </View>}
                    keyExtractor={this.keyExtractor} />
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