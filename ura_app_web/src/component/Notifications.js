import React, { Component } from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import {TabNavigator} from 'react-navigation';


export default class Notifications extends Component{
  static navigationOptions = {
    tabBarLabel: 'Notifications',
    showIcon: true ,
  }
 
   
  render()
  {
    return(
    
      <Text> Notifications</Text>
    
      
    );
  }
}


