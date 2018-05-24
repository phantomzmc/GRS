import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableHighlight, Image } from 'react-native';
import { Left, Right } from "native-base";
import { connect } from 'react-redux'

import datadistance from './datadistance'
import { map } from 'mobx';

class ListFriendDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pressStatus: true
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: datadistance
        });
    }
    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }
    alertShow(item) {
        // this.props.addDistance(item)
        this.props.getDistance(item)
        // Alert.alert(item.name, "ระยะทาง : " + item.distance + " ราคา : " + item.price)
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <View style={styles.listview}>
                        <TouchableHighlight onPress={() => this.alertShow(item)}
                            activeOpacity={0.5}
                            underlayColor="#FC561F" >
                            <View style={this.state.pressStatus ? styles.cellDistance : styles.cellDistanceOnPress}>
                                <View style={styles.content}>
                                    <Left>
                                        <Text style={styles.title}>
                                            {item.name} {item.distance}
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text style={styles.detail}>{item.price} บาท</Text>
                                    </Right>
                                </View>

                            </View>
                        </TouchableHighlight>
                    </View>}
                    keyExtractor={(item, index) => index} />
            </View >
        );
    }


}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addDistance: (item) => {
//             dispatch({
//                 type: 'addDistance',
//                 payload: item
//             })
//         }
//     }
// }

const styles = StyleSheet.create({
    listview: {
        backgroundColor: '#fff',
        paddingBottom: 20
    },
    cellDistance: {
        justifyContent: 'center',
        // borderColor: '#f1f1f1',
        // borderBottomWidth: 1,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    cellDistanceOnPress: {
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        borderColor: '#f1f1f1',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    content: {
    },
    title: {
        fontFamily: 'kanit'
    },
    detail: {
        fontFamily: 'kanit',
        color: '#666666'
    }
})

export default ListFriendDistance;
