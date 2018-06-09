import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  AsyncStorage
} from 'react-native';

import Storage from './app/storage/storage.js'
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state.data)}</Text>
        <TouchableHighlight onPress={()=>Storage.addData('temp')}>
          <Text>增加</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Storage.getData(this)}>
          <Text>更新</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Storage.clearall()}>
          <Text>清除所有</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>Storage.clear('temp')}>
          <Text>清除</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
