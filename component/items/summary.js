import React, { Component } from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'

import { connect } from 'react-redux'

class SummaryTotal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalprice: ""
        }
    }
    componentWillMount() {
        this.setState({ totalprice: this.props.event.totalPrice })
        console.log(this.state.totalprice)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.totalprice != this.props.event.totalPrice) {
            console.log("update")
            this.setState({ totalprice: this.props.event.totalPrice })
        }
    }

    render() {
        return (
            <ImageBackground style={styles.background} source={{ uri: 'https://register.shutterrunning2014.com/assets/img/theme/bg.jpg' }}>
                <View style={styles.container}>
                    <View style={styles.box}>
                        <Text style={styles.textSummary}>สรุปค่าสมัครทั้งหมด : </Text>
                        <Text style={styles.textSummary}>{}{this.state.totalprice}.0 บาท</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event
    }
}

const styles = StyleSheet.create({
    background: {
        opacity: 0.8,

    },
    container: {
        backgroundColor: '#000',
        opacity: 0.8,
        width: '100%',
        height: 50
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textSummary: {
        padding: 10,
        fontSize: 20,
        fontFamily: 'kanit',
        color: '#fff',
    }
})

export default connect(mapStateToProps)(SummaryTotal)