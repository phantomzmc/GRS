import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ListView, ImageBackground } from 'react-native';

import datadistance from './datadistance.js'

export default class ListDistance extends Component {
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
            dataSource: this.state.dataSource.cloneWithRows(datadistance)
        });
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
                <ImageBackground source={{ uri: datadistance.pic }}
                    style={styles.imgbackground}>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{datadistance.name}</Text>
                        <Text style={styles.distance}>{datadistance.distance}</Text>
                        <Text style={styles.price}>{datadistance.price}</Text>
                    </View>
                </ImageBackground>
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
        fontSize: 20,
        fontWeight: '500',
    },
    distance: {
        color: '#fff',
        fontSize: 36,
        fontWeight: '500',
    },
    price: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    listview: {

    },

})
