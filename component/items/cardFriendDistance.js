import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import Switch from 'react-native-switch-pro'

import ListFriendDistance from '../list/event/listFriendDistance'
import ListFriendShirth from '../list/listShirt/listFriendShrit'
import dataDistance from '../list/listevent/dataDistance'
import dataPrice from '../list/listevent/dataPrice'
import dataFriend from '../list/listFriend/dataFriend';
import dataShirts from '../list/listShirt/dataShirt'
import { connect } from 'react-redux';

class CradFriendDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.distance.RunnerID,
            container: true,
            distance: false,
            sizeShirth: false,
            items: [],
            total: parseFloat("0"),
            dataDis: [],
            dataShirt: [],
            dataRegis: [],
            iconName: "arrow-forward",
            value: false,
            photoplus: false,

            runnerid: "",
            couseID: "",
            nameRegis: "",
            jersersize: "",
            fee: "",
            firstname : "",
            lastname : ""

        }
    }
    componentDidMount() {
        let dis = this.props.distance
        this.setState({ items: dis, name: dis.RunnerID ,firstname : dis.FirstName ,lastname : dis.LastName })
        console.log(this.state.name)
    }
    onPressDeleteItem() {
        this.props.delete()
    }
    sumPrice() {
        const add = (a, b) =>
            a + b
        const sum = dataPrice.reduce(add)
        console.log(sum)
        this.props.setTotalRegister(sum)
        this.props.setTotal(sum)
    }

    passDistance(item) {
        this.setState({
            dataDis: item,
            total: parseFloat(item.Fee),
            distance: !this.state.distance,
            couseid: item.CourseID,
            nameRegis: item.Distance,
            runnerid: this.state.name,
            
        })
        dataDistance.push(item)
        this.props.addDistanceFriend(dataDistance)
        dataPrice.push(parseFloat(item.Fee))
        this.sumPrice()
        this.checkPhotoPlus(item)
    }

    passShirt(item) {
        this.setState({
            sizeShirth: !this.state.sizeShirth,
            dataShirt: item,
            jersersize: item.JerseySizeValue
        })
        dataShirts.push(item)
        this.props.addSize(dataShirts)
        this.getDataRegisFriend(item.JerseySizeValue)
    }
    getDataRegisFriend(JerseySizeValue) {
        let { runnerid, couseid, nameRegis, total, jersersize, dataRegis,firstname,lastname } = this.state
        let data = {
            runnerid: runnerid,
            firstname : firstname,
            lastname : lastname,
            couseid: couseid,
            nameRegis: nameRegis,
            fee: total,
            size: JerseySizeValue
        }
        dataFriend.push(data)
        console.log(dataFriend)
        this.props.addFriendInEvent(dataFriend)
    }
    photoPlusSwitch = () => {
        let { dataFriendRegis } = this.state
        this.setState({ photoplusValue: 100 })
        console.log(this.state.photoplusValue)
        // this.getDataRegisFriend(dataFriendRegis)

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
    checkPhotoPlus(item) {
        let dis = this.props.friendlist.dataDis
        if (item.PhotoPlusService == "0") {
            this.setState({ photoplus: false })
        }
        else if (item.PhotoPlusService == "1") {
            this.setState({ photoplus: true })
        }
    }
    render() {
        const { items } = this.state
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: items.PicProfile }} />
                        <Body style={{ paddingHorizontal: 5 }}>
                            <Text style={{ fontFamily: "kanit" }}>{items.FirstName} - {items.LastName}</Text>
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
                                        <Text style={styles.labelTitle}>ระยะทาง : {this.state.dataDis.CourseName} {this.state.dataDis.Distance}</Text>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={() => this.setState({ distance: !this.state.distance })}
                                            onPressIn={() => this.chageIcon()}>
                                            <Icon name={this.state.iconName} style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </Right>
                                </View>
                                {this.state.distance &&
                                    <ListFriendDistance
                                        getDistance={this.passDistance.bind(this)}
                                        getFriend={this.getDataRegisFriend.bind(this)}
                                    />}

                                <View style={{ flexDirection: 'row' }}>
                                    <Left>
                                        <Text style={styles.labelTitle}>ขนาดไซค์เสื้อ : {this.state.dataShirt.JerseySizeValue} {this.state.dataShirt.JerseySizeDesc}</Text>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={() => this.setState({ sizeShirth: !this.state.sizeShirth })}
                                            onPressIn={() => this.chageIcon()}>
                                            <Icon name={this.state.iconName} style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </Right>
                                </View>
                                {this.state.sizeShirth &&
                                    <ListFriendShirth getShirt={this.passShirt.bind(this)} />
                                }
                            </View>
                        </View>
                    </Body>
                </CardItem>
                {this.state.photoplus &&
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
                }
            </Card>

        );
    }
}
const mapStateToProps = state => {
    return {
        friendlist: state.friendlist
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addDistanceFriend: (dataDis) => {
            dispatch({
                type: 'addDistanceFriend',
                payload: dataDis
            })
        },
        addSize: (dataShirt) => {
            dispatch({
                type: 'addSize',
                payload: dataShirt
            })
        },
        addFriendInEvent: (dataFriend) => {
            dispatch({
                type: 'addFriendInEvent',
                payload: dataFriend
            })
        },
        setTotalRegister: (sum) => {
            dispatch({
                type: 'setTotalRegister',
                payload: sum
            })
        },
        setTotal: (sum) => {
            dispatch({
                type: "setTotal",
                payload: sum
            })
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(CradFriendDistance)