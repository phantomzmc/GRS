import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Body, Left, Right, IconNB } from "native-base";


class GetPleace extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.gotoPayment = this.gotoPayment.bind(this)
    }

    gotoPayment(){
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
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => this.gotoPayment()}>
                            <Text style={styles.textButton}>ถัดไป</Text>
                        </TouchableOpacity>
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
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Kanit',
    },
})



export default GetPleace;