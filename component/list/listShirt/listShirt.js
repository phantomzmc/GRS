import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight, AlertIOS } from 'react-native';


import datashirt from './dataShirt'

class ListShirt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 != r2
            })
        }
        this.pressDataShirt = this.pressDataShirt.bind(this)
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(datashirt)
        });
    }
    
    pressDataShirt(datashirt) {
        AlertIOS.alert(datashirt.size)
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderShirt.bind(this)}
                    style={styles.ListView}
                />

            </View>
        );
    }
    renderShirt(datashirt) {
        return (
            <TouchableHighlight onPress={() => this.pressDataShirt(datashirt)}>
                <View style={styles.sizeshirt}>
                    <Text style={{ fontFamily: "Kanit", }}>{datashirt.size} </Text>
                    <Text style={{ fontFamily: "Kanit", }}> ({datashirt.width}")</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    sizeshirt: {
        borderColor: '#f1f1f1',
        padding: 15,
        paddingHorizontal: 30,
        borderWidth: 1,
        flexDirection: 'row',
    },
    ListView: {
        backgroundColor: '#fff',
    }

})
export default ListShirt