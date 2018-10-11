import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Card, CardItem, Body, Button, Text, Icon } from "native-base";
import CameraRollExtended from 'react-native-store-photos-album'
import { captureScreen } from "react-native-view-shot";
import dataInvoice from '../list/history/dataInvoice'
import QRCode from 'react-native-qrcode-svg';

class ModalHistory extends Component {
    state = {
        name: "Thunnathorn Yuvasin",
        event: "",
        size: "M",
        distanceTitle: "FunRun",
        distance: "5 km",
        address: "106/13 หนองหอย เมืองเชียงใหม่ เชียงใหม่ 50000",
        date: "22/05/2018",
        showInvoice: false
    }
    componentWillMount() {
        console.log(dataInvoice[0])
        setTimeout(() => {
            this.setState({ showInvoice: true })
        }, 500)
    }
    onSaveInvoice() {
        this.captureScreenFunction()
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
                    }
                ], { cancelable: false }),
                // error => console.error("Oops, Something Went Wrong", error)
            );

    }
    render() {
        return (
            <Card>
                {this.state.showInvoice &&
                    <ScrollView>
                        <CardItem style={styles.view1}>
                            <View>
                                {dataInvoice[0].PaymentStatus == 2 ?
                                    <Text style={styles.typePayment}> จ่ายเเล้ว </Text> :
                                    <Text style={styles.typePaymentWarning}>รอตรวจสอบการชำระเงิน</Text>
                                }
                            </View>
                            <View>
                                {dataInvoice[0].PaymentStatus == 2 ?
                                    <QRCode
                                        value={dataInvoice[0].RegisterID}
                                        size={75}
                                    />
                                    :
                                    <View style={styles.disQRcode}>
                                        <Text style={styles.textName3}>QR Code</Text>
                                    </View>
                                }
                            </View>
                            <View>
                                {/* <View style={{ flex : 0 ,justifyContent : "flex-end"}}>
                                    <Text style={styles.subTextHead}>ชำระเงิน</Text>
                                    {dataInvoice[0].PaymentType == 1 ?
                                        <Text style={styles.subTextHead}>บัตรเครดิต/เดรบิต</Text> :
                                        <Text style={styles.subTextHead}>โอนเงินผ่านธนาคาร</Text>
                                    }
                                </View> */}
                                <Text style={styles.subTextHead}> Order : {dataInvoice[0].InvoiceID} </Text>
                            </View>
                        </CardItem>
                        <CardItem style={styles.viewName}>
                            <Body>
                                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textName3}>Email</Text>
                                        <Text style={styles.textName4}>{dataInvoice[0].Email}</Text>
                                    </View>
                                    <View style={{ flex: 0, alignItems: 'center' }}>
                                        <Text style={styles.textName3}>โทรศัพท์</Text>
                                        <Text style={styles.textName4}>{dataInvoice[0].Phone}</Text>
                                    </View>
                                </View>
                                <Text style={styles.textName1}>รายการวิ่ง</Text>
                                <Text style={styles.textName2}>{dataInvoice[0].EventName}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <View style={styles.viewAddress}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.textName3}>ที่อยู่</Text>
                                    <Text style={{ fontFamily: 'kanit', fontSize: 14, marginRight: 10 }}>{dataInvoice[0].Address} {dataInvoice[0].SubDistric} {dataInvoice[0].Distric} {dataInvoice[0].Province} {dataInvoice[0].PostCode}</Text>
                                </View>
                                <View style={{ flex: 0, alignItems: 'center' }}>
                                    <Text style={styles.textName3}>วันที่</Text>
                                    <Text style={{ fontFamily: 'kanit', fontSize: 14 }}>{dataInvoice[0].InvoiceDatetime.substr(0, 11)}</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem style={{ justifyContent: "center" }}>
                            <View style={styles.container2}>
                                <View style={styles.detailRow}>
                                    <View>
                                        <View style={{ backgroundColor: 'red', width: 50, height: 50, borderRadius: 25, }}>
                                            <Image source={require('../icon/calendar.png')}
                                                style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'kanit', textAlign: 'center', width: 150 }}>{dataInvoice[0].EventName} </Text>
                                        {/* <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit', textAlign: 'center', width: 150 }}>({this.props.event.distanceEvent.distance} - {this.props.shirtphoto.size}) x 1 (Photo Plus)</Text> */}
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{parseFloat(dataInvoice[0].TotalFee).toFixed(2)} ฿</Text>
                                    </View>
                                </View>

                                <View style={styles.detailRow}>
                                    <View>
                                        <View style={{ backgroundColor: '#3BB1FA', width: 50, height: 50, borderRadius: 25, }}>
                                            <Image source={require('../icon/clothes.png')}
                                                style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                        </View>
                                    </View>
                                    {dataInvoice[0].PlaceItemID == 1 ?
                                        <View>
                                            <Text style={{ fontSize: 10, fontFamily: 'kanit', textAlign: 'center' }}>รับเสื้อและเบอร์ที่ :  </Text>
                                            {/* <Text style={{ fontSize: 10, fontFamily: 'kanit', paddingHorizontal: 50 }}></Text> */}
                                            <View style={{ marginHorizontal: 20 }}>
                                                <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit', textAlign: 'center', width: 150 }}>{parseFloat(dataInvoice[0].PlaceItemName).toFixed(2)} ฿</Text>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <Text style={{ fontSize: 10, fontFamily: 'kanit', textAlign: 'center' }}>บริหารจัดส่ง   </Text>
                                            {/* <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>วันที่ 27 มกราคม 2561</Text> */}
                                            <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit', textAlign: 'center', width: 150 }}>{dataInvoice[0].Address} {dataInvoice[0].SubDistric} {dataInvoice[0].Distric} {dataInvoice[0].Province} {dataInvoice[0].PostCode}</Text>
                                        </View>
                                    }
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{parseFloat(dataInvoice[0].TotalPost).toFixed(2)} ฿</Text>
                                    </View>
                                </View>
                                <View style={styles.detailRow}>
                                    <View>
                                        <View style={{ backgroundColor: '#FD9C00', width: 50, height: 50, borderRadius: 25, }}>
                                            <Image source={require('../icon/bank-cards.png')}
                                                style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>ค่าธรรมเนียมการใช้บัตรเครดิต/เดบิต</Text>
                                        {/* <Text style={{ fontSize: 7, color: '#8B8B8B' }}>(5 Km. - S) x 1 (Photo Plus)</Text> */}
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{parseFloat(dataInvoice[0].TotalCreditFee).toFixed(2)} ฿</Text>
                                    </View>
                                </View>
                                {dataInvoice[0].TotalDiscount == 0 ?
                                    <View></View>
                                    :
                                    <View style={styles.detailRow}>
                                        <View>
                                            <View style={{ backgroundColor: '#4CD964', width: 50, height: 50, borderRadius: 25, }}>
                                                <Image source={require('../icon/price.png')}
                                                    style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>ส่วนลดค่าโปรโมชั่น {parseFloat(dataInvoice[0].TotalDiscount).toFixed(2)} บาท</Text>
                                            {/* <Text style={{ fontSize: 7, color: '#8B8B8B' }}>(5 Km. - S) x 1 (Photo Plus)</Text> */}
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{parseFloat(dataInvoice[0].TotalDiscount).toFixed(2)} ฿</Text>
                                        </View>
                                    </View>
                                }


                                <View style={styles.detailRow}>
                                    <View>
                                        <View style={{ backgroundColor: '#FDD463', width: 50, height: 50, borderRadius: 25, }}>
                                            <Image source={require('../icon/bill.png')}
                                                style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>รวมทั้งสิ้น</Text>
                                        {/* <Text style={{ fontSize: 7, color: '#8B8B8B' }}>(5 Km. - S) x 1 (Photo Plus)</Text> */}
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{parseFloat(dataInvoice[0].TotalAll).toFixed(2)} ฿</Text>
                                    </View>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem style={{ justifyContent: "center" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Button rounded success onPress={this.onSaveInvoice.bind(this)} style={{ marginHorizontal: 10 }}>
                                    <Icon name="ios-add-circle-outline" />
                                    <Text style={{ fontFamily: "kanit" }}>บันทึก</Text>
                                </Button>
                                <Button rounded light onPress={this.props.toggleModal} style={{ marginHorizontal: 10 }}>
                                    <Icon name="ios-remove-circle-outline" />
                                    <Text style={{ fontFamily: "kanit" }}>ปิด</Text>
                                </Button>
                            </View>
                        </CardItem>
                    </ScrollView>
                }
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
    },
    view1: {
        marginTop: 10,
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
        backgroundColor: '#FC561F',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 40,
    },
    viewAddress: {
        // alignItems : "center",
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    typePayment: {
        color: '#90EE90',
        fontFamily: 'kanit',
    },
    typePaymentWarning: {
        color: "#FFA500",
        fontFamily: 'kanit',
        fontSize: 12,
        width: 80
    },
    textName1: {
        fontSize: 14,
        color: '#a9a9a9',
        fontFamily: 'kanit',
    },
    textName2: {
        fontSize: 16,
        fontFamily: 'kanit',
    },
    textName3: {
        fontSize: 12,
        color: '#a9a9a9',
        fontFamily: 'kanit',
    },
    textName4: {
        fontSize: 14,
        fontFamily: 'kanit',
    },
    boxTitle: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'kanit'
    },
    boxName: {
        fontSize: 25,
        color: '#fff',
        fontFamily: 'kanit'
    },
    detailRow: {
        height: 60,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container2: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    subTextHead: {
        fontSize: 10,
        color: '#A9A9A9',
        fontFamily: 'kanit'
    },
    disQRcode: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        borderColor: "#FFA500",
        borderWidth: 1,
        justifyContent : "center",
        alignItems : "center",
        flex: 1
    }

})

export default ModalHistory;