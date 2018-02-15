import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class EventListFriend extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textTile}>รายชื่อเพื่อน</Text>
                <View style={styles.imgContainer}>
                    <Image source={{ uri: "https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-0/p370x247/21557776_1425545897494291_6496115009920700297_n.jpg?oh=2b747f30ce806f5e37ae1d3cd9427cf4&oe=5B1C181C" }}
                        style={styles.imgAvatar} />
                    <Image source={{ uri: "https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-0/p370x247/21557776_1425545897494291_6496115009920700297_n.jpg?oh=2b747f30ce806f5e37ae1d3cd9427cf4&oe=5B1C181C" }}
                        style={styles.imgAvatar} />
                    <Image source={{ uri: "https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-0/p370x247/21557776_1425545897494291_6496115009920700297_n.jpg?oh=2b747f30ce806f5e37ae1d3cd9427cf4&oe=5B1C181C" }}
                        style={styles.imgAvatar} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    textTile: {
        fontSize: 26,
    },
    imgContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    imgAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    }
})
export default EventListFriend;
