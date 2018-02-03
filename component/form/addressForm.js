import React, { Component } from 'react';
import { View, Text,TextInput, StyleSheet  } from 'react-native';

class AddressForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
            placeholder = "ชื่อ - นามสกุล"
            style={styles.input}
        /> 
        <TextInput 
            placeholder = "Email"
            style={styles.input}
        />
        <TextInput 
            placeholder = "ที่อยู่"
            style={styles.input}
        />
        <TextInput 
            placeholder = "เบอร์โทรศัพท์"
            style={styles.input}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create ({
    container : {
        padding: 30,
    },
    input: {
        height: 40,
        paddingHorizontal: 30,
        borderColor: '#FC561F',
        borderRadius: 10,
        borderWidth: 1.5,
        marginBottom: 20,
    },
})

export default AddressForm;
