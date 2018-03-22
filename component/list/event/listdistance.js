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
import data from '../listevent/data.js';
import { connect } from 'react-redux'

class ListDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            distanceEvent: {
                name: "",
                distance: "",
                price: ""
            },
        }
    }

    componentDidMount() {
        return fetch("http://api.shutterrunning2014.com/api/v2/grsv2m/_table/Main.Courses", {
            method: "GET",
            headers: {
                "X-DreamFactory-API-Key": '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88',
                "X-DreamFactory-Session-Token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
                    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
                    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
                    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
                    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k',
                "Authorization": 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({ isLoading: false, dataSource: responseJson.resource });
            console.log(this.state.dataSource)
            console.log(this.state.image)
        }).catch((error) => {
            console.error(error);
        });
        // this.setState({
        //     distanceName: this.props.event.distanceEvent.distanceName,
        //     distance: this.props.event.distanceEvent.distance, 
        //     price: this.props.event.distanceEvent.price,
        //     dataSource: datadistance, 
        // });
    }
    shirtPhotoPlus = (item) => {
        this.setState({
            distanceEvent: {
                name: item.name,
                distance: item.distance,
                price: item.price
            }
        })
        this
            .props
            .onGotoshirt({ name: item.name, distance: item.distance, price: item.price })
        console.log(this.state.distanceEvent)
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
                    renderItem={({ item }) => <View style={styles.container}>
                        <TouchableOpacity
                            onPress={this
                                .shirtPhotoPlus
                                .bind(this, item)}>
                                <ImageBackground
                                    source={{ uri: "https://img.huffingtonpost.com/asset/5670684c1600002c00eb8dfd.jpeg?cache=h9lemiymnp&ops=scalefit_720_noupscale"}}
                                    style={styles.imgbackground}>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>{item.CourseName}</Text>
                                        <Text style={styles.distance}>{item.Distance}</Text>
                                        <Text style={styles.price}>{item.CourseID}.00 บาท</Text>
                                    </View>
                                </ImageBackground>
                        </TouchableOpacity>
                    </View>}
                    keyExtractor={(item, index) => index} />
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
        event: state.event
    }
}

export default connect(mapStateToProps)(ListDistance)
