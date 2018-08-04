import React, { Component } from 'react';
import {
    StyleSheet,
    Alert
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import Omise from 'omise-react-native';
Omise.config('pkey_test_596un7xggnyo73nm7an', '2015-11-17');

export default class App extends Component {

    state = {
        number: "4111111111111111",
        name: "thunnathorn",
        expiration_month: "10",
        expiration_year: "2020",
        security_code: "123"
    };

    async _createToken() {
        try {
            const {
                number,
                name,
                expiration_month,
                expiration_year,
                security_code
            } = this.state;

            const data = await Omise.createToken({
                'card': {
                    'name': name,
                    'number': number,
                    'expiration_month': Number(expiration_month),
                    'expiration_year': Number(expiration_year),
                    'security_code': Number(security_code)
                }
            });

            console.log("data", data);

            Alert.alert("Token", "token = " + data.id);
        } catch (err) {
            let error = "";
            console.log("err instanceof Promise", err instanceof Promise);
            if (err instanceof Promise) {
                error = await err;
                error = error.message;
            } else {
                error = err.message;
            }
            console.log("error", error);
            Alert.alert("Error", error);
        } finally {
            this.setState({
                number: "",
                name: "",
                expiration_month: "",
                expiration_year: "",
                security_code: ""
            });
        }
    }
    render() {
        const {
            number,
            name,
            expiration_month,
            expiration_year,
            security_code
        } = this.state;

        return (
            <Container>
                <Header />
                <Content>
                    <Form>
                        <Item inlineLabel>
                            <Label style={styles.label}>Card number</Label>
                            <Input defaultValue={number} onChangeText={(number) => this.setState({ number })} />
                        </Item>
                        <Item inlineLabel>
                            <Label style={styles.label}>Name on card</Label>
                            <Input defaultValue={name} onChangeText={(name) => this.setState({ name })} />
                        </Item>
                        <Item inlineLabel>
                            <Label style={styles.label}>Expiry date</Label>
                            <Input placeholder="MM" maxLength={2}
                                defaultValue={expiration_month}
                                onChangeText={(expiration_month) => this.setState({ expiration_month })} />
                            <Text>/</Text>
                            <Input placeholder="YY" maxLength={2}
                                defaultValue={expiration_year}
                                onChangeText={(expiration_year) => this.setState({ expiration_year })} />
                        </Item>
                        <Item inlineLabel last>
                            <Label style={styles.label}>Security code</Label>
                            <Input maxLength={3} secureTextEntry
                                defaultValue={security_code}
                                onChangeText={(security_code) => this.setState({ security_code })}
                            />
                        </Item>
                        <Button full onPress={this._createToken.bind(this)}>
                            <Text>Create a token</Text>
                        </Button>
                    </Form>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        width: 130
    }
});