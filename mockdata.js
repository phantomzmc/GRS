import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Button } from 'react-native'
import QRCode from 'react-native-qrcode-svg'


export default class App extends Component {
  handlePress = () => {
    this.qrcode.toDataURL(this.callback)
  }
  callback = (dataURL) => {
    alert(dataURL)
  }
  render () {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <QRCode value='thunnathorn' />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            size={200}
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            color='blue'
            backgroundColor='yellow'
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            logoSize={50}
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            logoMargin={10}
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            logoBorderRadius={15}
          />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            logoBackgroundColor='blue'
            getRef={(c) => (this.qrcode = c)}
          />
          <Button title={'getDataURL'} onPress={this.handlePress} />
        </View>
        <View style={styles.section}>
          <QRCode
            value='hello world'
            ecl='H'
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 15,
    paddingBottom: 15
  },
  section: {
    marginTop: 15,
    marginBottom: 15
  }
})