import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native'
import HistoryList from '../component/list/history/historylist'
import HeaderTeam from '../component/items/headerTeam'

class HistoryContainer extends Component {
    state = {
        title: "ประวัติการวิ่ง"
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderTeam
                    title={this.state.title}
                    menu={true}
                    goback={() => this.props.navigation.navigate('ControlDistance')}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}
                />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <View style={styles.list}>
                    <HistoryList />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    list: {
        padding: 10
    }
})

export default HistoryContainer;