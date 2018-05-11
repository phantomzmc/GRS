import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Icon } from 'native-base';

import { connect } from 'react-redux'
import dataEvent from '../listevent/data'

class HistoryList extends Component {
    constructor(state) {
        super(state)
        this.state = {

        }
    }
    componentDidMount = () => {
        this.setState({
            dataSource: dataEvent
        })
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.state.dataSource}
                    renderItem={({ item }) =>
                        <View style={styles.container}>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{ uri: item.pic }} />
                                        <Body>
                                            <Text>{item.name}</Text>
                                            <Text note>{item.date} - {item.month}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                {/* <CardItem>
                                    <Left>
                                        <Button transparent>
                                            <Icon active name="thumbs-up" />
                                            <Text>12 Likes</Text>
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Button transparent>
                                            <Icon active name="chatbubbles" />
                                            <Text>4 Comments</Text>
                                        </Button>
                                    </Body>
                                    <Right>
                                        <Text>11h ago</Text>
                                    </Right>
                                </CardItem> */}
                            </Card>

                        </View>}
                    keyExtractor={(item, index) => index} />
            </View >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        friendlist: state.friendlist
    }
}

const styles = StyleSheet.create({

})

export default connect(mapStateToProps)(HistoryList)

