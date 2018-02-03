import React, { Component } from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';


class ChoiceSend extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(['รับด้วยตนเอง', 'ส่งไปรษณีย์']),
        };
    }

    render() {
        return (
            <ListView
                style={styles.listview}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => 
                <Text style={styles.textlistview}>{rowData}</Text>}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        margin: 20
    },
    listview : {
        paddingHorizontal: 30,
    },
    textlistview : {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 17,
    }
});


export default ChoiceSend;
