import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text, Thumbnail, H1 } from "native-base";


class ErrorModalAddFriend extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.modalContainer}>
                <Icon name="check-circle" type="FontAwesome" style={{ color: "#558B2F", paddingHorizontal: 10 }} />
                <View style={{ paddingVertical: 10, alignItems: "center" }}>
                    <H1 style={{ color: "#558B2F", fontFamily: "kanit" }}>เพิ่มเพื่อนสำเร็จ</H1>
                    <Text style={{ fontSize: 16, fontFamily: "kanit" }}>ระบบได้ทำการเพิ่มเพื่อนให้คุณแล้ว</Text>
                </View>
                {/* <View style={{ flexDirection: "row", justifyContent: "center", paddingVertical: 10 }}>
                    <Button iconLeft rounded light onPress={this.props.toggleModal} style={{ marginHorizontal: 10, justifyContent: "center" }}>
                        <Icon name="ios-close-outline" />
                        <Text style={{ fontFamily: "kanit" }}>ปิด</Text>
                    </Button>

                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 30,
        borderRadius: 10

    },
    textButton: {
        color: '#fff',
        fontFamily: 'kanit'
    }
})
export default ErrorModalAddFriend;