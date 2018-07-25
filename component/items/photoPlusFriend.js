import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Left, Right, Icon } from 'native-base'
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { connect } from 'react-redux'
import dataPrice from '../list/listevent/dataPrice'
import Switch from 'react-native-switch-pro'

class PhotoPlus extends Component {
    static propTypes = {
        priceEvent: PropTypes.number,
        pricePhotoPlus: PropTypes.number
    }
    constructor() {
        super();
        this.state = {
            value: false,
            pricePhotoPlus: null,
            textSwitch: "",
            // priceEvent: this.props.event.distanceEvent.price,
            totalPrice: ""
        }
    }
    componentWillMount() {
        this.setState({
            priceEvent: parseFloat(this.props.event.totalRegister),
            pricePhotoPlus: parseFloat(this.props.friendlist.dataDis[0].PhotoPlusCost)
        })
        console.log(this.state.priceEvent)
        console.log(this.state.pricePhotoPlus)
    }

    photoPlusSwitch = () => {
        let { dataFriendRegis } = this.state
        this.sumPrice()
        this.setState({ value: !this.state.value })
        // console.log(this.state.pricePhotoPlus)
        this.props.setTotal(this.state.totalPrice)
        this.props.setTotalRegister(this.state.totalPrice)
    }

    sumPrice = () => {
        let { value, priceEvent, pricePhotoPlus } = this.state
        if (value === true) {
            const sum = pricePhotoPlus + priceEvent
            console.log(sum)
            this.setState({ totalPrice: sum })
            console.log(this.state.totalPrice)
            dataPrice.push(parseFloat(pricePhotoPlus))
            this.props.setPhotoPlus("0")

        }
        else if (value === false) {
            this.setState({ totalPrice: this.state.priceEvent })
            dataPrice.push(parseFloat(priceEvent))
            this.props.setPhotoPlus("1")

        }
    }

    render() {
        let { price, title } = this.state
        return (
            <View style={styles.container}>
                <Left style={{ justifyContent: 'space-between' }}>
                    <Icon name="ios-camera-outline" style={{ fontSize: 20 }} />
                    <Text style={{ fontFamily: "kanit", fontSize: 16 }}>Photo + Service</Text>
                </Left>
                <Right>
                    <Switch
                        width={60}
                        height={30}
                        value={this.state.value}
                        onSyncPress={() => this.photoPlusSwitch()}
                    />
                </Right>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        event: state.event,
        friendlist: state.friendlist
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
