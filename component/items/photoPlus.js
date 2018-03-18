import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';

import {connect} from 'react-redux'
import SwitchItem from '../items/switch'
import Test from './test'

class PhotoPlus extends Component {
    constructor() {
        super();
        this.state = {
            switch1Value: true,
            pricePhotoPlus: "100",
            textSwitch: "",
            priceEvent: "",
            totalPrice: ""
        }
    }
    componentDidMount = () => {
        this.setState({
            priceEvent : this.props.priceEvent,
            pricePhotoPlus : this.props.dataPricePhoto,
        })
        this.sumPrice()
    }

    toggleSwitch1 = (value) => {
        if (this.state.switch1Value == true) {
            this.setState({pricePhotoPlus: this.props.pricePhoto})
            console.log(this.state.pricePhotoPlus)
            this.setState({priceEvent: this.props.priceEvent})
            console.log(this.state.priceEvent)

        } else if (this.state.switch1Value == false) {
            this.setState({pricePhotoPlus: 0})
            // this.props.setPrice(this.state.pricePhotoPlus)
            console.log(this.state.pricePhotoPlus)

        }
        this.setState({switch1Value: value})
        console.log('Submit photo+' + value)
        this.sumPrice()
    }
    sumPrice = (totalPrice) => {
        this.setState({
            totalPrice: this.state.pricePhotoPlus + this.state.priceEvent
        })
        this
            .props
            .setTotal(this.state.totalPrice)
        console.log(this.state.totalPrice)
    }

    render() {
        let {price, title} = this.state
        return (
            <View style={styles.container}>
                <Text style={{
                    fontFamily: "Kanit"
                }}>{this.props.titleName}
                    </Text>
                <SwitchItem
                    toggleSwitch1={this.toggleSwitch1}
                    switch1Value={this.state.switch1Value}/>
            </View>
        );
    }
}
const mapDispatchtoState = (dispatch) => {
    return {
        setPrice: (price) => {
            dispatch({type: 'setPrice', payload: price})
        },
        setTotal: (totalPrice) => {
            dispatch({type: "setTotal", payload: totalPrice})
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 20
    }
})

export default connect(null, mapDispatchtoState)(PhotoPlus);
