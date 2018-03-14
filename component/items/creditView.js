import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, AlertIOS } from 'react-native';
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation';

class CreditView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nameCredit: "",
            numberCredit: "1234 5678 1234 5678",
            expCredit: "00/0000",
            cvcCredit: "XXX"
        }
    }
    putDataCredit = (nameCredit, numberCredit, expCredit, cvcCredit) => {
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
                            <Image source={{ uri: "http://www.pngall.com/wp-content/uploads/2016/07/Mastercard-PNG-Clipart.png" }}
                                style={{ width: 100, height: 50, paddingHorizontal: 30 }} />
                        </View>
                    </View>
                </View>
                <View style={styles.containerForm}>
                    <Text style={styles.textForm}>กรอกข้อมูล</Text>
                </View>
                <View style={styles.container2}>
                    <TextInput
                        placeholder="ชื่อบนบัตร"
                        onChangeText={(nameCredit) => this.setState({ nameCredit })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="หมายเลขบัตร"
                        onChangeText={(numberCredit) => this.setState({ numberCredit })}
                        style={styles.input}
                    />
                    <View style={styles.container3}>
                        <TextInput
                            placeholder="วันหมดอายุ"
                            onChangeText={(expCredit) => this.setState({ expCredit })}
                            style={styles.input}

                        />
                        <TextInput
                            placeholder="รหัสความปลอดภัย"
                            onChangeText={(cvcCredit) => this.setState({ cvcCredit })}
                            style={styles.input}

                        />
                    </View>
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.putDataCredit(nameCredit, numberCredit, expCredit, cvcCredit)}>
                        <Text style={styles.textButton}>ชำระค่าสมัคร : {this.props.TotalPrice}  บาท</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        setCredit: (nameCredit) => {
            dispatch({
                type: 'setCredit',
                payload: nameCredit
            })
        },
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        paddingLeft: 30,
    },
    textCardNumber: {
        color: '#fff',
        fontSize: 7,
    },
    textNumber: {
        color: '#fff',
        fontSize: 15,
    },
    expcvcView: {
        flex: 1,
        paddingLeft: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textExpiration: {
        color: '#fff',
        fontSize: 7,
    },
    monthyear: {
        color: '#fff',
        fontSize: 15,
    },
    CVCView: {
        paddingLeft: 30,
    },
    cvc: {
        color: '#fff',
        fontSize: 7
    },
    passcvc: {
        color: '#fff',
        fontSize: 15,
    },
    container2: {
        padding: 30,
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
        justifyContent: 'space-between',
    },
    containerForm: {
        flex: 1,
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
        marginBottom: 30,
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: "Kanit"

    }

})

export default connect(null, mapDispatchtoProps)(CreditView);
