import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import ButtonChangePayment from '../component/items/bottonChangePayment'
import TranferView from '../component/items/tranferView'

class TransferPayment extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ButtonChangePayment />
                <TranferView />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    
})
export default TransferPayment;
