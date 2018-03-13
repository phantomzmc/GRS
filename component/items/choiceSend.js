import React, { Component } from 'react';
import { StyleSheet, View, Text, ListView, TouchableOpacity } from 'react-native';


class ChoiceSend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataChoice: ["รับด้วยตนเอง", "ส่งไปรษณีย์"],
            choice: "",
            dataSource : new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        };
    }
    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.dataChoice) 
        })
    }
    getChoice = (dataChoice) => {
        this.props.showChoice(dataChoice)
        this.setState({ choice: dataChoice })
    }

    render() {
        return (
            <ListView
                style={styles.listview}
                dataSource={this.state.dataSource}
                renderRow={this.renderChoice.bind(this)}
            />
        );
    }
    renderChoice(dataChoice) {
        return (
            <TouchableOpacity onPress={()=> this.getChoice(dataChoice)}>
                <Text style={styles.textlistview}>{dataChoice}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        margin: 20
    },
    listview: {
        paddingHorizontal: 30,
    },
    textlistview: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 17,
        fontFamily: 'kanit',
    }
});


export default ChoiceSend;
