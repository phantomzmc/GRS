import React, { Component } from 'react'
// import ReactDOMServer from "react-dom/server";

// import dataCart from '../../data/dataCart'

class MailInvoice extends Component {
    componentWillMount() {
        // const html = ReactDOMServer.renderToString(
        //     <MailInvoice />
        // )
        // console.log(html)
        // this.onShow(html)
    }
        render() {
            return (
                <div>
                    <html>
                        <body style={{ margin: 0, padding: 0 }}>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style={{ textAlign: 'center' }}>
                                        <h3>Order รอการตรวจสอบการชำระเงิน โครงการ</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'center', color: "#FA8601" }}>
                                        <p>ข้อมูลการสั่งของท่านถูกบันทึกลงในระบบเรียบร้อยแล้ว กรุณารอใบยืนยันการสมัครเพื่อนำไปลงทะเบียนรับเสื้อและเบอร์วิ่งในวันที่กำหนด</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <hr style={{ width: '100%', borderColor: "#FA8601" }} />
                                    </td>
                                </tr>
                            </table>
                            <h4 style={{ color: "#FA8601" }}>Invoice #{this.props.idinvoice}</h4>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <th>No.</th>
                                    <th>Name-Lastname</th>
                                    <th>Course</th>
                                    <th>Jersey</th>
                                    <th>Quantity</th>
                                    <th style={{ textAlign: 'center' }}>Total</th>
                                </tr>
                                {/* {dataCart.map((item) =>
                                <tr style={{ textAlign: 'center' }}>
                                    <td>
                                        <p></p>
                                    </td>
                                    <td>{item.Detail}</td>
                                    <td>{item.Size}</td>
                                    <td>{item.Quantity}</td>
                                    <td style={{ textAlign: 'right' }}>{item.Price} บาท</td>
                                </tr>
                            )
                            } */}
                                {/* <tr style={{ textAlign: 'center' }}>
                                <td>
                                    <p></p>
                                </td>
                                <td>{item.Detail}</td>
                                <td>{item.Size}</td>
                                <td>{item.Quantity}</td>
                                <td style={{ textAlign: 'right' }}>{item.Price} บาท</td>
                            </tr> */}

                                <tr style={{ textAlign: 'right' }}>
                                    <td colspan="4">รับเสื้อและเบอร์ที่ : </td>
                                    <td>{this.props.postPrice} บาท</td>
                                </tr>
                                <tr style={{ textAlign: 'right' }}>
                                    <td colspan="4">ค่าธรรมเนียมการใชับัตรเครดิต/เดบิต</td>
                                    <td>{this.props.creditPrice} บาท</td>
                                </tr>
                                <tr style={{ textAlign: 'right' }}>
                                    <td colspan="4"><b>รวมทั้งหมด</b></td>
                                    <td><b>{this.props.price} บาท</b></td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'center', color: "#FA8601" }} colspan="5">
                                        <span>อีเมล์ฉบับนี้เป็นระบบตอบกลับอัตโนมัติ กรุณาอย่าตอบกลับในเมล์นี้
                    หากต้องการความช่วยเหลือเพิ่มเติม โปรดโทรติดต่อ 081-7344644</span>
                                    </td>
                                </tr>
                            </table>
                            <hr style={{ width: '100%', borderColor: "#FA8601" }} />
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style={{ textAlign: 'center' }}>
                                <tr>
                                    <th style={{ color: "#FA8601" }}><b>Shutter Running Image Service</b></th>
                                </tr>
                                <tr>
                                    <td>7 Market Today krungthepkreetra 7 Huamark Bangkepi</td>
                                </tr>
                                <tr>
                                    <td>Bangkok, Thailand 10240</td>
                                </tr>
                                <tr>
                                    <td>Phone:(+66)61 734 4044</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#FA8601" }}>http://shutterrunning.com</td>
                                </tr>
                            </table>
                        </body>
                    </html>
                </div>
            )
        }
    }


    export default MailInvoice