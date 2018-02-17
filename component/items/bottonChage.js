import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

class ButtonChage extends Component {
    constructor (props) {
        super(props)

    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Text style={styles.button}
                            onPress={this.props.Single}>ลงทะเบียนแบบเดียว</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:5}}>
                    <Text style={styles.button}
                            onPress={this.props.Team}>ลงทะเบียนแบบกลุ่ม</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor : '#fff'
    },
    button: {
        padding: 5,
        fontSize: 12,
        fontFamily: 'kanit',
        borderColor: '#FC561F',
        borderRadius: 5,
        borderWidth: 1,
        color: '#FC561F',
        backgroundColor: '#fff'
    },
})

export default ButtonChage;
