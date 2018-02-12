import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import AddressForm from '../component/form/addressForm'
import ChoiceSend from '../component/items/choiceSend'

class AddressLayout extends Component {
    static navigationOptions = {
        title: 'การจัดส่ง',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: 'kanit',
        }
    };
    goTotalPayment = () => {
        this.props.navigation.navigate('TotalPayment')
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.text}>เลือกการจัดส่ง</Text>
                    <ChoiceSend />
                    <Text style={styles.text}>ข้อมูลในการจัดส่ง</Text>
                    <AddressForm />
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={this.goTotalPayment}>
                        <Text style={styles.textButton}>ชำระค่าสมัคร</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    text: {
        backgroundColor: '#EFF4F1',
        fontSize: 22,
        fontWeight: '300',
        padding: 20,
        fontFamily: 'Kanit',
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom : 30
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
        fontFamily: 'Kanit',

    }
})

export default AddressLayout;
