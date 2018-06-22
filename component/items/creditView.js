import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    AlertIOS
} from 'react-native';
import { Form, Item, Input, Label, Icon } from 'native-base'
import { connect } from 'react-redux'

import Omise from 'omise-react-native';
Omise.config('pkey_test_5ccy7tzubo9t8d0i71o', 'skey_test_5ccy7tzukutfwjoi8p3', '2015-11-17');

class CreditView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nameCredit: "",
            numberCredit: "1234 5678 1234 5678",
            expCredit: "00",
            cvcCredit: "XXX"
        }
        this.genTokenCredit = this.genTokenCredit.bind(this)
    }

    async genTokenCredit(nameCredit, numberCredit, expCredit, cvcCredit) {
        const data = await Omise.createToken({
            'card': {
                'name': nameCredit,
                'city': 'Bangkok',
                'postal_code': 10320,
                'number': numberCredit,
                'expiration_month': parseInt(expCredit),
                'expiration_year': 2018,
                'security_code': parseInt(cvcCredit)
            }
        });
        console.log(data.id);
    }
    // getCharges(tokenId){
    //     console.log(tokenId)
    //     Omise.charges.create({
    //         'amount': '100000', // 1,000 Baht
    //         'currency': 'thb',
    //         'capture': false,
    //         'card': tokenId
    //       }, function(err, resp) {
    //         console.log(resp)
    //         console.log(err)
    //         if (charge) {
    //           //Success
    //           console.log("success")
    //         } else {
    //           //Handle failure
    //           console.log(err)
    //         //   throw resp.failure_code;
    //         }
    //       });
    // }

    putDataCredit = (nameCredit, numberCredit, expCredit, cvcCredit) => {
        this.genTokenCredit(nameCredit, numberCredit, expCredit, cvcCredit)
        this.props.goAddress()
        this.props.setCredit({ nameCredit: nameCredit, numberCredit, expCredit, cvcCredit })
    }
    render() {
        let { nameCredit, numberCredit, expCredit, cvcCredit } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.creditCard}>
                    <View style={styles.cardNumber}>
                        <Text style={styles.textCardNumber}>card number</Text>
                        <Text style={styles.textNumber}>{numberCredit}</Text>
                    </View>
                    <View style={styles.expcvcView}>
                        <View style={styles.EXPView}>
                            <Text style={styles.textExpiration}>Expiration</Text>
                            <Text style={styles.monthyear}>{expCredit}</Text>
                        </View>
                        <View style={styles.CVCView}>
                            <Text style={styles.cvc}>CVC</Text>
                            <Text style={styles.passcvc}>{cvcCredit}</Text>
                        </View>
                        <View>
                            <Image
                                source={{
                                    uri: "http://www.pngall.com/wp-content/uploads/2016/07/Mastercard-PNG-Clipart.png"
                                }}
                                style={{
                                    width: 100,
                                    height: 50,
                                    paddingHorizontal: 30
                                }} />
                        </View>
                    </View>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.textForm}>กรอกข้อมูล</Text>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.headForm}>ชื่อบนบัตร</Text>
                    <Form>
                        <Item floatingLabel last>
                            <Label style={styles.textLabel}>Ex.xxxxxxxxxxxx</Label>
                            <Input
                                onChangeText={(nameCredit) => this.setState({ nameCredit })}
                            />
                        </Item>
                    </Form>
                    <Text style={styles.headForm}>หมายเลขบัตร</Text>
                    <Form>
                        <Item floatingLabel last>
                            <Label style={styles.textLabel}>Ex.1234 4567 8901 8764</Label>
                            <Input
                                onChangeText={(numberCredit) => this.setState({ numberCredit })}
                            />
                        </Item>
                    </Form>
                    <Text style={styles.headForm}>วันหมดอายุ</Text>
                    <Form>
                        <Item floatingLabel last>
                            <Label style={styles.textLabel}>Ex.02/61</Label>
                            <Input
                                onChangeText={(expCredit) => this.setState({ expCredit })}
                            />
                        </Item>
                    </Form>

                    <Text style={styles.headForm}>รหัสความปลอดภัย</Text>
                    <Form>
                        <Item floatingLabel last>
                            <Label style={styles.textLabel}>Ex.123</Label>
                            <Input
                                onChangeText={(cvcCredit) => this.setState({ cvcCredit })}
                            />
                        </Item>
                    </Form>
                </View>
                {/* <View style={styles.showDetail}>
                    <TouchableOpacity
                        style={styles.buttonContainer2}
                        onPress={() => this.props.ShowDetail()}>
                        <Text style={styles.textButton2}>เเสดงรายละเอียดค่าสมัคร</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={styles.submitContainer}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => this.genTokenCredit(nameCredit, numberCredit, expCredit, cvcCredit)}>
                        <Text style={styles.textButton}>ชำระค่าสมัคร : {this.props.TotalRegister} บาท</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        setCredit: (nameCredit) => {
            dispatch({ type: 'setCredit', payload: nameCredit })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    creditCard: {
        backgroundColor: '#4E2A82',
        margin: 20,
        borderRadius: 20,
        height: 150
    },
    cardNumber: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 30
    },
    textCardNumber: {
        color: '#fff',
        fontSize: 7
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
        fontSize: 7
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
    container2: {
        padding: 30
    },
    input: {
        height: 40,
        paddingHorizontal: 30,
        borderColor: '#FC561F',
        borderRadius: 10,
        borderWidth: 1.5,
        marginBottom: 20,
        fontFamily: "Kanit"
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30
    },
    buttonContainer: {
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
        fontFamily: "Kanit"
    },
    showDetail: {
        alignItems: 'center'
    },
    buttonContainer2: {
        height: 40,
        width: '80%',
        borderColor: '#FC561F',
        borderWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    textButton2: {
        fontWeight: '500',
        fontSize: 15,
        color: '#FC561F',
        fontFamily: "Kanit"
    },
    headForm: {
        fontFamily: 'kanit',
        fontSize: 16,
        paddingTop: 20
    },
    textLabel: {
        fontSize: 14,
        fontFamily: 'kanit'
    }
})

export default connect(null, mapDispatchtoProps)(CreditView);
