import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, SegmentedControlIOS } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'
import api_key from "../../config/api_key";
import req from '../../config/uri_req'


class HeaderProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullname: "",
            lastname: "",
            gen: "M",
            age: 21,
            eventname: "",
            user: []
        }
    }
    componentWillMount = () => {
        let uri = req[0].uspGetUserProfile
        let apikey = api_key[0].api_key
        let data = ({
            params: {
                value: this.props.username.username,
            }
        })
        axios.post(uri,data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((responseJson) => {
                this.setState({ isLoading: false, user: responseJson.data });
                console.log(this.state.user)
                this.props.setUserProfile(this.state.user[0])
                this.setData()
            }).catch((error) => {
                this.setState({
                    fullname: "",
                    lastname: "",
                    gen: "M",
                    age: 21,
                })
            });
    }
    setData(){
        this.setState({
            fullname : this.props.userprofile.userprofile.FirstName,
            lastname : this.props.userprofile.userprofile.LastName,
            gen : this.props.userprofile.userprofile.Gender,
            age : this.props.userprofile.userprofile.DateOfBirth
        })
    }
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
                        <Text style={styles.nameProfile}>{this.state.fullname} - {this.state.lastname} </Text>
                        <Text style={styles.ageProfile}>{this.state.gen} - {this.state.age}</Text>
                        <Text style={styles.eventTitle}>{this.state.eventname}</Text>
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
        height: 300
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
        fontSize: 14,
        fontWeight: '900',
        fontFamily: 'kanit',
        marginBottom: 10
    },
    eventTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
        fontFamily: 'kanit',
        marginBottom: 20
    }
})
const mapStateToProps = (state) => {
    return {
        event: state.event,
        profile: state.profile,
        username : state.username,
        userprofile : state.userprofile,
        token : state.token
    }
}

const mapDispatchToprops = (dispatch) => {
    return { 
        setUserProfile: (userprofile) => {
            dispatch({
                type: "setUserProfile",
                payload: userprofile
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToprops)(HeaderProfile)