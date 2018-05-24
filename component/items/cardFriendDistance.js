import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import Switch from 'react-native-switch-pro'

import ListFriendDistance from '../list/event/listFriendDistance'
import ListShirth from '../list/listShirt/listShirt'
import DropDownShirth from '../list/listShirt/dropdownShirt'
import dataFriend from '../list/listFriend/dataFriend';
import data from '../list/listevent/data';

class CradFriendDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            container: true,
            distance: false,
            sizeShirth: false,
            items: [],
            totals : 500,
            // name: [],
            dataDis: [],
            dataShirt: [],
            iconName: "arrow-forward",
            value: false
        }
        this.getDataRegisFriend = this.getDataRegisFriend.bind(this)
    }
    componentDidMount() {
        this.setState({ items: this.props.distance })
    }
    onPressDeleteItem() {
        this.props.delete()
    }

    passName(item) {
        this.setState({ name: this.state.items })
        console.log(this.state.name)
    }
    passDistance = (item) => {
        let { dataDis } = this.state
        this.passName()
        this.setState({ dataDis: item , total : item.price})
        console.log(this.state.dataDis)
        this.props.getPriceTotal(this.state.total)
    }
    passShirt(shirt) {
        this.setState({ dataShirt: shirt })
        console.log(this.state.dataShirt)
    }
    getDataRegisFriend = (dataFriendRegis) => {
        let { name, dataDis, dataShirt } = this.state
        this.setState({ dataFriendRegis: { nameRegis: name, dataDisRegis: dataDis, dataShirtRegis: dataShirt } })
        this.props.getFriendRegis(dataFriendRegis)
    }
    photoPlusSwitch = () => {
        let { dataFriendRegis } = this.state
        this.setState({ photoplusValue: 100 })
        console.log(this.state.photoplusValue)
        this.getDataRegisFriend(dataFriendRegis)

    }
    chageIcon = () => {
        const { iconName } = this.state
        if (iconName == "arrow-forward") {
            this.setState({ iconName: "arrow-down" })
        }
        else if (iconName == "arrow-down") {
            this.setState({ iconName: "arrow-forward" })
        }
    }
    render() {
        const { items } = this.state
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: items.imgAvatar }} />
                        <Body style={{ paddingHorizontal: 5 }}>
                            <Text style={{ fontFamily: "kanit" }}>{items.name}</Text>
                            <Text note style={{ fontFamily: "kanit" }}>{items.gen} -  {items.age}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={this.onPressDeleteItem.bind(this)}>
                                <Icon name="ios-trash-outline" style={{ color: 'red' }} />
                            </TouchableOpacity>
                        </View>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <View style={styles.listDistance}>
                            <View style={styles.dropdownstyle}>
                                <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                                    <Left>
                                        <Text style={styles.labelTitle}>ระยะทาง : {this.state.dataDis.name} {this.state.dataDis.distance}</Text>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={() => this.setState({ distance: !this.state.distance })}
                                            onPressIn={() => this.chageIcon()}>
                                            <Icon name={this.state.iconName} style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </Right>
                                </View>
                                {this.state.distance && <ListFriendDistance getDistance={this.passDistance.bind(this)} />}

                                <View style={{ flexDirection: 'row' }}>
                                    <Left>
                                        <Text style={styles.labelTitle}>ขนาดไซค์เสื้อ : {this.state.dataShirt.label} {this.state.dataShirt.width}</Text>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={() => this.setState({ sizeShirth: !this.state.sizeShirth })}
                                            onPressIn={() => this.chageIcon()}>
                                            <Icon name={this.state.iconName} style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </Right>
                                </View>
                                {this.state.sizeShirth && <ListShirth getShirt={this.passShirt.bind(this)} />}
                            </View>
                        </View>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Icon name="ios-camera-outline" style={{ fontSize: 20 }} />
                        <Text style={{ fontFamily: "kanit", fontSize: 16 }}>Photo + Service</Text>
                    </Left>
                    <Right>
                        <Switch
                            width={60}
                            height={30}
                            value={this.state.value}
                            onSyncPress={() => this.photoPlusSwitch()}
                        />
                    </Right>
                </CardItem>
            </Card>

        );
    }
}

const styles = StyleSheet.create({
    listDistance: {
        width: '100%',
        // justifyContent: 'center'
    },
    textLabelSize: {
        fontFamily: 'Kanit'
    },
    dropdownstyle: {
        flexDirection: 'column',

    },
    labelTitle: {
        fontFamily: 'kanit',
        fontSize: 16
    }

})

export default CradFriendDistance