import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ImageBackground, TouchableOpacity, } from 'react-native';
import { StackNavigator } from 'react-navigation';


import datadistance from './datadistance.js'
import data from '../listevent/data.js';

export default class ListDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            distanceEvent : {
                name: "",
                distance: "",
                price: ""
            }
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: datadistance
        });
    }
    shirtPhotoPlus = (item) => {
        this.setState({ distanceEvent: { name: item.name, distance: item.distance, price: item.price } })
        this.props.onGotoshirt({ name: item.name, distance: item.distance, price: item.price })
        console.log(this.state.distanceEvent)
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, paddingTop: 20 }} >
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={this.shirtPhotoPlus.bind(this, item)}>
                                <ImageBackground source={{ uri: item.pic }}
                                    style={styles.imgbackground}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.distance}>{item.distance}</Text>
                                        <Text style={styles.price}>{item.price}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex: 1,
    },
    imgbackground: {
        width: '100%',
        height: 150
    },
    textContainer: {
        flex: 1,
        backgroundColor: '#000',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        color: '#fff',
        fontFamily: 'kanit',
        fontSize: 20,
        fontWeight: '500',
    },
    distance: {
        color: '#fff',
        fontSize: 36,
        fontWeight: '500',
        fontFamily: 'kanit',
    },
    price: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'kanit',
    },
    listview: {

    },

})
