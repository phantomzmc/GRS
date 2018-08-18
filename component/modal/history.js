import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Card, CardItem, Body, Button, Text, Icon } from "native-base";

class ModalHistory extends Component {
    state = {
        name: "Thunnathorn Yuvasin",
        event: "",
        size: "M",
        distanceTitle: "FunRun",
        distance: "5 km",
        address: "106/13 หนองหอย เมืองเชียงใหม่ เชียงใหม่ 50000",
        date: "22/05/2018",
        dataInvoice: this.props.dataHistory
    }
    componentDidMount() {
        console.log(this.props.dataHistory)
        this.setState({ dataInvoice: this.props.dataHistory })
        console.log(this.state.dataInvoice)
    }
    render() {
        const { dataInvoice } = this.state
        return (
            <Card>
                <ScrollView>
                    <CardItem style={styles.view1}>
                        <View>
                            <Text style={styles.typePayment}> จ่ายเเล้ว </Text>
                        </View>
                        <View>
                            <Image source={{ uri: "https://www.qrstuff.com/images/sample.png" }}
                                style={{ width: 100, height: 100 }} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 10, color: '#A9A9A9', fontFamily: 'kanit' }}> Order : {dataInvoice.InvoiceID} </Text>
                            <Text style={{ fontSize: 10, color: '#A9A9A9', fontFamily: 'kanit', width: 50 }}></Text>
                        </View>
                    </CardItem>
                    <CardItem style={styles.viewName}>
                        <Body>
                            <Text style={styles.textName1}>ชื่อ - นามสกุล</Text>
                            <Text style={styles.textName2}>{this.state.name}</Text>
                            <Text style={styles.textName1}>รายการวิ่ง</Text>
                            <Text style={styles.textName2}>{dataInvoice.EventName}</Text>
                        </Body>
                    </CardItem>
                    {/* <CardItem style={styles.viewSize}>
                    <View style={styles.box}>
                        <Text style={styles.boxTitle}>size</Text>
                        <Text style={styles.boxName}>{this.state.size}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.boxTitle}>{this.state.distanceTitle}</Text>
                        <Text style={styles.boxName}>{this.state.distance}</Text>
                    </View>
                </CardItem> */}
                    <CardItem style={styles.viewAddress}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.textName1}>Address</Text>
                            <Text style={{ fontFamily: 'kanit' }}>{dataInvoice.Address} {dataInvoice.SubDistric} {dataInvoice.Distric} {dataInvoice.Province} {dataInvoice.PostCode}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={styles.textName1}>วันที่</Text>
                            <Text style={{ fontFamily: 'kanit' }}>{this.state.date}</Text>
                        </View>
                    </CardItem>
                    <CardItem>
                        <View style={styles.container2}>
                            <View style={styles.detailRow}>
                                <View>
                                    <View style={{ backgroundColor: 'red', width: 50, height: 50, borderRadius: 25, }}>
                                        <Image source={require('../icon/calendar.png')}
                                            style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit', textAlign: 'center', width: 150 }}>{dataInvoice.EventName} </Text>
                                    {/* <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit', textAlign: 'center', width: 150 }}>({this.props.event.distanceEvent.distance} - {this.props.shirtphoto.size}) x 1 (Photo Plus)</Text> */}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{dataInvoice.TotalFee} ฿</Text>
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                <View>
                                    <View style={{ backgroundColor: '#3BB1FA', width: 50, height: 50, borderRadius: 25, }}>
                                        <Image source={require('../icon/clothes.png')}
                                            style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                    </View>
                                </View>
                                {dataInvoice.PlaceItemID == 1 ?
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'kanit', textAlign: 'center' }}>รับเสื้อและเบอร์ที่ :  </Text>
                                        {/* <Text style={{ fontSize: 10, fontFamily: 'kanit', paddingHorizontal: 50 }}></Text> */}
                                        <View style={{ marginHorizontal: 20 }}>
                                            <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit', textAlign: 'center', width: 150 }}>{dataInvoice.PlaceItemName}</Text>
                                        </View>
                                    </View>
                                    :
                                    <View>
                                        <Text style={{ fontSize: 10, fontFamily: 'kanit', textAlign: 'center' }}>บริหารจัดส่ง   </Text>
                                        {/* <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>วันที่ 27 มกราคม 2561</Text> */}
                                        <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit', textAlign: 'center', width: 150 }}>{dataInvoice.PlaceItemName}</Text>
                                    </View>
                                }
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{dataInvoice.TotalPost} ฿</Text>
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
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{dataInvoice.TotalCreditFee} ฿</Text>
                                </View>
                            </View>

                            <View style={styles.detailRow}>
                                <View>
                                    <View style={{ backgroundColor: '#4CD964', width: 50, height: 50, borderRadius: 25, }}>
                                        <Image source={require('../icon/price.png')}
                                            style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>ส่วนลดค่าโปรโมชั่น 1000 บาท</Text>
                                    {/* <Text style={{ fontSize: 7, color: '#8B8B8B' }}>(5 Km. - S) x 1 (Photo Plus)</Text> */}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{dataInvoice.TotalDiscount}0 ฿</Text>
                                </View>
                            </View>

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
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{dataInvoice.TotalAll} ฿</Text>
                                </View>
                            </View>
                        </View>
                    </CardItem>
                    <CardItem style={{ justifyContent: "center" }}>
                        <View style={{ alignItems: "center" }}>
                            <Button rounded light onPress={this.props.toggleModal} >
                                <Icon name="ios-remove-circle-outline" />
                                <Text style={{ fontFamily: "kanit" }}>ปิด</Text>
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
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    typePayment: {
        color: '#90EE90',
        fontFamily: 'kanit',
    },
    textName1: {
        color: '#a9a9a9',
        fontFamily: 'kanit',
    },
    textName2: {
        fontSize: 20,
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
        height: 80,
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

})

export default ModalHistory;