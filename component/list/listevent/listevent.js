import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    AppRegistry,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    FlatList,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import data from './data.js'
import { StackNavigator } from 'react-navigation';
// import SearchBar from 'react-native-search-bar';
// import CellListEvent from './cellListEvent'


class ListEvent extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    }
    static navigationOptions = {
        title: 'รายการวิ่ง',
        headerStyle: {
            backgroundColor: '#FC561F'
        },
        headerTitleStyle: {
            color: '#fff',
            fontFamily: "Kanit",
            fontWeight: '500',
        }
    };


    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.onCancelButtonPress = this.onCancelButtonPress.bind(this);
        this.state = {
            isLoading: true
        }
        // this.state = {
        //     dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
        // }
    }
    componentDidMount() {
        return fetch("http://api.shutterrunning2014.com/api/v2/grsv2m/_table/Main.Events",
            {
                method: "GET",
                headers: {
                    "X-DreamFactory-API-Key": '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88',
                    "X-DreamFactory-Session-Token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWRtaW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXhwIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k',
                    "Authorization": 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.resource,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }
    gotoPayment = () => {
        this.props.navigation.navigate('RegisterDistance')
        console.log("test")
    }

    onChangeText(e) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data.filter((item) =>
                item.trackName.toLowerCase().includes(e.toLowerCase()))),
        });
    }


    onCancelButtonPress() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
        });
    }
    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{ flex: 1, paddingTop: 20 }} >
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        // <Text>{item.EventName}, {item.EventDate}</Text>}
                        <View style={styles.background}>
                            <TouchableOpacity onPress={this.gotoPayment}>
                                <View style={styles.containerCard}>
                                    <Image source={{ uri: item.BackgroundImage}}
                                        style={{ height: 200 }} />
                                    <View style={styles.containerEventDetail}>
                                        <View style={styles.containerEventDate}>
                                            <Text style={styles.dateText}>{item.EventID}</Text>
                                            <Text style={styles.monthText}>{item.EventDate}</Text>
                                        </View>
                                        <Text style={styles.name}>{item.EventName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View >
        );


        // render() {
        //     return (
        //         <View>
        //             {/* <SearchBar
        //                 placeholder='Search'
        //                 onChangeText={this.onChangeText}
        //                 onCancelButtonPress={this.onCancelButtonPress} /> */}
        //             <FlatList
        //                 dataSource={this.state.dataSource}
        //                 renderRow={this.renderEvent}
        //                 style={styles.listView}
        //             />
        //         </View>
        //     );
        // }
        // renderEvent(resource) {
        //     return (
        // <View style={styles.background}>
        //     <TouchableOpacity onPress={this.gotoPayment}>
        //         <View style={styles.containerCard}>
        //             <Image source={{ uri: resource.BackgroundImage }}
        //                 style={{ height: 200 }} />
        //             <View style={styles.containerEventDetail}>
        //                 <View style={styles.containerEventDate}>
        //                     <Text style={styles.dateText}>{resource.EventDate}</Text>
        //                     <Text style={styles.monthText}>{resource.EventID}</Text>
        //                 </View>
        //                 <Text style={styles.name}>{resource.EventName}</Text>
        //             </View>
        //         </View>
        //     </TouchableOpacity>
        // </View>
        //     )
        // }
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#EFEFF4',
        flex: 1,
    },
    containerCard: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        margin: 10,
        borderRadius: 5,

    },
    containerEventDetail: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerEventDate: {
        paddingHorizontal: 10,
        alignItems: 'center',
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
        flex: 1,
    },
    name: {
        flex: 1,
        alignItems: 'center',
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
export default ListEvent

