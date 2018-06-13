import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Form, Item, Input, Label } from 'native-base'
import { connect } from 'react-redux'

class AddressForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: "",
            email: "",
            adress: "",
            tel: ""
        }
    }
    componentDidMount = () => {
        this.setState({
            fullname: this.props.userprofile.userprofile.FirstName + this.props.userprofile.userprofile.LastName,
            email: this.props.userprofile.userprofile.Email,
            adress: this.props.userprofile.userprofile.Address + " " + 
                    this.props.userprofile.userprofile.SubDistric + " " +
                    this.props.userprofile.userprofile.Distric + " " +
                    this.props.userprofile.userprofile.Province + " " +
                    this.props.userprofile.userprofile.PostCode ,
            tel: this.props.userprofile.userprofile.Phone
        })
    }
    putDataUser = (fullname, email, adress, tel) => {
        this.props.getAddress(fullname, email, adress, tel)
        console.log(this.state.fullname)
        console.log(this.state.email)

    }
    render() {
        let { fullname, email, adress, tel } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.headForm}>ชื่อ - นามสกุล</Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{fullname}</Label>
                        <Input
                            onChangeText={(fullname) => this.setState(fullname)}
                        />
                    </Item>
                </Form>
                <Text style={styles.headForm}>Email</Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{email}</Label>
                        <Input
                            onChangeText={(email) => this.setState(email)}
                        />
                    </Item>
                </Form>
                <Text style={styles.headForm}>ที่อยู่</Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{adress}</Label>
                        <Input
                            onChangeText={(adress) => this.setState(adress)}
                        />
                    </Item>
                </Form>
                <Text style={styles.headForm}>โทรศัพท์</Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{tel}</Label>
                        <Input
                            onChangeText={(tel) => this.setState(tel)}
                        />
                    </Item>
                </Form>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.putDataUser(fullname, email, adress, tel)}>
                        <Text style={styles.textButton}>ถัดไป</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
    input: {
        height: 40,
        paddingHorizontal: 30,
        borderColor: '#FC561F',
        borderRadius: 10,
        borderWidth: 1.5,
        marginBottom: 20,
        fontFamily: 'kanit',
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
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
        fontFamily: 'Kanit',
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

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        userprofile: state.userprofile
    }
}

export default connect(mapStateToProps)(AddressForm);
