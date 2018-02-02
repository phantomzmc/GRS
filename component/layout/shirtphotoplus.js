import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';


import ListShirt from '../list/listShirt/listShirt'
import PhotoPlus from '../items/photoPlus'

class ShirtPhotoPlus extends Component {
    static navigationOptions = {
        title: 'เลือกไซค์เสื้อ',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff'
        }
    };
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <PhotoPlus />
                    <Text style={styles.textSize}>โปรดเลือกไซค์เสื้อ</Text>
                    <ListShirt />
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textButton}>ยืนยัน</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    textSize: {
        backgroundColor: '#EFF4F1',
        fontSize: 22,
        fontWeight: '300',
        padding: 20,

    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    buttonContainer: {
        height: 40,
        width: '100%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textButton: {
        fontWeight: '700',
        fontSize: 20,
        color: '#fff',

    }
})
export default StackNavigator ({
    shirtPhotoPlus : {
        screen : ShirtPhotoPlus
    } 
});
