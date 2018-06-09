import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  AsyncStorage
} from 'react-native';

const {width, height} = Dimensions.get('window');


var data = "111";
const AsyncStorageKey = "AS_";
export default class Storage extends Component {


  static _setData(text){
    AsyncStorage.setItem(AsyncStorageKey,text,()=>{});
  }
  static _getData(props) {
    const that = props
    AsyncStorage.getItem(AsyncStorageKey,function(error,text){
      if(text === null){
        that.setState({
          data:[]
        })
        return
      }
      var arr = text.split(",")
      for(let i in arr){
        fetch(`http://101.201.34.183/${arr[i]}.json`)
        .then(function(response){
          return response.json()
        })
        .then(function(response){
          that.setState({
            data:data+JSON.stringify(response)
          })
        })
        .catch(function(err){
          console.error(err)
        })
      }
    })
  }
 
  static _addData(text1){
    AsyncStorage.getItem(AsyncStorageKey,function(error,text){
      if(text === null){
        Storage.setData(text1)
      }else{
        var arr=text.split(",")
        arr.push(text1)
        Storage.setData(arr.join(","))
      }
      
    })
  }
  
  static _clear(text1){
    AsyncStorage.getItem(AsyncStorageKey,function(error,text){
      if(text === null) return
      else{
        var arr = text.split(",")
        var id = -1
        for(let i in arr){
          if(arr[i] === text1){
            id = i
            break
          }
        }
        if(id !== -1)arr.splice(id,1)
        Storage._setData(arr.join(","))
      }
    })
  }

  static setData(text){
    Storage._setData(text)
  }
  static getData(props){
    Storage._getData(props)
  }
  static addData(text){
    Storage._addData(text)
  }
  static clear(text){
    Storage._clear(text)
  }
  static clearall(){
    Storage._setData("")
  }
}