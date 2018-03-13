import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, AlertIOS } from 'react-native';

import AddressForm from '../component/form/addressForm'
import ChoiceSend from '../component/items/choiceSend'
import { connect } from 'react-redux'

class AddressLayout extends Component {
    static navigationOptions = {
        title: 'การจัดส่ง',
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
            choice: "",
            dataChoice: "",
            user: {
                fullname: "",
                email:"",
                adress:"",
                tel: ""
            }
        }
    }
    goTotalPayment = (fullname, email, adress, tel) => {
        this.props.setUser({ fullname : fullname,email,adress,tel})
        this.props.navigation.navigate('TotalPayment')
    }
    alertChoice = (dataChoice) => {
        console.log(this.state.dataChoice)
        this.setState({ dataChoice: dataChoice })
        this.props.setSendChoice(this.state.dataChoice)
        AlertIOS.alert("การจัดส่ง : " + dataChoice)
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.text}>เลือกการจัดส่ง</Text>
                    <ChoiceSend showChoice={this.alertChoice.bind(this)} />
                    <Text style={styles.text}>ข้อมูลในการจัดส่ง</Text>
                    <AddressForm getAddress={this.goTotalPayment.bind(this)}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    text: {
        backgroundColor: '#EFF4F1',
        fontSize: 22,
        fontWeight: '300',
        padding: 20,
        fontFamily: 'Kanit',
    },
})

const mapDisPacthToProps = (dispacth) => {
    return {
        setSendChoice: (choice) => {
            dispacth({
                type: "setSendChoice",
                payload: choice
            })
        },
        setUser : (fullname) => {
            dispacth({
                type : "setUser",
                payload : fullname
            })
        },
    }
}

export default connect(null,mapDisPacthToProps)(AddressLayout);
