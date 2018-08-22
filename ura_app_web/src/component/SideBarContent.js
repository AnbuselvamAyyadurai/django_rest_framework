/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';



export default class SideBarContent extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', marginTop: 15 }}>

                    <View style={{ width: '20%' }}><Image source={require('../Image/Child.png')}
                        style={styles.profileimage} />
                    </View>

                    <View style={{ width: '60%' }}>
                        <Text style={{ fontFamily: 'Avenir LT Std', fontWeight: 'bold', fontSize: 10, }}> Jane Doe </Text>
                        <Text style={{ fontFamily: 'Avenir LT Std', fontWeight: 'bold', fontSize: 10 }}> janedoe@gmail,com </Text>
                        <Text style={{ fontFamily: 'Avenir LT Std', fontWeight: 'bold', fontSize: 10 }}> 19 jun 2018 at 3:00am </Text>
                    </View>
                    </View>
                   
                        <Text>Account</Text>
                        <Text>Basket</Text>
                        <Text>About us</Text>
                    
                    </View>
                    );
                }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
profileimage: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
},
})