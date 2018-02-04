import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import TotalRegister from '../items/totalRegister'

class TotalLayout extends Component {
    static navigationOptions = {
        title: 'สรุปการสมัครทั้งหมด',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: 'kanit',
        }
    };
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TotalRegister />
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.textButton}>ชำระค่าสมัคร</Text>
                        </TouchableOpacity>
                    </View>
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
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'kanit'
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30
    },

})

export default TotalLayout;
