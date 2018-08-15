import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Card, CardItem, Body, Button, Text } from 'native-base';
const KEYS_TO_FILTERS = ['Value'];

class ListRegisInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datalist: this.props.dataitems,
            dataItem: {},
            isModal: false
        }
    }
    componentWillMount() {
        console.log(this.props.dataitems)
    }
    render() {
        let { email, datalist } = this.state
        return (
            <View style={{ padding: 20 }}>
                <ScrollView style={styles.list}>
                    {datalist.map(email => {
                        return (
                            <TouchableOpacity onPress={() => this.setState({ dataItem: email, isModal: !this.state.isModal })}
                                // onPressIn={this.onGetamphoe.bind(this)}
                                key={email.Value} >
                                <View style={styles.items}>
                                    <Text style={styles.textValue}>{email.FullName}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <Modal isVisible={this.state.isModal}>
                    <View style={styles.card}>
                        <View style={styles.contentCard}>
                            <Text style={styles.textDetail}>ชื่อ : {this.state.dataItem.FullName}</Text>
                            <Text style={styles.textDetail}>ระยะทาง : {this.state.dataItem.Distance}</Text>
                            <Text style={styles.textDetail}>ไซค์เสื้อ : {this.state.dataItem.Jersey}</Text>
                            <View style={styles.contentCard}>
                                <Button rounded danger onPress={()=> this.setState({ isModal :! this.state.isModal})}>
                                    <Text> ปิด </Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    items: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    card: {
        backgroundColor: "#fff",
        padding: 20
    },
    contentCard: {
        justifyContent: "center",
        alignItems: "center"
    },
    textDetail: {
        fontFamily: "kanit",
        fontSize: 18,
        paddingVertical: 10
    }
})

export default ListRegisInfo