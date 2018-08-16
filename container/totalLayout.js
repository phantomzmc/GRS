import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Container } from 'native-base'
import { connect } from 'react-redux'
import { captureScreen } from "react-native-view-shot";
import Modal from "react-native-modal";
import CameraRollExtended from 'react-native-store-photos-album'
import axios from 'axios'
import req from '../config/uri_req'
import api_key from '../config/api_key'
import TotalRegister from '../component/items/totalRegister'
import DetailRegister from '../component/items/detailRegister'
import HeaderInvoice from '../component/items/headerInvoice'
import CrargeLoading from '../component/modal/chargePayment_load'
import ChargePaymentLoad from '../component/modal/chargePayment_load';
import ChargeError from '../component/modal/chargePayment_error'

class TotalLayout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "สรุปการสมัครทั้งหมด",
            name: "hello test",
            event: {
                name: "",
                date: ""
            },
            imageURI: "",
            layout_invoice: false,
            modalLoading: true,
            modalError: false
        }
    }
    componentWillMount() {
        this.setState({ modalLoading: true })
    }
    componentDidMount() {
        this.addRegister()
        setTimeout(() => {
            if (this.state.modalLoading == true) {
                this.setState({ modalLoading: false, layout_invoice: true })
                // setTimeout(()=>{
                //     this.captureScreenFunction()
                // },1500)
            }
        }, 2000)
    }
    addRegister() {
        console.log("addregis")
        let { userprofile, network, choiceSend, event, creditcard, address } = this.props
        let uri = req[0].uspAddRegister
        let apikey = api_key[0].api_key
        let friendlists = this.props.friendlist.friendEvent
        var myString = JSON.stringify(friendlists)
        let data = ({
            params: [
                { name: "RunnerID", value: userprofile.userprofile.RunnerID },
                { name: "PaymentType", value: creditcard.typePayment },
                { name: "PaymentStatus", value: 2 },
                { name: "PaymentSlip", value: "" },
                { name: "IPAddress", value: network.ip },
                { name: "Longitude", value: network.long },
                { name: "Latitude", value: network.lat },
                { name: "TransactionID", value: "" },
                { name: "ChargesID", value: creditcard.charge.id },
                { name: "NumberOfRunner", value: 1 },
                { name: "PlaceItemID", value: choiceSend.choiceSend.placeItemID },
                { name: "BillingInfo", value: "{\"FirstName\":\"" + address.user.fullname + "\",\"LastName\":\"" + address.user.lastname + "\",\"Address\":\"" + address.user.adress + "\",\"SubDistric\":\"" + address.user.subdistric + "\",\"Distric\":\"" + address.user.distric + "\",\"Province\":\"" + address.user.province + "\",\"PostCode\":\"" + address.user.postcode + "\",\"Country\":\"Thailand\",\"Phone\":\"" + address.user.tel + "\",\"Notes\":\"" + address.user.note + "\"}" },
                { name: "RegisterList", value: myString },
                { name: "TeamName", value: userprofile.userprofile.TeamName },
                { name: "EventID", value: event.event.EventID },
                { name: "TotalPostPrice", value: choiceSend.choiceSend.priceCDO },
                { name: "CreditFee", value: creditcard.vat },
                { name: "TotalDiscount", value: 0 },
                { name: "TotalAll", value: event.totalRegister }
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
                this.setState({ isLoading: false, output: response.data });
                console.log(this.state.output)
                this.props.setInvoice(this.state.output)
            }).catch((error) => {
                this.setState({ modalError: true })
                setTimeout(() => {
                    this.props.navigation.navigate('EventList')
                }, 3000)
            });
    }

    onClick = () => {
        console.log(this.state.event)
        console.log(this.props.event.name)
        console.log(this.props.event.date)
        Alert.alert('เรียบร้อย', 'ทำการรายการเสร็จสิ้น', [
            {
                text: 'ตกลง',
                onPress: () => this.gotoListEvent()
            }
        ], { cancelable: false })
        // this.props.addEvent(this.state.name)
    }
    gotoListEvent = () => {
        this.props.navigation.navigate('EventList')
    }
    gotoBack = () => {
        this.props.navigation.navigate('ButtonChangePayment')
    }

    captureScreenFunction = () => {
        captureScreen({
            format: "jpg",
            quality: 0.8
        })
            .then(
                uri => {
                    CameraRollExtended.saveToCameraRoll({
                        uri: uri,
                        album: 'GRS'
                    }, 'photo')
                },
                Alert.alert('บันทึกสำเร็จ', 'ทำการบันทึกรายการเสร็จสิ้น', [
                    {
                        text: 'ตกลง',
                        onPress: () => this.gotoListEvent()
                    }
                ], { cancelable: false }),
                // error => console.error("Oops, Something Went Wrong", error)
            );

    }

    render() {
        return (
            <Container>
                <HeaderInvoice
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)}
                    onSave={this.captureScreenFunction.bind(this)} />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <Modal isVisible={this.state.modalLoading}>
                    <ChargePaymentLoad />
                </Modal>
                <Modal isVisible={this.state.modalError}>
                    <ChargeError />
                </Modal>
                <ScrollView>
                    {this.state.layout_invoice &&
                        <View style={styles.container}>
                            <DetailRegister />
                            <TotalRegister />
                            <View style={styles.submitContainer}>
                                
                                <TouchableOpacity style={styles.buttonContainer}
                                    onPress={this.onClick.bind(this)}>
                                    <Text style={styles.textButton}>ปิด</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </ScrollView>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFF4F1',
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 30

    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'kanit'
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
    },

})

const mapStateToProps = (state) => {
    return {
        event: state.event,
        shirtphoto: state.shirtphoto,
        choiceSend: state.choiceSend,
        address: state.address,
        network: state.network,
        shirtphoto: state.shirtphoto,
        creditcard: state.creditcard,
        token: state.token,
        userprofile: state.userprofile,
        friendlist: state.friendlist,
        profile: state.profile
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setInvoice: (invoice) => {
            dispatch({
                type: 'setInvoice',
                payload: invoice
            })
        },
        setRegislist: (list) => {
            dispatch({
                type: 'setRegislist',
                payload: list
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalLayout);
