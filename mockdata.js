import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Easing,
  TouchableHighlight
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, View } from 'native-base';

import Drawer from 'react-native-drawer-menu';

const { width, height } = Dimensions.get('window');

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      disabled: !this.state.disabled
    });
  }
  render() {
    var leftDrawerContent = (<View style={styles.drawerContent}>
      <View style={styles.leftTop} />
      <View style={styles.leftBottom}>
        <View><Text>Left</Text></View>
        <View><Text>Drawer</Text></View>
        <View><Text>Content</Text></View>
      </View>
    </View>);
    var rightDrawerContent = (<View style={styles.drawerContent}>
      <View style={styles.leftTop} />
      <View style={styles.leftBottom}>
        <View style={{ flexDirection: "row" }}>
          <Icon name='user-circle' type='FontAwesome' style={{ fontSize: 15 }} />
          <Text style={styles.item_menu}> ข้อมูลส่วนตัว</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name='group' type='FontAwesome' style={{ fontSize: 15 }} />
          <Text style={styles.item_menu}> Friends List</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name='edit' type='FontAwesome' style={{ fontSize: 15 }} />
          <Text style={styles.item_menu}> ลงทะเบียน</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name='history' type='FontAwesome' style={{ fontSize: 15 }} />
          <Text style={styles.item_menu}> History</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon name='log-out' type='Entypo' style={{ fontSize: 14 }} />
          <Text style={styles.item_menu}> ออกจากระบบ</Text>
        </View>
      </View>
    </View>);
    return (
      <Drawer
        ref={(comp) => { this.drawer = comp; }}
        style={styles.container}
        drawerWidth={width}
        leftDrawerContent={leftDrawerContent}
        rightDrawerContent={rightDrawerContent}
        type={Drawer.types.Overlay}
        customStyles={{
          leftDrawer: styles.leftDrawer,
          rightDrawer: styles.rightDrawer
        }}
        drawerWidth={300}
        disabled={this.state.disabled}
        drawerPosition={Drawer.positions.Both}
        easingFunc={Easing.ease}
      >
        <View style={styles.content}>
          <View style={styles.head} />
          <Text onPress={() => { console.log(2); }}>{width} {height}</Text>
          <Text>{Object.values(Drawer.positions).join(' ')}</Text>
          <Text>{Object.values(Drawer.types).join(' ')}</Text>
          <TouchableHighlight
            style={styles.btn1}
            underlayColor="#c33d19"
            onPress={() => { this.drawer && this.drawer.openLeftDrawer(); }}>
            <Text style={styles.btnText}>Open Left Drawer</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn2}
            underlayColor="#118d95"
            onPress={() => { this.drawer && this.drawer.openRightDrawer(); }}>
            <Text style={styles.btnText}>Open Right Drawer</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn2}
            underlayColor="#118d95"
            onPress={this.toggle}>
            <Text style={styles.btnText}>Enable / Disable Drawer</Text>
          </TouchableHighlight>
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    position: 'absolute',
    backgroundColor: '#2ba'
  },
  head: {
    height: 60,
    marginBottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#6a0d45'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#e3b8cb'
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftTop: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: '#8ad8dd'
  },
  leftBottom: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f0f0f0'
  },
  leftDrawer: {
    borderRightWidth: 4,
    borderRightColor: '#5b585a'
  },
  rightDrawer: {
    borderLeftWidth: 4,
    borderLeftColor: '#5b585a'
  },
  btn1: {
    marginTop: 10,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: '#f06355'
  },
  btn2: {
    marginTop: 10,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: '#37b9d5'
  },
  btnText: {
    fontSize: 14,
    color: '#f0f0f0'
  },
  item_menu: {
    fontFamily: "kanit",
    fontSize: 12,
  }
});

export default Test