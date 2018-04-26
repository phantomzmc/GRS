import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, AlertIOS, StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';

import AddressForm from '../component/form/addressForm'
// import ChoiceSend from '../component/items/choiceSend'
import GetPleace from '../component/items/getPlece'
import SummaryTotal from '../component/items/summary'
import { connect } from 'react-redux'


class AddressLayout extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    static navigationOptions = {
        title: 'การจัดส่ง',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: 'kanit',
        },
    };
    constructor(props) {
        super(props)
        this.state = {
            choice: 0,
            dataChoice: "รับเอง",
            user: {
                fullname: "",
                email: "",
                adress: "",
                tel: ""
            },
            modalVisible: false,
            active: true,
            pageNumber: 0
        }
    }
    nextToPayment = () => {
        this.getChoice()
        this.props.setSendChoice(this.state.dataChoice)
        this.props.navigation.navigate('ButtonChangePayment')

    }
    goTotalPayment = (fullname, email, adress, tel) => {
        this.nextToPayment()
        this.props.setUser({ fullname: fullname, email, adress, tel })
    }
    getChoice = () => {
        if (this.state.choice === 0) {
            console.log("รับเอง")
            this.setState({ dataChoice: "รับเอง" })
        }
        else if (this.state.choice === 1) {
            console.log("ส่งไปรษณีย์")
            this.setState({ dataChoice: "ส่งไปรษณีย์" })
        }
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <Tabs initialPage={this.state.pageNumber}>
                    <Tab heading={<TabHeading><Icon name="md-flag" /><Text style={styles.textLabel} onPress={() => this.setState({ choice: 0 })}> รับเอง</Text></TabHeading>} >
                        <GetPleace goPayment={this.nextToPayment.bind(this)} />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="md-map" /><Text style={styles.textLabel} onPress={() => this.setState({ choice: 1 })}> ส่งไปรษณีย์</Text></TabHeading>} >
                        <ScrollView >
                            <AddressForm getAddress={this.goTotalPayment.bind(this)} />
                        </ScrollView>
                    </Tab>
                </Tabs>
                <SummaryTotal />
                {/* <Text style={styles.text}>เลือกการจัดส่ง</Text>
                        <ChoiceSend showChoice={this.alertChoice.bind(this)} />
                        <Text style={styles.text}>ข้อมูลในการจัดส่ง</Text>
                        <AddressForm getAddress={this.goTotalPayment.bind(this)} /> */}
            </Container>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    textLabel: {
        fontSize: 12,
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
        setUser: (fullname) => {
            dispacth({
                type: "setUser",
                payload: fullname
            })
        },
    }
}

export default connect(null, mapDisPacthToProps)(AddressLayout);
