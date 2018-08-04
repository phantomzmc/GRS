import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Container } from "native-base";
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import axios from 'axios'
import api_key from "../../config/api_key";
import req from '../../config/uri_req'


class HeaderRegister extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullname: "ชื่อ",
            lastname: "นามสกุล",
            gen: "เพศ",
            age: "อายุ",
            eventname: "",
            user: [],
            ImageSource: "",
            imgBackground: ""
        }
    }
    componentDidMount() {
        {
            this.props.userprofile.userprofile.PicProfile && this.props.userprofile.userprofile.BackgroundProfile == "" ?
                this.setState({ 
                    ImageSource: "", 
                    imgBackground: "" 
                }) :
                this.setState({ 
                    ImageSource: this.props.userprofile.userprofile.PicProfile, 
                    imgBackground: this.props.userprofile.userprofile.BackgroundProfile 
                })
        }
        
        console.log(this.props.userprofile.datapic)
        let uri = req[0].uspGetUserProfile
        let apikey = api_key[0].api_key
        let data = ({
            params: {
                value: this.props.username.username,
            }
        })
        axios.post(uri, data, {
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
                    fullname: "ชื่อ",
                    lastname: "นามสกุล",
                    gen: "เพศ",
                    age: "อายุ",
                })
            });


    }
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    statusButton: true
                });
                console.log(this.state.ImageSource)
                console.log(response)
                this.props.setPictureProfile(response)
                this.upimageToServe(response)
            }
        });
    }
    selectPhotoTapped2() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    statusButton: true
                });
                console.log(this.state.ImageSource)
                console.log(response)
                // this.props.setPictureProfile(response)
                this.upimageToServe2(response)
            }
        });
    }

    upimageToServe(response) {
        var photo = {
            uri: response.uri,
            type: 'image/jpeg',
            name: response.fileName,
            size: response.fileSize,
        };
        console.log(photo)
        var form = new FormData();
        form.append("imageLink", photo);

        let uri = req[1].url_imgprofile
        let data = form
        axios.post(uri, form, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Cache-Control': 'no-cache'
            },
            responseType: 'json'
        })
            .then((responseJson) => {
                this.setState({ imagesProfile: responseJson.data.files[0], ImageSource: responseJson.data.files[0] });
                console.log(responseJson)
                console.log(this.state.imagesProfile)
                console.log(this.state.ImageSource)
                this.props.setImageProfile(this.state.imagesProfile)

            }).catch((error) => {
                // console.error(error)
            });
    }
    upimageToServe2(response) {
        var photo = {
            uri: response.uri,
            type: 'image/jpeg',
            name: response.fileName,
            size: response.fileSize,
        };
        console.log(photo)
        var form = new FormData();
        form.append("imageLink", photo);

        let uri = req[1].url_imgprofile
        let data = form
        axios.post(uri, form, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Cache-Control': 'no-cache'
            },
            responseType: 'json'
        })
            .then((responseJson) => {
                this.setState({ imgBackground: responseJson.data.files[0] });
                console.log(responseJson)
                this.props.setImageBackground(this.state.imgBackground)

            }).catch((error) => {
                // console.error(error)
            });
    }

    setData() {
        this.setState({
            fullname: this.props.userprofile.userprofile.FirstName,
            lastname: this.props.userprofile.userprofile.LastName,
            gen: this.props.userprofile.userprofile.Gender,
            age: this.props.userprofile.userprofile.DateOfBirth
        })
    }
    render() {
        return (
            <View>
                {this.state.imgBackground == "" ?
                    <ImageBackground source={{ uri: "http://www.jcmagazine.com/wp-content/uploads/2016/07/deporte-carrera.jpg" }} style={styles.coverImg} >
                        <View style={styles.container}>
                            <View style={{ padding: 10, alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={this.selectPhotoTapped2.bind(this)}>
                                    <Icon active name="ios-camera" type="Ionicons" size={1} style={{ color: "#fff" }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={styles.container}>
                                <View style={styles.imgContainer}>
                                    {this.state.ImageSource == "" ?
                                        <View style={styles.imgAvatar} >
                                            <Icon active name="user-circle-o" type="FontAwesome" size={10} />
                                            <Text style={{ fontFamily: "kanit", fontSize: 12, paddingTop: 10 }}>เพิ่มรูปภาพ</Text>
                                        </View> :
                                        <Image style={styles.imgAvatar} source={{ uri: this.state.ImageSource }} />
                                    }
                                </View>
                            </TouchableOpacity>
                            <View style={styles.detailProfile}>
                                <Text style={styles.nameProfile}>{this.state.fullname} - {this.state.lastname} </Text>
                                <Text style={styles.ageProfile}>{this.state.gen} - {this.state.age}</Text>
                                <Text style={styles.eventTitle}>{this.state.eventname}</Text>
                            </View>
                        </View>
                    </ImageBackground> :
                    <ImageBackground source={{ uri: this.state.imgBackground }} style={styles.coverImg} >
                        <View style={styles.container}>
                            <View style={{ padding: 10, alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={this.selectPhotoTapped2.bind(this)}>
                                    <Icon active name="ios-camera" type="Ionicons" size={1} style={{ color: "#fff" }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={styles.container}>
                                <View style={styles.imgContainer}>
                                    {this.state.ImageSource == "" ?
                                        <View style={styles.imgAvatar} >
                                            <Icon active name="user-circle-o" type="FontAwesome" size={10} />
                                            <Text style={{ fontFamily: "kanit", fontSize: 12, paddingTop: 10 }}>เพิ่มรูปภาพ</Text>
                                        </View> :
                                        <Image style={styles.imgAvatar} source={{ uri: this.state.ImageSource }} />
                                    }
                                </View>
                            </TouchableOpacity>
                            <View style={styles.detailProfile}>
                                <Text style={styles.nameProfile}>{this.state.fullname} - {this.state.lastname} </Text>
                                <Text style={styles.ageProfile}>{this.state.gen} - {this.state.age}</Text>
                                <Text style={styles.eventTitle}>{this.state.eventname}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                }
            </View>
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
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
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
        username: state.username,
        userprofile: state.userprofile,
        token: state.token
    }
}

const mapDispatchToprops = (dispatch) => {
    return {
        setUserProfile: (userprofile) => {
            dispatch({
                type: "setUserProfile",
                payload: userprofile
            })
        },
        setPictureProfile: (picprofile) => {
            dispatch({
                type: "setPictureProfile",
                payload: picprofile
            })
        },
        setImageProfile: (imgProfile) => {
            dispatch({
                type: "setImageProfile",
                payload: imgProfile
            })
        },
        setImageBackground: (imgBackground) => {
            dispatch({
                type: "setImageBackground",
                payload: imgBackground
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(HeaderRegister)