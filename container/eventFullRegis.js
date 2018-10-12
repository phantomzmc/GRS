import React, { Component } from 'react'
import { View, StyleSheet, ScrollView,Linking } from "react-native";
import { Container, Card, CardItem, Body, Button, Text, Icon } from 'native-base';
import HeaderTeam from '../component/items/headerTeam'


class EventFullReguster extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "ลงทะเบียนเต็มจำนวน"
        }
    }
    goRegisterInfo = () => {
        this.props.navigation.navigate('RegisterInfo')
    }
    render() {
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
                                        <Icon name="alert" type="Ionicons" style={styles.icon1} />
                                        <Text style={styles.head1}>รายการนี้มีผู้สมัครเต็มจำนวนแล้ว</Text>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <Text style={styles.head2}>  ผู้ใช้งานสามารถสมัครรายการอื่นหรือตรวจสอบรายชื่อได้ที่นี่</Text>
                                </CardItem>
                                <View style={styles.contaiBnt}>
                                    <Button rounded bordered success  onPress={() => Linking.openURL('http://shutterrunning2014.com/')}>
                                        <Text style={styles.head2}> รายการวิ่งอื่น </Text>
                                    </Button>
                                    <Button rounded bordered warning onPress={() => this.goRegisterInfo()}>
                                        <Text style={styles.head2}> ตรวจสอบรายชื่อ </Text>
                                    </Button>
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
        fontFamily: "Kanit",
        fontSize: 20
    },
    head2: {
        fontFamily: "Kanit",

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