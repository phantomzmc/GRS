
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Icon, Row } from "native-base";
import { connect } from 'react-redux'
import QRCode from 'react-native-qrcode-svg';
import { Container } from 'native-base';

class DetailRegister extends Component {
    state = {
        address: "106/13 หนองหอย เมืองเชียงใหม่ เชียงใหม่",
        statusPayment1: false,
        statusPayment2: true,
        numberInvoice: "00",
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        countFriend: this.props.friendlist.friendEvent,
        qrcode: true
    }

    componentDidMount() {
        this.checkDataRegis()
        console.log(this.props.invoice.registerid)
        this.setState({
            address: this.props.address.user.adress + " " +
                this.props.address.user.subdistric + " " +
                this.props.address.user.distric + " " +
                this.props.address.user.province + " " +
                this.props.address.user.postcode,
            numberInvoice: this.props.invoice.invoice[0].InvoiceID,
            regisID: this.props.invoice.invoice.RegisterID
        })
        if (this.props.creditcard.statusPayment == 2) {
            this.setState({ statusPayment1: true, statusPayment2: false })
        }
        else if (this.props.creditcard.statusPayment == 1) {
            this.setState({ statusPayment1: false, statusPayment2: true })
        }
    }
    checkDataRegis() {
        const { dataRegis } = this.props.invoice.dataRegis
        if (dataRegis !== "") {
            setTimeout(() => {
                this.setState({
                    qrcode: true
                })
            }, 300)
        }
    }
    render() {
        let { date, month, year, countFriend } = this.state
        let { dataRegis } = this.props.invoice.dataRegis
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' ,alignItems : 'center'}}>
                <Icon name="chevron-small-left" style={{ color: "#000" }} type="Entypo" />
                <FlatList
                    horizontal
                    style={{ width: '100%' }}
                    data={this.props.invoice.dataRegis}
                    renderItem={({ item, index }) =>
                        <View style={styles.container}>
                            <View style={styles.view1}>
                                <View>
                                    {this.state.statusPayment1 && <Text style={styles.typePaymentSuccess}> จ่ายเเล้ว </Text>}
                                    {this.state.statusPayment2 && <Text style={styles.typePaymentWarning}>รอดำเนินการ</Text>}
                                </View>
                                <View style={{ width: 80, height: 120 }}>
                                    {this.props.creditcard.statusPayment == 1 ?
                                        <View style={styles.disQRcode}>
                                            <Text style={styles.textName3}>QR Code</Text>
                                        </View>
                                        :

                                        <View style={{ width: 80, height: 80 }}>
                                            <QRCode
                                                value={item.RegisterID}
                                                size={75}
                                            />
                                            <Text style={{ fontSize: 10, fontFamily: 'Kanit', textAlign: "center", paddingTop: 5 }}>Confirm Number : {item.ConfirmNo}</Text>
                                        </View>


                                        // <QRCode
                                        //     value={this.props.invoice.registerid}
                                        //     size={75}
                                        // />

                                    }
                                    {/* {countFriend.length > 2 || this.props.creditcard.statusPayment == 1 &&
                            

                        } */}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, color: '#A9A9A9', fontFamily: 'Kanit' }}> Order : {this.state.numberInvoice} </Text>
                                    <Text style={{ fontSize: 10, color: '#A9A9A9', fontFamily: 'Kanit' }}>{date}-{month}- {year}</Text>
                                </View>
                            </View>
                            <View style={styles.viewName}>
                                <Text style={styles.textName1}>ชื่อ - นามสกุล</Text>
                                <Text style={styles.textName2}>{this.props.friendlist.fullfriendEvent[index].firstname} {this.props.friendlist.fullfriendEvent[index].lastname}</Text>
                                <Text style={styles.textName1}>รายการวิ่ง</Text>
                                <Text style={styles.textName2}>{this.props.event.event.EventName}</Text>
                            </View>
                            <View style={styles.viewSize}>
                                <View style={styles.box}>
                                    <Text style={styles.boxTitle}>ไซค์เสื้อ</Text>
                                    <Text style={styles.boxName}>{this.props.friendlist.fullfriendEvent[index].JerseySize}</Text>
                                    {/* {this.props.friendlist.fullfriendEvent[0].JerseySize = undefined ?
                                    <Text style={styles.boxName}>
                                        {this.props.friendlist.fullfriendEvent.JerseySize}
                                    </Text>
                                    :
                                    <Text style={styles.boxName}>
                                        {this.props.friendlist.fullfriendEvent[0].JerseySize}
                                    </Text>
                                } */}
                                </View>
                                <View style={styles.box}>
                                    {/* <Text style={styles.boxTitle}>ระยะทาง</Text> */}
                                    <Text style={styles.boxName}>
                                        {this.props.friendlist.fullfriendEvent[index].nameRegis}
                                    </Text>
                                    {/* {this.props.friendlist.fullfriendEvent[0].nameRegis == undefined ?
                                    <Text style={styles.boxName}>
                                        {this.props.friendlist.fullfriendEvent.nameRegis}
                                    </Text>
                                    :
                                    <Text style={styles.boxName}>
                                        {this.props.friendlist.fullfriendEvent[0].nameRegis}
                                    </Text>
                                } */}
                                </View>
                            </View>
                            <View style={styles.viewAddress}>
                                <View style={{ flex: 1, alignItems: 'center', width: '50%' }}>
                                    <Text style={styles.textName1}>Address</Text>
                                    {/* <Text style={{ fontFamily: 'Kanit' }}>{this.props.address.user.adress}</Text> */}
                                    <Text style={{ fontFamily: 'Kanit' }}>{this.state.address}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={styles.textName1}>วันที่</Text>
                                    <Text style={{ fontFamily: 'Kanit' }}>{this.props.event.event.EventDate}</Text>
                                </View>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
                <Icon name="chevron-small-right" style={{ color: "#000"}} type="Entypo" />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: 320,
        marginTop: 30,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    view1: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewName: {
        padding: 20,
    },
    viewSize: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    box: {
        width: 150,
        backgroundColor: '#FC561F',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    viewAddress: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    typePaymentSuccess: {
        color: '#90EE90',
        fontFamily: 'Kanit',
    },
    typePaymentWarning: {
        color: "#FFA500",
        fontFamily: 'Kanit',
    },
    textName1: {
        color: '#a9a9a9',
        fontFamily: 'Kanit',
    },
    textName2: {
        fontSize: 20,
        fontFamily: 'Kanit',
    },
    boxTitle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Kanit'
    },
    boxName: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Kanit',
        justifyContent: "center"
    },
    disQRcode: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: "#FFA500",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    textName3: {
        fontSize: 12,
        color: '#a9a9a9',
        fontFamily: 'Kanit',
    }

})

const mapStateToProps = (state) => {
    return {
        event: state.event,
        profile: state.profile,
        distanceEvent: state.distanceEvent,
        shirtphoto: state.shirtphoto,
        userprofile: state.userprofile,
        choiceSend: state.choiceSend,
        address: state.address,
        creditcard: state.creditcard,
        invoice: state.invoice,
        friendlist: state.friendlist
    }
}
export default connect(mapStateToProps)(DetailRegister);
