import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, Image } from 'react-native';

import datafriend from './dataFriend'

class FriendListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 != r2
            })
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(datafriend)
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderFriend.bind(this)}
                    style={styles.listview}
                />
            </View>
        );
    }
    renderFriend(datafriend) {
        return (
            <View style={styles.cellFriend}>
                <View>
                    <Image source={{ uri: datafriend.imgAvatar }}
                        style={styles.avatar} />
                </View>
                <View style={styles.textListFriend}>
                    <Text style={styles.textName}>{datafriend.name}</Text>
                    <Text style={styles.textAge}>อายุ : {datafriend.age} - {datafriend.gen}</Text>
                </View>
            </View>
        )
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
    textListFriend : {
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

export default FriendListView;
