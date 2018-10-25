import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { connect } from "react-redux";
import { Container, Row, Col, Left, Right, Body, Content } from "native-base";


class ListTotalRegis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datatotal: {
                dataDis: this.props.friendlist.fullfriendEvent,
                frindRegis: this.props.friendlist.friendRegis,
                sizeshirt: this.props.friendlist.shirtSize
            },
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],

        }
    }
    componentDidMount() {
        console.log(this.state.datatotal.dataDis)
    }

    render() {
        let { dataDis } = this.state.datatotal.dataDis
        return (
            <View>
                <FlatList
                    data={this.state.datatotal.dataDis}
                    renderItem={({ item, index }) =>
                        <View style={styles.container}>
                            <Left>
                                <View>
                                    <Image source={{ uri: item.picProfile }}
                                        style={{ width: 30, height: 30, marginLeft: 20,borderRadius : 15}} />
                                </View>
                            </Left>
                            <Content>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>{item.firstname} {item.lastname}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'Kanit' }}>ระยะ : {item.nameRegis}</Text>
                                        <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'Kanit' }}>ไซค์เสื้อ : {item.JerseySize}</Text>
                                    </View>
                                    {
                                        item.PhotoPlusService == 1 ?
                                            <View>
                                                <Text style={{ fontSize: 7, color: '#8B8B8B', fontFamily: 'Kanit' }}> x1 PhotoPlusService </Text>
                                            </View>
                                            :
                                            <View></View>
                                    }
                                </View>
                            </Content>
                            <Right>
                                <View>
                                    <Text style={{ fontSize: 10, fontFamily: 'Kanit' }}>{item.CoursePrice}.0 ฿</Text>
                                </View>
                            </Right>>
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
    },
    textTitle: {
        fontFamily: "Kanit",
        padding: 10,
    },
    textTitle2: {
        fontFamily: "Kanit",
        padding: 10,
        fontSize: 8,
        color: '#1f1f1f'
    }
})

export default connect(mapStateToProps)(ListTotalRegis)