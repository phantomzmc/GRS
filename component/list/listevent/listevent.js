import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
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
    gotoPayment = () => {
        this.props.navigation.navigate('RegisterDistance')
    }

    constructor(props) {
        super(props);
        this.onChangeText = this.onChangeText.bind(this);
        this.onCancelButtonPress = this.onCancelButtonPress.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
        }
    }

    render() {
        return (
            <View>
                {/* <SearchBar
                    placeholder='Search'
                    onChangeText={this.onChangeText}
                    onCancelButtonPress={this.onCancelButtonPress} /> */}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderEvent}
                    style={styles.listView}
                />
            </View>
        );
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),

        });
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

    renderEvent(data) {
        return (
            <View style={styles.background}>
                <TouchableOpacity onPress={this.gotoPayment}>
                    <View style={styles.containerCard}>
                        <Image source={{ uri: data.pic }}
                            style={{ height: 200 }} />
                        <View style={styles.containerEventDetail}>
                            <View style={styles.containerEventDate}>
                                <Text style={styles.dateText}>{data.date}</Text>
                                <Text style={styles.monthText}>{data.month}</Text>
                            </View>
                            <Text style={styles.name}>{data.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
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

