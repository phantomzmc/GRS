import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';

class CreditView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardnumber: "1234 5678 1234 5678",
            datemonthYear: "Month / Year",
            CVC : "XXX"
        }
    }

    render() {
        let { cardnumber, datemonthYear,CVC } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.creditCard}>
                    <View style={styles.cardNumber}>
                        <Text style={styles.textCardNumber}>card number</Text>
                        <Text style={styles.textNumber}>{cardnumber}</Text>
                    </View>
                    <View style={styles.expcvcView}>
                        <View style={styles.EXPView}>
                            <Text style={styles.textExpiration}>Expiration</Text>
                            <Text style={styles.monthyear}>{datemonthYear}</Text>
                        </View>
                        <View style={styles.CVCView}>
                            <Text style={styles.cvc}>CVC</Text>
                            <Text style={styles.passcvc}>{CVC}</Text>
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
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="หมายเลขบัตร"
                        onChangeText={(cardnumber) => this.setState({ cardnumber })}
                        style={styles.input}
                    />
                    <View style={styles.container3}>
                        <TextInput
                            placeholder="วันหมดอายุ"
                            onChangeText={(datemonthYear) => this.setState({ datemonthYear })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="รหัสความปลอดภัย"
                            onChangeText={(CVC) => this.setState({ CVC })}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>
        );
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

})

export default CreditView;
