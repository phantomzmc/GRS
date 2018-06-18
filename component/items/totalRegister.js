import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';
import { connect } from 'react-redux'

class TotalRegister extends Component {
    state = {
        total: "",
        totalRegister : "",
        promotionStatus: false,
        creditPrice : ""
    }
    componentDidMount() {
        this.setState({
            total: this.props.event.totalPrice,
            totalRegister : this.props.event.totalRegister,
            priceCDO: this.props.choiceSend.choiceSend.priceCDO,
            creditPrice : this.props.creditcard.vat
        })
        this.checkPromoStatus()
    }
    checkPromoStatus = () => {
        console.log("checkPromoStatus")
        if (this.props.event.event.PromoCodeRequired == "0") {
            this.setState({
                promotionStatus: false
            })
        }
        else if (this.props.event.event.PromoCodeRequired == "1" || this.props.event.event.PromoCodeStatus == "1") {
            this.setState({
                promotionStatus: true
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.detailRow}>
                    <View>
                        <View style={{ backgroundColor: 'red', width: 50, height: 50, borderRadius: 25, }}>
                            <Image source={require('../icon/calendar.png')}
                                style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{this.props.event.event.EventName} </Text>
                        <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit' }}>({this.props.event.distanceEvent.distance} - {this.props.shirtphoto.size}) x 1 (Photo Plus)</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{this.state.total}.0 ฿</Text>
                    </View>
                </View>
                <View style={styles.detailRow}>
                    <View>
                        <View style={{ backgroundColor: '#3BB1FA', width: 50, height: 50, borderRadius: 25, }}>
                            <Image source={require('../icon/clothes.png')}
                                style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>รับเสื้อและเบอร์ที่ :  </Text>
                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>วันที่ 27 มกราคม 2561</Text>
                        <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit' }}>ใต้สะพานพระราม 8 (ฝั่งถนนอรุณอัมรินทร์ )</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{this.state.priceCDO}.0 ฿</Text>
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
                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{this.state.creditPrice}.0 ฿</Text>
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
                            <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>ส่วนลดค่าโปรโมชั่น 100.00 บาท</Text>
                            {/* <Text style={{ fontSize: 7, color: '#8B8B8B' }}>(5 Km. - S) x 1 (Photo Plus)</Text> */}
                        </View>
                        <View>
                            <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>-100.00 ฿</Text>
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
                        <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{this.state.totalRegister}.0 ฿</Text>
                    </View>
                </View>

            </View>
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
    }
})
const mapStateToProps = (state) => {
    return {
        event: state.event,
        distanceEvent: state.distanceEvent,
        shirtphoto: state.shirtphoto,
        choiceSend: state.choiceSend,
        address: state.address,
        creditcard : state.creditcard
    }
}

export default connect(mapStateToProps)(TotalRegister);
