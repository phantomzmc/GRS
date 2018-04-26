import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Button, ScrollableTab } from 'native-base';
import { StackNavigator } from 'react-navigation';
import CreditPayment from '../../container/creditPayment'
import TranferPayment from '../../container/tranferPayment'
import TotalRegister from '../../component/items/totalRegister'
import SummaryTotal from '../items/summary'

class ButtonChangePayment extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    static navigationOptions = {
        title: 'ชำระเงิน',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: 'kanit',
        },
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    };
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 0
        }

    }
    gotoShowDetail = () => {
        this.props.navigation.navigate('TotalRegister')
    }
    gotoTotalPayment = () => {
        this.props.navigation.navigate('TotalPayment')
    }
    render() {
        return (
            <Container style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
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

export default ButtonChangePayment;
