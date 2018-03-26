import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image,Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';


import { connect } from 'react-redux'
import ListShirt from '../component/list/listShirt/listShirt'
import PhotoPlus from '../component/items/photoPlus'



class ShirtPhotoPlus extends Component {
    static navigationOptions = {
        title: 'เลือกไซค์เสื้อ',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: 'kanit',
        }
    };
    goNextState = () => {
        console.log("checkPromo")
        if(this.props.event.event.PromoCodeStatus == 1){
            console.log("status 1")
            Alert.alert("ส่วนลดค่าสมัคร","กรุณากรอกรหัสส่วนลดในการสมัคร",[
                {
                    text:"Cancel"
                },
                {
                    text: "รหัสส่วนลด",
                    onPress : () => this.props.navigation.navigate("DiscountCoupon")
                },
            ], { cancelable: false })
        }
        else if (this.props.event.event.PromoCodeStatus == 0){
            console.log("status 0")
            this.props.navigation.navigate('AddressLayout')
        }
    }
    
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={{ uri: "http://register.shutterrunning2014.com/assets/img/theme/dongtanshirt.png" }}
                        style={{ height: 100, marginTop: 10 }} />

                    <Text style={styles.textSize}>โปรดเลือกไซค์เสื้อ</Text>
                    <ListShirt />
                    <Text style={styles.textSize}>Photo Plus + </Text>
                    <PhotoPlus titleName={this.props.photoplus.title}
                        dataPricePhoto={this.props.photoplus.pricePhoto}
                        priceEvent={this.props.event.distanceEvent.price} />
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textButton}
                            onPress={this.goNextState}>ถัดไป</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    textSize: {
        backgroundColor: '#EFF4F1',
        fontSize: 22,
        fontWeight: '300',
        padding: 20,
        fontFamily: "Kanit",
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 30,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 14,
        color: '#fff',
        fontFamily: "Kanit",
    }
})
const mapStateToProps = (state) => {
    return {
        event :  state.event,
        creditcard: state.creditcard,
        shirtphoto: state.shirtphoto,
        photoplus: state.photoplus,
    };
};
const mapDisPacthToProps = (dispacth) => {
    return {
        setPrice: (priceCredit) => {
            dispacth({
                type: "setPrice",
                payload: priceCredit
            })
        }
    }
}
export default connect(mapStateToProps)(ShirtPhotoPlus)
