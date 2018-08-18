import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { Text, Container } from "native-base";
import HistoryList from '../component/list/history/historylist'
import HeaderTeam from '../component/items/headerTeam'
import { connect } from "react-redux";
import axios from 'axios'
import req from '../config/uri_req'
import api_key from '../config/api_key'

var uri = req[0].uspGetInvoiceLists
var apikey = api_key[0].api_key

class HistoryContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "ประวัติการวิ่ง",
            statusData: true
        }
    }

    componentDidMount() {
        this.getHistory()
    }
    getHistory() {
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "PageNo", value: "1" },
                { name: "RowPerPage", value: "10" },
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token,
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, dataSource: response.data });
                console.log(this.state.dataSource)
                this.checkOutput(response.data)
            }).catch((error) => {
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                console.error(error);
            });
        return this.state.dataSource
    }
    checkOutput(data) {
        if (data == "") {
            this.setState({ statusData: false })
            console.log(false)
        }
        else if (data != "") {
            this.setState({ statusData: true })
            console.log(true)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <HeaderTeam
                    title={this.state.title}
                    menu={true}
                    goback={() => this.props.navigation.navigate('ControlDistance')}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}
                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <View style={styles.list}>
                    {this.state.statusData == true ?
                        <HistoryList
                            historyData={this.state.dataSource}
                        /> :
                        <View style={styles.containerNo}>
                            <View style={styles.bodyNo}>
                                <Text style={styles.textNo}>ไม่มีรายการสมัคร</Text>
                            </View>
                        </View>
                    }
                </View>
            </View>

        );
    }
}
const mapStateToProps = state => {
    return {
        friendlist: state.friendlist,
        token: state.token,
        userprofile: state.userprofile
    }
}
const styles = StyleSheet.create({
    container: {

    },
    list: {
        padding: 10
    },
    containerNo: {
        justifyContent: "center"
    },
    bodyNo: {
        alignItems: "center"
    },
    textNo: {
        fontFamily: 'kanit',
        color: "#c0c0c0",
        fontSize: 20
    }

})

export default connect(mapStateToProps)(HistoryContainer);