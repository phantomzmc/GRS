import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'
import CellEventListFriend from './cell-eventListFriend'
import req from '../../../config/uri_req'
import api_key from '../../../config/api_key'

var uri = req[0].uspGetFriendLists
var apikey = api_key[0].api_key

class EventListFriend extends Component {
    constructor(state) {
        super(state)
        this.state = {
            datafriend: [],
            isRefesh: false,
        }
        this.getFriend = this.getFriend.bind(this)
    }
    componentDidMount(){
        this.getFriend()
        setTimeout(()=>{
            this.getFriend()
            console.log("timeset")
        },500)
    }
    // autoRefresh(){
    //     this.setTimeout(() => {
    //         this.getFriend()
    //     }, 2000);
    // }
    getFriend() {
        let data = ({
            params: [
                { name: "RunnerID", value: this.props.userprofile.userprofile.RunnerID },
                { name: "PageNo", value: "1" },
                { name: "RowPerPage", value: "12" }
            ]
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": apikey,
                "X-DreamFactory-Session-Token": this.props.token.token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, dataSource: response.data });
                console.log(this.state.dataSource)
            }).catch((error) => {
                this.setState({ isLoading : true})
                // this.setState({ isModalVisibleError: !this.state.isModalVisibleError })
                // console.error(error);
            });
    }
    addFriendEvent = (datafriend) => {
        this.props.setFriendRegister(datafriend)
    }
    
    onRefesh = () => {
        this.componentDidMount()
    }
    render() {
        let { selected, favorite } = this.state
        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        padding: 20
                    }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View
                style={{
                    flex: 1,
                    padding: 20
                }}>
                <FlatList
                    horizontal
                    data={this.state.dataSource}
                    refreshing={this.state.isRefesh}
                    onRefresh={this.onRefesh}
                    renderItem={({ item,index }) =>
                        <CellEventListFriend
                            items={item}
                            idkey={index}
                            getAddFriend={this.addFriendEvent.bind(this)}
                        />
                    }
                    keyExtractor={(item, index) => index} />
            </View >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friendlist: state.friendlist,
        userprofile: state.userprofile,
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setFriendRegister: (datafriend) => {
            dispatch({
                type: 'setFriendRegister',
                payload: datafriend
            })
        }

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(EventListFriend)

