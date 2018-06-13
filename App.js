import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  AsyncStorage,
  TextInput,
  FlatList, 
  Image,
  TouchableOpacity,
} from 'react-native';
import {Icon,List,ListItem} from 'react-native-elements';
import Details from './app/details/details.js';
import Search from './app/search/search.js';
import MyStock from './app/mystock/mystock.js'
import { createStackNavigator } from 'react-navigation'; 
import FadeInView from './app/fadeview/FadeView.js';
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    const that = this
    setTimeout(function(){that.props.navigation.navigate('Search')},2236)
  }
  render() {
    return (
    <FadeInView style={{ flex:1,backgroundColor: 'black', }}>
     <Image style={styles.icon} source={require('./logo.png')} />
    </FadeInView>
    )
  }
}
const styles=StyleSheet.create({
  icon:{
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
    marginLeft:'auto',
    marginRight:'auto',
  }
});
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: Details,
    Search:Search,
    MyStock:MyStock,
  },
  {
    initialRouteName: 'Home',
  }
);
export default class App extends Component {
  render() {
    return (
      <RootStack />
    )
  }
}
