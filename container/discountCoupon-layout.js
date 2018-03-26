import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';

import { StackNavigator } from 'react-navigation';

import CouponForm from '../component/form/couponForm'
class DiscountCoupon extends Component {
    static navigationOptions = {
        title: 'คูปองส่วนลด',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff'
        }
    };
    render() {
        return (
            <ScrollView>
                <View style={styles.continer}>
                    <View style={styles.containerCoupon}>
                        <CouponForm />
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.textButton}>ถัดไป</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    containerCoupon: {
        backgroundColor: '#000',
    },
    containerButton: {
        flex: 1,
        alignItems: 'center',
        marginTop: 60,
    },
    submitButton: {
        height: 40,
        width: '75%',
        backgroundColor: '#4CD946',
        alignItems: 'center',
        borderRadius: 10,
    },
    textButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    }
})

export default StackNavigator({
    DiscountCoupon: {
        screen: DiscountCoupon
    }
})
