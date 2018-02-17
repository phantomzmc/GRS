import React, { Component } from 'react';
import { View, Text, ListView,StyleSheet } from 'react-native';

import datadistance from './datadistance'

class ListFriendDistance extends Component {
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
            dataSource: this.state.dataSource.cloneWithRows(datadistance)
        });
    }
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderDistance.bind(this)}
                style={styles.listview}

            />
        );
    }

    renderDistance(datadistance) {
        return (
            <View style={styles.container}>
                <View style={styles.cellDistance}>
                    <Text style={styles.title}>{datadistance.name} - {datadistance.distance}</Text>
                    <Text style={styles.detail}>{datadistance.price}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
    },
    listview : {
        backgroundColor: '#fff',
    },
    cellDistance : {
        padding: 15,
        borderColor: '#f1f1f1',
        paddingHorizontal: 30,
        borderWidth: 1,
    },
    title : {
        fontSize: 17
       
    },
    detail : {
        fontSize: 10,
        color: '#666666'
    }
})

export default ListFriendDistance;
