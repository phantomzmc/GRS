import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Button } from 'native-base';
import { StackNavigator } from 'react-navigation';
import Login from '../container/login'
import RegisterDistance from '../container/registerDistance'
import SummaryTotal from '../component/items/summary'
import { map } from 'mobx';

class ControlDistance extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 0,
        }
        this.goAddTeam = this.goAddTeam.bind(this)
    }
    goNextState = () => {
        this.props.navigation.navigate('ShirtPhotoPlus')
    }
    goAddTeam() {
        console.log("Team")
        Alert.alert("ลงทะเบียนแบบกลุ่ม", "การลงทะเบียนแบบกลุ่มจะต้องทำการเข้าสู่ระบบก่อน", [
            {
                text: "Cancel"
            },
            {
                text: "เข้าสู่ระบบ",
                onPress: () => this.props.navigation.navigate("Login")
            },
        ], { cancelable: false })
    }

    render() {
        return (
            <Container style={styles.container}>
                <Tabs initialPage={this.state.pageNumber}>
                    <Tab heading={<TabHeading><Text style={styles.textLabel}>ลงทะเบียนแบบเดียว</Text></TabHeading>}>
                        <RegisterDistance nextState={this.goNextState.bind(this)} />
                    </Tab>
                    <Tab heading={<TabHeading><Text style={styles.textLabel} onPress={() => this.goAddTeam()}>ลงทะเบียนแบบกลุ่ม</Text></TabHeading>}>
                    </Tab>
                </Tabs>
                <SummaryTotal />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    textLabel: {
        fontSize: 12,
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

export default ControlDistance;
