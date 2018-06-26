import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Container } from 'native-base'
import { connect } from 'react-redux'
import { captureScreen } from "react-native-view-shot";

import TotalRegister from '../component/items/totalRegister'
import DetailRegister from '../component/items/detailRegister'
import HeaderTeam from '../component/items/headerTeam'

class TotalLayout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "สรุปการสมัครทั้งหมด",
            name: "hello test",
            event: {
                name: "",
                date: ""
            },
            imageURI : ""
        }
    }
    componentDidMount() {
        console.log(this.state.name)
        this.setState({
            event: {
                name: this.props.event.name,
                date: this.props.event.date
            }
        })

    }
    onClick = () => {
        console.log(this.state.event)
        console.log(this.props.event.name)
        console.log(this.props.event.date)
        Alert.alert('เรียบร้อย', 'ทำการรายการเสร็จสิ้น', [
            {
                text: 'ตกลง',
                onPress: () => this.gotoListEvent()
            }
        ], { cancelable: false })
        // this.props.addEvent(this.state.name)
    }
    gotoListEvent = () => {
        this.props.navigation.navigate('EventList')
    }
    gotoBack = () => {
        this.props.navigation.navigate('ButtonChangePayment')
    }

    captureScreenFunction = () => {
        captureScreen({
            format: "jpg",
            quality: 0.8
        })
            .then(
                uri => this.setState({ imageURI: uri }),
                Alert.alert('บันทึกสำเร็จ', 'ทำการบันทึกรายการเสร็จสิ้น', [
                    {
                        text: 'ตกลง',
                        onPress: () => this.gotoListEvent()
                    }
                ], { cancelable: false }),
                error => console.error("Oops, Something Went Wrong", error)
            );

    }

    render() {
        return (
            <Container>
                <HeaderTeam
                    title={this.state.title}
                    goback={this.gotoBack.bind(this)} />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <ScrollView>
                    <View style={styles.container}>
                        <DetailRegister />
                        <TotalRegister />
                        <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={this.captureScreenFunction.bind(this)}>
                                <Text style={styles.textButton}>บันทึก</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={this.onClick.bind(this)}>
                                <Text style={styles.textButton}>ปิด</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFF4F1',
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 30

    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'kanit'
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
    },

})

const mapStateToProps = (state) => {
    return {
        event: state.event,
        shirtphoto: state.shirtphoto,
        choiceSend: state.choiceSend,
        address: state.address
    }
}

export default connect(mapStateToProps)(TotalLayout);
