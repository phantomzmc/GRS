import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Text, CardItem, Card, Form, Item, Label, Input, Content, Button, Body, Icon } from "native-base";
import axios from 'axios'
import { connect } from "react-redux";
import HeaderTeam from '../component/items/headerTeam'

class RegisterInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleEvent: "EventName"
        }
    }
    componentDidMount() {
        this.setState({
            titleEvent: this.props.event.event.EventName
        })
    }
    goSingleLogin = () => {
        this.props.navigation.navigate('SingleLogin')
    }
    render() {
        return (
            <View>
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
                                            />
                                        </Item>
                                    </Form>
                                    <Label style={styles.subDetail}> - พิมพ์ชื่อของคุณเพื่อดูรายละเอียดด้านล่าง</Label>
                                </Content>
                            </CardItem>
                            <CardItem>
                                <Body style={{ paddingVertical: 20 }}>
                                    <Button block success>
                                        <Icon name="md-search" type="Ionicons" />
                                        <Text style={{ fontFamily: "kanit" }}>ค้นหา</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        event: state.event
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