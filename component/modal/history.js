import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert, FlatList } from 'react-native';
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
        console.log(this.props.dataHistory)
        console.log(this.props.dataAll)
        setTimeout(() => {
            this.setState({ showInvoice: true })
        }, 500)
    }
    render() {
        return (
            this.state.showInvoice &&

            <Card>
                <ScrollView>
                    <FlatList
                        horizontal
                        style={{ width: '100%' }}
                        data={this.props.dataHistory}
                        renderItem={({ item, index }) =>
                            <View style={{ width: 350 }}>
                                {/* // <View>
                                //     <Icon name="chevron-small-left" style={{ color: "#000" }} type="Entypo" />
                                // </View> */}
                                <View>
                                    <CardItem style={styles.view1}>
                                        <View>
                                            {this.props.dataAll.PaymentStatus == 2 ?
                                                <Text style={styles.typePayment}> จ่ายเเล้ว </Text> :
                                                <Text style={styles.typePaymentWarning}>รอตรวจสอบการชำระเงิน</Text>
                                            }
                                        </View>
                                        <View>
                                            {this.props.dataAll.PaymentStatus == 2 ?
                                                <View style={{ alignItems: "center" }}>
                                                    <QRCode
                                                        value={item.RegisterID}
                                                        // value={this.props.registerID}
                                                        size={75}
                                                    />
                                                    <Text style={styles.textName3}>Confirm ID xxx{item.ConfirmNo}</Text>
                                                </View>
                                                :
                                                <View style={styles.disQRcode}>
                                                    <Text style={styles.textName3}>QR Code</Text>
                                                </View>
                                            }
                                        </View>
                                        <View>
                                            <View style={{ width: '50%', justifyContent: "flex-end" }}>
                                                <Text style={styles.subTextHead}>ชำระเงิน</Text>
                                                {this.props.dataAll.PaymentType == 1 ?
                                                    <Text style={styles.subTextHead}>บัตรเครดิต/เดรบิต</Text> :
                                                    <Text style={styles.subTextHead}>โอนเงินผ่านธนาคาร</Text>
                                                }
                                            </View>
                                            <Text style={styles.subTextHead}> Order : {this.props.dataAll.InvoiceID} </Text>
                                        </View>
                                    </CardItem>

                                    <CardItem style={styles.viewName}>
                                        <Body>
                                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={styles.textName3}>ชื่อ - นามสกุล</Text>
                                                    <Text style={styles.textName4}>{item.FullName}</Text>

                                                </View>
                                                <View style={{ width: '50%', alignItems: 'center' }}>
                                                    <Text style={styles.textName3}>Email</Text>
                                                    <Text style={styles.textName4}>{item.Email}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '75%' }}>
                                                <Text style={styles.textName1}>รายการวิ่ง</Text>
                                                <Text style={styles.textName2}>{this.props.dataAll.EventName}</Text>
                                            </View>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <View style={styles.viewSize}>
                                                <View style={styles.box}>
                                                    <Text style={styles.boxTitle}>ไซค์เสื้อ</Text>
                                                    <Text style={styles.boxName}>{item.JerseySize}</Text>

                                                </View>
                                                <View style={styles.box}>
                                                    <Text style={styles.boxName}>
                                                        {item.CourseName}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <View style={styles.viewAddress}>
                                            <View style={{ width: '50%' }}>
                                                <Text style={styles.textName3}>ที่อยู่</Text>
                                                <Text style={{ fontFamily: 'Kanit', fontSize: 14, marginRight: 10 }}>{this.props.dataAll.Address} {this.props.dataAll.SubDistric} {this.props.dataAll.Distric} {this.props.dataAll.Province} {this.props.dataAll.PostCode}</Text>
                                            </View>
                                            <View style={{ width: '50%', alignItems: 'center' }}>
                                                <Text style={styles.textName3}>วันที่</Text>
                                                <Text style={{ fontFamily: 'Kanit', fontSize: 14 }}>{item.InvoiceDatetime.substr(0, 11)}</Text>
                                            </View>
                                        </View>
                                    </CardItem>
                                </View>
                                {/* // <View>
                                //     <Icon name="chevron-small-right" style={{ color: "#000" }} type="Entypo" />
                                // </View> */}
                            </View>
                        } />

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
                                    <Text style={{ fontSize: 10, fontFamily: 'Kanit', textAlign: 'center', width: 150 }}>{this.props.dataAll.EventName} </Text>
                                    {/* <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'Kanit', textAlign: 'center', width: 150 }}>({item.Distance} - {item.JerseySize}) {item.PhotoPlusService === 1 ? "x 1 (Photo Plus)" : ""}</Text> */}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>{parseFloat(this.props.dataAll.TotalFee).toFixed(2)} ฿</Text>
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                <View>
                                    <View style={{ backgroundColor: '#3BB1FA', width: 50, height: 50, borderRadius: 25, }}>
                                        <Image source={require('../icon/clothes.png')}
                                            style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                    </View>
                                </View>
                                {this.props.dataAll.PlaceItemID == 1 ?
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'Kanit', textAlign: 'center' }}>รับเสื้อและเบอร์ที่ :  </Text>
                                        {/* <Text style={{ fontSize: 10, fontFamily: 'Kanit', paddingHorizontal: 50 }}></Text> */}
                                        <View style={{ marginHorizontal: 20 }}>
                                            <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'Kanit', textAlign: 'center', width: 150 }}>{this.props.dataAll.PlaceItemName}</Text>
                                        </View>
                                    </View>
                                    :
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'Kanit', textAlign: 'center' }}>บริหารจัดส่ง   </Text>
                                        {/* <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>วันที่ 27 มกราคม 2561</Text> */}
                                        <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'Kanit', textAlign: 'center', width: 150 }}>{this.props.dataAll.Address} {this.props.dataAll.SubDistric} {this.props.dataAll.Distric} {this.props.dataAll.Province} {this.props.dataAll.PostCode}</Text>
                                    </View>
                                }
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>{parseFloat(this.props.dataAll.TotalPost).toFixed(2)} ฿</Text>
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
                                    <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>ค่าธรรมเนียมการใช้บัตรเครดิต/เดบิต</Text>
                                    {/* <Text style={{ fontSize: 7, color: '#8B8B8B' }}>(5 Km. - S) x 1 (Photo Plus)</Text> */}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>{parseFloat(this.props.dataAll.TotalCreditFee).toFixed(2)} ฿</Text>
                                </View>
                            </View>
                            {this.props.dataAll.TotalDiscount == 0 ?
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
                                        <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>ส่วนลดค่าโปรโมชั่น {parseFloat(this.props.dataAll.TotalDiscount).toFixed(2)} บาท</Text>
                                        {/* <Text style={{ fontSize: 7, color: '#8B8B8B' }}>(5 Km. - S) x 1 (Photo Plus)</Text> */}
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>{parseFloat(this.props.dataAll.TotalDiscount).toFixed(2)} ฿</Text>
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
                                    <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>รวมทั้งสิ้น</Text>
                                    {/* <Text style={{ fontSize: 7, color: '#8B8B8B' }}>(5 Km. - S) x 1 (Photo Plus)</Text> */}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>{parseFloat(this.props.dataAll.TotalAll).toFixed(2)} ฿</Text>
                                </View>
                            </View>
                        </View>
                    </CardItem>
                    <CardItem style={{ justifyContent: "center" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Button rounded light onPress={this.props.toggleModal} style={{ marginHorizontal: 10 }}>
                                <Icon name="ios-remove-circle-outline" />
                                <Text style={{ fontFamily: "Kanit" }}>ปิด</Text>
                            </Button>
                        </View>
                    </CardItem>
                </ScrollView>
            </Card>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
    },
    view1: {
        // marginTop: 10,
        // padding: 10,
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
        // alignItems : "center",
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    typePayment: {
        color: '#90EE90',
        fontFamily: 'Kanit',
    },
    typePaymentWarning: {
        color: "#FFA500",
        fontFamily: 'Kanit',
        fontSize: 12,
        width: 80
    },
    textName1: {
        fontSize: 14,
        color: '#a9a9a9',
        fontFamily: 'Kanit',
    },
    textName2: {
        fontSize: 16,
        fontFamily: 'Kanit',
    },
    textName3: {
        fontSize: 12,
        color: '#a9a9a9',
        fontFamily: 'Kanit',
    },
    textName4: {
        fontSize: 14,
        fontFamily: 'Kanit',
    },
    boxTitle: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Kanit'
    },
    boxName: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Kanit',
        justifyContent: "center"
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
        fontSize: 8,
        color: '#A9A9A9',
        fontFamily: 'Kanit'
    },
    disQRcode: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        borderColor: "#FFA500",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }

})

export default ModalHistory;