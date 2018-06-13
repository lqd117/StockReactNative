
import React,{Component } from 'react';
import {
    Text,
    FlatList,
    StyleSheet,
    View,
    Image,
    Button,
    Alert,
    TouchableOpacity ,
    SwipeableFlatList,
    TouchableHighlight,
    
} from 'react-native';
import { createStackNavigator } from 'react-navigation'; 
import FlatItem from './FlatItem.js';
import Storage from '../storage/storage.js';
const users = [
  {
      login : 'mojombo',
      key : 'Tom ' ,
      location : 'San '
  } , {
      login : 'defunkt' ,
      key: 'Chris' ,
      location : 'Francisco'
  } , {
      login : 'pjhyett' ,
      key: 'PJ ' ,
      location : 'cisco'
  } ,
]

export default class MyStock extends Component{
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      allComplete: false,
      value: "",
      data: [{"resultcode":"",
        "reason":"",
        "result":[{"data":{},"dapandata":{},"gopicture":{}}]},
      ],
    }
  }
  componentWillMount() {
    Storage.getData(this)
  }
  _keyExtractor = (item, index) => index.toString();
  render(){
      return (
          <View style={styles.container}>
            <View style={styles.appname}>
              <Text style={styles.appnametxt} > STOCK </Text>
            </View>
            <View style={styles.flatlist}>
             <SwipeableFlatList
                  data={this.state.data}
                  renderItem={({item})=>this._renderItem(item)}
                  keyExtractor={this._keyExtractor}
                  ItemSeparatorComponent={this._ItemSeparatorComponent}
                  ListHeaderComponent={this._ListHeaderComponent}
                  ListFooterComponent={this._ListFooterComponent}
                  extraData={this.state}
                  renderQuickActions={({item})=>this.getQuickActions(item)}//创建侧滑菜单
                  maxSwipeDistance={80}//可展开（滑动）的距离
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
  _renderItem=(item)=>{
    return (
      <TouchableHighlight onPress={()=>this.props.navigation.navigate('Details',{Code:item.result[0].data.gid})}>
        <FlatItem
         name={item.result[0].data.name}  
         code={item.result[0].data.gid}
         increPer={item.result[0].data.increPer}
         curPri={item.result[0].data.nowPri} 
         />
      </TouchableHighlight>
    )
  }
  _ItemSeparatorComponent=()=>{
      return <View style={{height:2,backgroundColor:'grey'}}/>;
  }
  _ListHeaderComponent=() => {
    return (
      <View style={styles.title}>
        <Text style={styles.txt}> name&code </Text>
        <Text style={styles.txt}> increPre </Text>
        <Text style={styles.txt}> Current Price</Text>
      </View>
    );
  }
  _ListFooterComponent=() =>{
    return (
      <TouchableOpacity style={styles.foot}  activeOpacity={0.8} onPress={()=> this.props.navigation.navigate('Search')} >
        <Text style={{color:'white',fontSize:20,}  }> ADD STOCK </Text>
        <Image source={require('./add.png')} style={styles.add} />
      </TouchableOpacity>
    );
  }
  getQuickActions=(item)=>{
    return( <View style={styles.quickAContent}>
                <TouchableHighlight onPress={(index)=>this.delete(item)}>                                       
                    <View style={styles.quick}>
                        <Text style={styles.delete}>Delete</Text>
                    </View>
                </TouchableHighlight>
          </View>
      ); 
   }
  delete = (item) =>{
      var tmp = this.state.data;
      Storage.clear(item.result[0].data.gid)
      var id = -1
      for(let i in tmp){
        if(tmp[i] === item){
          id = i
          break
        }
      }
      tmp.splice(id,1)
      this.setState({ data:tmp})  
  }

};
 
class ItemDivideComponent extends Component{
  render(){
    return(
      <View style={{height:1,backgroundColor:'white'}}/>
    );
  }
}


const styles=StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'black',
  },
  title:{
    flex:3,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    height:45,
    borderBottomWidth:1,
    borderBottomColor:'grey',   
  },
  txt:{
    color:'white',
    fontSize:20,
  },
  appnametxt:{
    color:'white',
    fontSize:40, 
  },
  appname:{
    alignItems:'center',
    justifyContent:'center',
    height:80,
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'grey',
  },
  more:{
    width:40,
    height:40,
  },
  foot:{
    height:80,
    alignItems:'center',
    justifyContent:'space-around',
    borderTopWidth:1,
    borderTopColor:'grey',
    borderBottomWidth:1,
    borderBottomColor:'grey',
  },
  add:{
    width:30,
    height:30,
  },
  quickAContent:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  quick:{
    backgroundColor:"#ff1d49",
    flex:1,
    alignItems:'flex-end',//水平靠右
    justifyContent:'center',//上下居中
    width:80,
    elevation:5,//漂浮的效果
  },
  delete:{
    color:"#d8fffa",
    marginRight:5,
    fontSize:20,
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
  divide:{
    height:60,
    width:1,
    backgroundColor:'gray'
  },
  flatlist:{
    borderColor:1,
    borderColor:'white',
    height:530,
  },
});

