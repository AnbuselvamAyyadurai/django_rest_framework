import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,

} from 'react-native';

import { SearchBar } from 'react-native-elements'
import FontAwesome, { Icons } from 'react-native-fontawesome';

// import SearchBar from 'react-native-material-design-searchbar';

// import Search from 'react-native-search-box';
// import SearchBar from 'react-native-search-bar'
// import SearchBar from 'react-native-searchbar';

export default class Sample extends Component {

    render() {
        return (
            <View>
                <SearchBar
                    placeholder="Search"
                    ref={search => this.search = search}

                    icon={{ type: ' FontAwesome', name: 'dove', size: 'large' }}
                    inputStyle={{ backgroundColor: '#dee0e2', fontSize: 18, height: 40, fontFamily: ' Avenir LT Std', color: '#000000', borderRadius: 10 }}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, width: '100%' }}
                    clearIcon={{ type: 'material-community', name: 'close-o', size: '80' }}
                />
                {/* <SearchBar
                    placeholder="Search"
                    height={50}
                    inputStyle={{ backgroundColor: '#dee0e2', fontSize: 18, fontFamily: ' Avenir LT Std', color: '#000000', borderRadius: 10 }}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, width: '100%' }}
                /> */}

                {/* <Search
                    ref="search_box"
                /**
                * There many props that can customizable
                * Please scroll down to Props section
                
                    /> */}

                {/* <SearchBar
                    height={30}
                    ref='searchBar'
                    placeholder='Search'
                    onChangeText={...}
                    onSearchButtonPress={...}
                    onCancelButtonPress={...}
                /> */}

                {/* <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    showOnLoad
                /> */}
            </View>
        )
    }
}