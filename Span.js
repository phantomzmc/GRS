import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Span extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image style={{width: 115,height: 78,}}
                        source={{ uri: 'http://shutterrunning.com/assets/img/logos/str-logo-sm.png' }} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FC561F',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo : {
        justifyContent: 'center',
    },

});

