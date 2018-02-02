import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Actions } from 'react-native';
import { StackNavigator } from 'react-navigation';


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
    gotoshirtPhotoPlus() {
        Actions.shirtPhotoPlus()
    }
    _onPressButton() {
        Alert.alert('You tapped the button!')
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={{ uri: "http://shutterrunning2014.com/wp-content/uploads/2018/01/For-web-2014.png" }}
                        style={styles.imgEvent} />
                    <Text style={styles.textNameEvent}>
                        Dongtan Run
                    </Text>
                    <Text style={styles.detailDiscountCoupon}>
                        ส่วนลดค่าสมัครรายการวิ่ง 100 บาท
                    </Text>
                    <TextInput
                        placeholder="รหัสคูปอง"
                        style={styles.inputCoupon}
                    />
                    <TouchableOpacity style={styles.submitButton}
                        // onPress={()=>{this.gotoshirtPhotoPlus()}}>
                        onPress={() => this.props.navigation.navigate("shirtPhotoPlus")}>

                        <Text style={styles.textButton}>ถัดไป</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerButton}>

                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    imgEvent: {
        marginTop: 50,
        width: '75%',
        height: '50%',
        borderRadius: 10,

    },
    textNameEvent: {
        fontSize: 20,
        marginBottom: 20
    },
    detailDiscountCoupon: {
        fontSize: 18,
        color: '#8A8A8F',
        marginBottom: 20
    },
    inputCoupon: {
        height: 50,
        width: '50%',
        borderColor: '#FC561F',
        borderWidth: 1.5,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    containerButton: {
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    submitButton: {
        marginTop: 60,
        height: 40,
        width: '75%',
        backgroundColor: '#FC561F',
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
    couponForm: {
        screen: CouponForm
    }
})