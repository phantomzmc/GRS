import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
        this.props.navigation.navigate('CreditPayment')
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={{ uri: "http://register.shutterrunning2014.com/assets/img/theme/dongtanshirt.png" }}
                        style={{ height: 100, marginTop: 10 }} />
                    <PhotoPlus titleName={this.props.photoplus.title}
                        pricePhoto={this.props.photoplus.pricePhoto} />
                    <Text style={styles.textSize}>โปรดเลือกไซค์เสื้อ</Text>
                    <ListShirt />
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
        creditcard: state.creditcard,
        shirtphoto: state.shirtphoto,
        photoplus: state.photoplus,
    };
};
const mapDisPacthToProps = (dispacth) => {
    return {
        setPriceCredit: (priceCredit) => {
            dispacth({
                type: "setPriceCredit",
                payload: priceCredit
            })
        }
    }
}
export default connect(mapStateToProps)(ShirtPhotoPlus)
