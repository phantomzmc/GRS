import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';

import datashirt from './dataShirt'

export default class ListShirt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 != r2
            })
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(datashirt)
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderShirt}
                    style={styles.ListView}
                />
            </View>
        );
    }
    renderShirt(datashirt) {
        return (
            <View style={styles.sizeshirt}>
                <Text>{datashirt.size} </Text>
                <Text> ({datashirt.width}")</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
        container : {
            margin: 20,
        },
        sizeshirt : {
            margin: 10,
            flexDirection: 'row',
        },
        ListView : {

        }

})
