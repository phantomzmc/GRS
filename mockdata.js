import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, View, Text, WebView } from 'react-native'
import MailGunSend from './config/send-mailgun'
import TempleteMail from './component/templete/mail_invoice'

const data2 = []
export default class App extends Component {

  state = {
    name: "TEst โครงการ",
    data: [
      {
        id: 1,
        name: "thunnathorn",
        course: "4km",
        jersey: "M-4k",
        qty: 1,
        total: 500
      },
      {
        id: 2,
        name: "Yuvasin",
        course: "10km",
        jersey: "XL-4k",
        qty: 1,
        total: 1500
      }
    ],
    str: JSON.stringify(data2)
  }

  componentDidMount() {
    this.loopTable()
    // setTimeout(()=>{
    //   this.sendEmailInvoice()
    // },2000)
  }
  async sendEmailInvoice(str) {
    const strTable = str.toString()
    const data = await MailGunSend.onSendInvoice({
      'from': 'Guurun Support Team. <support@guurun.com>',
      'to': 'phantomzmc@gmail.com',
      'subject': 'Guurun Support Team รหัสในการยืนยันตัวตน',
      'text': 'สวัสดีคุณ ',
      'html': '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td,th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}#hr {color: #FC561F;text-align: center;}h4{color: #FC561F}#textRigth {text-align: right;}h2{text-align: center; }</style><title>OrderInvoice</title></head><body><h2>Order รอการชำระเงิน โครงการ ' + this.state.name + '</h2><p id="hr">ข้อมูลการสมัครของท่านถูกบันทึกลงในระบบเรียบร้อยแล้ว กรุณารอใบยืนยันการสมัครเพื่อนำไปลงทะเบียนรับเสื้อและเบอร์วิ่งในวันเวลาที่กำหนด</p><hr id="hr"><table><tr><th>No.</th><th>Name-Lastname</th><th>Course</th><th>Jersey</th><th>Qty</th><th>Total</th></tr>' + strTable + '<tr><td colspan="5" id="textRigth">รับเสื้อ</td><td id="textRigth">0.00</td></tr><tr><td colspan="5" id="textRigth">ค่าธรรมเนียม</td><td id="textRigth">0.00</td></tr><tr><td colspan="5" id="textRigth">All Total</td><td id="textRigth">500.00</td></tr></table><p id="hr">อีเมล์ฉบับนี้เป็นระบบอัตโนมัติ กรุณาอย่าตอบกลับในอีเมล์นี้ หากต้องการความช่วยเหลือเพิ่ม โปรดติดต่อฝ่ายรับสมัคร</p><hr id="hr"><h4>Shutter Running Services</h4><p>7 Market Today krungthepkreetra 7 Huamark</p><p>Bangkapi</p><p>Bangkok, Thailand 10240 Phone: (+66) 2 111 2201 http://shutterrunning2014.com</p></body></html>'
    })
    console.log(data)
    alert(data)
  }
  showView(html) {
    console.log(html)
  }
  loopTable() {
    const { data } = this.state
    for (i = 0; i <= data.length - 1; i++) {
      str = ""
      strTable = '<tr><td>1</td><td>' + data[i].name + '</td><td>' + data[i].course + '</td><td>' + data[i].jersey + '</td><td>' + data[i].qty + '</td><td id="textRigth">' + data[i].total + '</td></tr>'
      data2.push(strTable)
    }
    setTimeout(() => {
      this.atToString()
    }, 1000)
  }
  atToString() {
    for (i = 0; i <= data2.length - 1; i++) {
      str = str + data2[i]
    }
    setTimeout(() => {
      console.log(str)
      this.sendEmailInvoice(str)
    }, 1000)
  }
  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => this.sendEmailInvoice()}>
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