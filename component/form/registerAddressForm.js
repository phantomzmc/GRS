import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SegmentedControlIOS,
  TouchableOpacity,
  DatePickerIOS,
  Image
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Form, Item, Input, Label } from 'native-base'


class FormAddressRegister extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      t: "",
      a: "",
      city: "",
      country: "",
      postNumber: ""
    };
  }

  sendData = (number, t, a, city, country, postNumber) => {
    this.props.goEvent(number, t, a, city, country, postNumber);

  };

  render() {
    let { number, t, a, city, country, postNumber } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contectTitle}>
          <View style={styles.textTitle}>
            <Image source={require('../icon/location-pointer.png')}
              style={styles.icon} />

          </View>
          <Text style={styles.titleText}>ที่อยู่</Text>
        </View>
        <Text style={styles.headForm}>บ้านเลขที่</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.123/45</Label>
            <Input
              onChangeText={number => this.setState({ number })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>ตำบล</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.ตำบล</Label>
            <Input
              onChangeText={t => this.setState({ t })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>อำเภอ</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.อำเภอ เมือง</Label>
            <Input
              onChangeText={a => this.setState({ a })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>จังหวัด</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.กรุงเทพฯ</Label>
            <Input
              onChangeText={city => this.setState({ city })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>ประเทศ</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.ไทย</Label>
            <Input
              onChangeText={country => this.setState({ country })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>รหัสไปรษณีย์</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.10160</Label>
            <Input
              onChangeText={postNumber => this.setState({ postNumber })}
            />
          </Item>
        </Form>

        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() =>
              this.sendData(number, t, a, city, country, postNumber)
            }
          >
            <Text style={styles.textButton}>ถัดไป</Text>
          </TouchableOpacity>
        </View>
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
export default FormAddressRegister;
