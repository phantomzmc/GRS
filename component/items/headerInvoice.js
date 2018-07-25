import React, { Component } from 'react';
import { StyleSheet, StatusBar } from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, View } from 'native-base';
class HeaderTeam extends Component {
    state = {
        iconBack: false
    }
    componentDidMount() {
        this.setState({ title: this.props.title })
    }
    onPressGoBack() {
        this.props.goback()
    }
    onSaveInvoice(){
        this.props.onSave()
    }
    render() {
        return (
            <View>
                <Header style={{ backgroundColor: "#FC561F" }}>
                    <Left>
                        <Button transparent onPress={this.onPressGoBack.bind(this)}>
                            <Icon name='arrow-back' style={{ color: "#fff" }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.title}>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.onSaveInvoice.bind(this)}>
                            <Text style={styles.title}>บันทึก</Text>
                        </Button>
                    </Right>
                </Header>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "kanit",
        color: "#fff",
        fontSize: 14
    }
})
export default HeaderTeam