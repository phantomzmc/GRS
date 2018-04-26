import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import randomstringPromise from 'randomstring-promise';


class VerifyCode extends Component {

    constructor(props) {
        super(props)
        this.state = {
            code: "code"
        }

    }
    printOutPut = () => {
        console.log("print")
    }
    random() {
        console.log("verify")
        randomstringPromise(10)
            .then((code) => {
                this.setState({code})
                console.log(code);  // u8KNs7aAw0DCOKO1MdEgVIcF2asajrdd
                
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.random.bind(this)}>
                    <Text>{this.state.code}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})

export default VerifyCode