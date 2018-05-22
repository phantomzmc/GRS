import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import dataFriend from './dataFriend'
import CellEventListFriend from './cell-eventListFriend'
class EventListFriend extends Component {
    constructor(state) {
        super(state)
        this.state = {
            isRefesh: false,
        }
    }
    componentDidMount = () => {
        this.setState({
            dataSource: this.props.friend

        })

        // this.setState({
        //     dataSource: this.props.friendlist.profile
        // });
        // console.log(this.props.friendlist.profile[2])
    }
    onRefesh = () => {
        // this.setState({ isRefesh : true})
        console.log(datafriend)
        console.log(this.props.friend)
        // datafriend.push(this.state.newitem)

    }
    render() {
        let { selected, favorite } = this.state
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
                    padding: 20
                }}>
                <FlatList
                    horizontal
                    data={this.state.dataSource}
                    refreshing={this.state.isRefesh}
                    onRefresh={this.onRefesh}
                    renderItem={({ item }) =>
                        <CellEventListFriend items={item} />
                    }
                    keyExtractor={(item, index) => index} />
            </View >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friendlist: state.friendlist
    }
}



export default connect(mapStateToProps)(EventListFriend)

