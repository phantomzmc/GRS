import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, Image, FlatList, Alert, TouchableOpacity } from 'react-native';

import datafriend from './dataFriend'
import { connect } from 'react-redux'

class FriendListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefesh  : false,
            
        }
        // this.alertShow = this.alertShow.bind(this)
    }

    componentDidMount() {
        this.setState({
            dataSource: this.props.friend
        });
    }
    onRefesh = () =>{
        // this.setState({ isRefesh : true})
        console.log(datafriend)
        console.log(this.props.friend)
        // datafriend.push(this.state.newitem)

    }
    alertShow(item) {
        console.log(item)
        Alert.alert(item.name, " เพศ : " + item.gen + " อายุ : " + item.age,
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.props.AddFriendDetail() },
                { text: 'หน้าหลัก' , onPress: () => this.props.TeamList()}
            ],
            { cancelable: false }
        )
        this.props.addFriend(item)
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
            <View
                style={{
                    flex: 1,
                    // paddingTop: 20
                }}>
                <FlatList
                    data={this.state.dataSource}
                    refreshing={this.state.isRefesh}
                    onRefresh={this.onRefesh}
                    renderItem={({ item }) => <View style={styles.container}>{item.name}
                        <View style={styles.cellFriend}>
                            <View>
                                <Image source={{ uri: item.imgAvatar }}
                                    style={styles.avatar} />
                            </View>
                            <TouchableOpacity onPress={() => this.alertShow(item)}>
                                <View style={styles.textListFriend}>
                                    <Text style={styles.textName}>{item.name}</Text>
                                    <Text style={styles.textAge}>อายุ : {item.age} - {item.gen}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>}
                    keyExtractor={(item, index) => index} />
            </View >

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFriend : (profile) => {
            dispatch({
                type: 'addFriend',
                payload :profile
            })
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listview: {
        backgroundColor: '#fff',
    },
    cellFriend: {
        flexDirection: 'row',
        padding: 10,
        borderColor: '#f1f1f1',
        borderWidth: 1,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 2,
    },
    textListFriend: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    textName: {
        fontSize: 17
    },
    textAge: {
        fontSize: 10,
        color: '#666666'
    }
})

export default connect(null,mapDispatchToProps)(FriendListView);
