import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import ListFriendDistance from '../list/event/listFriendDistance'
import ListShirth from '../list/listShirt/listShirt'
import DropDownShirth from '../list/listShirt/dropdownShirt'

class CradFriendDistance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            container: true,
            distance: false,
            sizeShirth: false,
            items: [],
            iconName: "arrow-forward",
            dataDis: []
        }
    }
    componentDidMount() {
        this.setState({ items: this.props.distance })
    }
    passDistance(item) {
        let { dataDis } = this.state
        this.setState({ dataDis: item })
    }
    chageIcon = () => {
        const { iconName } = this.state
        if (iconName == "arrow-forward") {
            this.setState({ iconName: "arrow-down" })
        }
        else if (iconName == "arrow-down") {
            this.setState({ iconName: "arrow-forward" })
        }
    }
    render() {
        const { items } = this.state
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: items.imgAvatar }} />
                        <Body>
                            <Text>{items.name}</Text>
                            <Text note>{items.gen} -  {items.age}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <TouchableOpacity onPress={() => this.setState({ container: !this.state.container })}
                            onPressIn={() => this.chageIcon()}>
                            <Icon name={this.state.iconName} />
                        </TouchableOpacity>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        {this.state.container &&
                            <View style={styles.listDistance}>
                                <View style={styles.dropdownstyle}>
                                    <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                                        <Left>
                                            <Text style={styles.labelTitle}>ระยะทาง : {this.state.dataDis.name} {this.state.dataDis.distance}</Text>
                                        </Left>
                                        <Right>
                                            <TouchableOpacity onPress={() => this.setState({ distance: !this.state.distance })}
                                                onPressIn={() => this.chageIcon()}>
                                                <Icon name={this.state.iconName} style={{ fontSize: 20 }} />
                                            </TouchableOpacity>
                                        </Right>
                                    </View>
                                    {this.state.distance && <ListFriendDistance getDistance={this.passDistance.bind(this)}/>}

                                    <View style={{ flexDirection: 'row' }}>
                                        <Left>
                                            <Text style={styles.labelTitle}>ขนาดไซค์เสื้อ</Text>
                                        </Left>
                                        <Right>
                                            <TouchableOpacity onPress={() => this.setState({ sizeShirth: !this.state.sizeShirth })}
                                                onPressIn={() => this.chageIcon()}>
                                                <Icon name={this.state.iconName} style={{ fontSize: 20 }} />
                                            </TouchableOpacity>
                                        </Right>
                                    </View>
                                    {this.state.sizeShirth && <ListShirth />}

                                </View>
                            </View>
                        }
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent warning>
                            <Icon name="ios-checkmark-circle" />
                            <Text>Photo + Service</Text>
                        </Button>
                    </Left>
                </CardItem>
            </Card>

        );
    }
}

const styles = StyleSheet.create({
    listDistance: {
        width: '100%',
        // justifyContent: 'center'
    },
    textLabelSize: {
        fontFamily: 'Kanit'
    },
    dropdownstyle: {
        flexDirection: 'column',

    },
    labelTitle: {
        fontFamily: 'kanit',
        fontSize: 16
    }

})

export default CradFriendDistance