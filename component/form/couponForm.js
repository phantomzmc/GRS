import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import { map } from 'mobx';


class CouponForm extends Component {
    static navigationOptions = {
        title: 'คูปองส่วนลด',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff'
        }
    };
    constructor(state) {
        super(state)
        this.state = {
            coupon: ""
        }
        this.checkInput = this.checkInput.bind(this)
        this.gotoAddress = this.gotoAddress.bind(this)
    }
    gotoAddress() {
        this.props.navigation.navigate('AddressLayout')
    }

    checkInput() {
        if (this.props.event.event.PromoCodeRequired == 1 && this.props.event.event.PromoCodeStatus == 1) {
            console.log("ต้อง input code")
             if (this.state.coupon == "") {
                 Alert.alert("กรุณากรอกรหัสคูปองให้ถูกต้อง")
             } else if (this.state.coupon == "1234") {
                 this.gotoAddress()
             }
        }
        else if (this.props.event.event.PromoCodeRequired == 0 && this.props.event.event.PromoCodeStatus == 1) {
            console.log("ใส่หรือไม่ใส่ได้")
             if (this.state.coupon == "1234") {
                 this.gotoAddress()
             }
             this.gotoAddress()
        }
        else if (this.props.event.event.PromoCodeRequired == 1 && this.props.event.event.PromoCodeStatus == 0){
            console.log("ใส่หรือไม่ใส่ได้2")
        }
    }
    render() {
        let { coupon } = this.state
        return (
            <View style={styles.container}>
                <Image source={{ uri: "http://shutterrunning2014.com/wp-content/uploads/2018/01/For-web-2014.png" }}
                    style={styles.imgEvent} />
                <Text style={styles.textNameEvent}>
                    {this.props.event.event.EventName}
                </Text>
                <Text style={styles.detailDiscountCoupon}>
                    ส่วนลดค่าสมัครรายการวิ่ง 100 บาท
                    </Text>
                <TextInput
                    placeholder="รหัสคูปอง"
                    onChangeText={(coupon) => this.setState({ coupon })}
                    style={styles.inputCoupon}
                />
                <TouchableOpacity style={styles.submitButton}
                    onPress={() => this.checkInput()}>
                    <Text style={styles.textButton}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
    imgEvent: {
        marginTop: 20,
        width: '80%',
        height: '30%',
        borderRadius: 10,
    },
    textNameEvent: {
        fontSize: 20,
        margin: 20,
        fontFamily: 'kanit'
    },
    detailDiscountCoupon: {
        fontSize: 18,
        color: '#8A8A8F',
        fontFamily: 'kanit'
    },
    inputCoupon: {
        height: 50,
        width: '50%',
        borderColor: '#FC561F',
        borderWidth: 1.5,
        borderRadius: 20,
        margin: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
        fontFamily: 'kanit'
    },
    submitButton: {
        margin: 30,
        height: 50,
        width: '75%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#FC561F',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'kanit'
    }
})

export default connect(mapStateToProps)(CouponForm)
