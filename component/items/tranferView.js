import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { Card, Icon } from "native-base";
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';
import Omise from '../../config/omise-config';
const ibit_pkey = 'pkey_test_5b7nut5dlzyudruopsl'
const ibit_skey = 'skey_test_5b7nwwrac7mvps7l3mp'
const test_pkey = 'pkey_test_5ctl7h1r2lazhxd1ovk'
const test_skey = 'skey_test_5ctl7j62s80mqyznvd3'
Omise.config(test_pkey, test_skey, '2015-11-17');

class TranferView extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            bank: "",
            branch: "",
            ACNumber: "",
            username: "",
            ImageSource: null,
            statusButton: true,
            statusButtonOnPress : false
        }
    }
    async getCustomer() {
        let userprofile = this.props.userprofile.userprofile
        const data = await Omise.createCustomer({
            'description': userprofile.FirstName + " " + userprofile.LastName,
            'email': userprofile.email
        });
        console.log(data)
        this.props.setCharge({ id: data.id })
        this.getCharges(data.id)
    }
    async getCharges(customer) {
        const totalRegis = Number(this.props.event.totalRegister * 100)
        this.setState({
            amount: String(totalRegis)
        })
        const data = await Omise.createChargeTranfer({
            'amount': this.state.amount,
            'fail_fast': true,
            

        });
        console.log(data)
        this.goTotalPayment()
        this.props.setCharge(data)
    }
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    ImageSource: source,
                    statusButton : false,
                    statusButtonOnPress: true
                });
                console.log(this.state.ImageSource)
            }
        });
    }
    goTotalPayment() {
        this.props.goAddress()
    }

    render() {
        let { bank, branch, ACNumber, username } = this.state
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.creditCard}>
                        <View style={styles.cardNumber}>
                            <View
                                style={{
                                    flexDirection: 'column'
                                }}>
                                <Text style={styles.textCardNumber}>{this.props.detailPayment}</Text>
                                {/* <Text style={styles.textNumber}>{branch}</Text> */}
                            </View>

                        </View>
                        <View style={styles.expcvcView}>
                            <View style={styles.EXPView}>
                                {/* <Text style={styles.textExpiration}>บัญชีออมทรัพย์เลขที่ {this.props.detailPayment}</Text>
                            <Text style={styles.monthyear}>{username}</Text> */}
                                <Image
                                    source={{
                                        uri: "http://www.satapornbooks.co.th/SPBecommerce/images/logo-bank03.png"
                                    }}
                                    style={{
                                        width: 50,
                                        height: 50
                                    }} />
                            </View>
                            <View></View>
                        </View>
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textForm}>หลักฐานการชำระเงิน</Text>
                    </View>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                            <Card style={styles.ImageContainer}>
                                {this.state.ImageSource === null ?
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name="camera" type="Entypo" style={{ fontSize: 20, color: "#FC561F", marginRight: 10 }} />
                                        <Text style={{ fontFamily: "kanit", color: "#FC561F" }}>เลือกรูปภาพ</Text>
                                    </View> :
                                    <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                                }
                            </Card>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.containerForm}>
                        <Text style={styles.textForm}>คำรับรองของผู้สมัคร</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Card>
                            <Text style={styles.textDetail}>   ข้าพเจ้าขอรับรองว่าข้อความข้างต้นเป็นความจริงและได้ทำการฝึกซ้อม ทั้งมีสุขภาพสมบูรณ์พร้อมที่จะมีการแข่งขันในประเภทที่สมัครข้างต้นด้วยความเต็มใจ และจะไม่เรียกร้องค่าเสียหายใดๆหากเกิดอันตรายหรือบาดเจ็บทั้งก่อนและหลังการแข่งขันอีกทั้งก่อนและหลังการแข่งขัน อีกทั้งยินดีที่จะแสดงหลักฐานพิสุจน์ตัวเองต่อคณะผู้จัดการแข่งขัน
                                    และถือว่าการบันทึกภาพยนต์ดังกล่าวเป็นลิขสิทธิ์ของคณะกรรมการจัดการแข่งขันครั้งนี้
                        </Text>
                            <Text style={styles.textDetail}>
                                การยืนยันการสมัครผ่านระบบออนไลน์นี้ถือว่าท่านได้ให้การยอมรับข้อความข้างต้นแทนการเซ็นชื่อ
                        </Text>
                        </Card>
                    </View>
                    <View style={styles.containerForm}>
                        <Text style={styles.textForm}>สงวนสิทธิ์การเปลี่ยนแปลง</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Card>
                            <Text style={styles.textDetail}>*** หลังจากยืนยันการชำระค่าสมัครแล้ว ไม่สามารถยกเลิกหรือเปลี่ยนแปลงข้อมูลการสมัครใดๆในทุกกรณี ***
                        </Text>

                        </Card>
                    </View>
                    <View style={styles.submitContainer}>
                        {this.state.statusButton &&
                            <TouchableHighlight style={[styles.buttonContainer]}>
                                <Text style={styles.textButton}>ถัดไป</Text>
                            </TouchableHighlight>

                        }
                        {this.state.statusButtonOnPress &&
                            <TouchableOpacity style={[styles.buttonContainerOnPress]}
                                onPress={this.getCustomer.bind(this)}>
                                <Text style={styles.textButton}>ถัดไป</Text>
                            </TouchableOpacity>

                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = state => {
    return {
        event: state.event,
        userprofile: state.userprofile
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCharge: (charges) => {
            dispatch({
                type: 'setCharge',
                payload: charges
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    creditCard: {
        backgroundColor: '#00C43C',
        margin: 20,
        borderRadius: 20,
        height: 150
    },
    cardNumber: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    textCardNumber: {
        color: '#fff',
        fontSize: 12
    },
    textNumber: {
        color: '#fff',
        fontSize: 15
    },
    expcvcView: {
        flex: 1,
        paddingLeft: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textExpiration: {
        color: '#fff',
        fontSize: 12
    },
    monthyear: {
        color: '#fff',
        fontSize: 15
    },
    CVCView: {
        paddingLeft: 30
    },
    cvc: {
        color: '#fff',
        fontSize: 7
    },
    passcvc: {
        color: '#fff',
        fontSize: 15
    },
    submitContainer: {
        alignItems: 'center',
        marginBottom: 80,
        marginTop: 20
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        opacity : 0.7
    },
    buttonContainerOnPress: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Kanit'
    },
    ImageContainer: {
        width: 250,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    containerForm: {
        flex: 1
    },
    textForm: {
        backgroundColor: '#EFF4F1',
        fontSize: 22,
        fontWeight: '300',
        padding: 20,
        fontFamily: "Kanit"
    },
    textDetail: {
        fontFamily: 'kanit',
        padding: 15
    }


})

export default connect(mapStateToProps, mapDispatchToProps)(TranferView);
