import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Linking } from "react-native";
import { Container, Card, CardItem, Body, Button, Text, Icon, Content } from 'native-base';
import call from 'react-native-phone-call'
import HeaderTeam from '../component/items/headerTeam'

class EventFullReguster extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "ติดต่อสอบถาม"
        }
    }
    goRegisterInfo = () => {
        this.props.navigation.navigate('RegisterInfo')
    }
    render() {
        const args = {
            number: '+6621112201', // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
        }
        return (
            <Container>
                <HeaderTeam
                    title={this.state.title}
                    menu={true}
                    goback={() => this.props.navigation.navigate('EventList')}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}

                />
                <ScrollView>
                    <View style={styles.viewcard}>
                        <Card style={{ borderRadius: 10 }}>
                            <View style={styles.viewcard}>

                                <CardItem>
                                    <View style={styles.contaiText}>
                                        {/* <Icon name="alert" type="Ionicons" style={styles.icon1} /> */}
                                        <Text style={styles.head1}>© 2018 Shutter Running Services</Text>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <View style={styles.contaiText}>
                                        <Text style={styles.head2}>7 Market Today krungthepkreetra</Text>
                                        <Text style={styles.head2}>7 Huamark Bangkapi</Text>
                                        <Text style={styles.head2}>Bangkok, Thailand 10240</Text>
                                    </View>
                                </CardItem>
                                <View style={styles.contaiBnt}>
                                    <Button iconLeft rounded bordered success onPress={() => call(args).catch(console.error)}>
                                        <Icon name="ios-call" type="Ionicons" />
                                        <Text style={styles.head2}> โทร </Text>
                                    </Button>
                                    <Button iconLeft rounded bordered warning onPress={() => Linking.openURL('http://shutterrunning2014.com/')}>
                                        <Icon name="web" type="MaterialCommunityIcons" />
                                        <Text style={styles.head2}> เว็บไซค์ </Text>
                                    </Button >
                                </View>
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    viewcard: {
        padding: 10
    },
    icon1: {
        marginVertical: 10,
        fontSize: 40,
        color: "red"
    },
    head1: {
        marginVertical: 10,
        fontFamily: "kanit",
        fontSize: 20
    },
    head2: {
        fontFamily: "kanit",
    },
    contaiText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contaiBnt: {
        marginVertical: 20,

        flexDirection: "row",
        justifyContent: "space-around"
    }
})

export default EventFullReguster