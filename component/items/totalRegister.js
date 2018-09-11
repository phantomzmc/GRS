import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'native-base'
import { connect } from 'react-redux'
import ListTotalRegis from '../list/listTotal/listTotalRegis'

class TotalRegister extends Component {
    state = {
        total: "",
        totalRegister: "",
        promotionStatus: false,
        creditPrice: "",
        detailPleace1: false,
        detailPleace2: false,
        singleRegis: false,
        teamRegis: false,
        detailRegis: true
    }
    componentDidMount() {
        this.setState({
            total: this.props.event.totalPrice,
            totalRegister: this.props.event.totalRegister,
            priceCDO: this.props.choiceSend.choiceSend.priceCDO,
            creditPrice: this.props.creditcard.vat,
            pleace: this.props.choiceSend.choiceSend.detail
        })
        this.checkPromoStatus()
        this.checkPleaceItem()
        this.checkTeamRegister()
    }
    checkPromoStatus = () => {
        console.log("checkPromoStatus")
        if (this.props.promocode.promocode == "") {
            this.setState({
                promotionStatus: false
            })
        }
        else if (this.props.event.event.PromoCodeRequired == "1" && this.props.event.event.PromoCodeStatus == "1") {
            this.setState({
                promotionStatus: true
            })
        }
        else if (this.props.promocode.promocode != "") {
            this.setState({
                promotionStatus: true
            })
        }
    }
    checkPleaceItem = () => {
        if (this.props.choiceSend.choiceSend.placeItemID == "1") {
            this.setState({ detailPleace1: !this.state.detailPleace1 })
        }
        else if (this.props.choiceSend.choiceSend.placeItemID == "0") {
            this.setState({ detailPleace2: !this.state.detailPleace2 })
        }
    }
    checkTeamRegister = () => {
        let count = this.props.friendlist.friendEvent
        if (count.length > 1) {
            this.setState({ teamRegis: true })
        }
        else {
            this.setState({ singleRegis: true })
        }
    }
    showDetail = () => {
        this.setState({ detailRegis: !this.state.detailRegis })
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {this.state.singleRegis &&
                        <View style={styles.detailRow}>
                            <View>
                                <View style={{ backgroundColor: 'red', width: 50, height: 50, borderRadius: 25, }}>
                                    <Image source={require('../icon/calendar.png')}
                                        style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontSize: 10, fontFamily: 'kanit', textAlign: 'center', width: 150 }}>{this.props.event.event.EventName} </Text>
                                <Text style={styles.textSubDetail}>({this.props.event.distanceEvent.distance} - {this.props.shirtphoto.size}) </Text>
                                {this.props.friendlist.friendEvent.PhotoPlusService == 1 ?
                                    <Text style={styles.textSubDetail}>x 1 (Photo Plus)</Text> :
                                    <Text></Text>
                                }
                            </View>
                            <View>
                                <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{parseFloat(this.props.event.totalEvent).toFixed(2)} ฿</Text>
                            </View>
                        </View>
                    }
                    {this.state.teamRegis &&
                        <View>
                            <View style={styles.detailRow}>
                                <View>
                                    <View style={{ backgroundColor: 'green', width: 50, height: 50, borderRadius: 25, }}>
                                        <Image source={require('../icon/group.png')}
                                            style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit', textAlign: 'center', width: 150 }}>{this.props.event.event.EventName} </Text>
                                    <TouchableOpacity onPress={() => this.setState({ detailRegis: !this.state.detailRegis })}>
                                        <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit', textAlign: 'center' }}>รายละเอียด : แสดงรายชื่อ </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{parseFloat(this.state.total).toFixed(2)} ฿</Text>
                                </View>
                            </View>
                            {this.state.detailRegis &&
                                <ListTotalRegis />
                            }
                        </View>
                    }
                    <View style={styles.detailRow}>
                        <View>
                            <View style={{ backgroundColor: '#3BB1FA', width: 50, height: 50, borderRadius: 25, }}>
                                <Image source={require('../icon/clothes.png')}
                                    style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                            </View>
                        </View>
                        {this.state.detailPleace1 &&
                            <View>
                                <Text style={{ fontSize: 10, fontFamily: 'kanit', textAlign: 'center' }}>รับเสื้อและเบอร์ที่ :  </Text>
                                {/* <Text style={{ fontSize: 10, fontFamily: 'kanit', paddingHorizontal: 50 }}></Text> */}
                                <View style={{ marginHorizontal: 20 }}>
                                    <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit', textAlign: 'center', width: 150 }}>{this.state.pleace}</Text>
                                </View>
                            </View>
                        }
                        {this.state.detailPleace2 &&
                            <View>
                                <Text style={{ fontSize: 10, fontFamily: 'kanit', textAlign: 'center' }}>บริหารจัดส่ง   </Text>
                                {/* <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>วันที่ 27 มกราคม 2561</Text> */}
                                <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit', textAlign: 'center', width: 150 }}>{this.state.pleace}</Text>
                            </View>
                        }
                        <View>
                            <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{parseFloat(this.state.priceCDO).toFixed(2)} ฿</Text>
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
                            <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{parseFloat(this.state.creditPrice).toFixed(2)} ฿</Text>
                        </View>
                    </View>

                    {this.state.promotionStatus &&
                        <View style={styles.detailRow}>
                            <View>
                                <View style={{ backgroundColor: '#4CD964', width: 50, height: 50, borderRadius: 25, }}>
                                    <Image source={require('../icon/price.png')}
                                        style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>ส่วนลดค่าโปรโมชั่น {parseFloat(this.props.promocode.disPrice).toFixed(2)} บาท</Text>
                                {/* <Text style={{ fontSize: 7, color: '#8B8B8B' }}>(5 Km. - S) x 1 (Photo Plus)</Text> */}
                            </View>
                            <View>
                                <Text style={{ fontSize: 10, fontFamily: 'kanit' }}> -{parseFloat(this.props.promocode.disPrice).toFixed(2)} ฿</Text>
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
                            <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{parseFloat(this.state.totalRegister).toFixed(2)} ฿</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 30,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    detailRow: {
        height: 80,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textSubDetail: {
        fontSize: 7,
        color: '#8B8B8B',
        fontFamily: 'kanit',
        textAlign: 'center',
        width: 150
    }

})
const mapStateToProps = (state) => {
    return {
        event: state.event,
        distanceEvent: state.distanceEvent,
        shirtphoto: state.shirtphoto,
        choiceSend: state.choiceSend,
        address: state.address,
        creditcard: state.creditcard,
        friendlist: state.friendlist,
        promocode: state.promocode
    }
}

export default connect(mapStateToProps)(TotalRegister);
