//股票详情页
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Detail from './components/detail.js';  
import Chart from './components/charts.js'; 
import {PullView} from 'react-native-pull';
import {Icon} from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'; 
import Storage from '../storage/storage.js';

class Details extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      flag:'',
      refreshing: false,
      cur:{"resultcode":"",
        "reason":"",
        "result":[{"data":{},"dapandata":{},"gopicture":{}}]},
      };
    this.onPullRelease = this.onPullRelease.bind(this);
    this.topIndicatorRender = this.topIndicatorRender.bind(this);
  }
  componentWillMount() {
    const { navigation } = this.props;
    const Code = navigation.getParam('Code', 'NO-ID');
    this.getdata(Code)
    Storage.check(this,Code)
  }
  onPullRelease(resolve) {
    setTimeout(() => {
            resolve();
        }, 3000);
  }

  topIndicatorRender(pulling, pullok, pullrelease) {
    const hide = {position: 'absolute', left: Dimensions.get('window').width/2};
    const show = {position: 'relative', left: 0};
    setTimeout(() => {
        if (pulling) {
            this.txtPulling && this.txtPulling.setNativeProps({style: show});
            this.txtPullok && this.txtPullok.setNativeProps({style: hide});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
        } else if (pullok) {
            this.txtPulling && this.txtPulling.setNativeProps({style: hide});
            this.txtPullok && this.txtPullok.setNativeProps({style: show});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
        } else if (pullrelease) {
            this.txtPulling && this.txtPulling.setNativeProps({style: hide});
            this.txtPullok && this.txtPullok.setNativeProps({style: hide});
            this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
        }
    }, 1);
    return (
          <View style={styles.pulling}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        );
  }
  getdata(Code){
    const that = this
    fetch(`http://101.201.34.183:80/stock?code=${Code}`)
    .then(function(response){
      return response.json()
    })
    .then(function(response){
      if(response.reason === "SUCCESSED!"){
        that.setState({
          cur:response
        })
      }else{
        alert('sorry,we have on data')
        that.props.navigation.navigate('Search')
      }
    })
    .catch(function(err){
      console.error(err)
    })
  }
  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.toprow}>
          <TouchableOpacity style={styles.backbotton} onPress={()=>this.props.navigation.navigate('Search')}>
            <Icon
              name='chevron-left'
              color='white'
              size={30}
            />
          </TouchableOpacity>
          <Text style={styles.title}>
            STOCK
          </Text>
        </View>
        <PullView style={styles.pullview} onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}>
        <Detail
          flag={this.state.flag}
          style={styles.detail}
          name={this.state.cur.result[0].data.name}
          gid={this.state.cur.result[0].data.gid}
          yestodEndPri={this.state.cur.result[0].data.yestodEndPri}
          todayMin={this.state.cur.result[0].data.todayMin}
          todayStartPri={this.state.cur.result[0].data.todayStartPri}
          todayMax={this.state.cur.result[0].data.todayMax}
          nowPri={this.state.cur.result[0].data.nowPri}
          increPer={this.state.cur.result[0].data.increPer}
        />
        <Chart
          style={styles.chart}
          gid={this.state.cur.result[0].data.gid}
        />
        </PullView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  toprow:{
    height: 80,
    width: Dimensions.get('window').width,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    justifyContent:'center',
  },
  backbotton:{
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 5
  },
  backtext:{
    fontSize:35,
    color: 'white',
    marginLeft: 20,
    justifyContent: 'center'
  },
  title:{
    fontSize:40,
    color:'white',
    position: 'absolute',
    right: 135
  },
  chart:{

  },
  detail:{
    
  },
  pullview:{
    width: Dimensions.get('window').width,
  },
  pulltext:{
    color: 'white',
    fontSize: 10
  },
  pulling:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60
  },
  footer:{
    flexDirection:'row',
    borderTopColor: 'white',
    borderTopWidth: 1
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
  }
});

export default Details;
