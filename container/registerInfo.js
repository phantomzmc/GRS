import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import { Text, CardItem, Card, Form, Item, Label, Input, Content, Button, Body, Icon, Container } from "native-base";
import axios from 'axios'
import { connect } from "react-redux";
import HeaderTeam from '../component/items/headerTeam'
import ListRegisInfo from '../component/list/regisInfo/listRegisInfo'
import api_key from '../config/api_key'
import req from '../config/uri_req'

const datas = []

class RegisterInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleEvent: "EventName",
            eventid: "",
            term: "",
            islistinfo: false
        }
    }
    componentDidMount() {
        this.setState({
            titleEvent: this.props.event.event.EventName,
            eventid: this.props.event.event.EventID
        })
    }
    getRegisInfo = () => {
        let uri = req[0].uspGetRegisterInfo
        let apikey = api_key[0].api_key
        let data = ({
            params: [
                { name: "EventID", value: this.state.eventid },
                { name: "Keyword", value: this.state.term }
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, data: responseJson.data, islistinfo: true });
                console.log(this.state.data)
            }).catch((error) => {
                console.log(error)
            });
        return (this.state.data)
    }
    goSingleLogin = () => {
        this.props.navigation.navigate('SingleLogin')
    }
    render() {
        return (
            <Container>
                <HeaderTeam
                    goback={this.goSingleLogin.bind(this)}
                    title="ตรวจสอบรายชื่อ"
                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <ScrollView>
                    <View style={styles.container}>
                        <Card>
                            <CardItem>
                                <Body style={styles.bodyTitle}>
                                    <Text style={styles.titleEvent}>{this.state.titleEvent}</Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Content>
                                    <Form>
                                        <Item floatingLabel>
                                            <Label style={{ fontFamily: "kanit" }}>ชื่อของคุณ</Label>
                                            <Input
                                                style={{ fontFamily: "kanit" }}
                                                onChangeText={(term) => this.setState({ term })}
                                            />
                                        </Item>
                                    </Form>
                                    <Label style={styles.subDetail}> - พิมพ์ชื่อของคุณเพื่อดูรายละเอียดด้านล่าง</Label>
                                    {this.state.islistinfo &&
                                        <ListRegisInfo
                                            dataitems={this.state.data}
                                        />
                                    }
                                    <Button block success style={{ paddingVertical: 20 }} onPress={this.getRegisInfo.bind(this)}>
                                        <Icon name="md-search" type="Ionicons" />
                                        <Text style={{ fontFamily: "kanit" }}>ค้นหา</Text>
                                    </Button>
                                </Content>
                            </CardItem>
                        </Card>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        event: state.event,
        token: state.token
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    bodyTitle: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    titleEvent: {
        textAlign: "center",
        fontFamily: 'kanit',
        width: 250,
        fontSize: 20,
    },
    subDetail: {
        padding: 20,
        fontFamily: 'kanit',
        fontSize: 12
    }
})


export default connect(mapStateToProps)(RegisterInfo)