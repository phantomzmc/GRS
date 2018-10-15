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
import MailGunSend from '../config/send-mailgun'

const dataFriend2 = []

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
            modalError: false,
            dataFriendFull: this.props.friendlist.fullfriendEvent
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
                setTimeout(() => {
                    this.captureScreenFunction()
                }, 500)
            }
        }, 1000)
    }
    addRegister() {
        console.log("addregis")
        let { userprofile, network, choiceSend, event, creditcard, address, promocode } = this.props
        let uri = req[0].uspAddRegister
        let apikey = api_key[0].api_key
        let friendlists = this.props.friendlist.friendEvent
        var myString = JSON.stringify(friendlists)
        let data = ({
            params: [
                { name: "RunnerID", value: userprofile.userprofile.RunnerID },
                { name: "PaymentType", value: creditcard.typePayment },
                { name: "PaymentStatus", value: creditcard.statusPayment },
                { name: "PaymentSlip", value: creditcard.paymentslip },
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
                { name: "TotalDiscount", value: promocode.disPrice },
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
                this.getInvoiceID(response.data[0].InvoiceID)
            }).catch((error) => {
                this.setState({ modalError: true })
                setTimeout(() => {
                    this.props.navigation.navigate('EventList')
                }, 3000)
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
                this.setState({ isLoading: false, invoiceID: response.data[0].RegisterID, dataRegis: response.data });
                console.log(response.data)
                this.props.setDataRegis(response.data)
                this.props.setRegisterID(response.data[0].RegisterID)
                if (this.props.creditcard.typePayment !== 2) {
                    this.loopTable()
                }
            }).catch((error) => {
                this.setState({ modalError: true })
                // setTimeout(() => {
                //     this.props.navigation.navigate('EventList')
                // }, 3000)
            });

    }
    genQRCode() {

    }
    async sendEmailInvoice(str) {
        const strTable = str.toString()
        const data = await MailGunSend.onSendMail({
            'from': 'Guurun Support Team. <support@guurun.com>',
            'to': this.props.userprofile.userprofile.Email,
            'subject': 'Guurun Support Team ยืนยันการสมัครรายการ ' + this.props.event.event.EventName,
            'text': 'สวัสดีคุณ ' + this.props.profile.profile.fullname,
            'html': '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>#table1 {background-color: #eeeeee;width: 100%;}#table2 {width: 100%;}td,th {text-align: left;padding: 8px;}tr {' +
                'border: 1px solid #111;}#hr {color: #FC561F;text-align: center;}h4 {color: #FC561F;text-align: center;}#textRigth {text-align: right;}h2 {text-align: center;}line {height: 10px;}' +
                'p {text-align: center;}</style><title>OrderInvoice</title></head><body><h2>Order รอการชำระเงิน โครงการ ' + this.props.event.event.EventName + ' </h2><p id="hr">ข้อมูลการสมัครของท่านถูกบันทึกลงในระบบเรียบร้อยแล้วกรุณารอใบยืนยันการสมัครเพื่อนำไปลงทะเบียนรับเสื้อและเบอร์วิ่งในวันเวลาที่กำหนด</p><hr id="line">' +
                '<table id="table1"><tr><td colspan="6">ใบเสร็จหมายเลขที่ #' + this.state.output[0].InvoiceID + '</td></tr><tr><th>No.</th><th>Name-Lastname</th><th>Course</th><th>Jersey</th><th>Qty</th><th>Total</th></tr>'
                + strTable + '<tr><td colspan="5" id="textRigth">รับเสื้อ ' + this.props.choiceSend.choiceSend.detail + '</td><td id="textRigth">' + this.props.choiceSend.choiceSend.priceCDO + '.00</td>' +
                '</tr><tr><td colspan="5" id="textRigth">ค่าธรรมเนียมการใช้บัตรเครดิต/เดบิต</td><td id="textRigth">' + this.props.creditcard.vat + '</td></tr><tr><td colspan="5" id="textRigth">All Total</td><td id="textRigth">' + this.props.event.totalRegister + '</td></tr>' +
                '</table><table id="table2"><tr><td colspan="6"><p id="hr">อีเมล์ฉบับนี้เป็นระบบอัตโนมัติ กรุณาอย่าตอบกลับในอีเมล์นี้ หากต้องการความช่วยเหลือเพิ่มโปรดติดต่อฝ่ายรับสมัคร</p></td></tr><tr><td colspan="6"><hr id="line">' +
                '</td></tr><tr><td colspan="6"><h4>Shutter Running Services</h4><p>7 Market Today krungthepkreetra 7 Huamark</p><p>Bangkapi</p><p>Bangkok, Thailand 10240 Phone: (+66) 2 111 2201 </p><p>http://shutterrunning2014.com</p>' +
                '</td></tr></table></body></html>'
        })
        console.log(data)
    }
    loopTable() {
        const { dataFriendFull } = this.state
        console.log(dataFriendFull)
        for (i = 0; i < dataFriendFull.length; i++) {
            strTable = '<tr><td></td><td>' + dataFriendFull[i].firstname + dataFriendFull[i].lastname + '</td><td>' + dataFriendFull[i].nameRegis + '</td><td>' + dataFriendFull[i].JerseySize + '</td><td>' + "1" + '</td><td id="textRigth">' + dataFriendFull[i].CourseFee + '</td></tr>'
            dataFriend2.push(strTable)
            // console.log(dataFriendFull[i].lastname)
        }
        setTimeout(() => {
            this.atToString()
        }, 1000)
    }
    atToString() {
        var str = ""
        for (i = 0; i < dataFriend2.length; i++) {
            str = str + dataFriend2[i]
        }
        setTimeout(() => {
            console.log(str)
            this.sendEmailInvoice(str)
        }, 2000)
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
                // Alert.alert('บันทึกสำเร็จ', 'ทำการบันทึกรายการเสร็จสิ้น', [
                //     {
                //         text: 'ตกลง',
                //     },
                //     {
                //         text: 'ไปยังรายการวิ่ง',
                //         onPress: () => this.gotoListEvent()
                //     }
                // ], { cancelable: false }),
                // error => console.error("Oops, Something Went Wrong", error)
            );

    }

    render() {
        return (
            <Container>
                <HeaderInvoice
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)}
                    onSave={this.captureScreenFunction.bind(this)}
                    menu={true}
                    statusRegis={true}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}
                    goContacts={() => this.props.navigation.navigate('Contacts')}
                />
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
        fontFamily: 'Kanit'
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
        profile: state.profile,
        promocode: state.promocode,
        invoice: state.invoice
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
        },
        setRegisterID: (registerid) => {
            dispatch({
                type: 'setRegisterID',
                payload: registerid
            })
        },
        setDataRegis: (dataRegis) => {
            dispatch({
                type : 'setDataRegis',
                payload : dataRegis
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalLayout);
