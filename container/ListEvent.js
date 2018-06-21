import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';
import { YellowBox } from 'react-native';
import { connect } from 'react-redux'

import List from '../component/list/listevent/listevent'

class ListEvent extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
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
    componentDidMount() {
        this.setUserID()
    }
    setUserID = () => {
        console.log(this.props.profile.profile.userid)
        this.setState({ profile: this.props.profile.profile.userid })
    }
    checkTeamRegis() {
        if (this.props.event.event == "1") {
            console.log("TeamLogin")
            this.props.navigation.navigate('Login')
        } else if (this.props.event.event == "0") {
            console.log("SingleLogin")
            this.props.navigation.navigate('SingleLogin')
        }
    }
    gotoRegister = () => {
        console.log("gotoRegister")
        this.checkTeamRegis()
    }
    gotoLogin = () => {
        this.props.navigation.navigate("SingleLogin")
    }
    checkUser = () => {
        if (this.state.profile == "") {
            console.log("checkLogin")
            this.gotoLogin()
        }
        else {
            this.props.navigation.navigate('ControlDistance')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <List CheckLogin={this.checkUser.bind(this)}
                    Profile={this.state.profile} />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        event: state.event
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default connect(mapStateToProps)(ListEvent);
