import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar, ScrollView } from 'react-native';
import { Container, Form, Item, Label, Input, Card, CardItem, Icon } from "native-base";
import { connect } from 'react-redux'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import axios from 'axios'
import req from '../../config/uri_req'
import api_key from '../../config/api_key'
import HeaderTeam from "../items/headerTeam";



class CouponForm extends Component {
    constructor(state) {
        super(state)
        this.state = {
            title: "คูปองส่วนลด",
            coupon: "",
            status: [],
            discountType: "",
            price: "",
            button: false,
            form: true,
        }
        this.checkPromoCode = this.checkPromoCode.bind(this)
        this.checkOutput = this.checkOutput.bind(this)
    }
    gotoAddress = () => {
        this.props.navigation.navigate('AddressLayout')
    }
    gotoBack = () => {
        this.props.navigation.navigate('ShirtPhotoPlus')
    }
    checkPromoCode() {
        if (this.state.coupon == "") {
            Alert.alert("กรุณากรอกรหัส เพื่อรับส่วนลดการสมัคร")
            this.setState({ form : false})
        }
        else if (this.state.coupon != "") {
            let uri = req[0].uspApplyPromoCode
            let apikey = api_key[0].api_key
            let data = ({
                params: [
                    { name: "EventID", value: this.props.event.event.EventID },
                    { name: "PromoCode", value: this.state.coupon },
                    { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID }
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
                    this.setState({ isLoading: false, status: response.data });
                    console.log(this.state.status)
                    this.checkOutput()
                }).catch((error) => {
                });
        }
    }
    changeStatus = () => {
        if (this.state.coupon != "")
            this.setState({ button2: true, button: false })
        else if (this.state.coupon == "") {
            this.setState({ button: true, button2: false })
        }
    }
    checkType() {
        let { status } = this.state
        if (status[0].PromoDiscountType == "1") {
            const totalRegister = (this.props.event.totalPrice - status[0].PromoDiscount)
            const value_dis = (this.props.event.totalPrice - totalRegister)
            this.props.setTotalRegister(totalRegister)
            this.props.setTotalPromo(totalRegister)
            this.props.setTotal(totalRegister)
            this.props.setDisPrice(value_dis)
            this.props.setCodePromo(this.state.coupon)
            this.savedataRegis2()

        }
        else if (status[0].PromoDiscountType == "2") {
            const totalRegister = ((this.props.event.totalPrice * 100) / (100 + status[0].PromoDiscount))
            const value_dis = (this.props.event.totalPrice - totalRegister)
            this.props.setTotalRegister(parseInt(value_dis))
            this.props.setTotalPromo(parseInt(value_dis))
            this.props.setTotal(parseInt(value_dis))
            this.props.setDisPrice(parseInt(totalRegister))
            this.props.setCodePromo(this.state.coupon)
            this.savedataRegis2()
        }
    }
    checkOutput() {
        let { status } = this.state
        if (status[0].PromoStatus == "1") {
            this.checkType()
            this.gotoAddress()

        }
        else if (status[0].PromoStatus == "0") {
            Alert.alert("ส่วนลดค่าสมัคร", "รหัสนี้ไม่ถูกต้องหรือถูกใช้ไปแล้ว", [
                {
                    text: "ลองอีกครั้ง",
                },
            ])
            this.setState({ form: false })
        }
        else if (status[0].PromoStatus == "0" && this.props.event.event.PromoCodeRequired == "0") {
            Alert.alert("ส่วนลดค่าสมัคร", "รหัสนี้ไม่ถูกต้องหรือถูกใช้ไปแล้ว", [
                {
                    text: "ลองอีกครั้ง",
                },
                {
                    text: "ข้ามการกรอกรหัส",
                    onPress: () => this.props.navigation.navigate('AddressLayout')
                },
            ])
            this.setState({ form: false })
        }
    }
    savedataRegis2() {
        let datadis = this.props.event.distanceEvent
        let userprofile = this.props.userprofile.userprofile
        let shirt = this.props.shirtphoto.size
        let promocode = this.props.promocode.promocode
        let data = {
            RunnerID: userprofile.RunnerID,
            CourseID: datadis.id,
            JerseySize: shirt,
            PhotoPlusService: datadis.statusPhotoPlus,
            PromoCode: promocode,
            CourseFee: datadis.price,
        }
        let dataFull = [{
            RunnerID: userprofile.RunnerID,
            CourseID: datadis.id,
            JerseySize: shirt,
            PhotoPlusService: datadis.statusPhotoPlus,
            PromoCode: promocode,
            CourseFee: datadis.price,
            firstname: userprofile.FirstName,
            lastname: userprofile.LastName,
            nameRegis: datadis.name
        }]
        console.log(data)
        this.props.addFriendInEvent(data)
        this.props.addFullFriendInEvent(dataFull)

    }
    render() {
        let url = 'https://register.shutterrunning2014.com/assets/img/theme/'
        return (
            <View>
                <HeaderTeam
                    title={this.state.title}
                    menu={true}
                    statusRegis={true}
                    goback={() => this.props.navigation.navigate("ShirtPhotoPlus")}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}
                    goContacts={()=> this.props.navigation.navigate('Contacts')}

                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <ScrollView>
                    <Container style={{ padding: 5 }}>
                        <Card>
                            <CardItem>
                                <View style={styles.container}>
                                    <Image source={{ uri: url + this.props.event.event.BackgroundImage }}
                                        style={styles.imgEvent} />
                                    <Text style={styles.textNameEvent}>
                                        {this.props.event.event.EventName}
                                    </Text>
                                    <Text style={styles.detailDiscountCoupon}>
                                        ส่วนลดค่าสมัครรายการวิ่ง {this.state.price} {this.state.discountType}
                                    </Text>
                                    <View style={{ width: '90%' }}>
                                        <Form>
                                            {this.state.form == true ?
                                                <Item floatingLabel last>
                                                    <Label style={styles.textLabel}>รหัสส่วนลด</Label>
                                                    <Input
                                                        onChangeText={(coupon) => this.setState({ coupon, button: false })}
                                                    />
                                                </Item>
                                                :
                                                <Item error>
                                                    <Input placeholder='รหัสส่วนลด' />
                                                </Item>
                                            }
                                        </Form>
                                    </View>
                                    {this.state.button == true ?
                                        <TouchableOpacity style={styles.submitButtonDefalt}>
                                            <Text style={styles.textButton}>ถัดไป</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={styles.submitButton}
                                            onPress={() => this.checkPromoCode()}>
                                            <Text style={styles.textButton}>ถัดไป</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </CardItem>
                        </Card>
                    </Container>
                    <KeyboardSpacer />

                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event,
        userprofile: state.userprofile,
        token: state.token,
        shirtphoto: state.shirtphoto,
        promocode: state.promocode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setDisPrice: (disPrice) => {
            dispatch({
                type: 'setDisPrice',
                payload: disPrice
            })
        },
        setTotalPromo: (totalPromo) => {
            dispatch({
                type: 'setTotalPromo',
                payload: totalPromo
            })
        },
        setTotal : (totalPrice) => {
            dispatch({
                type : 'setTotal',
                payload : totalPrice
            })
        },
        setTotalRegister: (totalRegister) => {
            dispatch({
                type: 'setTotalRegister',
                payload: totalRegister
            })
        },
        setCodePromo: (coupon) => {
            dispatch({
                type: 'setCodePromo',
                payload: coupon
            })
        },
        addFriendInEvent: (dataFriend) => {
            dispatch({
                type: 'addFriendInEvent',
                payload: dataFriend
            })
        },
        addFullFriendInEvent: (dataFriendFull) => {
            dispatch({
                type: 'addFullFriendInEvent',
                payload: dataFriendFull
            })
        }
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    imgEvent: {
        marginTop: 20,
        width: '80%',
        height: '30%',
        borderRadius: 10,
    },
    textNameEvent: {
        fontSize: 20,
        margin: 20,
        fontFamily: 'Kanit'
    },
    detailDiscountCoupon: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Kanit'
    },
    inputCoupon: {
        height: 50,
        width: '50%',
        borderColor: '#FC561F',
        borderWidth: 1.5,
        borderRadius: 20,
        margin: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
        fontFamily: 'Kanit'
    },
    submitButtonDefalt: {
        marginTop: 30,
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        opacity: 0.5

    },
    submitButton: {
        marginTop: 30,
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },

    textButton: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Kanit'
    },
    textLabel: {
        fontSize: 18,
        fontFamily: 'Kanit'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CouponForm)
