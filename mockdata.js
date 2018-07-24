import React, { Component } from 'react'
import { View, Text,FlatList} from 'react-native'
class TestList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:
        [{
          "RunnerID": "16838",
          "CourseID": "6",
          "JerseySize": "L",
          "PhotoPlusService": "0",
          "PromoCode": "AAI7364",
          "CourseFee": "100"
        },
        {
          "RunnerID": "7347",
          "CourseID": "6",
          "JerseySize": "L",
          "PhotoPlusService": "0",
          "PromoCode": "",
          "CourseFee": "150"
        },
        {
          "RunnerID": "16838",
          "CourseID": "6",
          "JerseySize": "L",
          "PhotoPlusService": "0",
          "PromoCode": "AAI7364",
          "CourseFee": "100"
        },
        {
          "RunnerID": "7347",
          "CourseID": "6",
          "JerseySize": "L",
          "PhotoPlusService": "0",
          "PromoCode": "",
          "CourseFee": "150"
        }],
      data3: [],
      courseid: [],
      text1: ""

    }
  }
  componentDidMount() {
    let runnerid, courseid = {}
    let data3 = {}
    var myString = JSON.stringify(this.state.data)
    this.setState({ text1: myString })
    data2 = this.state.data.map((item) => {
      runnerid = item.RunnerID
      courseid = item.CourseID
      size = item.JerseySize
      photoplus = item.PhotoPlusService
      promo = item.PromoCode
      fee = item.CourseFee
      obb = ("{\"RunnerID\":\"" + runnerid + "\",\"CourseID\":\"" + courseid + "\",\"JerseySize\":\"" + size + "\",\"PhotoPlusService\":\"" + photoplus + "\",\"PromoCode\":\"" + promo + "\",\"CoursePrice\":\"" + fee + "\"}")
      data3 = obb
      console.log(data3)

    })
  }

  render() {
    var myString = JSON.stringify(this.state.data)

    return (
      <View>
        <FlatList
          data={this.state.data}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View>
            <Text>{item.RunnerID}</Text>
            <Text>{item.CourseID}</Text>
          </View>
          }
          keyExtractor={item => item.RunnerID}
        />
      </View>
    )
  }
}

export default TestList