import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import datadistance from './datadistance.js'
import { connect } from 'react-redux'
import axios from 'axios'

var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='
var img = 'https://www.beautifullearth.com/wp-content/uploads/2017/10/123-6.jpg'

class ListDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            distanceEvent: {
                id: "",
                name: "",
                distance: "",
                price: ""
            },
            id: this.props.event.event.EventID,
            userid: this.props.username.username,
            pic: img,
        }
    }

    componentDidMount() {
        const { id, userid } = this.state
        const uri = 'http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspGetCourseLists(' + id + ',' + userid + ')'
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
                this.setState({ isLoading: false, dataSource: responseJson.data });
                console.log(this.state.dataSource)
            }).catch((error) => {
                console.error(error);
            });
    }
    shirtPhotoPlus(item) {
        this.setState({
            distanceEvent: {
                id: item.CourseID,
                name: item.CourseName,
                distance: item.Distance,
                price: parseFloat(item.Fee)
            }
        })
        this.props.onGotoshirt({ id: item.CourseID, name: item.CourseName, distance: item.Distance, price: parseFloat(item.Fee), pricePhotoPlus: item.PhotoPlusCost, statusPhotoPlus: item.PhotoPlusService })
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
                    renderItem={({ item, datadistance }) => <View style={styles.container}>
                        <TouchableOpacity
                            onPress={this
                                .shirtPhotoPlus
                                .bind(this, item)}>
                            <ImageBackground
                                source={{ uri: this.state.pic }}
                                style={styles.imgbackground}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}>{item.CourseName}</Text>
                                    <Text style={styles.distance}>{item.Distance}</Text>
                                    <Text style={styles.price}>{item.Fee} บาท</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>}
                    keyExtractor={(item, index) => index.toString()} />
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex: 1
    },
    imgbackground: {
        width: '100%',
        height: 150
    },
    textContainer: {
        flex: 1,
        backgroundColor: '#000',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: '#fff',
        fontFamily: 'kanit',
        fontSize: 20,
        fontWeight: '500'
    },
    distance: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '500',
        fontFamily: 'kanit'
    },
    price: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'kanit'
    },
    listview: {}
})

const mapStateToProps = (state) => {
    return {
        event: state.event,
        username: state.username
    }
}

export default connect(mapStateToProps)(ListDistance)
