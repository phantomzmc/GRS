import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import CheckBox from 'react-native-check-box'
import { connect } from 'react-redux'

import datadistance from './datadistance'
import { map } from 'mobx';

class ListFriendDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: false
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: datadistance
        });
    }
    selectCheckbox = () => {
        this.setState({
            selected: true,
        });
        console.log("click")
    };
    alertShow(item) {
        this.props.addDistance(item)
        Alert.alert(item.name, "ระยะทาง : " + item.distance + " ราคา : " + item.price)
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
                    horizontal
                    data={this.state.dataSource}
                    renderItem={({ item }) => <View style={styles.listview}>
                        <View style={styles.container}>

                            <TouchableOpacity onPress={() => this.alertShow(item)}>
                                <View style={styles.cellDistance}>
                                    <View style={styles.checkBox}>
                                        <CheckBox
                                            style={{ flex: 1 }}
                                            onClick={() => this.selectCheckbox(item.name)}
                                            isChecked={item.name.checked}
                                        />
                                    </View>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <Text style={styles.detail}>{item.distance}</Text>
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
        addDistanceFriend: (detailRegis) => {
            dispatch({
                type: 'addDistanceFriend',
                payload: detailRegis
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    listview: {
        backgroundColor: '#fff',
    },
    checkBox: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cellDistance: {
        justifyContent: 'center',
        padding: 15,
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 10
    },
    detail: {
        fontSize: 10,
        color: '#666666'
    }
})

export default connect(null, mapDispatchToProps)(ListFriendDistance);
