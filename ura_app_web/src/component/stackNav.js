import React, { Component } from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { SearchBar, Header, List } from 'react-native-elements';
import IOSIcon from "react-native-vector-icons/Ionicons";
// import DetailScreen from './detail';
// import MainScreen from './main';
import tabNav from './tabNav';
// import Mari from './Mari'

import Wallet from './Wallet';
import Send from './Send';
import SendTo from './SendTo';
import Request from './Request';
import RequestTo from './RequestTo';
import SmartContracts from './SmartContracts';

import Assignto from './Assignto';
import CreateNew from './CreateNew';
import Notifications from './Notifications';
import Listofgroupmember from './Listofgroupmember';
import Setreward from './Setreward';
import Waitingforapprove from './Waitingforapprove';
import Markasdone from './Markasdone';
import Time from './Time';

class HamburgerIcon extends Component {

  toggleDrawer = () => {

    console.log(this.props.navigationProps);

    this.props.navigationProps.toggleDrawer();

  }

  render() {

    return (
      <View style={styles.container}>

        <View style={{ width: '8%' }}>

          <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
            <Image source={require('../Image/Menubar.png')}
              style={{ width: 32, height: 32, resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View >
        <View style={{ width: '84%' }}>
          <SearchBar
            placeholder="Search"
            icon={{ type: 'evilicon', name: 'search', }}
            iconStyle={{
              width: 50,
              height: 50,
              resizeMode: 'contain'
            }}
            inputStyle={{
              backgroundColor: '#dee0e2',
              fontSize: 18,
              color: '#000000',
              borderRadius: 10,
              backgroundColor: '#e4e4e5'
            }}
            containerStyle={{
              backgroundColor: 'white',
              width: '100%',
              borderBottomWidth: 0,
              borderTopWidth: 0

            }}


          />
        </View>
        <View style={{ width: '8%' }}>
          <TouchableOpacity >
            <Image source={require('../Image/message.png')}
              style={{ width: 31, height: 31, resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
      </View>

    );


  }
}

const stackNav = StackNavigator({




  TabItem1: {

    screen: tabNav,

    navigationOptions: ({ navigation }) => ({

      header: <HamburgerIcon navigationProps={navigation} />,

      headerStyle: {
        width: '100%'
      },

    })
  },

  // navigationOptions: {
  //   headerMode: null,
  //   headerLeft: <TouchableOpacity onPress={this.openControlPanel}>
  //     <Image source={require('../Image/sidemenu.png')}
  //       style={{ width: 35, height: 35, resizeMode: 'contain' }} />
  //   </TouchableOpacity>,
  //   headerTitle: <SearchBar
  //     placeholder="Search"
  //     icon={{ type: 'evilicon', name: 'search', color: 'green' }}
  //     iconStyle={{
  //       width: 50,
  //       height: 50,
  //       resizeMode: 'contain'
  //     }}
  //     inputStyle={{
  //       backgroundColor: '#dee0e2',
  //       fontSize: 18,
  //       color: '#000000',
  //       borderRadius: 10
  //     }}
  //     containerStyle={{
  //       backgroundColor: 'white',
  //       width: '100%'

  //     }}


  //   />,
  //   headerRight: <TouchableOpacity >
  //     <Image source={require('../Image/message.png')}
  //       style={{ width: 35, height: 35, resizeMode: 'contain' }} />
  //   </TouchableOpacity>,
  //   headerStyle: {
  //     backgroundColor: '#ffffff',
  //     elevation: 0,
  //     paddingRight: 10,
  //     paddingLeft: 10

  //   }

  // }



  // navigationOptions: {
  //     title:'Mariiii',
  //     headerLeft:<Image source={require('../Image/Home.png')} style={{width:20,height:20}} /> ,
  //     headerStyle: {
  //         backgroundColor: 'white',
  //         shadowColor: 'transparent',
  //         backgroundColor: '#fff',
  //         elevation: 0
  //     },
  //     tabBarLabel:"Tab 1",

  //   tabBarIcon: ({ tintColor }) => <Icon name={"glass"} size={30} color={tintColor} />


  // },

  Wallet: {
    screen: Wallet,
  },
  SmartContracts: {
    screen: SmartContracts,
  },
  CreateNew: {
    screen: CreateNew,
  },
  Notifications: {
    screen: Notifications,
  },

  Send: {
    screen: Send,
  },
  SendTo: {
    screen: SendTo,
  },
  Request: {
    screen: Request,
  },
  RequestTo: {
    screen: RequestTo,
  },

  Assignto: {
    screen: Assignto,
  },
  Listofgroupmember: {
    screen: Listofgroupmember
  },
  Setreward: {
    screen: Setreward
  },
  Waitingforapprove: {
    screen: Waitingforapprove
  },
  Markasdone: {
    screen: Markasdone,
  },
  Time: {
    screen: Time
  }

}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#222',

    }


  })
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10

  },
})









export default stackNav;
