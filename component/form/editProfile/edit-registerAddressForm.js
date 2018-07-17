import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { Form, Item, Input, Label } from 'native-base'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux'
import ProvinceForm from '../addressForm-province'
import AmphoeForm from '../addressForm-amphoe'
import TambonForm from '../addressForm-tunporn'


class FormAddressRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      tambon: "",
      amphoe: "",
      country: "",
      postNumber: "",
      province: ""
    };
  }
  componentDidMount = () => {
    let userprofile = this.props.userprofile.userprofile
    this.setState({
      number: userprofile.Address,
      tambon: userprofile.SubDistric,
      amphoe: userprofile.Distric,
      country: userprofile.Country,
      postNumber: userprofile.PostCode,
      province: userprofile.Province
    })
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
            <Image source={require('../../icon/location-pointer.png')}
              style={styles.icon} />

          </View>
          <Text style={styles.titleText}>ที่อยู่</Text>
        </View>
        <Text style={styles.headForm}>บ้านเลขที่</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{number}</Label>
            <Input
              onChangeText={number => this.setState({ number: number })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>ตำบล : {this.state.tambon}</Text>
        <TambonForm
          setTambon={tambon}
          gettumporn={this.passTampon.bind(this)}
        />

        <Text style={styles.headForm}>อำเภอ : {this.state.amphoe}</Text>
        <AmphoeForm
          setAmphoe={amphoe}
          getamphoe={this.passAmphoe.bind(this)}
        />

        <Text style={styles.headForm}>จังหวัด : {this.state.province}</Text>
        <ProvinceForm
          setProvince={province}
          getProvince={this.passProvince.bind(this)}
        />

        <Text style={styles.headForm}>ประเทศ</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{country}</Label>
            <Input
              onChangeText={country => this.setState({ country: country })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>รหัสไปรษณีย์</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{postNumber}</Label>
            <Input
              keyboardType="phone-pad"
              onChangeText={postNumber => this.setState({ postNumber: postNumber })}
            />
          </Item>
        </Form>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              this.sendData(number, tambon, amphoe, province, country, postNumber)
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
const mapStateToProps = state => {
  return {
    address: state.address,
    userprofile: state.userprofile
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
    fontFamily: "kanit",
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
    fontFamily: "kanit"
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
    fontFamily: "kanit"
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
    fontFamily: "kanit"
  },
  datepicker: {
    padding: 50
  },
  headForm: {
    fontFamily: 'kanit',
    fontSize: 16,
    paddingTop: 20
  },
  textLabel: {
    fontSize: 14,
    fontFamily: 'kanit'
  }
});
export default connect(mapStateToProps)(FormAddressRegister);
