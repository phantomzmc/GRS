import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, StatusBar } from 'react-native';
import { Container, Content, Card, CardItem, TabHeading } from 'native-base';
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
        imageShirt: "",
        buttonStatus1: true, //close
        buttonStatus2: false, //open
        shirt: "",
        statusRegis : 0,
        totalRegister : 0
    }
    componentWillMount(){
        this.setState({ totalRegister : this.props.event.totalRegister})
        clearInterval(this._interval);
    }
    
    componentDidMount = () => {
        this._interval = setInterval(() => {
            this.setState({ totalRegister: this.props.event.totalRegister })
        }, 500);

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
    savedataRegis(){
        let datadis = this.props.event.distanceEvent
        let data = {
            RunnerID: this.props.userprofile.userprofile.RunnerID,
            CourseID: datadis.id,
            JerseySize: this.state.shirt,
            PhotoPlusService: datadis.statusPhotoPlus,
            PromoCode: "",
            CourseFee: datadis.price,
        }
        let dataFull = [{
            RunnerID: this.props.userprofile.userprofile.RunnerID,
            CourseID: datadis.id,
            JerseySize: this.state.shirt,
            PhotoPlusService: datadis.statusPhotoPlus,
            PromoCode: "",
            CourseFee: datadis.price,
            firstname : this.props.userprofile.userprofile.FirstName,
            lastname : this.props.userprofile.userprofile.LastName,
            nameRegis : datadis.name
        }]
        console.log(data)
        this.props.setSizeShirt(this.state.shirt)
        this.props.addFriendInEvent(data)
        this.props.addFullFriendInEvent(dataFull)

    }
   
    goNextState = () => {
        console.log("checkPromo")
        if (this.props.event.event.PromoCodeStatus == 1 && this.props.event.event.PromoCodeRequired == 1) {
            console.log("status 1 ต้องกรอก")
            this.props.setStatusRegis(this.state.statusRegis)
            this.props.navigation.navigate("DiscountCoupon")
        }
        else if ((this.props.event.event.PromoCodeStatus == 1 && this.props.event.event.PromoCodeRequired == 0) || (this.props.event.event.PromoCodeStatus == 0 && this.props.event.event.PromoCodeRequired == 1)) {
            console.log("status 2 กรอกหรือไม่กรอกก็ได้")
            this.props.setStatusRegis(this.state.statusRegis)
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
            this.props.setStatusRegis(this.state.statusRegis)
            this.props.navigation.navigate('AddressLayout')
        }
        this.savedataRegis()
    }
    goPreveState = () => {
        this.props.navigation.navigate('ControlDistance')
    }
    setImageShrirt(item) {
        this.setState({
            imageShirt: item
        })
    }
    passValueShirt = (item) => {
        this.setState({
            shirt: item
        })
    }
    _buttonStatus() {
        this.setState({ buttonStatus2: true, buttonStatus1: false })
    }
    gotoListEvent = () => {
        this.props.navigation.navigate('EventList')
    }

    render() {
        let url = 'https://register.shutterrunning2014.com/assets/img/theme/'
        return (
            <Container>
                <HeaderTeam
                    title={this.state.title}
                    menu={true}
                    statusRegis={true}
                    goback={() => this.props.navigation.navigate('ControlDistance')}
                    goLogin={() => this.props.navigation.navigate("Login")}
                    goFriendlist={() => this.props.navigation.navigate('FriendList')}
                    goHistory={() => this.props.navigation.navigate('HistoryContainer')}
                    goEditProfile={() => this.props.navigation.navigate('EditProfile')}
                    goRegis={() => this.props.navigation.navigate('ControlDistance')}
                    goSingleLogin={() => this.props.navigation.navigate('SingleLogin')}
                    goContacts={()=> this.props.navigation.navigate('Contacts')}
                />
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
                            statusButton={this._buttonStatus.bind(this)}
                            getShirt={this.passValueShirt.bind(this)}
                            goEvent={this.gotoListEvent.bind(this)}
                        />
                    </View>

                    {this.state.buttonStatus2 &&
                        <View style={styles.cardview}>
                            <Content>
                                <Card style={{ borderColor : "#FC561F" ,borderRadius : 10 }}>
                                    <CardItem style={{ borderColor : "#FC561F" ,borderRadius : 10,borderWidth : 2}}>
                                        <TabHeading style={{ backgroundColor : "#fff"}}>
                                            <Text style={styles.textSizeCard}>ไซค์เสื้อที่เลือก : {this.state.shirt}</Text>
                                        </TabHeading>
                                    </CardItem>
                                </Card>
                            </Content>
                        </View>
                    }
                    {this.state.isItems && <Text style={styles.textSize}>Photo + Service</Text>}
                    {this.state.isItems2 &&
                        <PhotoPlus 
                            titleName={this.props.photoplus.title}
                            dataPricePhoto={this.props.photoplus.pricePhoto}
                        />
                    }
                    {this.state.buttonStatus1 &&
                        <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Text style={styles.textButton}>ถัดไป</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {this.state.buttonStatus2 &&
                        <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.buttonContainerOnPress} onPress={this.goNextState}>
                                <Text style={styles.textButton}>ถัดไป</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </ScrollView>
                <SummaryTotal 
                    total={parseFloat(this.state.totalRegister).toFixed(2) }
                />
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
    buttonContainerOnPress: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 30,
    },
    buttonContainer: {
        height: 40,
        width: '80%',
        backgroundColor: '#FC561F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 30,
        opacity: 0.5
    },
    textButton: {
        fontWeight: '500',
        fontSize: 14,
        color: '#fff',
        fontFamily: "Kanit",
    },
    textSizeCard: {
        fontFamily: "Kanit",
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        color : "#FC561F"
    },
    cardview: {
        flexDirection: 'row',
        margin: 20
    }
})
const mapDispatchToProps = dispatch => {
    return {
        setStatusRegis : (regis) => {
            dispatch({
                type : 'setStatusRegis',
                payload : regis
            })
        },
        addFriendInEvent: (dataFriend) => {
            dispatch({
                type: 'addFriendInEvent',
                payload: dataFriend
            })
        },
        addFullFriendInEvent : (dataFriendFull) => {
            dispatch({
                type: 'addFullFriendInEvent',
                payload : dataFriendFull
            })
        },
        setSizeShirt : (shirt) => {
            dispatch({
                type : 'setSizeShirt',
                payload : shirt
            })
        }
    }
}
const mapStateToProps = (state) => {
    return {
        event: state.event,
        creditcard: state.creditcard,
        shirtphoto: state.shirtphoto,
        photoplus: state.photoplus,
        total: state.total,
        userprofile : state.userprofile
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ShirtPhotoPlus)
