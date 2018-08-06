import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Alert, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { connect } from "react-redux";
import CardFriendDistance from '../../items/cardFriendDistance'
import dataFriend from './dataFriend';
import dataPrice from '../listevent/dataPrice'


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
    componentDidMount() {
        this.setState({
            dataSource: this.props.friendlist.friendRegis,
        });
    }
    deleteItem(index) {
        let { dataSource } = this.state
        console.log("index : " + this.state.dataSource[index].FirstName)
        Alert.alert(
            'ลบรายชื่อเพื่อน',
            'คุณต้องการลบ ' + dataSource[index].FirstName + '',
            [
                { text: 'ยกเลิก' },
                {
                    text: 'ตกลง', onPress: () => {
                        dataSource.splice(index, 1)
                        dataPrice.splice(index, 1)
                        this.sumPrice(index)
                        console.log("delete")
                        console.log(dataSource)
                        this.props.setFriendRegister(dataSource)
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