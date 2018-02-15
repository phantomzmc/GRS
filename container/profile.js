import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import HeadUser from '../component/items/header_profile'
import FormUser from '../component/form/registerForm'

class Profile extends Component {
    static navigationOptions = {
        title: 'ข้อมูลส่วนตัว',
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
                    <HeadUser />
                    <FormUser />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default Profile;
