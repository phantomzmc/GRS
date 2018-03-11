/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity,Alert } from 'react-native';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataItem: [],
      value : {}
    }
  }

  componentDidMount() {
    return fetch("http://api.shutterrunning2014.com/api/v2/grsv2m/_table/Main.Events",
      {
        method: "GET",
        headers: {
          "X-DreamFactory-API-Key": '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88',
          "X-DreamFactory-Session-Token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWRtaW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXhwIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k',
          "Authorization": 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataItem: responseJson.resource,
          isLoading: false
        }),
          console.log(this.state.dataItem)
        console.log(this.state.name)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  alert = (item) => {
    Alert.alert (item.EventName)
    this.setState({ value : item})
    console.log(this.state.value)
  }
  render() {


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }} >
      <Text></Text>
        <FlatList
          data={this.state.dataItem}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={this.alert.bind(this,item)}>
              <Text>{item.EventName}, {item.EventDate}</Text>
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => index}
        />
      </View >
    );
  }
}
