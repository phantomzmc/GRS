import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
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
            fullname: this.props.profile.profile.profile,
            email: this.props.profile.profile.email,
            adress: this.props.profile.profile.number,
            te: this.props.profile.profile.tel
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
                <TextInput
                    placeholder={this.props.profile.profile.profile}
                    onChangeText={(fullname) => this.setState(this.props.profile.profile.profile)}
                    style={styles.input}
                />
                <TextInput
                    placeholder={this.props.profile.profile.email}
                    style={styles.input}
                    onChangeText={(email) => this.setState(this.props.profile.profile.email)}
                />
                <TextInput
                    placeholder={this.props.profile.profile.number}
                    style={styles.input}
                    onChangeText={(adress) => this.setState(this.props.profile.address.address)}

                />
                <TextInput
                    placeholder={this.props.profile.profile.tel}
                    style={styles.input}
                    onChangeText={(tel) => this.setState(this.props.profile.profile.tel)}
                />
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.putDataUser(fullname, email, adress, tel)}>
                        <Text style={styles.textButton}>ชำระค่าสมัคร</Text>
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
        marginBottom: 30
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
    }
})

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps)(AddressForm);
