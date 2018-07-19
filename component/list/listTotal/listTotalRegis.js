import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet,Image } from 'react-native';
import { connect } from "react-redux";


class ListTotalRegis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datatotal: {
                dataDis: this.props.friendlist.friendEvent,
                frindRegis: this.props.friendlist.friendRegis,
                sizeshirt: this.props.friendlist.shirtSize
            },
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.datatotal.dataDis}
                    renderItem={({ item, index }) =>
                        <View style={styles.container}>
                            <View>
                                <Image source={require('../../icon/calendar.png')}
                                    style={{ width: 30, height: 30, justifyContent: 'center', alignSelf: 'center', marginTop: 10 }} />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{item.firstname} {item.lastname}</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit' }}>ระยะ : {item.nameRegis}</Text>
                                    <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit' }}>ไซค์เสื้อ : {item.size}</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{item.fee}.0 ฿</Text>
                            </View>
                        </View>}
                    keyExtractor={this.keyExtractor} />
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        friendlist: state.friendlist
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 10,
        backgroundColor: "#fff",
        justifyContent: 'space-between'
    },
    textTitle: {
        fontFamily: "kanit",
        padding: 10,
    },
    textTitle2: {
        fontFamily: "kanit",
        padding: 10,
        fontSize: 8,
        color: '#1f1f1f'
    },
    contaiRigth: {
        justifyContent: "flex-end"
    },
    contaiLeft: {

    }
})

export default connect(mapStateToProps)(ListTotalRegis)