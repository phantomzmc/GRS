import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { Form, Item, Input, Label } from 'native-base'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect} from 'react-redux'
import ProvinceForm from './addressForm-province'
import AmphoeForm from './addressForm-amphoe'
import TambonForm from './addressForm-tunporn'


class FormAddressRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  constructor(props) {
    super(props);

    const address = this.props.profile.address
    this.state = {
      number : address.address,
       tambon : address.t,
       amphoe : address.a,
       country : address.country,
       postNumber : address.postNumber,
       province : address.city
    };
  }
  checkInputValue(number, tambon, amphoe, province, country, postNumber) {
    if (number == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกบ้านเลขที่', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (tambon == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกชื่อตำบล / แขวง', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })

    }
    else if (amphoe == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกชื่ออำเภอ / เขต', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })

    }
    else if (province == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกชื่อจังหวัด', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (country == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกชื่อประเทศ', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else if (postNumber == "") {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณากรอกรหัสไปรษรณีย์', [
        {
          text: 'ตกลง'
        }
      ], { cancelable: false })
    }
    else {
      this.sendData(number, tambon, amphoe, province, country, postNumber)
    }
  }
  passProvince(city) {
    let { province } = this.state
    this.setState({ province: city })
  }
  passTampon(tunporn) {
    let { tambon } = this.state
    this.setState({ tambon: tunporn })
  }
  passAmphoe(amphoes) {
    let { amphoe } = this.state
    this.setState({ amphoe: amphoes })
  }

  sendData = (number, tambon, amphoe, province, country, postNumber) => {
    this.props.goEvent(number, tambon, amphoe, province, country, postNumber);

  };

  render() {
    let { number, tambon, amphoe, province, country, postNumber } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contectTitle}>
          <View style={styles.textTitle}>
            <Image source={require('../icon/location-pointer.png')}
              style={styles.icon} />

          </View>
          <Text style={styles.titleText}>ที่อยู่</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>บ้านเลขที่</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{this.state.number == "" ? "Ex.123/45" : this.state.number}</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={number => this.setState({ number : number })}
            />
          </Item>
        </Form>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>แขวง / ตำบล : {this.state.tambon}</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>

        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{this.state.tambon == "" ? "Ex.หนองหอย" : this.state.tambon}</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={tambon => this.setState({ tambon : tambon })}
            />
          </Item>
        </Form>

        {/* <TambonForm gettumporn={this.passTampon.bind(this)} /> */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>เขต / อำเภอ : {this.state.amphoe}</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>

        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{this.state.amphoe == "" ? "Ex.เมืองเชียงใหม่" : this.state.amphoe}</Label>
            <Input
              style={{ fontFamily: "Kanit" }}

              onChangeText={amphoe => this.setState({ amphoe : amphoe })}
            />
          </Item>
        </Form>
        {/* <AmphoeForm getamphoe={this.passAmphoe.bind(this)} /> */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>จังหวัด : {this.state.province}</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>

        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{this.state.province == "" ? "Ex.เชียงใหม่" : this.state.province}</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={province => this.setState({ province : province })}
            />
          </Item>
        </Form>
        {/* <ProvinceForm getProvince={this.passProvince.bind(this)} /> */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>ประเทศ</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{this.state.country == "" ? "Ex.ไทย" : this.state.country}</Label>
            <Input
              style={{ fontFamily: "Kanit" }}
              onChangeText={country => this.setState({ country : country })}
            />
          </Item>
        </Form>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headForm}>รหัสไปรษณีย์</Text>
          <Text style={styles.headdetail}> ** จำเป็น **</Text>
        </View>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{this.state.postNumber == "" ? "Ex.10160" : this.state.postNumber}</Label>
            <Input
              keyboardType="phone-pad"
              style={{ fontFamily: "Kanit" }}
              onChangeText={postNumber => this.setState({ postNumber : postNumber})}
            />
          </Item>
        </Form>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              this.checkInputValue(number, tambon, amphoe, province, country, postNumber)
            }
          >
            <Text style={styles.textButton}>ถัดไป</Text>
          </TouchableOpacity>
        </View>
        <KeyboardSpacer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff"
  },
  textTitle: {
    backgroundColor: '#fc561f',
    padding: 10,
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 15,
    fontFamily: "Kanit",
    color: '#fc561f'
  },
  contectTitle: {
    alignItems: 'center'
  },
  icon: {
    width: 32,
    height: 32
  },
  textInput: {
    borderColor: "#FC561F",
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    height: 35,
    marginTop: 15,
    fontFamily: "Kanit"
  },
  conlorsegment: {
    marginTop: 10
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textAddressInput: {
    width: "45%",
    borderColor: "#FC561F",
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    height: 35,
    marginTop: 15,
    fontFamily: "Kanit"
  },
  submitContainer: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 30
  },
  buttonContainer: {
    height: 40,
    width: "100%",
    backgroundColor: "#FC561F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  textButton: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
    fontFamily: "Kanit"
  },
  datepicker: {
    padding: 50
  },
  headForm: {
    fontFamily: 'Kanit',
    fontSize: 16,
    paddingTop: 20
  },
  headdetail: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: "Kanit",
    color: "red"
  },
  textLabel: {
    fontSize: 14,
    fontFamily: 'Kanit'
  }
});

const mapStateToProps = state => {
  return {
    profile : state.profile
  }
}
export default connect(mapStateToProps)(FormAddressRegister);
