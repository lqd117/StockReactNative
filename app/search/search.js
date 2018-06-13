import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  AsyncStorage,
  TextInput,
  FlatList, 
  TouchableOpacity,
} from 'react-native';
import {Icon,List,ListItem} from 'react-native-elements';
import GetExample from './getexample/getexample.js';
import { createStackNavigator } from 'react-navigation'; 
export default class Search extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      text:"",
      data:"1"
    };
  }
  _keyExtractor = (item, index) => index.toString();
  _renderItem=(item) =>{
    return(
      <View>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Details',{Code:item.code})}}>
          <View>
            <Text style={styles.itemname}>{item.name}</Text>
          </View>
          <View>
            <Text style={styles.itemcode}>{item.code}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headertext}>STOCK</Text>
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.textinput}
            keyboardType="twitter"
            onChangeText={(text) => GetExample.getExample(this,text)}
            defaultValue=""
          />
          <Button name="search" color="white" style={styles.button}/>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            extraData={this.state}
            ItemSeparatorComponent={ItemDivideComponent}
            renderItem={({item})=>this._renderItem(item)}
          />
        </View>
        <ItemDivideComponent />
        <View style={styles.footer}>
          <View style={styles.footermybutton}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyStock')}>
              <Text style={styles.footertext}>My</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divide}/>
          <View style={styles.footersearchbutton}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Search')}>
              <Text style={styles.footertext}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
class ItemDivideComponent extends Component{
  render(){
    return(
      <View style={{height:1,backgroundColor:'white'}}/>
    );
  }
}
const Button = (props) => (
  <TouchableOpacity style={[styles.button,props.style]} onPress={()=>{}}>
    <Icon
      name={props.name}
      color={props.color}
      size={30}
    />
  </TouchableOpacity>
)
var BackGroundColor='rgba(0, 6, 9, 1)'
const styles = StyleSheet.create({
  container:{
    flex : 1,
    backgroundColor:BackGroundColor,
  },
  header:{
    alignItems:'center',
    height:80,
    justifyContent:'center',
  },
  headertext:{
    fontSize:40,
    color:'white',
  },
  textinput:{
    color:'white',
    left:20,
    height:40,
    width:340,
    borderColor:'white',
    borderWidth:1,
  },
  search:{
    flexDirection:'row',
  },
  button:{
    left:30,
    backgroundColor:'black',
  },
  itemname:{
    fontSize:30,
    color:'white',
  },
  itemcode:{
    fontSize:15,
    color:'gray',
  },
  footer:{
    flexDirection:'row',
  },
  footermybutton:{
    height:60,
    width:200,
  },
  footersearchbutton:{
    height:60,
    width:200,
  },
  footertext:{
    left:80,
    fontSize:20,
    color:'white',
  },
  flatlist:{
    borderColor:1,
    borderColor:'white',
    height:490,
  },
  divide:{
    height:60,
    width:1,
    backgroundColor:'gray'
  }
})
