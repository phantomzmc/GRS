import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';

import { connect } from 'react-redux'
import SwitchItem from '../items/switch'
import Test from './test'

class PhotoPlus extends Component {
    constructor() {
        super();
        this.state = {
            switch1Value: false,
            pricePhotoPlus: 100,
            textSwitch: ""

        }
    }
    toggleSwitch1 = (value) => {
        this.setState({ switch1Value: value })
        console.log('Submit photo+' + value)
        if (this.state.switch1Value == true) {
            this.props.setPrice(this.state.pricePhotoPlus)
            this.setState({ pricePhotoPlus: 0 })
            console.log(this.state.pricePhotoPlus)
        }
        if (this.state.switch1Value == false) {
            this.props.setPrice(this.state.pricePhotoPlus)
            this.setState({ pricePhotoPlus: this.props.pricePhoto })
            console.log(this.state.pricePhotoPlus)
            
        }
    }


    render() {
        let { price, title } = this.state
        return (
            <View style={styles.container}>
                <Text style={{ fontFamily: "Kanit", }}>{this.props.titleName} : {this.state.pricePhotoPlus} บาท</Text>
                <SwitchItem
                    toggleSwitch1={this.toggleSwitch1}
                    switch1Value={this.state.switch1Value}
                />
            </View>
        );
    }
}
const mapDispatchtoState = (dispatch) => {
    return {
        setPrice: (price) => {
            dispatch({
                type: 'setPrice',
                payload: price
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 20,
    }
})

export default connect(null, mapDispatchtoState)(PhotoPlus);
