import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux'

class DetailRegister extends Component {
    state = {
        address: "106/13 หนองหอย เมืองเชียงใหม่ เชียงใหม่"
    }
    componentDidMount() {
        this.setState({
            address: this.props.userprofile.userprofile.Address + " " +
                this.props.userprofile.userprofile.SubDistric + " " +
                this.props.userprofile.userprofile.Distric + " " +
                this.props.userprofile.userprofile.Province + " " +
                this.props.userprofile.userprofile.PostCode
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.view1}>
                    <View>
                        <Text style={styles.typePayment}> จ่ายเเล้ว </Text>
                    </View>
                    <View>
                        <Image source={{ uri: "https://www.qrstuff.com/images/sample.png" }}
                            style={{ width: 100, height: 100 }} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 10, color: '#A9A9A9', fontFamily: 'kanit' }}> Order : number </Text>
                        <Text style={{ fontSize: 10, color: '#A9A9A9', fontFamily: 'kanit' }}> Date order </Text>
                    </View>
                </View>
                <View style={styles.viewName}>
                    <Text style={styles.textName1}>ชื่อ - นามสกุล</Text>
                    <Text style={styles.textName2}>{this.props.userprofile.userprofile.FirstName} {this.props.userprofile.userprofile.LastName}</Text>
                    <Text style={styles.textName1}>รายการวิ่ง</Text>
                    <Text style={styles.textName2}>{this.props.event.event.EventName}</Text>
                </View>
                <View style={styles.viewSize}>
                    <View style={styles.box}>
                        <Text style={styles.boxTitle}>size</Text>
                        <Text style={styles.boxName}>{this.props.shirtphoto.size}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.boxTitle}>{this.props.event.distanceEvent.name}</Text>
                        <Text style={styles.boxName}>{this.props.event.distanceEvent.distance}</Text>
                    </View>
                </View>
                <View style={styles.viewAddress}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.textName1}>Address</Text>
                        {/* <Text style={{ fontFamily: 'kanit' }}>{this.props.address.user.adress}</Text> */}
                        <Text style={{ fontFamily: 'kanit' }}>{this.state.address}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.textName1}>วันที่</Text>
                        <Text style={{ fontFamily: 'kanit' }}>{this.props.event.event.EventDate}</Text>
                    </View>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    view1: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewName: {
        padding: 20,
    },
    viewSize: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    box: {
        backgroundColor: '#FC561F',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 40,
    },
    viewAddress: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    typePayment: {
        color: '#90EE90',
        fontFamily: 'kanit',
    },
    textName1: {
        color: '#a9a9a9',
        fontFamily: 'kanit',
    },
    textName2: {
        fontSize: 20,
        fontFamily: 'kanit',
    },
    boxTitle: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'kanit'
    },
    boxName: {
        fontSize: 25,
        color: '#fff',
        fontFamily: 'kanit'
    }

})

const mapStateToProps = (state) => {
    return {
        event: state.event,
        profile: state.profile,
        distanceEvent: state.distanceEvent,
        shirtphoto: state.shirtphoto,
        userprofile: state.userprofile,
        choiceSend: state.choiceSend,
        address: state.address
    }
}
export default connect(mapStateToProps)(DetailRegister);
