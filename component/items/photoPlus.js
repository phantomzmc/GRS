import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';

import { connect } from 'react-redux'
// import Switch from 'react-native-switch-pro'
import Test from './test'

class PhotoPlus extends Component {
    static propTypes = {
        priceEvent: PropTypes.number,
        pricePhotoPlus: PropTypes.number
    }
    constructor() {
        super();
        this.state = {
            pricePhotoPlus: null,
            textSwitch: "",
            // priceEvent: this.props.event.distanceEvent.price,
            totalPrice: "",
            SwitchOnValueHolder: false
        }
    }
    componentWillMount() {
        this.setState({
            priceEvent: parseFloat(this.props.event.distanceEvent.price),
            pricePhotoPlus: parseFloat(this.props.event.distanceEvent.pricePhotoPlus)
        })
    }
    componentDidMount(){
        this.sumPhotoPlus()
    }

    photoPlusSwitch = (value) => {

        this.sumPrice(value)
        this.props.setTotal(this.state.totalPrice.toString())
        this.props.setTotalRegister(this.state.totalPrice.toString())
    }
    sumPhotoPlus(){
        let { priceEvent, pricePhotoPlus } = this.state
        const sum = pricePhotoPlus + priceEvent
        this.setState({ totalPrice: sum })
    }
    sumPrice = (value) => {
        let { priceEvent, pricePhotoPlus } = this.state
        this.setState({ SwitchOnValueHolder: value })

        if (value == false) {
            this.sumPhotoPlus()
            console.log(this.state.totalPrice)
            this.props.setTotal(this.state.totalPrice.toString())
            this.props.setTotalRegister(this.state.totalPrice.toString())
        }
        else if (value == true) {
            this.setState({ totalPrice: this.state.priceEvent })
            console.log(this.state.totalPrice)
            this.props.setTotal(this.state.totalPrice.toString())
            this.props.setTotalRegister(this.state.totalPrice.toString())

        }
    }

    render() {
        let { price, title } = this.state
        return (
            <View style={styles.container}>
                <Text style={{
                    fontFamily: "Kanit"
                }}>{this.props.titleName}
                </Text>
                <Switch
                    onValueChange={(value) => this.sumPrice(value)}
                    value={this.state.SwitchOnValueHolder} />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        event: state.event
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        setTotal: (totalPrice) => {
            dispatch({
                type: "setTotal",
                payload: totalPrice
            })
        },
        setTotalRegister: (total) => {
            dispatch({
                type: "setTotalRegister",
                payload: total
            })
        },
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        padding: 20
    }
})

export default connect(mapStateToProps, mapDispatchToState)(PhotoPlus);
