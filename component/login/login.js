import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground,KeyboardAvoidingView } from 'react-native';
import LoginForm from '../form/loginForm'

export default class Login extends Component {
    render() {
        return (
            <ImageBackground source={{ uri: "http://register.shutterrunning2014.com/assets/img/theme/dongtanbg.jpg" }}
                style={{ width: '100%', height: '100%', opacity: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.textTitle}>
                        ShutterRuning Service
                    </Text>

                </View>
                <View style={styles.formcontainer}>
                    <LoginForm />
                </View>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imgBackground: {

    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    textTitle: {
        fontSize: 34,
        color: '#fff',
        fontWeight: '700',
        

    },
    formcontainer: {
        flex: 2,
    }
})
