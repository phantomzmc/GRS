import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, StatusBar } from 'react-native';
import { Container} from 'native-base'
import { connect } from 'react-redux'
import ListShirt from '../component/list/listShirt/listShirt'
import PhotoPlus from '../component/items/photoPlus'
import SummaryTotal from '../component/items/summary'
import HeaderTeam from '../component/items/headerTeam'

class ShirtPhotoPlus extends Component {
    state = {
        title: "เลือกไซค์เสื้อ",
        isItems: false,
        isItems2: false,
        imageShirt : ""
    }
    componentDidMount = () => {
        if (this.props.event.distanceEvent.statusPhotoPlus == 1) {
            this.setState({
                isItems: !this.state.isItems,
                isItems2: !this.state.isItems2
            })
        }
        else if (this.props.event.distanceEvent.statusPhotoPlus == 0) {
            this.setState({
                isItems: this.state.isItems,
                isItems2: this.state.isItems2
            })
        }
    }
    goNextState = () => {
        console.log("checkPromo")
        if (this.props.event.event.PromoCodeStatus == 1 && this.props.event.event.PromoCodeRequired == 1) {
            console.log("status 1 ต้องกรอก")
            Alert.alert("ส่วนลดค่าสมัคร", "กรุณากรอกรหัสส่วนลดในการสมัคร", [
                {
                    text: "ยืนยัน",
                    onPress: () => this.props.navigation.navigate("DiscountCoupon")
                },
            ])
        }
        else if ((this.props.event.event.PromoCodeStatus == 1 && this.props.event.event.PromoCodeRequired == 0) || (this.props.event.event.PromoCodeStatus == 0 && this.props.event.event.PromoCodeRequired == 1)) {
            console.log("status 2 กรอกหรือไม่กรอกก็ได้")
            Alert.alert("ส่วนลดค่าสมัคร", "รายการนี้มีส่วนลดค่าสมัคร ท่านสามารถกรอกรหัสเพื่อรับส่วนลดได้", [
                {
                    text: "กรอกรหัสส่วนลด",
                    onPress: () => this.props.navigation.navigate("DiscountCoupon")
                },
                {
                    text: "ข้ามการกรอกรหัส",
                    onPress: () => this.props.navigation.navigate('AddressLayout')

                },
            ])
        }
        else if (this.props.event.event.PromoCodeStatus == 0 && this.props.event.event.PromoCodeRequired == 0) {
            console.log("status 0 ผ่าน")
            this.props.navigation.navigate('AddressLayout')
        }
    }
    goPreveState = () => {
        this.props.navigation.navigate('ControlDistance')
    }
    setImageShrirt(item){
        this.setState({
            imageShirt : item
        })
    }

    render() {
        let url = 'https://register.shutterrunning2014.com/assets/img/theme/'
        return (
            <Container>
                <HeaderTeam
                    title={this.state.title}
                    goback={this.goPreveState.bind(this)} />
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    translucent={true}
                />
                <ScrollView>
                    <View style={styles.container}>
                        <Image
                            source={{ uri: url + this.state.imageShirt }}
                            style={{ height: 100, marginTop: 10 }} />
                        <Text style={styles.textSize}>โปรดเลือกไซค์เสื้อ</Text>
                        <ListShirt 
                            getImageShirt={this.setImageShrirt.bind(this)}
                        />
                        {this.state.isItems && <Text style={styles.textSize}>Photo Plus + </Text>}
                        {this.state.isItems2 &&
                            <PhotoPlus titleName={this.props.photoplus.title}
                                dataPricePhoto={this.props.photoplus.pricePhoto}
                            />
                        }
                    </View>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.textButton}
                                onPress={this.goNextState}>ถัดไป</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <SummaryTotal />
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    textSize: {
        backgroundColor: '#EFF4F1',
        fontSize: 22,
        fontWeight: '300',
        padding: 20,
        fontFamily: "Kanit",
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 30
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 30,
    },
    textButton: {
        fontWeight: '500',
        fontSize: 14,
        color: '#fff',
        fontFamily: "Kanit",
    }
})
const mapStateToProps = (state) => {
    return {
        event: state.event,
        creditcard: state.creditcard,
        shirtphoto: state.shirtphoto,
        photoplus: state.photoplus,
        total: state.total
    };
};
const mapDisPacthToProps = (dispacth) => {
    return {
        setPrice: (priceCredit) => {
            dispacth({
                type: "setPrice",
                payload: priceCredit
            })
        }
    }
}
export default connect(mapStateToProps)(ShirtPhotoPlus)
