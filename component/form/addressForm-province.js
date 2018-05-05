import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Form, Input, Label, Item } from "native-base";
import SearchInput, { createFilter } from 'react-native-search-filter';
import axios from 'axios'
const KEYS_TO_FILTERS = ['Value'];

var uri = "http://api.shutterrunning2014.com/api/v2/grsv2m/_proc/Main.uspGetProvinceSuggestion"
var api_key = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88'
var sessionToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsInVzZXJfaWQiOjQsImVtYWlsIjoiYWR' +
    'taW5AZ3V1cnVuLmNvbSIsImZvcmV2ZXIiOmZhbHNlLCJpc3MiOiJodHRwOlwvXC9hcGkuc2h1dHRlcnJ' +
    '1bm5pbmcyMDE0LmNvbVwvYXBpXC92MlwvdXNlclwvc2Vzc2lvbiIsImlhdCI6MTUyMDU0NDU5MSwiZXh' +
    'wIjoxNTIwNTQ4MTkxLCJuYmYiOjE1MjA1NDQ1OTEsImp0aSI6IjA1Y2UzN2NjMmU2NjIyZGJlNmMzNTg' +
    '5MzE1NTI0YmZjIn0._7jHjGhTPfa3rVioC2MrjJfLwrMMxYQYiWhe8DK5V7k'
var auth = 'Basic YWRtaW5AZ3V1cnVuLmNvbTpXWGJyRDI4THRJUjNNWW0='

export default class App extends Component {
    static propTypes = {
        searchTerm: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            emails: [],
            data: "",
            city: "",
            isItems: true
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.searchTerm && prevState.searchTerm) {
            this.timer = setTimeout(() => {
                this.loadData()
            }, 2000)
        }
    }
    loadData = () => {
        let { emails, searchTerm } = this.state
        let data = ({
            params: {
                value: this.state.searchTerm,
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
            .then((responseJson) => {
                this.setState({ isLoading: false, emails: responseJson.data });
                console.log(this.state.emails)
            }).catch((error) => {
                console.error(error);
            });
    }
    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }
    render() {
        let { emails, isItems} = this.state
        const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
        return (
            <View style={styles.container}>
                <Form style={styles.searchInput}>
                    <Item floatingLabel>
                        <Label>{this.state.city}</Label>
                        <Input
                            onChangeText={(term) => { this.searchUpdated(term) }}
                        />
                    </Item>
                </Form>
                {this.state.isItems &&
                    <ScrollView style={styles.list}>
                        {filteredEmails.map(email => {
                            return (
                                <TouchableOpacity onPress={() => this.setState({ city: email.Value, isItems : false })}
                                    key={email.Value} style={styles.emailItem}>
                                    <View>
                                        <Text>{email.Value}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    emailItem: {
        padding: 10
    },
    emailSubject: {
        color: 'rgba(0,0,0,0.5)'
    },
    searchInput: {
        width: "80%",
        padding: 10,
    },
    list: {
        width: "50%"
    }
});