import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';

import dataFriend from './dataFriend'
class EventListFriend extends Component {
    constructor(state) {
        super(state)
        this.state = {
            selected: false,
            favorite: true
        }
    }
    componentDidMount = () => {
        this.setState({
            dataSource : dataFriend
        })
        // this.setState({
        //     dataSource: this.props.friendlist.profile
        // });
        // console.log(this.props.friendlist.profile[2])
    }
    selectCheckbox = () => {
        this.setState({
            selected: true,
        });
        console.log("click")
    };
    loveFriend = () => {
        let { favorite } = this.state
        this.setState({ favorite: !favorite })
        console.log("icon")

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
                    renderItem={({ item }) =>
                        <View style={styles.container}>
                            <CheckBox
                                style={{ flex: 1 }}
                                onClick={() => this.selectCheckbox(item.name)}
                                isChecked={item.name.checked}
                            />
                            <View style={styles.imgContainer}>
                                <View style={styles.listfriend}>

                                    <Image source={{ uri: item.imgAvatar }}
                                        style={styles.imgAvatar} />
                                    {/* <Icon
                                        name={favorite ? 'heart' : 'heart-o'}
                                        color={favorite ? '#F44336' : 'rgb(50, 50, 50)'}
                                        size={20}
                                        style={{ marginBottom: 10, marginTop: 20 }}
                                        onPress={() => this.setState({favorite : false})}
                                    /> */}
                                    <View style={styles.detailList}>

                                        <Text style={styles.textName}>{item.name}</Text>
                                    </View>
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
        marginVertical: 5,
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
        fontFamily: 'kanit',
        fontSize: 15
    },
    detailList: {
        flexDirection: 'row',
        padding: 10
    },
    heart: {
        padding: 10,
    }
})

export default connect(mapStateToProps)(EventListFriend)

