import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Button, ScrollableTab } from 'native-base';
import { connect} from 'react-redux'

import CreditPayment from '../../container/creditPayment'
import TranferPayment from '../../container/tranferPayment'
import TotalRegister from '../../component/items/totalRegister'
import SummaryTotal from '../items/summary'
import HeaderTeam from '../items/headerTeam'

class ButtonChangePayment extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            title: "ชำระเงิน",
            pageNumber: 0
        }
    }
    componentWillMount(){
        console.log(this.props.event.totalPrice)
        this.setState({
            total : parseFloat(this.props.event.totalPrice)
        })
        this.sumCredit()
    }
    sumCredit(){
        sum = (this.props.event.totalPrice * 105)/100
        console.log(sum)
        credit = (sum - this.props.event.totalPrice)
        console.log(credit)
        this.props.setTotalRegister(sum)
        this.props.setCreditPrice(credit)
    }
    gotoShowDetail = () => {
        this.props.navigation.navigate('TotalRegister')
    }
    gotoTotalPayment = () => {
        this.props.navigation.navigate('TotalPayment')
    }
    gotoBack = () => {
        this.props.navigation.navigate('AddressLayout')
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
                    goback={this.gotoBack.bind(this)} />
                <Tabs initialPage={this.state.pageNumber} renderTabBar={() => <ScrollableTab />}>
                    <Tab heading={<TabHeading><Icon name="card" /><Text style={styles.textLabel}> ชำระผ่านบัตรเครดิต/เดบิต</Text></TabHeading>}>
                        <CreditPayment showDetail={this.gotoShowDetail.bind(this)}
                            totalPayment={this.gotoTotalPayment.bind(this)} />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="card" /><Text style={styles.textLabel}> โอนเงิน</Text></TabHeading>}>
                        <TranferPayment />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="list" /><Text style={styles.textLabel}> เเสดงค่าสมัครทั้งหมด</Text></TabHeading>}>
                        <TotalRegister />
                    </Tab>
                </Tabs>
                <SummaryTotal />
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return{
        event : state.event
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTotalRegister : (total) => {
            dispatch({
                type : "setTotalRegister",
                payload : total
            })
        },
        setCreditPrice : (credit) => {
            dispatch({
                type : "setCreditPrice",
                payload : credit
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    textLabel: {
        fontSize: 10,
        fontFamily: 'kanit',
    },
    button: {
        padding: 5,
        fontSize: 10,
        fontFamily: 'kanit',
        borderColor: '#FC561F',
        borderRadius: 5,
        borderWidth: 1,
        color: '#FC561F',
        backgroundColor: '#fff',
    },

})

export default connect(mapStateToProps,mapDispatchToProps)(ButtonChangePayment);
