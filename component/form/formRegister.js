import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, SegmentedControlIOS,TouchableOpacity } from 'react-native';

export default class FormRegister extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="ชื่อ - นามสกุล"
                    returnKeyType="next"
                    style={styles.textInput} />
                <TextInput
                    placeholder="รหัสบัตรประชาชน"
                    returnKeyType="next"
                    style={styles.textInput} />
                <View style={styles.conlorsegment}>
                    <SegmentedControlIOS
                        values={['ชาย', 'หญิง']}
                        tintColor="#FC561F" />
                </View>
                <TextInput
                    placeholder="อายุ"
                    returnKeyType="next"
                    style={styles.textInput} />
                <TextInput
                    placeholder="บ้านเลขที่"
                    returnKeyType="next"
                    style={styles.textInput} />
                <View style={styles.addressContainer}>
                    <TextInput
                        placeholder="ตำบล"
                        returnKeyType="next"
                        style={styles.textAddressInput} />
                    <TextInput
                        placeholder="อำเภอ"
                        returnKeyType="next"
                        style={styles.textAddressInput} />
                </View>
                <View style={styles.addressContainer}>
                    <TextInput
                        placeholder="จังหวัด"
                        returnKeyType="next"
                        style={styles.textAddressInput} />
                    <TextInput
                        placeholder="ประเทศ"
                        returnKeyType="next"
                        style={styles.textAddressInput} />
                </View>
                <TextInput
                    placeholder="รหัสไปรษณีย์"
                    returnKeyType="next"
                    style={styles.textInput} />
                <TextInput
                    placeholder="เบอร์โทรศัพท์"
                    returnKeyType="next"
                    style={styles.textInput} />
                <TextInput
                    placeholder="Email"
                    returnKeyType="next"
                    style={styles.textInput} />
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}>
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
        justifyContent: 'center',

    },
    textAddressInput: {
        width: '50%',
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
