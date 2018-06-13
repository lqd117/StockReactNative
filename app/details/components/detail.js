import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import Storage from '../../storage/storage.js';
class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            flag:1
        }
    }
    add(Code){  //添加到我的股票
        Storage.addData(Code)
        this.setState({
            flag:0
        })
    }
    fun(flag,code){
        if(flag === '1'){
            return(
                <TouchableOpacity style={styles.addbotton} onPress={()=>this.add(code)}>
                    <Text style={styles.addtext}>
                        Add To Mine
                    </Text>
                </TouchableOpacity>
            )
        }else{
            return(
                <View style={styles.hadbotton}>
                    <Text style={styles.addtext}>
                        Added
                    </Text>
                </View>
            )
        }
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.namecss}>
                    <Text style={styles.nametext}>
                        {this.props.name}
                    </Text>
                    <Text style={styles.gidtext}>
                        {this.props.gid}
                    </Text>
                    {this.fun((this.state.flag === 1 ? this.props.flag : 0),this.props.gid)}
                </View>
                <View style={styles.firstline}>
                    <View style={styles.prevcss}>
                        <Text style={styles.prevtext}>
                            Prev close     {this.props.yestodEndPri}
                        </Text>
                    </View>
                    <View style={styles.lowcss}>
                        <Text style={styles.lowtext}>
                            Low               {this.props.todayMin}
                        </Text>
                    </View>
                </View>
                <View style={styles.secondline}>
                    <View style={styles.opencss}>
                        <Text style={styles.opentext}>
                            Open               {this.props.todayStartPri}
                        </Text>
                    </View>
                    <View style={styles.highcss}>
                        <Text style={styles.hightext}>
                            High              {this.props.todayMax}
                        </Text>
                    </View>
                </View>
                <View style={styles.thirdline}>
                    <View style={styles.curpricss}>
                        <Text style={styles.curpritext}>
                            Current Price
                        </Text>
                        <Text style={styles.number1}>
                            {this.props.nowPri}
                        </Text>
                    </View>
                    <View style={styles.incpercss}>
                        <Text style={styles.incpertext}>
                            Increase Percentage
                        </Text>
                        <Text style={styles.number2}>
                            {this.props.increPer}
                        </Text>
                    </View>
                </View>
                <View>
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    namecss:{
        //flex:1,
        width: Dimensions.get('window').width,
        height: 50,
        borderBottomWidth:1,
        borderColor:'white'
    },
    nametext:{
        fontSize: 20,
        color:'white',
        marginLeft:20
    },
    gidtext:{
        fontSize:15,
        color:'white',
        marginLeft: 20
    },
    addbotton:{
        width: 100,
        height: 30,
        backgroundColor:'green',
        borderRadius: 2,
        position:'absolute',
        right:20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    hadbotton:{
        width: 100,
        height: 30,
        backgroundColor:'red',
        borderRadius: 2,
        position:'absolute',
        right:20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    addtext:{
        fontSize:15,
        color: 'white'
    },
    firstline:{
        height: 45,
        width: Dimensions.get('window').width,
        // justifyContent:'flex-start',
        borderBottomWidth:1,
        borderColor: 'white'
    },
    prevcss:{
        width: Dimensions.get('window').width/2,
        height: 45,
        borderRightWidth: 1,
        borderColor: 'white',
        justifyContent: 'center'
    },
    prevtext:{
        fontSize: 20,
        color:'white',
        marginLeft:20
    },
    lowcss:{
        width: Dimensions.get('window').width/2-1,
        height: 45,
        justifyContent: 'center',
        position: 'absolute',
        right:-0
    },
    lowtext:{
        fontSize: 20,
        color: 'white',
        marginLeft:20
    },
    secondline:{
        height: 45,
        width: Dimensions.get('window').width,
        // justifyContent:'flex-start',
        borderBottomWidth:1,
        borderColor: 'white'
    },
    opencss:{
        width: Dimensions.get('window').width/2,
        height: 45,
        borderRightWidth: 1,
        borderColor: 'white',
        justifyContent: 'center'
    },
    opentext:{
        fontSize: 20,
        color:'white',
        marginLeft:20
    },
    highcss:{
        width: Dimensions.get('window').width/2-1,
        height: 45,
        justifyContent: 'center',
        position: 'absolute',
        right:0
    },
    hightext:{
        fontSize: 20,
        color: 'white',
        marginLeft:20
    },
    thirdline:{
        height: 75,
        width: Dimensions.get('window').width,
        // justifyContent:'flex-start',
        borderBottomWidth:1,
        borderColor: 'white'
    },
    curpricss:{
        width: Dimensions.get('window').width/2,
        height: 75,
        //borderRightWidth: 1,
        //borderColor: 'white',
        justifyContent: 'center'
    },
    curpritext:{
        fontSize: 20,
        color:'white',
        marginLeft:20,
        textAlign:'center'
    },
    number1:{
        fontSize: 20,
        color:'red',
        marginLeft:20,
        textAlign:'center'
    },
    incpercss:{
        width: Dimensions.get('window').width/2-1,
        height: 75,
        justifyContent: 'center',
        position: 'absolute',
        right:0
    },
    incpertext:{
        fontSize: 16,
        color:'white',
        marginTop:5,
        //marginLeft:25,
        textAlign:'center'
    },
    number2:{
        fontSize: 20,
        color:'red',
        //marginTop: 10,
        textAlign:'center'
    }
})

export default Detail; 