import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableOpacity,
    Alert,
    TextInput
} from 'react-native';
import {connect} from 'react-redux'

class SingleLogin extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
    }
    checkLogin() {
        if (this.state.username == this.props.profile.profile.userid) {
            this.gotoListEvent()
        } else {
            Alert.alert('เกิดข้อผิดพลาด', 'การเข้าสู่ระบบผิดพลาด', [
                {
                    text: 'Cancel'
                }, {
                    text: 'สมัครสมาชิก',
                    onPress: () => this.gotoRegister()
                }
            ], {cancelable: false})
        }
    }
    gotoListEvent = () => {
        console.log(this.state.username)
        this
            .props
            .navigation
            .navigate('EventList')
    }
    gotoRegister = () => {
        this
            .props
            .navigation
            .navigate('Register')
    }
    render() {
        return (
            <ImageBackground
                source={{
                uri: "http://register.shutterrunning2014.com/assets/img/theme/dongtanbg.jpg"
            }}
                style={{
                width: '100%',
                height: '100%',
                opacity: 1
            }}>
                <View style={styles.container}>
                    <Text style={styles.textTitle} onPress={this.gotoListEvent}>
                        ShutterRuning Service
                    </Text>
                </View>
                <View style={styles.formcontainer}>
                    <TextInput
                        placeholder="เลขบัตรประชาชน"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput}
                        onChangeText={(username) => this.setState({username})}
                        style={styles.input}/>
                    <View style={styles.loginContainer}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={this
                            .checkLogin
                            .bind(this)}>
                            <Text style={styles.textButton}>เข้าร่วมกิจกรรม</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={this
                        .gotoRegister
                        .bind(this)}>
                        <Text style={styles.regisButton}>
                            สมัครสมาชิก
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom : 20
    },
    textTitle: {
        fontSize: 34,
        color: '#fff',
        fontWeight: '700',
        fontFamily: 'kanit'
    },
    formcontainer: {
        flex: 2,
        padding: 20,
        borderRadius: 15
    },
    regisButton: {
        padding: 20,
        color: '#fff',
        alignSelf: 'center',
        fontFamily: 'kanit'

    },
    input: {
        fontFamily: 'kanit',
        height: 40,
        backgroundColor: '#fff',
        opacity: 0.8,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    loginContainer: {
        margin : 20,
        alignItems: 'center'
    },
    buttonContainer: {
        height: 40,
        width: '75%',
        backgroundColor: '#4CD946',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textButton: {
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        fontFamily: 'kanit'

    }
})

const mapStateToProps = (state) => {
    return {profile: state.profile}
}

export default connect(mapStateToProps)(SingleLogin)
