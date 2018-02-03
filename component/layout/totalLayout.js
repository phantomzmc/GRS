import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';

import TotalRegister from '../items/totalRegister'

class TotalLayout extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TotalRegister />
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textButton}>ชำระค่าสมัคร</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFF4F1',
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

export default TotalLayout;
