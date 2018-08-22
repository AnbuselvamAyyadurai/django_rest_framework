import React, { Component } from 'react';
import { TabNavigator, TabView } from 'react-navigation'
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import IOSIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
// import stackNav from './stackNav';
// import MainScreen from './main';
// import DetailScreen from './detail';
import Home from './Home';
import Send from './Send';
import Register from './Register';
import SmartContracts from './SmartContracts';
import CreateNew from './CreateNew';
import Notifications from './Notifications';
import Wallet from './Wallet';


this.state = {
    homebtn: '',
    smartbtn: '',


}

const tabNav = TabNavigator({
    Home: {
        screen: Wallet,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => <Image source={require('../Image/Home.png')} style={styles.iconimg} color={tintColor} />
        }
        //     navigationOptions:({navigation}) => ({
        //         title: "Main",
        //         headerLeft:(
        //           <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
        //             <IOSIcon name="ios-menu" size={30} />
        //           </TouchableOpacity>
        //         ),
        //         headerStyle: { paddingRight: 10, paddingLeft: 10 }
        //     })
    },
    SmartContracts: {
        screen: SmartContracts,
        navigationOptions: {
            tabBarLabel: "Smart Contracts",
            tabBarIcon: ({ tintColor }) => <Image source={require('../Image/smart_contracts.png')} style={styles.iconimg} color={tintColor} />
        }
    },
    CreateNew: {
        screen: CreateNew,
        navigationOptions: {
            tabBarLabel: "Create New",
            tabBarIcon: ({ tintColor }) => <Image source={require('../Image/createnew.png')} style={styles.iconimg} color={tintColor} />
        }
    },
    Notifications: {
        screen: Notifications,
        navigationOptions: {

            tabBarLabel: "Notifications",
            tabBarIcon: ({ tintColor }) => <Image source={require('../Image/notifications.png')} style={styles.iconimg} color={tintColor} />
        }
    },
    Wallet: {
        screen: Wallet,
        navigationOptions: {
            tabBarLabel: "Wallet",
            tabBarIcon: ({ tintColor }) => <Image source={require('../Image/wallet.png')} style={styles.iconimg} color={tintColor} />
        }
    },

}, {
        headerMode: 'none',        // I don't want a NavBar at top
        tabBarPosition: 'bottom',  // So your Android tabs go bottom
        swipeEnabled: false,

        tabBarOptions: {

            activeTintColor: 'blue',  // Color of tab when pressed
            inactiveTintColor: '#000000', // Color of tab when not pressed
            showIcon: 'true', // Shows an icon for both iOS and Android
            activeBackgroundColor: '#3c40c6',
            upperCaseLabel: false,

            alignItems: 'center',
            labelStyle: {
                fontSize: 7
            },
            tabStyle: {
                //  height: 55,
                borderTopWidth: 0.5
            },
            indicatorStyle: {
                backgroundColor: '#3c40c6',
            },
            //   tabsStyle: {
            //     tabBarBackgroundColor: '#000',
            //     tabBarButtonColor: '#fff',
            //     tabBarSelectedBackgroundColor: '#3c40c6',
            //   },
            style: {
                backgroundColor: '#fff', // Makes Android tab bar white instead of standard blue

            }
        },


    })

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',
    },


    iconimg: {
        height: 24,
        width: 24,
        resizeMode: 'contain'
    }
});

export default tabNav;
