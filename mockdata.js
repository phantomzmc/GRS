import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios'

var uri = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspGetProvinceSuggestion"
var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='

class MultiSelectExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItems: [],
            items: [],
            text: ""
        }

    };
    componentDidUpdate() {
        let { items, text } = this.state
        let data = ({
            params: {
                value: "เช",
            }
        })
        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": sessionToken,
                "Authorization": auth
            },
            responseType: 'json'
        })
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false, items: responseJson.data });
                console.log(responseJson.data)
            }).catch((error) => {
                console.error(error);
            });
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
        
    };

    render() {
        const { selectedItems , items } = this.state;
        const allItems = items
        return (
            <View style={{ flex: 1 }}>
                {allItems.map(items =>                 
                <MultiSelect
                    hideTags
                    items={this.state.items}
                    uniqueKey="Value"
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Pick Items"
                    searchInputPlaceholderText="Search Items..."
                    onChangeInput={(text) => console.log(text)}
                    altFontFamily="kanit"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Submit"
                />)}

                <View>
                    <Text>{this.state.selectedItems}</Text>
                </View>
            </View>
        );
    }
}
export default MultiSelectExample
