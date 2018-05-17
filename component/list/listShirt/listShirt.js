import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight, Alert } from 'react-native';

import { connect } from 'react-redux'
import datashirt from './dataShirt'

class ListShirt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            size: "",
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
        console.log(this.state.size)
        this.setState({ size: datashirt.size })
        this.props.setSizeShirt(datashirt.size)
        Alert.alert("ไซค์เสื้อ : " + datashirt.size)
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
                    <Text style={{ fontFamily: "Kanit", }}>{datashirt.label} </Text>
                    <Text style={{ fontFamily: "Kanit", }}> ({datashirt.width}")</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
const mapDispatchtoProps = (dispatch) => {
    return {
        setSizeShirt : (size) => {
            dispatch({
                type : 'setSizeShirt',
                payload : size
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {

    },
    sizeshirt: {
        borderColor: '#f1f1f1',
        padding: 15,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    ListView: {
        backgroundColor: '#fff',
    }

})
export default connect(null,mapDispatchtoProps)(ListShirt)