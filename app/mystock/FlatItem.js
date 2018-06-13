import React ,{Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    Alert,
    TouchableOpacity ,
} from 'react-native';


const styles=StyleSheet.create({
    container1:{
        //flex:1,
        height:80,
        flexDirection:'row',
        backgroundColor:'black',
      //  margin: 10,
    },
    image:{
        height: 50,
        width: 50,
    },
    txt:{
        color: 'white',
        fontSize: 20,
        textAlign:'center',

    },
    details:{
        backgroundColor:'lightblue',
    },
    button1:{
        padding:10,
        color:'white',
        backgroundColor:'lightblue',
    },
    namecode:{
        justifyContent:'center',
        flex:1,

    },
    inc_cur:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        flex:2,
    }

});
export default class FlatItem extends Component{
    constructor(props){
        super(props);
        this.state={
            displayItem:'flex',
        }
    }
    render(){
        return (
            <View style={[styles.container1,{display:this.state.displayItem,}]}>
                <View style={styles.namecode}> 
                  <Text style={styles.txt}> {this.props.name} </Text> 
                  <Text style={styles.txt}> {this.props.code} </Text>
                </View>
              <View style={styles.inc_cur}>
                  <Text style={[styles.txt,{color:'red',fontSize:30}]}> {this.props.increPer} </Text>
                  <Text style={[styles.txt,{color:'red',fontSize:30}]}> {this.props.curPri} </Text>
              </View>
                 
            </View>
        )
    }
};

