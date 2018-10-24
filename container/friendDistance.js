import React, { Component } from 'react'
import FriendInEvent from '../component/list/listFriend/frienInEvent'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, StatusBar, TouchableHighlight, Alert } from 'react-native';
import { Container } from "native-base";
import { connect } from 'react-redux'

import HeaderTeam from '../component/items/headerTeam'
import SummaryTotal from '../component/items/summary'

class FriendDistance extends Component {
    state = {
        title: "เลือกระยะทาง",
        price: [],
        statusRegis: 1,
        statusButton: false,
        statusButtonOnPress: false
    }
    checkValueRegis() {
        let friendlists = this.props.friendlist.friendRegis
        let friendevent = this.props.friendlist.friendEvent
        var countFriend = friendlists.length
        var countInEvent = friendevent.length
        console.log(countFriend)
        console.log(countInEvent)

        if (countFriend == countInEvent) {
            console.log("update")
            this.setState({ statusButton: false })
        }
        else if (countFriend != countInEvent) {
            console.log("don't update")
            this.setState({ statusButton: true })
        }

    }
    checkItemRegis() {
        let friendlists = this.props.friendlist.friendRegis
        let friendevent = this.props.friendlist.friendEvent
        var countFriend = friendlists.length
        var countInEvent = friendevent.length

        if (countInEvent < 2 || countFriend < 2) {
            Alert.alert('กรุณาเพิ่มจำนวนเพื่อนในการสมัคร', 'การลงทะเบียนแบบกลุ่มจะต้องลงทะเบียนตั้งแต่ 2 คนขึ้นไป', [
                {
                    text: 'ตกลง'
                }
            ], { cancelable: false })
        }
        else if (countInEvent > 10 || countFriend > 10) {
            Alert.alert('จำนวนเพื่อนเกินกำหนด', 'การลงทะเบียนแบบกลุ่มสามารถลงได้ไม่เกิน 10 คนต่อ 1 ครั้งเท่านั้น', [
                {
                    text: 'ตกลง'
                }
            ], { cancelable: false })
        }
        else if (countFriend != countInEvent) {
            Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกข้อมูลระยะทางและไซค์เสื้อ', [
                {
                    text: 'ตกลง'
                }
            ], { cancelable: false })        }
        else if (countFriend == countInEvent) {
            this.onGotoAddress()
        }
    }
    onTest = () => {
        this.props.navigation.navigate("ListTotalRegis")
    }
    onGotoAddress = () => {
        this.props.setStatusRegis(this.state.statusRegis)
        this.props.goAddress()
    }
    onButtonChangePayment = () => {
        this.props.navigation.navigate("ButtonChangePayment")
    }
    onPressGoBack = () => {
        this.props.navigation.navigate("TabRouter")
    }

    render() {
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <ScrollView>
                    <View style={styles.container}>
                        <FriendInEvent 
                            toggleList={this.props.toggleList}
                        />
                        <View style={styles.submitContainer}>
                            {this.state.statusButton == true ?
                                <TouchableHighlight style={styles.buttonContainer}>
                                    <Text style={styles.textButton}>ถัดไป</Text>
                                </TouchableHighlight>
                                :
                                <TouchableOpacity style={styles.buttonContaineronPress}
                                    onPress={() => this.checkItemRegis()}>
                                    <Text style={styles.textButton}>ถัดไป</Text>
                                </TouchableOpacity>
                            }

                        </View>
                    </View>
                </ScrollView>
            </View>
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
        opacity: 0.7
    },
    buttonContaineronPress: {
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