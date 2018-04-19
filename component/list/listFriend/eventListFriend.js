import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

import { connect } from 'react-redux'

class EventListFriend extends Component {
    constructor(state) {
        super(state)
        this.state = {

        }
    }
    componentDidMount= () => {
        this.setState({
            dataSource: this.props.friendlist.profile
        });
        console.log(this.props.friendlist.profile[2])
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
                    padding: 20
                }}>
                <FlatList
                    horizontal
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={styles.container}>
                            <View style={styles.imgContainer}>
                                <View style={styles.listfriend}>
                                    <Image source={{ uri: item.imgAvatar }}
                                        style={styles.imgAvatar} />
                                    <Text style={styles.textName}>{item.name}</Text>
                                </View>
                            </View>

                        </View>}
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

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },

    imgContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    imgAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    listfriend: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textName: {
        padding: 10,
        fontFamily: 'kanit',
        fontSize: 15
    }
})

export default connect(mapStateToProps)(EventListFriend)

