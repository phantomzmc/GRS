import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import PhotoPlusFriend from './photoPlusFriend'
import ListFriendDistance from '../list/event/listFriendDistance'
import ListFriendShirth from '../list/listShirt/listFriendShrit'
import dataDistance from '../list/listevent/dataDistance'
import dataPrice from '../list/listevent/dataPrice'
import dataFriend from '../list/listFriend/dataFriend';
import dataShirts from '../list/listShirt/dataShirt'
import dataFriendFull from '../list/listFriend/dataFriend-full'
import dataFriendRegis from '../list/listFriend/dataFriend-regis'
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
            pricePhotoPlus: "",
            runnerid: "",
            couseID: "",
            nameRegis: "",
            jersersize: "",
            fee: "",
            firstname: "",
            lastname: "",
            imgProfile : "",
            email : "",
            index: this.props.idkey,
        }
    }
    componentWillMount() {

        clearInterval(this._interval);
    }
    componentDidMount() {
        let dis = this.props.distance
        this._interval = setInterval(() => {
            this.setState({
                items: dis,
                name: dis.RunnerID,
                firstname: dis.FirstName,
                lastname: dis.LastName,
                imgProfile : dis.PicProfile,
                email : dis.Email,
                index: this.props.idkey,

            })
        }, 500);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.items != dataFriendRegis) {
            console.log("update")
            this.setState({ items: dataFriendRegis })
        }
    }

    onPressDeleteItem(index) {
        this.props.delete(index)
        console.log(index)
        // dataFriendRegis.splice(index, 1)
        // console.log(dataFriendRegis)
        // this.props.setFriendRegister(dataFriendRegis)

    }
    sumPrice() {
        console.log(dataPrice)
        const add = (a, b) =>
            a + b
        const sum = dataPrice.reduce(add)
        console.log(sum)
        this.props.setTotalRegister(sum)
        this.props.setTotal(sum)
    }

    passDistance(item) {
        var price = item.CoursePrice
        this.setState({
            dataDis: item,
            total: parseFloat(item.Fee),
            distance: !this.state.distance,
            couseid: item.CourseID,
            nameRegis: item.Distance,
            runnerid: this.state.name,
            photoplusService: item.PhotoPlusService,
        })
        dataDistance[this.state.index] = item
        this.props.addDistanceFriend(dataDistance)
        dataPrice.push(parseFloat(item.Fee))
        this.sumPrice()
        this.checkPhotoPlus(item, price)
    }


    passShirt(item) {
        this.setState({
            sizeShirth: !this.state.sizeShirth,
            dataShirt: item,
            jersersize: item.JerseySizeValue
        })
        // dataShirts.push(item)
        dataShirts[this.state.index] = item
        this.props.addSize(dataShirts)
        this.getDataRegisFriend(item.JerseySizeValue)
    }
    getDataRegisFriend(JerseySizeValue) {
        let { runnerid, couseid, nameRegis, total, jersersize, dataRegis, firstname, lastname,imgProfile ,email} = this.state
        let data = {
            RunnerID: runnerid,
            CourseID: couseid,
            JerseySize: JerseySizeValue,
            PhotoPlusService: "0",
            PromoCode: "",
            Email : email,
            CoursePrice: total,
        }
        let fulldata = {
            RunnerID: runnerid,
            firstname: firstname,
            lastname: lastname,
            CourseID: couseid,
            JerseySize: JerseySizeValue,
            PhotoPlusService: "0",
            PromoCode: "",
            nameRegis: nameRegis,
            CoursePrice: total,
            Email : email,
            picProfile : imgProfile
        }
        dataFriend.push(data)
        dataFriendFull.push(fulldata)
        this.props.addFriendInEvent(dataFriend)
        this.props.addFullFriendInEvent(dataFriendFull)
    }
    photoPlusSwitch = (photoplus) => {
        let { index } = this.state
        console.log(photoplus)
        dataFriend[index].PhotoPlusService = photoplus
        dataFriendFull[index].PhotoPlusService = photoplus
        console.log(dataFriend)
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
    checkPhotoPlus(item, price) {
        let dis = this.props.friendlist.dataDis
        if (item.PhotoPlusService == "0") {
            this.setState({ photoplus: false })
        }
        else if (item.PhotoPlusService == "1") {
            this.setState({ photoplus: true })
        }
        return price
    }

    render() {
        const { items, index } = this.state
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail
                            // source={require("../icon/boy.png")}
                            source={{ uri: items.PicProfile }}
                        />
                    </Left>
                    <Body style={{ paddingHorizontal: 20, justifyContent: "space-around" }}>
                        <Text style={{ fontFamily: "Kanit" }}>{items.FirstName} {items.LastName}</Text>
                        <Text note style={{ fontFamily: "Kanit" }}>{items.gen} -  {items.age}</Text>

                    </Body>
                    <Right>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.onPressDeleteItem(this.props.idkey)}>
                                <Icon name="ios-trash-outline" style={{ color: 'red',fontSize : 50}} />
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
                                        <TouchableOpacity onPress={() => this.setState({ distance: !this.state.distance })}
                                            onPressIn={() => this.chageIcon()}>
                                            {dataDistance != "" ?
                                                <Text style={styles.labelTitle}>ระยะทาง : {dataDistance[index].CourseName} {dataDistance[index].Distance}</Text> :
                                                <Text style={styles.labelTitle}>ระยะทาง : {this.state.dataDis.CourseName} {this.state.dataDis.Distance}</Text>
                                            }
                                        </TouchableOpacity>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={() => this.setState({ distance: !this.state.distance })}
                                            onPressIn={() => this.chageIcon()}>
                                            <Icon name={this.state.iconName} style={{ fontSize: 30 }} />
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
                                        <TouchableOpacity onPress={() => this.setState({ sizeShirth: !this.state.sizeShirth })}
                                            onPressIn={() => this.chageIcon()}>
                                            {dataShirts != "" ?
                                                <Text style={styles.labelTitle}>ขนาดไซค์เสื้อ : {dataShirts[index].JerseySizeValue} {dataShirts[index].JerseySizeDesc}</Text> :
                                                <Text style={styles.labelTitle}>ขนาดไซค์เสื้อ : {this.state.dataShirt.JerseySizeValue} {this.state.dataShirt.JerseySizeDesc}</Text>
                                            }
                                        </TouchableOpacity>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={() => this.setState({ sizeShirth: !this.state.sizeShirth })}
                                            onPressIn={() => this.chageIcon()}>
                                            <Icon name={this.state.iconName} style={{ fontSize: 30 }} />
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
                        <PhotoPlusFriend
                            setPhotoPlus={this.photoPlusSwitch.bind(this)}
                            indexs={this.state.index}
                            price={this.state.total}
                        />
                    </CardItem>
                }
            </Card>

        );
    }
}
const mapStateToProps = state => {
    return {
        friendlist: state.friendlist,
        photoplus: state.photoplus
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
        addFullFriendInEvent: (fulldata) => {
            dispatch({
                type: 'addFullFriendInEvent',
                payload: fulldata
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
        },
        setFriendRegister: (dataFriend) => {
            dispatch({
                type: "setFriendRegister",
                payload: dataFriend
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
        fontFamily: 'Kanit',
        fontSize: 16
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(CradFriendDistance)