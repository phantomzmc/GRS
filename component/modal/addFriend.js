import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text, Thumbnail } from "native-base";

class ModalAddFriend extends Component {
    state = {
        newitem: {
            name: "Thunnathorn Yuvasin",
            age: 22,
            gen: "ชาย",
            favorites: 1,
            imgAvatar: "https://nuuneoi.com/blog/940/cover.jpg"
        }
    }
    onAddFriend = () => {
        this.props.getAddFriend(this.state.newitem)
        console.log(this.state.newitem)
    }
    render() {
        let { newitem } = this.state
        return (
            <View style={styles.modalContainer}>
                <Thumbnail source={{ uri: "https://nuuneoi.com/blog/940/cover.jpg" }} />
                <View style={{ paddingVertical: 10, alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontFamily: "kanit" }}>{newitem.name}</Text>
                    <Text style={{ fontSize: 16, fontFamily: "kanit" }}>{newitem.gen} - {newitem.age}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
                    <Button iconLeft rounded light onPress={this.props.toggleModal} style={{ marginHorizontal: 10, justifyContent: "center" }}>
                        <Icon name="ios-close-outline" />
                        <Text style={{ fontFamily: "kanit" }}>ปิด</Text>
                    </Button>
                    <Button iconLeft rounded success onPress={this.onAddFriend.bind(this)} onPressOut={this.props.toggleModal} style={{ marginHorizontal: 10, justifyContent: "center" }}>
                        <Icon name="ios-add-outline" style={{ color: "#fff" }} />
                        <Text style={styles.textButton}>เพิ่มเพื่อน</Text>
                    </Button>
                </View>
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

export default ModalAddFriend;