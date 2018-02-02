import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, } from 'react-native';

class CreditForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="ชื่อบนบัตร"
                    style={styles.input}
                />
                <TextInput
                    placeholder="หมายเลขบัตร"
                    style={styles.input}
                />
                <View style={styles.container2}>
                    <TextInput
                        placeholder="วันหมดอายุ"
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="รหัสความปลอดภัย"
                        style={styles.input}
                    />
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
    input: {
        height: 40,
        paddingHorizontal: 30,
        borderColor: '#FC561F',
        borderRadius: 10,
        borderWidth: 1.5,
        marginBottom: 20,
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


})

export default CreditForm;
