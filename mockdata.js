import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native'
import MailGunSend from './config/send-mailgun'


export default class App extends Component {

  componentDidMount() {
    this.sendEmailInvoice()
  }
  async sendEmailInvoice() {
    const data = await MailGunSend.onSendInvoice({
      'from': 'Guurun Support Team. <support@guurun.com>',
      'to': 'phantomzmc@gmail.com',
      'subject': 'Guurun Support Team รหัสในการยืนยันตัวตน',
      'text': 'สวัสดีคุณ ',
      'html': '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta name="viewport" content="width=device-width" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Billing e.g. invoices and receipts</title><link href="styles.css" media="all" rel="stylesheet" type="text/css" /> </head><body><center><h1>Test</h1></center></body></html>'
    })
    console.log(data)
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => this.sentVerifyCode.bind(this)}>
          <Text>Test Email</Text>
        </TouchableHighlight>
      </View>
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