import React, { Component } from 'react'
import FriendInEvent from '../component/list/listFriend/frienInEvent'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import HeaderTeam from '../component/items/headerTeam'

class FriendDistance extends Component {
    state = {
        title: "เลือกระยะทาง"
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
                <HeaderTeam title={this.state.title}
                    goback={this.onPressGoBack.bind(this)} />
                <ScrollView>
                    <View style={styles.container}>
                        <FriendInEvent />
                        <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={this.onButtonChangePayment.bind(this)}>
                                <Text style={styles.textButton}>ถัดไป</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
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
        marginBottom: 50,
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


export default FriendDistance