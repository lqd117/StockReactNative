import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  AsyncStorage
} from 'react-native';



const AsyncStorageKey = "AS_";
export default class Storage extends Component {
  static _setData(text){
    AsyncStorage.setItem(AsyncStorageKey,text,()=>{});
  }
  static _push(arr,response){
    arr.push(response)
    return arr
  }
  static async  _asyncfetch(arr,props){
    const that = props
    try {
      for(let i in arr){
        var arr1 = that.state.data
        await fetch(`http://101.201.34.183:80/stock?code=${arr[i]}`)
        .then(function(response){
          return response.json()
        })
        .then(function(response){
          that.setState({
            data:Storage._push(arr1,response)
          })
        })
        .catch(function(err){
          console.error(err)  
        })
      }
    } catch(error) {
      console.error(error);
    }
  }
  static _getData(props) {
    const that = props
    AsyncStorage.getItem(AsyncStorageKey,function(error,text){
      if(text === null)
        return
      that.setState({
        data:[]
      })
      var arr = text.split(",")
      Storage._asyncfetch(arr,that)  
    })
  }
 
  static _addData(text1){
    AsyncStorage.getItem(AsyncStorageKey,function(error,text){
      if(text === null){
        Storage._setData(text1)
      }else{
        var arr=text.split(",")
        arr.push(text1)
        Storage._setData(arr.join(","))
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
  static _check(props,code){

    AsyncStorage.getItem(AsyncStorageKey,function(error,text){
      if(text === null){
        props.setState({flag:'1'})
      }else{
        var arr = text.split(",")
        var id = 0
        for(let i in arr){
          if(arr[i] === code){
            id = 1
            break
          }
        }
        if(id === 1){
          props.setState({flag:'0'})
        }else{
          props.setState({flag:'1'})
        }
      }
    })
  }
  static getData(props){
    Storage._getData(props)
  }
  static addData(text){//stock code
    Storage._addData(text)
  }
  static clear(text){//stock code
    Storage._clear(text)
  }
  static clearall(){
    Storage._setData("")
  }
  static check(props,code){
    Storage._check(props,code)
  }
}