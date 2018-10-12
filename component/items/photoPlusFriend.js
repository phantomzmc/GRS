import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Left, Right, Icon } from 'native-base'
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { connect } from 'react-redux'
import dataPrice from '../list/listevent/dataPrice'
import dataFriend from '../list/listFriend/dataFriend'
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
            totalPrice: "",
            
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                priceEvent: parseFloat(this.props.event.totalRegister),
                priceDistance: this.props.price,
                pricePhotoPlus: parseFloat(this.props.friendlist.dataDis[0].PhotoPlusCost)
            })
            console.log(this.state.priceEvent)
            console.log(this.state.pricePhotoPlus)
            this.sumPhoto()
        }, 500)

    }
    photoPlusSwitch = () => {
        let { dataFriendRegis } = this.state
        this.setState({ value: !this.state.value })
        this.sumPrices()

    }
    sumTotalPlus() {
        const add = (a, b) =>
            a + b
        const sum = dataPrice.reduce(add)
        console.log(sum)
        this.setState({ totalPrice: sum })
        this.props.setTotal(sum)
        this.props.setTotalRegister(sum)
    }
    sumPhoto() {
        let { pricePhotoPlus, priceDistance } = this.state
        const sum = priceDistance + pricePhotoPlus
        console.log(sum)
        this.setState({ totalDistance: sum })
    }
    sumPrices() {
        let { value } = this.state
        if (value == true) {
            // this.setState({ totalPrice: this.state.priceEvent })
            dataPrice.splice(this.props.indexs, 1, this.state.priceDistance)
            console.log(dataPrice)
            this.sumTotalPlus()
            this.props.setPhotoPlus("0")
        }
        else if (value == false) {
            this.sumPhoto()
            dataPrice.splice(this.props.indexs, 1, this.state.totalDistance)
            console.log(dataPrice)
            this.sumTotalPlus()
            this.props.setPhotoPlus("1")
        }
    }

    render() {
        let { price, title } = this.state
        return (
            <View style={styles.container}>
                <Left style={{ justifyContent: 'space-between' }}>
                    <Icon name="ios-camera-outline" style={{ fontSize: 20 }} />
                    <Text style={{ fontFamily: "Kanit", fontSize: 16 }}>Photo + Service</Text>
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
