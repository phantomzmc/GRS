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
    checkTeamRegis = () =>{
        if(this.props.event.event.GroupRegister == "1"){
            console.log("TeamLogin")
            this.props.navigation.navigate('Login')
        }else if(this.props.event.event.GroupRegister == "0"){
            console.log("SingleLogin")
            this.props.navigation.navigate('SingleLogin')
        }
    }
    gotoRegister = () => {
        console.log("gotoRegister")
        this.checkTeamRegis()
    }
    checkUser = () => {
        if (this.state.profile == "") {
            console.log("checkLogin")
            Alert.alert('กรุณาเข้าสู่ระบบ', 'ผู้ใช้งานจะต้องทำการเข้าสู่ระบบก่อน', [{
                text: 'Cancel'
            }, {
                text: 'เข้าสู่ระบบ',
                onPress: () => this.checkTeamRegis(),
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
        profile: state.profile,
        event : state.event
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default connect(mapStateToProps)(ListEvent);
