import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-picker';


class TranferView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bank: "",
            branch: "",
            ACNumber: "",
            username: "",
            ImageSource: null,

        }
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
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({

                    ImageSource: source

                });
            }
        });
    }


    render() {
        let { bank, branch, ACNumber, username } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.creditCard}>
                    <View style={styles.cardNumber}>
                        <View
                            style={{
                                flexDirection: 'column'
                            }}>
                            <Text style={styles.textCardNumber}>{this.props.detailPayment}</Text>
                            {/* <Text style={styles.textNumber}>{branch}</Text> */}
                        </View>

                    </View>
                    <View style={styles.expcvcView}>
                        <View style={styles.EXPView}>
                            {/* <Text style={styles.textExpiration}>บัญชีออมทรัพย์เลขที่ {this.props.detailPayment}</Text>
                            <Text style={styles.monthyear}>{username}</Text> */}
                            <Image
                                source={{
                                    uri: "http://www.satapornbooks.co.th/SPBecommerce/images/logo-bank03.png"
                                }}
                                style={{
                                    width: 50,
                                    height: 50
                                }} />
                        </View>
                        <View></View>
                    </View>
                </View>
                <View style={styles.submitContainer}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={styles.ImageContainer}>
                            {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                                <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                            }

                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    creditCard: {
        backgroundColor: '#00C43C',
        margin: 20,
        borderRadius: 20,
        height: 150
    },
    cardNumber: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    textCardNumber: {
        color: '#fff',
        fontSize: 12
    },
    textNumber: {
        color: '#fff',
        fontSize: 15
    },
    expcvcView: {
        flex: 1,
        paddingLeft: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textExpiration: {
        color: '#fff',
        fontSize: 12
    },
    monthyear: {
        color: '#fff',
        fontSize: 15
    },
    CVCView: {
        paddingLeft: 30
    },
    cvc: {
        color: '#fff',
        fontSize: 7
    },
    passcvc: {
        color: '#fff',
        fontSize: 15
    },
    submitContainer: {
        alignItems: 'center',
        marginBottom: 100
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    textButton: {
        fontWeight: '500',
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Kanit'
    },
    ImageContainer: {
        borderRadius: 10,
        width: 250,
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 1 ,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',
        
      },
  

})

export default TranferView;
