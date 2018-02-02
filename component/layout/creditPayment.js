import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,SegmentedControlIOS } from 'react-native';

import CreditView from '../items/creditView'
import CreditForm from '../form/creditForm'

class CreditPayment extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <SegmentedControlIOS
                        values={['เครดิต เดบิตการ์ด', 'โอนเงิน']}
                        tintColor="#FC561F" 
                        style={styles.segment}/>
                    <CreditView />
                    <View style={styles.containerForm}>
                        <Text style={styles.textForm}>กรอกข้อมูล</Text>
                    </View>
                    <CreditForm />
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.textButton}>ชำระค่าสมัคร</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    containerForm: {
        flex: 1,
    },
    segment : {
        marginTop : 20,
        marginHorizontal: 20,
    },
    textForm: {
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

export default CreditPayment;
