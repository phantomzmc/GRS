import React, { Component } from 'react'
import FriendInEvent from '../component/list/listFriend/frienInEvent'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, StatusBar } from 'react-native';
import { Container } from "native-base";
import { connect } from 'react-redux'

import HeaderTeam from '../component/items/headerTeam'
import SummaryTotal from '../component/items/summary'

class FriendDistance extends Component {
    state = {
        title: "เลือกระยะทาง",
        price: [],
        statusRegis: 1
    }
    onTest = () => {
        this.props.navigation.navigate("ListTotalRegis")
    }
    onGotoAddress = () => {
        this.props.setStatusRegis(this.state.statusRegis)
        this.props.navigation.navigate("AddressLayout")
    }
    onButtonChangePayment = () => {
        this.props.navigation.navigate("ButtonChangePayment")
    }
    onPressGoBack = () => {
        this.props.navigation.navigate("TabRouter")
    }


    render() {
        return (
            <Container>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <HeaderTeam title={this.state.title}
                    goback={this.onPressGoBack.bind(this)} />
                <ScrollView>
                    <View style={styles.container}>
                        <FriendInEvent />
                        <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={this.onGotoAddress.bind(this)}>
                                <Text style={styles.textButton}>ถัดไป</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <SummaryTotal />
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        friendlist: state.friendlist
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTotalPrice: (totals) => {
            dispatch({
                type: 'setTotalPrice',
                payload: totals
            })
        },
        setStatusRegis: (regis) => {
            dispatch({
                type: 'setStatusRegis',
                payload: regis
            })
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Kanit',
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(FriendDistance)