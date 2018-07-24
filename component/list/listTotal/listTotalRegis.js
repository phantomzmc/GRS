import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { connect } from "react-redux";


class ListTotalRegis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datatotal: {
                dataDis: this.props.friendlist.fullfriendEvent,
                frindRegis: this.props.friendlist.friendRegis,
                sizeshirt: this.props.friendlist.shirtSize
            },
        }
    }
    componentDidMount() {
        console.log(this.state.datatotal.dataDis)
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.datatotal.dataDis}
                    renderItem={({ item, index }) =>
                        <View style={styles.container}>
                            <View>
                                <Image source={require('../../icon/boy.png')}
                                    style={{ width: 30, height: 30,marginLeft: 20}} />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{item.firstname} - {item.lastname}</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit' }}>ระยะ : {item.nameRegis}</Text>
                                    <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'kanit' }}>ไซค์เสื้อ : {item.JerseySize}</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontSize: 10, fontFamily: 'kanit' }}>{item.CourseFee}.0 ฿</Text>
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
        justifyContent: 'space-evenly'
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