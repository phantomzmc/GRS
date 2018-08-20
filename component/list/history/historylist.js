import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Icon } from 'native-base';
import { connect } from 'react-redux'
import Modal from 'react-native-modal'

import axios from 'axios'
import dataInvoice from './dataInvoice'
import ModalHistory from '../../modal/history'
import req from '../../../config/uri_req'
import api_key from '../../../config/api_key'

var uri = req[0].uspGetInvoice
var apikey = api_key[0].api_key

class HistoryList extends Component {
    constructor(state) {
        super(state)
        this.state = {
            isModalVisible: false,
            name: "",
            dataSource: []
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ dataSource: this.props.historyData })
            console.log("historylist" + this.props.historyData)
        }, 500)

    }
    getDetailInvoice(InvoiceID) {
        let data = ({
            params: [
                { name: "InvoiceID", value: InvoiceID },
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, dataSource2: response.data[0] });
                dataInvoice.splice(0, 1, response.data[0])
                console.log(dataInvoice)
            }).catch((error) => {
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                console.error(error);
            });
    }
    setItems(item) {
        console.log(item.name)
        this.setState({ invoice: item })
        this.getDetailInvoice(item.InvoiceID)
        this._toggleModal()
    }
    _toggleModal = (data) => {
        this.setState({ isModalVisible: !this.state.isModalVisible });

    }


    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.props.historyData}
                    renderItem={({ item }) =>
                        <View style={styles.container}>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{ uri: item.pic }} />
                                        <TouchableOpacity onPress={() => this.setItems(item)}>
                                            <Body>
                                                <Text style={{ fontFamily: "kanit" }}>{item.InvoiceDatetime}</Text>
                                                <Text note style={{ fontFamily: "kanit" }}>ใบเสร็จหมายเลข : {item.InvoiceID}</Text>
                                            </Body>
                                        </TouchableOpacity>
                                    </Left>
                                    <Right>
                                        <Text note style={{ fontFamily: "kanit" }}>ยอดชำระ : {item.TotalAmount} </Text>
                                    </Right>
                                </CardItem>
                            </Card>
                        </View>}
                    keyExtractor={(item, index) => index} />
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <ModalHistory
                            dataHistory={this.state.dataSource2}
                            toggleModal={this._toggleModal}
                        />
                    </View>
                </Modal>
            </View >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friendlist: state.friendlist,
        userprofile: state.userprofile,
        token: state.token
    }
}

const styles = StyleSheet.create({

})

export default connect(mapStateToProps)(HistoryList)

