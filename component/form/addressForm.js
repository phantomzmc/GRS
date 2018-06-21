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
            subdistric: "",
            distric: "",
            province: "",
            postcode: "",
            tel: "",
            note: ""
        }
    }
    componentDidMount = () => {
        this.setState({
            fullname: this.props.userprofile.userprofile.FirstName,
            lastname: this.props.userprofile.userprofile.LastName,
            email: this.props.userprofile.userprofile.Email,
            adress: this.props.userprofile.userprofile.Address,
            subdistric: this.props.userprofile.userprofile.SubDistric,
            distric: this.props.userprofile.userprofile.Distric,
            province: this.props.userprofile.userprofile.Province,
            postcode: this.props.userprofile.userprofile.PostCode,
            tel: this.props.userprofile.userprofile.Phone,
        })
    }
    putDataUser = (fullname, lastname, email, adress, subdistric, distric, province, postcode, tel, note) => {
        this.props.getAddress(fullname, lastname, email, adress, subdistric, distric, province, postcode, tel, note)
        console.log(this.state.fullname)
        console.log(this.state.email)

    }
    render() {
        let { fullname, lastname, email, adress, subdistric, distric, province, postcode, tel, note } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.headForm}>ชื่อ :</Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{fullname}</Label>
                        <Input
                            onChangeText={(fullname) => this.setState(fullname)}
                        />
                    </Item>
                </Form>
                <Text style={styles.headForm}>นามสกุล :</Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{lastname}</Label>
                        <Input
                            onChangeText={(lastname) => this.setState(lastname)}
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
                <Text style={styles.headForm}>ตำบล : </Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{subdistric}</Label>
                        <Input
                            onChangeText={(subdistric) => this.setState(subdistric)}
                        />
                    </Item>
                </Form>
                <Text style={styles.headForm}>อำเภอ : </Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{distric}</Label>
                        <Input
                            onChangeText={(distric) => this.setState(distric)}
                        />
                    </Item>
                </Form>
                <Text style={styles.headForm}>จังหวัด : </Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{province}</Label>
                        <Input
                            onChangeText={(province) => this.setState(province)}
                        />
                    </Item>
                </Form>
                <Text style={styles.headForm}>รหัสไปรษณีย์</Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{postcode}</Label>
                        <Input
                            onChangeText={(postcode) => this.setState(postcode)}
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
                <Text style={styles.headForm}>*** หมายเหตุ</Text>
                <Form>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}>{note}</Label>
                        <Input
                            onChangeText={(note) => this.setState(note)}
                        />
                    </Item>
                </Form>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.putDataUser(fullname, lastname, email, adress, subdistric, distric, province, postcode, tel, note)}>
                        <Text style={styles.textButton}>ถัดไป</Text>
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
