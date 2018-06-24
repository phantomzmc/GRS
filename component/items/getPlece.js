import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import CheckBox from 'react-native-checkbox-heaven';
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Body, Left, Right, IconNB } from "native-base";


class GetPleace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            statusButton: true,
            statusButton2: false
        }
        this.gotoPayment = this.gotoPayment.bind(this)
    }
    componentDidMount(){
        this.props.funSumPleace()
    }
    handleOnChange() {
        this.setState({ 
            checked: !this.state.checked,
            statusButton : !this.state.statusButton,
            statusButton2 : !this.state.statusButton2
        })
    }
    gotoPayment() {
        this.props.goPayment()
    }
    render() {
        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text style={styles.textCard}>สถานที่</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text style={styles.textCard}>

                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <Text style={styles.textCard}>เวลา</Text>
                        </CardItem>
                    </Card>
                    <View style={styles.checkSubmit}>
                        <CheckBox
                            label='กดเพื่อยืนยันการรับเอง'
                            labelStyle={styles.labelStyle}
                            iconSize={30}
                            iconName='iosCircleFill'
                            checked={this.state.checked}
                            checkedColor='#008080'
                            uncheckedColor='#1f1f1f'
                            onChange={this.handleOnChange.bind(this)}
                        />
                    </View>
                    <View style={styles.submitContainer}>
                        {this.state.statusButton &&
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Text style={styles.textButton}>ถัดไป</Text>
                            </TouchableOpacity>
                        }
                        {this.state.statusButton2 &&
                            <TouchableOpacity style={styles.buttonContainerOnPress}
                                onPress={() => this.gotoPayment()}>
                                <Text style={styles.textButton}>ถัดไป</Text>
                            </TouchableOpacity>
                        }

                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textCard: {
        fontFamily: 'kanit'
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
        opacity: 0.5
    },
    buttonContainerOnPress: {
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
    labelStyle: {
        padding: 20,
        fontFamily: "kanit",
        fontSize: 16
    },
    checkSubmit: {
        paddingVertical: 20,
        justifyContent: "center",
        alignItems: "center"
    }
})



export default GetPleace;