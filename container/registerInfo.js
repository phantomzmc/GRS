import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image,Alert } from "react-native";
import { Text, CardItem, Card, Form, Item, Label, Input, Content, Button, Body, Icon, Container } from "native-base";
import axios from 'axios'
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
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
            islistinfo: false,
            search: ""
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
                { name: "Keyword", value: this.state.search }
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
                this.errorRegisInfo(this.state.data)
            }).catch((error) => {
                console.log(error)
            });
        return (this.state.data)
    }
    errorRegisInfo(data) {
        if (data == "") {
            Alert.alert("ค้นหาไม่พบ", "ผู้ใช้งานนี้ยังไม่ได้ทำการสมัครรายการวิ่งนี้", [
                {
                    text: "ค้นหาอีกครั้ง",
                    onPress: () => this.setState({ search: "",islistinfo : false })
                }
            ])
        }
        else if(data != ""){
            this.setState({ search: "",islistinfo : true })
        }
    }
    goEventList = () => {
        this.props.navigation.navigate('EventList')
    }
    render() {
        let url = 'https://register.shutterrunning2014.com/assets/img/theme/'

        return (
            <Container>
                <HeaderTeam
                    goback={this.goEventList.bind(this)}
                    title="ตรวจสอบรายชื่อ"
                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <Card style={{ borderRadius : 10}}>
                            <CardItem style={{ borderRadius : 10}}> 
                                <Body style={styles.bodyTitle}>
                                    <Image source={{ uri: url + this.props.event.event.BackgroundImage }} style={styles.imgEvent} />
                                    <Text style={styles.titleEvent}>{this.state.titleEvent}</Text>
                                </Body>
                            </CardItem>
                            <CardItem style={{ justifyContent: "center",borderRadius : 10 }}>
                                <View>
                                    <Form>
                                        <Item floatingLabel>
                                            <Label style={{ fontFamily: "Kanit" }}>ชื่อของคุณ</Label>
                                            <Input
                                                style={{ fontFamily: "Kanit" }}
                                                value={this.state.search}
                                                onChangeText={(term) => this.setState({ search: term })}
                                            />
                                        </Item>
                                    </Form>
                                    <Label style={styles.subDetail}> - พิมพ์ชื่อของคุณเพื่อดูรายละเอียดด้านล่าง</Label>
                                    {(this.state.search != "") || this.state.islistinfo &&
                                        <ListRegisInfo
                                            dataitems={this.state.data}
                                        />
                                    }
                                    <Button block success style={{ marginVertical: 20 }} onPress={this.getRegisInfo.bind(this)}>
                                        <Icon name="md-search" type="Ionicons" />
                                        <Text style={{ fontFamily: "Kanit" }}>ค้นหา</Text>
                                    </Button>
                                </View>
                            </CardItem>
                        </Card>
                    </View>
                </KeyboardAwareScrollView>
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
        fontFamily: 'Kanit',
        width: 250,
        fontSize: 20,
    },
    subDetail: {
        padding: 20,
        fontFamily: 'Kanit',
        fontSize: 12
    },
    imgEvent: {
        margin: 10,
        width: '100%',
        height: 100,

    },
})


export default connect(mapStateToProps)(RegisterInfo)