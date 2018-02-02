import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';

class CreditView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.creditCard}>
                    <View style={styles.cardNumber}>
                        <Text style={styles.textCardNumber}>card number</Text>
                        <Text style={styles.textNumber}>5555 5555 5555 5555</Text>
                    </View>
                    <View style={styles.expcvcView}>
                        <View style={styles.EXPView}>
                            <Text style={styles.textExpiration}>Expiration</Text>
                            <Text style={styles.monthyear}>Month Year</Text>
                        </View>
                        <View style={styles.CVCView}>
                            <Text style={styles.cvc}>CVC</Text>
                            <Text style={styles.passcvc}>XXX</Text>
                        </View>
                        <View>
                            <Image source = {{uri : "http://www.pngall.com/wp-content/uploads/2016/07/Mastercard-PNG-Clipart.png"}}
                                style={{width: 100,height:50, paddingHorizontal: 30}} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    creditCard: {
        backgroundColor: '#4E2A82',
        margin: 20,
        borderRadius: 20,
        height: 150
    },
    cardNumber: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 30,
    },
    textCardNumber: {
        color: '#fff',
        fontSize: 7,
    },
    textNumber: {
        color: '#fff',
        fontSize: 15,
    },
    expcvcView : {
        flex: 1,
        paddingLeft: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textExpiration : {
        color: '#fff',
        fontSize: 7,
    },
    monthyear :{
        color: '#fff',
        fontSize: 15,
    },
    CVCView : {
        paddingLeft: 30,
    },
    cvc : {
        color: '#fff',
        fontSize: 7
    },
    passcvc : {
        color: '#fff',
        fontSize: 15,
    }

})

export default CreditView;
