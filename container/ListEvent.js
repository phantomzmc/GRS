import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    AppRegistry,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'

import List from '../component/list/listevent/listevent'

class ListEvent extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    static navigationOptions = {
        title: 'รายการวิ่ง',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: "Kanit",
            fontWeight: '500'
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            event: {
                name: "",
                date: "",
                tranferBank: ""
            },
            profile: ""
        }
    }
    componentDidMount(){
        console.log(this.props.profile.profile.userid)
        this.setState({ profile : this.props.profile.profile.userid})
        console.log("test" + this.state.profile)
    }

    gotoRegister = () => {
        console.log("gotoRegister")
        this
            .props
            .navigation
            .navigate('Register')
    }
    checkUser = () => {
        if (this.state.profile == "") {
            console.log("checkLogin")
            Alert.alert('เกิดข้อผิดพลาด', 'การเข้าสู่ระบบผิดพลาด', [{
                text: 'Cancel'
            }, {
                text: 'สมัครสมาชิก',
                onPress: () => this.gotoRegister(),
            }], { cancelable: false })
        }
        else{
            this.props.navigation.navigate('RegisterDistance')        
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <List CheckLogin={this.checkUser.bind(this)}
                        Profile={this.state.profile}/>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default connect(mapStateToProps)(ListEvent);
