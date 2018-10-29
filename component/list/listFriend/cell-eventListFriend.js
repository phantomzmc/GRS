import React, { Component } from 'react'
import { StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { View, Card, CardItem, Left, Right } from 'native-base';
import CheckBox from 'react-native-checkbox-heaven';
import Icon from 'react-native-vector-icons/FontAwesome';
import datafriend from './dataFriend'
import datafriendRegis from './dataFriend-regis'

class CellEventListFriend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: [],
            checked: false,
            favorite: true,
            icon: "heart",
            iconColor: "#F44336",
            datafriend: [],
            statusCheck: false
        }
        this.checkFavorite = this.checkFavorite.bind(this)
    }
    componentDidMount() {
        this.setState({ item: this.props.items, statusCheck: this.props.sendStatusCheck })
        this.checkFavorite()
        // console.log(this.props.items)
        // console.log(this.state.item)
    }
    onCheck() {

    }
    addFriendEvent = (item, idkey) => {
        this._cellCheckAddFriend(item, idkey)
        // if (item.RegisterStatus == 0) {
        //     // datafriendRegis.push(item)
        //     // console.log(datafriendRegis)
        //     // this.props.submitAddFriend(datafriend)
        // }
        // else if (item.RegisterStatus == 1) {
        //     console.log("RegisterStatus == 1")
        // }
    }
    removeFriendEvent = (item) => {
        var data = datafriendRegis
        dataitem = {
            RunnerID: item.RunnerID,
            FirstName: item.FirstName,
            LastName: item.LastName,
            PicProfile: item.PicProfile,
            Email: item.Email,
            key: this.props.idkey
        }
        var str_newitem = dataitem
        for (i = 0; i <= data.length; i++) {
            if (JSON.stringify(str_newitem) == JSON.stringify(data[i])) {
                console.log("ลบ")
                datafriendRegis.splice(i, 1)
                break;
            }
            else if (JSON.stringify(str_newitem) != JSON.stringify(data[i])) {
                console.log("ผ่าน")

            }
        }

        // console.log(datafriendRegis[index])
        // datafriendRegis.splice(index, 1)
        // console.log(datafriendRegis)
        // this.props.getAddFriend(datafriendRegis)
    }
    _cellCheckAddFriend(item, idkey, status) {
        console.log("_cellCheckAddFriend" + idkey)
        var data = datafriendRegis
        dataitem = {
            key: idkey,
            RunnerID: item.RunnerID,
            FirstName: item.FirstName,
            LastName: item.LastName,
            PicProfile: item.PicProfile
        }
        var str_newitem = dataitem
        for (i = 0; i <= data.length; i++) {
            if (JSON.stringify(str_newitem) == JSON.stringify(data[i])) {
                console.log("ซ้ำ")
                status = false
                break;
            }
            else if (JSON.stringify(str_newitem) != JSON.stringify(data[i])) {
                status = true

            }
            else {
                status = false
            }
        }
        setTimeout(() => {
            this._cellAddFriend(item, status)
        }, 100)
        return status
    }
    _cellAddFriend(item, status) {
        var value = status
        dataitem = {
            key: this.props.idkey,
            RunnerID: item.RunnerID,
            FirstName: item.FirstName,
            LastName: item.LastName,
            PicProfile: item.PicProfile,
            Gender: item.Gender,
            Email: item.Email,
            RegisterStatus: item.RegisterStatus,
            FriendStatus: item.FriendStatus,
        }
        console.log(value)
        if (value == false) {
            // this.setState({ isAddStatusError: true })
        }
        else if (value == true) {
            datafriendRegis.push(dataitem)

        }
    }
    handleOnChange(val) {
        this.setState({ checked: val })
        setTimeout(() => {
            if (this.state.checked == true) {
                this.addFriendEvent(this.state.item, this.props.idkey)
                console.log(this.state.item)
                // this.setState({ statusCheck: false })
            }
            else if (this.state.checked == false) {
                this.removeFriendEvent(this.state.item)
                // console.log(this.props.idkey)
            }
        }, 100)


    }
    chageColorIcon() {
        let { favorite } = this.state
        if (favorite == true) {
            this.setState({ icon: "heart-o", iconColor: "rgb(50, 50, 50)", favorite: false })
            console.log("false")
        }
        else if (favorite == false) {
            this.setState({ icon: "heart", iconColor: "#F44336", favorite: true })
            console.log("true")
        }
    }
    checkFavorite = () => {
        let { item } = this.state
        if (this.props.items.favorites == 1) {
            this.setState({ icon: "heart", iconColor: "#F44336", favorite: true })
            console.log("1")
        }
        else if (this.props.items.favorites == 0) {
            this.setState({ icon: "heart-o", iconColor: "rgb(50, 50, 50)", favorite: false })
            console.log("2")
        }
    }

    render() {
        let { item, favorite } = this.state
        return (
            <TouchableOpacity style={styles.container} onChange={item.RegisterStatus == 0 ? this.handleOnChange.bind(this) : this.onCheck.bind(this)}>
                <Card
                    style={this.state.checked == false ?
                        styles.cardDefal :
                        styles.card
                    }
                >
                    <CardItem>
                        <Left>
                            {item.RegisterStatus == 0 ?
                                <View>
                                    <CheckBox
                                        iconSize={40}
                                        iconName='iosCircleMix'
                                        checked={this.state.checked}
                                        checkedColor='#FC561F'
                                        uncheckedColor='#C0C0C0'
                                        onChange={this.handleOnChange.bind(this)}
                                        style={{ flex: 1 }}
                                    />
                                </View>
                                :
                                item.RegisterStatus == -1 ?
                                    <View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Icon name="check" type="FontAwesome" style={{ color: "#FC561F" }} />
                                            <Text style={styles.textStatusAdd}> เพิ่มในการสมัคร</Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name="check" type="FontAwesome" style={{ color: "#9ACD32" }} />
                                        <Text style={styles.textStatusRegis}> สมัครรายการนี้แล้ว</Text>
                                    </View>
                            }
                        </Left>
                        <Right>
                            {item.FriendStatus == 0 ?
                                <Icon
                                    name="heart"
                                    type="Foundation"
                                    style={{ fontSize: 20, color: "#F44336" }}

                                />
                                :
                                item.FriendStatus == 2 ?
                                    <Icon
                                        name="user"
                                        type="FontAwesome5"
                                        style={{ fontSize: 20, color: "#FC561F" }}

                                    />
                                    :
                                    <Icon
                                        name="group"
                                        type="FontAwesome"
                                        style={{ fontSize: 20, color: "#C0C0C0" }}

                                    />
                            }
                        </Right>
                    </CardItem>
                    <CardItem>
                        <View style={styles.imgContainer}>
                            <View style={styles.listfriend}>
                                {item.RegisterStatus == 0 ?
                                    <Image
                                        source={{ uri: item.PicProfile }}
                                        style={styles.imgAvatar2}
                                    /> :
                                    <Image
                                        source={{ uri: item.PicProfile }}
                                        style={styles.imgAvatar}
                                    />
                                }
                                <CardItem>
                                    <View style={styles.detailList}>
                                        <Text style={styles.textName}>{item.FirstName} - {item.LastName}</Text>
                                    </View>
                                </CardItem>
                            </View>
                        </View>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    cardDefal: {
    },
    card: {
        borderColor: '#FC561F',
        borderWidth: 2,

    },
    imgContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    imgAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#1E90FF"
    },
    imgAvatar2: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#fff"
    },
    listfriend: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textName: {
        fontFamily: 'Kanit',
        fontSize: 15
    },
    detailList: {
        flexDirection: 'row',
        padding: 10
    },
    heart: {
        padding: 5,
    },
    textStatusRegis: {
        fontFamily: 'Kanit',
        fontSize: 10,
        color: "#9ACD32"
    },
    textStatusAdd: {
        fontFamily: 'Kanit',
        fontSize: 10,
        color: "#FC561F"
    }
})

export default CellEventListFriend