import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Picker
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
      firstname: "",
      lastname: "",
      relation: "",
      tel: ""
    };
  }

  sendData = (firstname, lastname, relation, tel) => {
    this.props.goEvent(firstname, lastname, relation, tel);
  };

  render() {
    let { firstname, lastname, relation, tel } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contectTitle}>
          <View style={styles.textTitle}>
            <Image
              source={require("../icon/heartbeat.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.titleText}>กรณีฉุกเฉิน</Text>
        </View>
        {/* <View style={styles.addressContainer}> */}
        <Text style={styles.headForm}>ชื่อ-นามสกุล</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.ชื่อ</Label>
            <Input
              onChangeText={firstname => this.setState({ firstname })}
            />
          </Item>
        </Form>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.นามสกุล</Label>
            <Input
              onChangeText={lastname => this.setState({ lastname })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>หมายเลขโทรศัพท์</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>Ex.090-xxxxxx</Label>
            <Input
              onChangeText={tel => this.setState({ tel })}
            />
          </Item>
        </Form>
        <Text style={styles.headForm}>ความสัมพันธ์</Text>
        <Form>
          <Item floatingLabel last>
            <Label style={styles.textLabel}>{this.state.relation}</Label>
            <Input
              onChangeText={relation => this.setState({ relation })}
            />
          </Item>
        </Form>
        <View style={styles.viewPicker}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.relation}
            onValueChange={(itemValue, itemIndex) => this.setState({ relation: itemValue })} >
            <Picker.Item label="ความสัมพันธ์" value="ความสัมพันธ์" />
            <Picker.Item label="พ่อแม่" value="พ่อแม่" />
            <Picker.Item label="ญาติ" value="ญาติ" />
            <Picker.Item label="เพื่อน" value="เพื่อน" />
          </Picker>
        </View>


        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.sendData(firstname, lastname, relation, tel)}
          >
            <Text style={styles.textButton}>ยืนยัน</Text>
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
    backgroundColor: "#fc561f",
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
    color: "#fc561f"
  },
  contectTitle: {
    alignItems: "center"
  },
  icon: {
    width: 25,
    height: 25
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
  viewPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  picker: {
    alignContent: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '30%'
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
