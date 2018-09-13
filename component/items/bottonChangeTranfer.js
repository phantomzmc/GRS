import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Button, ScrollableTab } from 'native-base';
import { connect } from 'react-redux'
import TranferPayment from '../../container/tranferPayment'
import TotalRegister from '../../component/items/totalRegister'
import SummaryTotal from '../items/summary'
import HeaderTeam from '../items/headerTeam'

class ButtonChangeTranfer extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            title: "ชำระด้วยการโอนเงิน",
            pageNumber: 0
        }
    }
    gotoShowDetail = () => {
        this.props.navigation.navigate('TotalRegister')
    }
    gotoTotalPayment = () => {
        this.props.navigation.navigate('TotalPayment')
    }
    gotoBack = () => {
        this.props.navigation.navigate('ControlPayment')
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
                    menu={true}
                    statusRegis={true}
                    goback={() => this.props.navigation.navigate("ControlPayment")}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}
                    goContacts={()=> this.props.navigation.navigate('Contacts')}
                />
                <Tabs initialPage={this.state.pageNumber}>
                    {/* <Tab heading={<TabHeading><Icon name="card" /><Text style={styles.textLabel}> ชำระผ่านบัตรเครดิต/เดบิต</Text></TabHeading>}>
                        <CreditPayment 
                            showDetail={this.gotoShowDetail.bind(this)}
                            totalPayment={this.gotoTotalPayment.bind(this)} />
                    </Tab> */}
                    <Tab heading={<TabHeading><Icon name="card" /><Text style={styles.textLabel}> โอนเงิน</Text></TabHeading>}>
                        <TranferPayment
                            showDetail={this.gotoShowDetail.bind(this)}
                            totalPayment={this.gotoTotalPayment.bind(this)} />
                    </Tab>
                    <Tab heading={<TabHeading><Icon name="list" /><Text style={styles.textLabel}> เเสดงค่าสมัครทั้งหมด</Text></TabHeading>}>
                        <TotalRegister />
                    </Tab>
                </Tabs>
                <SummaryTotal
                    total={parseFloat(this.props.event.totalRegister).toFixed(2)}
                />
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return {
        event: state.event
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTotalRegister: (total) => {
            dispatch({
                type: "setTotalRegister",
                payload: total
            })
        },
        setCreditPrice: (credit) => {
            dispatch({
                type: "setCreditPrice",
                payload: credit
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonChangeTranfer);
