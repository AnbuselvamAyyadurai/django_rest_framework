import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { SearchBar, Header, List } from 'react-native-elements';

import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert
} from 'react-native';

export default class samples extends Component {
  static navigationOptions = {


    headerTitle: <SearchBar
      placeholder="Search..."
      returnKeyType='search'
      cancelButtonTitle="Cancel"
      searchBarStyle="default"
      clearIcon={{type:'font-awesome', name: 'fa-user-circle-o', color: 'red', }}

      // clearIcon={true}  

      loadingProps={ActivityIndicator}


      inputStyle={{
        backgroundColor: '#dee0e2', 
        fontSize: 18,
        color: '#000000',
        borderRadius: 10
      }}
      containerStyle={{
        backgroundColor: 'white',
        width: '100%'

      }}


    />,


    // headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: '#ffffff',
      // shadowColor: 'transparent',
      // backgroundColor: '#fff',
      elevation: 0,

    }

  };
  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    return (
      <Dropdown overlayStyle={true} dropdownPosition={0}
        // label='Favorite Fruit'
        value='Select'
        data={data}
      />
    );
  }
}
