import React, { Component } from 'react';
var pattern = require('./allstock.json')
export default class GetExample extends Component {
  static _check(substring,pattern){
    if(substring === null){
      return []
    }else{
      var tmp = []
      const arr = pattern
      var count = 0
      for(let ele in arr){
        var id = 0 
        for(let i = 0;i < ele.length;i++){
          if(ele[i] === substring[id]){
            id++
          }
          if(id === substring.length){
            break
          }
        }
        if(id === substring.length){
          tmp.push({"name":ele,"code":arr[ele]})
          count += 1
        }
        if(count >= 10)
          break
      }
      return tmp
    }
  }
  static _getExample(props,substring){
    const that = props
    that.setState({
      data:GetExample._check(substring,pattern)
    })
  }
  static getExample(props,substring){
    GetExample._getExample(props,substring)
  }
  fun(text1){
    this.setState({
      text:text1
    })
  }
}
