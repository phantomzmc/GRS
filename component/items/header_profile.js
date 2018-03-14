import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, SegmentedControlIOS } from 'react-native';
import { connect } from 'react-redux'

class HeaderProfile extends Component {
    render() {
        return (
            <ImageBackground source={{ uri: "http://www.jcmagazine.com/wp-content/uploads/2016/07/deporte-carrera.jpg" }}
                style={styles.coverImg}>
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Image source={{ uri: "https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-0/p370x247/21557776_1425545897494291_6496115009920700297_n.jpg?oh=2b747f30ce806f5e37ae1d3cd9427cf4&oe=5B1C181C" }}
                            style={styles.imgAvatar} />
                    </View>
                    <View style={styles.detailProfile}>
                        <Text style={styles.nameProfile}>{this.props.event.event.name}</Text>
                        <Text style={styles.ageProfile}>{this.props.event.event.date}</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    coverImg: {
        width: '100%',
        height: '30%'
    },
    imgAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 2,
    },
    imgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailProfile: {
        backgroundColor: '#000',
        opacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center',

    },
    nameProfile: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'kanit',
        fontWeight: '900',
        marginBottom: 10,
        marginTop: 20,
    },
    ageProfile: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
        fontFamily: 'kanit',
        marginBottom: 20
    }
})
const mapStateToProps = (state) => {
    return {
        event : state.event
    }
}

export default connect(mapStateToProps)(HeaderProfile)