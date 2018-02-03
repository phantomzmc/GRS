import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';

import AddressForm from '../form/addressForm'
import ChoiceSend from '../items/choiceSend'

class componentName extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.text}>เลือกการจัดส่ง</Text>
                    <ChoiceSend/>
                    <Text style={styles.text}>ข้อมูลในการจัดส่ง</Text>
                    <AddressForm />
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.textButton}>ชำระค่าสมัคร</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create ({
    container : {

    },
    text : {
        backgroundColor: '#EFF4F1',
        fontSize: 22,
        fontWeight: '300',
        padding: 20,
    },
    buttonContainer: {
        height: 40,
        width: '100%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',

    }
})

export default componentName;
