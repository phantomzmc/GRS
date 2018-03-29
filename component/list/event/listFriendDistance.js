import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

import datadistance from './datadistance'
import { map } from 'mobx';

class ListFriendDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: datadistance
        });
    }
    alertShow(item) {
        this.props.addDistance(item)
        Alert.alert(item.name, "ระยะทาง : " + item.distance + " ราคา : " + item.price)
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
                    paddingTop: 20
                }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <View style={styles.listview}>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => this.alertShow(item)}>
                                <View style={styles.cellDistance}>
                                    <Text style={styles.title}>{item.name} - {item.distance}</Text>
                                    <Text style={styles.detail}>{item.price}</Text>
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
        addDistance: (detailRegis) => {
            dispatch({
                type: 'addDistance',
                payload: detailRegis
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
    cellDistance: {
        padding: 15,
        borderColor: '#f1f1f1',
        paddingHorizontal: 30,
        borderWidth: 1,
    },
    title: {
        fontSize: 17

    },
    detail: {
        fontSize: 10,
        color: '#666666'
    }
})

export default connect(null, mapDispatchToProps)(ListFriendDistance);
