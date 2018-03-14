import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, AlertIOS } from 'react-native';

import CreditView from '../component/items/creditView'
import ButtonChangePayment from '../component/items/bottonChangePayment'
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';


class CreditPayment extends Component {
    static navigationOptions = {
        title: 'ชำระเงิน',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: 'kanit',
        }
    };
    constructor(props) {
        super(props)
        this.state = {
        }
        this.goAddressSend = this.goAddressSend.bind(this)
    }
    // getPrice (setPrice){
    //     this.setState ({
    //         price: this.state.setPrice
    //     })
    // }
    gotoTransferPayment = () => {
        this.props.navigation.navigate('TransferPayment')
    }
    gotoCreditPayment = () => {
        this.props.navigation.navigate('CreditPayment')
    }
    goAddressSend = () => {
        this.props.navigation.navigate('TotalPayment')
        console.log("hello")
    }

    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <ButtonChangePayment
                        Tranfer={this.gotoTransferPayment.bind(this)}
                        Credit={this.gotoCreditPayment.bind(this)}
                    />
                    <CreditView goAddress = {this.goAddressSend.bind(this)}
                                TotalPrice = {this.props.total.totalPrice}
                    />
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    segment: {
        marginTop: 20,
        marginHorizontal: 20,
    },

})

const mapStateToProps = (state) => {
    return {
        total : state.total,
        creditcard: state.creditcard
    };
};


export default connect(mapStateToProps)(CreditPayment);
