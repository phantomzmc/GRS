import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Alert, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { connect } from "react-redux";
import CardFriendDistance from '../../items/cardFriendDistance'
import dataFriend from './dataFriend';


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
    keyExtractor = (item, index) => {
        return index
    }
    deleteItem(index) {
        let { dataSource} = this.state
        console.log("index : " + this.state.dataSource[index].FirstName)
        Alert.alert(
            'ลบรายชื่อเพื่อน',
            'คุณต้องการลบ ' + dataSource[index].FirstName + '',
            [
                { text: 'ยกเลิก' },
                {
                    text: 'ตกลง', onPress: () => {
                        dataSource.splice(index, 1)
                        console.log("delete")
                        console.log(dataSource)
                        this.props.setFriendRegister(dataSource)
                        this._refreshListView()
                        
                    }
                }
            ], { cancelable: true }
        )
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
                    onRefresh={this.onRefesh.bind(this)}
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
        setFriendRegister : (dataFriend) => {
            dispatch({
                type : 'setFriendRegister',
                payload : dataFriend
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