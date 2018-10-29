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

// var uri = req[0].uspGetRegisterListsOfInvoice
var uri = req[0].uspGetInvoice
var apikey = api_key[0].api_key

class HistoryList extends Component {
    constructor(state) {
        super(state)
        this.state = {
            isModalVisible: false,
            name: "",
            dataSource: [],
            registerID: ""
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ dataSource: this.props.historyData })
            console.log("historylist" + this.props.historyData)
        }, 500)

    }
    getDetailInvoice(invoice) {
        let data = ({
            params: [
                { name: "InvoiceID", value: invoice },
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
                this.setState({ dataSource: response.data[0] });
                console.log(response.data[0])
                // dataInvoice.splice(0, 1, response.data[0])
                this.getInvoiceID(response.data[0].InvoiceID)
            }).catch((error) => {
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                console.error(error);
            });
    }
    getInvoiceID(invoiceid) {
        let uri = req[0].uspGetRegisterListsOfInvoice
        let apikey = api_key[0].api_key
        let data = ({
            params: [
                { name: "InvoiceID", value: invoiceid }
            ]
        })
        console.log(data)
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ dataSource2: response.data });
                console.log(response.data)
                const data = response.data
                for (let index = 0; index < data.length; index++) {
                    dataInvoice.splice(index, 1, response.data[index])
                    console.log(response.data[index])
                }
                console.log(dataInvoice)
                setTimeout(() => {
                    this.setState({ isModalVisible: true })
                }, 500)
            }).catch((error) => {
                this.getInvoiceID(invoiceid)
            });
    }
    setItems(item) {
        console.log(item.InvoiceID)
        this.setState({ invoice: item })
        this.getDetailInvoice(item.InvoiceID)

    }
    _toggleModal = (data) => {
        this.setState({ isModalVisible: !this.state.isModalVisible });

    }


    render() {
        let url = 'https://register.shutterrunning2014.com/assets/img/theme/'

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
                                        <Thumbnail source={{ uri: url + item.BackgroundImage }} />
                                        <TouchableOpacity onPress={() => this.setItems(item)}>
                                            <Body>
                                                <Text style={{ fontFamily: "Kanit", fontSize: 14 }}>{item.EventName}</Text>
                                                <Text note style={{ fontFamily: "Kanit" }}>ใบเสร็จหมายเลข : {item.InvoiceID}</Text>
                                            </Body>
                                        </TouchableOpacity>
                                    </Left>
                                    <Right>
                                        <Text note style={{ fontFamily: "Kanit" }}>ยอดชำระ : {item.TotalAmount} </Text>
                                    </Right>
                                </CardItem>
                            </Card>
                        </View>}
                    keyExtractor={(item, index) => index} />
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <ModalHistory
                            registerID={this.state.registerID}
                            dataAll={this.state.dataSource}
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

