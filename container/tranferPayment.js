import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Button } from 'react-native';

import ButtonChangePayment from '../component/items/bottonChangePayment'
import TranferView from '../component/items/tranferView'
import TotalPayment from '../container/totalLayout'

class TransferPayment extends Component {
    static navigationOptions = {
        title: 'ชำระเงิน',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: 'kanit',
        },
        headerRight: (
            <Button
              onPress={() => alert(<TotalPayment />)}
              title="Info"
              color="#fff"
            />
          ),
    };


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
