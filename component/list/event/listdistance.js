import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ListView, ImageBackground, TouchableHighlight, } from 'react-native';
import { StackNavigator } from 'react-navigation';


import datadistance from './datadistance.js'
import data from '../listevent/data.js';

export default class ListDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 != r2
            })
        }
        this.gotoShirtPhotoPlus = this.gotoShirtPhotoPlus.bind(this)
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(datadistance)
        });
    }
    gotoShirtPhotoPlus(datadistance) {
        AlertIOS.alert(datadistance.distance)
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderDistance}
                style={styles.ListView}
            />
        );
    }

    renderDistance(datadistance) {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => this.pressDataShirt(datadistance)}>
                    <ImageBackground source={{ uri: datadistance.pic }}
                        style={styles.imgbackground}>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{datadistance.name}</Text>
                            <Text style={styles.distance}>{datadistance.distance}</Text>
                            <Text style={styles.price}>{datadistance.price}</Text>
                        </View>
                    </ImageBackground>
                </TouchableHighlight>
            </View>

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
