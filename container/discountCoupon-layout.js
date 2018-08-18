import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';

import { StackNavigator } from 'react-navigation';

import CouponForm from '../component/form/couponForm'
class DiscountCoupon extends Component {

    render() {
        return (
                <View>
                    <CouponForm />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    

})

export default DiscountCoupon
