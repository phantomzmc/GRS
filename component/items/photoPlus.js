import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import SwitchItem from '../items/switch'
import Test from './test'

class PhotoPlus extends Component {
    constructor() {
        super();
        this.state = {
            switch1Value: false,
            pricePhotoPlus: 100

        }
    }
    toggleSwitch1 = (value) => {
        this.setState({ switch1Value: value })
        console.log('Submit photo+' + value)
    }


    render() {
        let { price,title } = this.state
        return (
            <View style={styles.container}>
                <Text style={{ fontFamily: "Kanit", }}>{this.props.titleName} : {this.props.pricePhoto} บาท</Text>
                
                <SwitchItem
                    toggleSwitch1={this.toggleSwitch1}
                    switch1Value={this.state.switch1Value}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 20,
    }
})

export default PhotoPlus;
