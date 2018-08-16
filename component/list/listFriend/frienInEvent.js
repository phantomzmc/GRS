import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Alert, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { connect } from "react-redux";
import CardFriendDistance from '../../items/cardFriendDistance'
import dataFriend from './dataFriend';
import dataFriendFull from './dataFriend-full'
import dataPrice from '../listevent/dataPrice'
import dataDis from '../listevent/dataDistance'
import dataShirt from '../listShirt/dataShirt'


class FriendInEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: [],
            deleteCellKey: null,
            friendRegis: [],
            isLoading: false,

        }
    }
    componentWillMount() {
        this.setState({
            dataSource: this.props.friendlist.friendRegis,
        });
    }
    deleteItem(index) {
        let { dataSource, dataRegis } = this.state
        let dis = { CourseName: "", Distance: "" }
        let shirt = { JerseySizeValue: "", JerseySizeDesc: "" }
        console.log("index : " + this.state.dataSource[index].FirstName)
        Alert.alert(
            'ลบรายชื่อเพื่อน',
            'คุณต้องการลบ ' + dataSource[index].FirstName + '',
            [
                { text: 'ยกเลิก' },
                {
                    text: 'ตกลง', onPress: () => {

                        dataSource.splice(index, 1)

                        if (dataFriend[index].PhotoPlusService == 0) {
                            dataPrice.splice(index, 1)
                        }
                        else if (dataFriend[index].PhotoPlusService == 1) {
                            dataPrice.splice(index, 1),
                            dataPrice.splice([index + 1], 1)
                        }

                        dataFriend.splice(index, 1)
                        dataFriendFull.splice(index, 1)
                        dataDis[index] = dis
                        dataShirt[index] = shirt
                        this.sumPrice(index)

                        this.props.setFriendRegister(dataSource)
                        this.props.addFriendInEvent(dataFriend)
                        this.props.addFullFriendInEvent(dataFriendFull)
                        this._refreshListView()

                    }
                }
            ], { cancelable: true }
        )
    }
    sumPrice(index) {
        if (index == 0) {
            this.props.setTotalRegister(0)
            this.props.setTotal(0)
        }
        else if (dataPrice == "") {
            this.props.setTotalRegister(0)
            this.props.setTotal(0)
        }
        else if (index != 0) {
            console.log(dataPrice)
            const dis = (a, b) =>
                a + b
            const sum = dataPrice.reduce(dis)
            console.log(sum)
            this.props.setTotalRegister(sum)
            this.props.setTotal(sum)
        }
    }
    _refreshControl() {
        console.log("_refreshControl")
        return (
            <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={() => this._refreshListView()} />
        )
    }

    _refreshListView() {
        console.log("_refreshListView")
        this.sumPrice()
        //Start Rendering Spinner
        this.setState({ isLoading: true })
        this.setState({ isLoading: false }) //Stop Rendering Spinner
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        padding: 20
                    }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    refreshControl={this._refreshControl()}
                    refreshing={this.state.isLoading}
                    keyExtractor={(item, index) => item.key}
                    renderItem={({ item, index }) =>
                        <View style={styles.container}>
                            <CardFriendDistance
                                distance={item}
                                idkey={index}
                                delete={this.deleteItem.bind(this)}
                            />
                        </View>}
                />
            </View >
        )
    }
}
const mapStateToProps = state => {
    return {
        friendlist: state.friendlist
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addFriendInEvent: (regisFriend) => {
            dispatch({
                type: 'addFriendInEvent',
                payload: regisFriend
            })
        },
        addFullFriendInEvent: (dataFriendFull) => {
            dispatch({
                type: 'addFullFriendInEvent',
                payload: dataFriendFull
            })
        },
        setFriendRegister: (dataFriend) => {
            dispatch({
                type: 'setFriendRegister',
                payload: dataFriend
            })
        },
        setTotal: (dataPrice) => {
            dispatch({
                type: 'setTotal',
                payload: dataPrice
            })
        },
        setTotalRegister: (dataPrice) => {
            dispatch({
                type: 'setTotalRegister',
                payload: dataPrice
            })
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendInEvent)