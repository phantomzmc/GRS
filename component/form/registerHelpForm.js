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
        <TextInput
          placeholder="ชื่อ"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={firstname => this.setState({ firstname })}
        />
        <TextInput
          placeholder="นามสกุล"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={lastname => this.setState({ lastname })}
        />
        {/* </View> */}
        {/* <View style={styles.addressContainer}> */}
        <TextInput
          placeholder="ความสัมพันธ์"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={relation => this.setState({ relation })}
        />
        <TextInput
          placeholder="หมายเลขโทรศัพท์"
          returnKeyType="next"
          style={styles.textInput}
          onChangeText={tel => this.setState({ tel })}
        />
        {/* </View> */}

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
    paddingHorizontal: 10,
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
  }
});
export default FormAddressRegister;
