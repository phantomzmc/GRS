import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    AlertIOS,
    Button,
    Modal
} from 'react-native';
import CreditView from '../component/items/creditView'
import ButtonChangePayment from '../component/items/bottonChangePayment'
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

class CreditPayment extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {}
        this.goAddressSend = this
            .goAddressSend
            .bind(this)
    }
    showDetailPayment = () => {
        console.log("showDetail")
        this.props.showDetail()
    }
    gotoTransferPayment = () => {
        this
            .props
            .navigation
            .navigate('TransferPayment')
    }
    gotoCreditPayment = () => {
        this.props.navigation.navigate('CreditPayment')
    }
    goAddressSend = () => {
        this.props.totalPayment()
    }

    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <CreditView goAddress={this.goAddressSend.bind(this)}
                        TotalPrice={this.props.total.totalPrice}
                        ShowDetail={this.showDetailPayment.bind(this)} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column'
    },
    segment: {
        marginTop: 20,
        marginHorizontal: 20
    }
})

const mapStateToProps = (state) => {
    return { total: state.total, creditcard: state.creditcard };
};

export default connect(mapStateToProps)(CreditPayment);
