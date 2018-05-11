import React, { Component } from 'react';
import { View ,StyleSheet} from 'react-native'
import HistoryList from '../component/list/history/historylist'

class HistoryContainer extends Component {

    render() {
        return (
            <View style={styles.container}>
                <HistoryList/>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10
    }
})

export default HistoryContainer;