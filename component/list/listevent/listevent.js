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
import axios from 'axios'

var uri = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspGetEventList"
var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='

class ListEvent extends Component {
    static propTypes = {
        navigation: PropTypes.object
    }
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
    componentDidMount() {
        axios.get(uri, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": sessionToken,
                "Authorization": auth
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, dataSource: responseJson.data, });
                console.log(this.state.dataSource)
            }).catch((error) => {
                console.error(error);
            });

    }
    gotoPayment = (item) => {
        if (this.props.Profile == "") {
            this.props.addEvent(item)
            this.props.CheckLogin()
            console.log(item)
        } else if (this.props.Profile != "") {
            this.setState({
                event: {
                    name: item.EventName,
                    date: item.EventDate,
                    tranferBank: item.EventBankDetailTH
                }
            })
            this.props.CheckLogin()
            this.props.addEvent(item)
        }
    }

    render() {
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
                    paddingTop: 20
                }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => <View style={styles.background}>
                        <View style={styles.containerCard}>
                            <Image
                                source={{
                                    require: '${item.BackgroundImage}'
                                }}
                                style={{
                                    height: 200
                                }} />
                            <View style={styles.containerEventDetail}>
                                <View style={styles.containerEventDate}>
                                    <Text style={styles.dateText}>{item.EventID}</Text>
                                    <Text style={styles.monthText}>{item.EventDate}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={this
                                        .gotoPayment
                                        .bind(this, item)}>
                                    <View style={styles.textName}>
                                        <Text style={styles.name}>{item.EventName}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>}
                    keyExtractor={(item, index) => index} />
            </View >
        );
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        addEvent: (event) => {
            dispatch({
                type: 'addEvent',
                payload: event
            })
        }
    };
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#EFEFF4',
        flex: 1
    },
    containerCard: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        margin: 10,
        borderRadius: 5
    },
    containerEventDetail: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerEventDate: {
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    dateText: {
        fontSize: 36,
        fontFamily: "Kanit"
    },
    monthText: {
        color: '#FC561F',
        fontSize: 20,
        fontFamily: "Kanit"
    },
    containerEventName: {
        flex: 1
    },
    textName: {
        marginRight: 30
    },
    name: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 15,
        fontSize: 18,
        fontFamily: "Kanit"
    },
    listView: {
        paddingTop: 10,
        // backgroundColor: '#F5FCFF',
    },
    navBackground: {
        backgroundColor: '#FC561F'
    }
});
export default connect(null, mapDispatchtoProps)(ListEvent);
