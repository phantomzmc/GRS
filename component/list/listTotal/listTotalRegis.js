import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
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
                <Text>{this.state.datatotal.dataDis.nameRegis} จ้าาาาา</Text>
                <FlatList
                    data={this.state.datatotal.dataDis}
                    renderItem={({ item, index }) =>
                        <View style={styles.container}>
                            <View>
                                <Text style={styles.textTitle}>{item.nameRegis}</Text>
                                <Text style={styles.textTitle}>{item.size}</Text>
                            </View>
                            <View>
                                <Text style={styles.textTitle}>{item.fee}</Text>
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
        flexDirection : "row",
        margin: 10,
        backgroundColor: "#fff"
    },
    textTitle: {
        fontFamily: "kanit",
        padding: 10
    },
    contaiRigth : {
        justifyContent : "flex-end"
    },
    contaiLeft : {

    }
})

export default connect(mapStateToProps)(ListTotalRegis)