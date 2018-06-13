import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, AlertIOS, StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';

import AddressForm from '../component/form/addressForm'
// import ChoiceSend from '../component/items/choiceSend'
import GetPleace from '../component/items/getPlece'
import SummaryTotal from '../component/items/summary'
import HeaderTeam from "../component/items/headerTeam";
import { connect } from 'react-redux'


class AddressLayout extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            title: "การจัดส่ง",
            choice: 0,
            dataChoice: "",
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
    componentWillMount = () => {
        this.setState({
            priceEvent: parseFloat(this.props.event.totalPrice),
            priceCDO: parseFloat(60.0)
        })
    }
    nextToPayment = () => {
        this.getChoice()
        this.props.navigation.navigate('ButtonChangePayment')
    }
    gotoBack = () => {
        this.props.navigation.navigate('ShirtPhotoPlus')
    }
    goTotalPayment = (fullname, email, adress, tel) => {
        this.nextToPayment()
        this.props.setUser({ fullname: fullname, email, adress, tel })
    }
    getChoice = () => {
        if (this.state.choice === 0) {
            // console.log("รับเอง")
            this.props.setSendChoice({ dataChoice: "รับเอง", priceCDO: parseFloat(0.0) })
        }
        else if (this.state.choice === 1) {
            this.props.setSendChoice({ dataChoice: "ส่งไปรษณีย์", priceCDO: parseFloat(60.0) })
            this.totalPriceRegis()
        }
    }
    totalPriceRegis = () => {
        let { priceEvent, priceCDO } = this.state
        const sum = priceCDO + priceEvent
        this.props.setTotal(sum)
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <HeaderTeam
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)}
                />
                <Tabs initialPage={this.state.pageNumber}>
                    <Tab heading={<TabHeading><Icon name="md-flag" /><Text style={styles.textLabel} onPress={() => this.setState({ choice: 0 })}> รับเอง</Text></TabHeading>} >
                        <GetPleace goPayment={this.nextToPayment.bind(this)} />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="md-map" /><Text style={styles.textLabel} onPress={() => this.setState({ choice: 1 })} > ส่งไปรษณีย์</Text></TabHeading>} >
                        <ScrollView >
                            <AddressForm getAddress={this.goTotalPayment.bind(this)} />
                        </ScrollView>
                    </Tab>
                </Tabs>
                <SummaryTotal />
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

const mapStateToProps = (state) => {
    return {
        event: state.event
    }
}

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
        setTotal: (totalPrice) => {
            dispacth({
                type: "setTotal",
                payload: totalPrice
            })
        }
    }
}

export default connect(mapStateToProps, mapDisPacthToProps)(AddressLayout);
