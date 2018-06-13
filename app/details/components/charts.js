import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';

class Chart extends Component{
    constructor(props) {
        super(props);
        this.state = {
          timeSpan: 'min',
        };
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.timeSpanGroup}>
                    <TouchableOpacity
                        style={[styles.timeSpan,this.state.timeSpan=='min'&&styles.timeSpanSelected]}
                        onPress={() => this.setState({ timeSpan: 'min' })}
                    >
                        <Text style={[this.state.timeSpan === 'min' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'MIN'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.timeSpan,this.state.timeSpan=='daily'&&styles.timeSpanSelected]}
                        onPress={() => this.setState({ timeSpan: 'daily' })}
                    >
                        <Text style={[this.state.timeSpan === 'daily' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'1D'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.timeSpan,this.state.timeSpan=='weekly'&&styles.timeSpanSelected]}
                        onPress={() => this.setState({ timeSpan: 'weekly' })}
                    >
                        <Text style={[this.state.timeSpan === 'weekly' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'1W'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.timeSpan,this.state.timeSpan=='monthly'&&styles.timeSpanSelected]}
                        onPress={() => this.setState({ timeSpan: 'monthly' })}
                    >
                        <Text style={[this.state.timeSpan === 'monthly' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'1M'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.chartcss}>
                    <Image
                        style={styles.imagecss}
                        source={{uri:`http://image.sinajs.cn/newchart/${this.state.timeSpan}/n/${this.props.gid}.gif`}}
                    />
                </View>
                <View style={styles.blank}>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('window').width,
        height: 300,
    },
    chartcss:{
        flex: 4,
        width: Dimensions.get('window').width/2,
        height: 15,
    },
    imagecss:{
        width: Dimensions.get('window').width,
        height: 225,
        resizeMode: 'contain',
        backgroundColor:'white'
    },
    timeSpanGroup:{
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#969696'
    },
    timeSpan:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeSpanSelected:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'grey'
    },
    timeSpanText:{
        fontSize: 12,
        color: 'white',
        marginTop: 10,
    },
    timeSpanSelectedText:{
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10,
    },
    blank:{
        flex: 0.8
    }
})

export default Chart;