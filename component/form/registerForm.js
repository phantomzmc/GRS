import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, TextInput, StyleSheet, SegmentedControlIOS, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';


class FormRegister extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = (
            fullname = "",
            userid = "",
            gen = "",
            age = "",
            number = "",
            t = "",
            a = "",
            city = "",
            country = "",
            postNumber = "",
            tel = "",
            email = ""

        )
    }
    sendData = () => {
        this.props.goEvent()
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="ชื่อ - นามสกุล"
                    returnKeyType="next"
                    style={styles.textInput}
                    onChangeText={(fullname) => this.setState({ fullname })}
                />
                <TextInput
                    placeholder="รหัสบัตรประชาชน"
                    returnKeyType="next"
                    style={styles.textInput}
                    onChangeText={(userid) => this.setState({ userid })}
                />
                <View style={styles.conlorsegment}>
                    <SegmentedControlIOS
                        values={['ชาย', 'หญิง']}
                        tintColor="#FC561F" />
                </View>
                <TextInput
                    placeholder="อายุ"
                    returnKeyType="next"
                    style={styles.textInput}
                    onChangeText={(age) => this.setState({ age })}
                />
                <TextInput
                    placeholder="บ้านเลขที่"
                    returnKeyType="next"
                    style={styles.textInput}
                    onChangeText={(number) => this.setState({ number })}
                />
                <View style={styles.addressContainer}>
                    <TextInput
                        placeholder="ตำบล"
                        returnKeyType="next"
                        style={styles.textAddressInput}
                        onChangeText={(t) => this.setState({ t })}
                    />
                    <TextInput
                        placeholder="อำเภอ"
                        returnKeyType="next"
                        style={styles.textAddressInput}
                        onChangeText={(a) => this.setState({ a })}
                    />
                </View>
                <View style={styles.addressContainer}>
                    <TextInput
                        placeholder="จังหวัด"
                        returnKeyType="next"
                        style={styles.textAddressInput}
                        onChangeText={(city) => this.setState({ city })}
                    />
                    <TextInput
                        placeholder="ประเทศ"
                        returnKeyType="next"
                        style={styles.textAddressInput}
                        onChangeText={(country) => this.setState({ country })}
                    />
                </View>
                <TextInput
                    placeholder="รหัสไปรษณีย์"
                    returnKeyType="next"
                    style={styles.textInput}
                    onChangeText={(postNumber) => this.setState({ postNumber })}
                />
                <TextInput
                    placeholder="เบอร์โทรศัพท์"
                    returnKeyType="next"
                    style={styles.textInput}
                    onChangeText={(tel) => this.setState({ tel })}
                />
                <TextInput
                    placeholder="Email"
                    returnKeyType="next"
                    style={styles.textInput}
                    onChangeText={(email) => this.setState({ email })}
                />
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={this.sendData.bind(this)}>
                        <Text style={styles.textButton}>ยืนยัน</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff'
    },
    textInput: {
        borderColor: '#FC561F',
        borderRadius: 10,
        borderWidth: 1.5,
        paddingHorizontal: 20,
        height: 35,
        marginTop: 15,
    },
    conlorsegment: {
        marginTop: 10,
    },
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    textAddressInput: {
        width: '45%',
        borderColor: '#FC561F',
        borderRadius: 10,
        borderWidth: 1.5,
        paddingHorizontal: 20,
        height: 35,
        marginTop: 15,
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        height: 40,
        width: '100%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textButton: {
        fontWeight: '700',
        fontSize: 20,
        color: '#fff',

    }
})
export default FormRegister;