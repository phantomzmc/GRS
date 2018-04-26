import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';


import ButtonChangePayment from '../component/items/bottonChangePayment'
import TranferView from '../component/items/tranferView'
import TotalPayment from '../container/totalLayout'

class TransferPayment extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    // static navigationOptions = {
    //     title: 'ชำระเงิน',
    //     headerStyle: {
    //         backgroundColor: '#FC561F'
    //     },
    //     headerTitleStyle: {
    //         color: '#fff',
    //         fontFamily: 'kanit',
    //     },
    //     headerRight: (
    //         <Button
    //             onPress={() => this.showDetailPayment.bind(this)}
    //             title="รายละเอียด"
    //             color="#fff"
    //         />
    //     ),
    // };
    showDetailPayment = () => {
        this.props.navigation.navigate('TotalPayment')
    }


    render() {
        return (
            <View style={styles.container}>
                <TranferView showDetail={this.showDetailPayment.bind(this)} />
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
