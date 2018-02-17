import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';

import ListFriendDistance from '../component/list/event/listFriendDistance'
import ListShirth from '../component/list/listShirt/listShirt'


class AddEventFriend extends Component {
    static navigationOptions = {
        title: 'เลือกระยะทางเเละเสื้อ',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: "Kanit",
            fontWeight: '500',
        }
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.textDistance}>เลือกระยะทาง</Text>
                    <ListFriendDistance />
                    <Text style={styles.textSizeshirth}>เลือกไซค์เสื้อ</Text>
                    <ListShirth />
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={()=> navigate('AddEventFriend')}>
                            <Text style={styles.textButton}>ถัดไป</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textDistance : {
        padding: 15,
        fontSize: 20,
    },
    textSizeshirth :{
        padding: 15,
        fontSize: 20,
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

    }
})
export default AddEventFriend;