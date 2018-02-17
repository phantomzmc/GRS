import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';

import CreditView from '../component/items/creditView'
import ButtonChangePayment from '../component/items/bottonChangePayment'
import { connect } from 'react-redux';

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
        this.props.navigation.navigate('AddressLayout')
    }

    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <ButtonChangePayment
                        Tranfer={this.gotoTransferPayment.bind(this)}
                        Credit={this.gotoCreditPayment.bind(this)}
                    />
                    <CreditView />
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={this.goAddressSend}>
                        <Text style={styles.textButton}>ชำระค่าสมัคร : {this.props.creditcard.priceCredit} บาท</Text>
                    </TouchableOpacity>
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
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30,
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
        fontFamily: "Kanit"

    }
})

const mapStateToProps = (state) => {
    return {
        creditcard: state.creditcard
    };
};

export default connect(mapStateToProps)(CreditPayment);
