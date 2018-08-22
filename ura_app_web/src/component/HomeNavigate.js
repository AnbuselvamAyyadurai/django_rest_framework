import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
// import tabNav from './src/tabNav';
import stackNav from './stackNav';
import render from './render'


export default drawernav = DrawerNavigator({
    DrawerItem1: {
        screen: stackNav,
    },
    render: {
        screen: render

    }
});





















// import React, { Component } from 'react';
// import { TextInput, Text, View, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';


// import Home from './Home';
// import SmartContracts from './SmartContracts';
// import Newfamilysmartcontract from './Newfamilysmartcontract';
// import CreateNew from './CreateNew';
// import Notifications from './Notifications';
// import Wallet from './Wallet';
// import TabNavigator from 'react-native-tab-navigator';
// // import { TabNavigator } from 'react-navigation';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {Dimensions} from 'react-native'
// import SideBarContent from './SideBarContent'
// // import Profile from './src/component/Profile';




// export default class HomeNavigate extends Component {
//   state= {
//     selectedTab: 'Notifications'
//   };

//   render() {
//     return (
//       <TabNavigator style={styles.container}>

//         <TabNavigator.Item
//           selected={this.state.selectedTab === 'Home'}
//           title="Home"
//           selectedTitleStyle={{color: "#3496f0"}}
//          renderIcon={() => <Image source={require('../Image/Home.png')} style={styles.iconimg}  color="#666"/>}
//          renderSelectedIcon={() => <Image source={require('../Image/Home.png')} style={styles.iconimg}  color="#3496f0"/>}
//          onPress={() => this.setState({selectedTab: 'Home'})}>
//          <Home/>
//         </TabNavigator.Item> 

//         <TabNavigator.Item
//           selected={this.state.selectedTab === 'SmartContracts'}
//           title="Smart Contracts"
//           selectedTitleStyle={{color: "#3496f0"}}
//          renderIcon={() => <Image source={require('../Image/smart_contracts.png')} style={styles.iconimg} color="#666"/>}
//          renderSelectedIcon={() => <Image source={require('../Image/smart_contracts.png')} style={styles.iconimg} color="#3496f0"/>}
//          onPress={() => this.setState({selectedTab: 'SmartContracts'})}>
//           <SmartContracts/>
//         </TabNavigator.Item> 

//         <TabNavigator.Item
//           selected={this.state.selectedTab === 'CreateNew'}
//           title="Create New"
//           selectedTitleStyle={{color: "#3496f0"}}
//          renderIcon={() => <Image source={require('../Image/createnew.png')} style={styles.iconimg} color="#666"/>}
//          renderSelectedIcon={() => <Image source={require('../Image/createnew.png')} style={styles.iconimg} color="#3496f0"/>}
//          onPress={() => this.setState({selectedTab: 'CreateNew'})}>
//           <CreateNew/>
//         </TabNavigator.Item> 

//         <TabNavigator.Item
//          selected={this.state.selectedTab === 'Notifications'}
//          title="Notifications"
//          selectedTitleStyle={{color: "#3496f0"}}
//         renderIcon={() => <Image source={require('../Image/notifications.png')} style={styles.iconimg} color="#666"/>}
//         renderSelectedIcon={() => <Image source={require('../Image/notifications.png')} style={styles.iconimg}  color="#3496f0"/>}
//         onPress={() => this.setState({selectedTab: 'Notifications'})}>
//           <Notifications/>
//         </TabNavigator.Item> 

//         <TabNavigator.Item
//          selected={this.state.selectedTab === 'Wallet'}
//          title="Wallet"
//          selectedTitleStyle={{color: "#3496f0"}}
//         renderIcon={() => <Image source={require('../Image/wallet.png')} style={styles.iconimg} color="#666"/>}
//         renderSelectedIcon={() => <Image source={require('../Image/wallet.png')} style={styles.iconimg}  color="#3496f0"/>}
//         onPress={() => this.setState({selectedTab: 'Wallet'})}>
//           <Wallet/>
//         </TabNavigator.Item>    

//       </TabNavigator>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'white',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   iconimg:{
//     height:26, 
//     width:26,
//      resizeMode:'contain'
//   }
// });






// export default TabNavigator({



//     Home:{
//     screen:Home,
//     //  navigationOptions = {
//     //   tabBarLabel: 'Home',
//     //   showIcon: true ,
//       // tabBarIcon: <Image
//       // source={require('../image/download.jpg')}
//       // resizeMode = {Image.resizeMode.contain}
//       // style={{ height: 30, width: 30, tintColor: 'white'}} />,  
//     // }
//   },
//   SmartContracts:{
//     screen:SmartContracts,
//     //  navigationOptions = {
//     //   tabBarLabel: 'Smart Contracts',
//     //   showIcon: true ,
//     // }
//   },

//   CreateNew:{
//     screen:CreateNew,
//     //  navigationOptions = {
//     //   tabBarLabel: 'Create New',
//     //   showIcon: true ,
//     // }
//   },
//   Notifications:{
//     screen:Notifications,
//     //  navigationOptions = {
//     //   tabBarLabel: 'Notifications',
//     //   showIcon: true ,
//     // }
//   },
//   Wallet:{
//     screen:Wallet,
//     //  navigationOptions = {
//     //   tabBarLabel: 'Wallet',
//     //   showIcon: true ,
//     // }
//   },

// },
//  {
//   tabBarPosition: 'bottom',
//   swipeEnabled: false,
//   // animationEnabled: true,
//   tabBarOptions: {
//     activeTintColor: 'red',   
//       style:{
//        position: 'relative', 
//        height: 50,
//       backgroundColor: 'white',
//       borderTop:1,
//       borderRadius: 5,

//     },
//     upperCaseLabel:false,
//     labelStyle: {
//        fontSize: 6.5,
//       color:'black',
//       fontWeight: 'bold', 
//       fontFamily: 'Avenir LT Std'


//     },
//   },
//   // tabBarOptions: {
//   //   
//   // },
// });
















// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// import Home from './Home';
// import SmartContracts from './SmartContracts';

// import CreateNew from './CreateNew';
// import Notifications from './Notifications';
// import Send from './Send';
// import Request from './Request';
// import RequestTo from './RequestTo';
// import Wallet from './Wallet';

// import SendTo from './SendTo';


// import {StackNavigator , TabNavigator, DrawerNavigator } from 'react-navigation';
// import Createfamily from './Createfamily';


// const MyStackNavigator = StackNavigator ({
//   Send:{ screen:Send},
//   Request:{ screen:Request}
// });
// const DemoNavigation = TabNavigator({
//   Home:{screen: Home},
//   SmartContracts:{ screen:SmartContracts},
//   CreateNew:{    screen:CreateNew  },
//   Notifications:{screen:Notifications},
//   Wallet:{    screen:Wallet  },
// },
// {
//   swipeEnabled:true,
//   tabBarPosition:'bottom',


//   tabBarOptions:{
//     activeTintColor:'blue',
//     activeBackgroundColor:'darkgreen',
//     inactiveTintColor:'black',
//     inactiveBackgroundColor:'green',
//     },
//     upperCaseLabel:false,
//         labelStyle: {
//           fontSize: 10,
//           color:'black',
//           fontWeight: 'bold', 
//           fontFamily: 'Avenir LT Std'
//         }
// });
// // {
// //     headerMode:'none'
// // }

// const MyDrawerNavigation = DrawerNavigator({
//   SendTo :{    screen:DemoNavigation  },
//   RequestTo:{ screen:RequestTo}
// },
// {
//   contentComponent:props => <Createfamily {...props}/>
// });

// export default  MyDrawerNavigation;






















// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Image
// } from 'react-native';

// import Tabs from 'react-native-tabs';
// import Wallet from './Wallet';


// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { page: 'second' };
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Tabs selected={this.state.page} style={{ backgroundColor: 'white' }} tabBarPosition={'Top'}
//           selectedStyle={{ color: 'red' }} >
//           <View style={{ flexDirection: 'column', justifyContent: 'center' , alignItems:'center'}}>
//             <Image source={require('../Image/Home.png')}
//               style={{ width: 40, height: 35, resizeMode: 'contain' }} />
//             <Text name="first" style={styles.txt} selectedStyle={{ color: 'green' }}>Home</Text>
//            </View>
//            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
//             <Image source={require('../Image/smart_contracts.png')}
//               style={{ width: 40, height: 35, resizeMode: 'contain' }} />
//             <Text name="second" style={styles.txt}>Smart Contracts</Text>
//            </View>
//            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
//             <Image source={require('../Image/createnew.png')}
//               style={{ width: 40, height: 35, resizeMode: 'contain' }} />
//             <Text name="third" style={styles.txt} onPress={() => this.props.navigation.navigate('Request')}>Create New</Text>
//            </View>
//            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
//             <Image source={require('../Image/notifications.png')}
//               style={{ width: 40, height: 35, resizeMode: 'contain' }} />
//             <Text name="fourth" style={styles.txt}>Notifications</Text>
//            </View>
//            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
//             <Image source={require('../Image/wallet.png')}
//               style={{ width: 40, height: 35, resizeMode: 'contain' }} />
//             <Text name="fifth" style={styles.txt}>Wallet</Text>
//            </View>
//           {/* <Text name="second" selectedIconStyle={{ borderTopWidth: 2, borderTopColor: 'red' }} style={styles.txt}>Smart Contracts</Text>
//           <Text name="third" style={styles.txt}>Create New</Text>
//           <Text name="fourth" selectedStyle={{ color: 'green' }} style={styles.txt}>Notifications</Text>
//           <Text name="fifth" style={styles.txt} onPress={() => this.props.navigation.navigate('Wallet')} >Wallet</Text> */}
//         </Tabs>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     // marginBottom: 5,
//   },
//   txt:{
//     fontSize:11
//   }
// });

// // AppRegistry.registerComponent('Example', () => Example);















// import React, { Component } from 'react';
// import {
//   StyleSheet,   // CSS-like styles
//   Text,         // Renders text
//   View,          // Container component
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import Tabs from './src/Tabs';
// import { SearchBar} from 'react-native-elements';


// export default class App extends Component {
//   static navigationOptions = {

//     headerLeft: <TouchableOpacity onPress={this.openControlPanel}>
//         <Image source={require('./src/Image/sidemenu.png')}
//             style={{ width: 40, height: 35, resizeMode: 'contain' }} />
//     </TouchableOpacity>,
//     headerTitle: <SearchBar
//         placeholder="Search"
//         icon={{ type: 'evilicon', name: 'search', color:'green' }}
//         clearIcon={{ name: 'close-o', color:'red', }}
//         iconStyle={{
//             width: 50,
//             height: 50,
//             resizeMode: 'contain'
//         }}
//         inputStyle={{
//             backgroundColor: '#dee0e2',
//             fontSize: 18,
//             color: '#000000',
//             borderRadius: 10
//         }}
//         containerStyle={{
//             backgroundColor: 'white',
//             width: '100%'

//         }}


//     />,
//     headerRight: <TouchableOpacity >
//         <Image source={require('./src/Image/message.png')}
//             style={{ width: 40, height: 35, resizeMode: 'contain' }} />
//     </TouchableOpacity>,


//     // headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
//     headerStyle: {
//         backgroundColor: '#ffffff',
//         // shadowColor: 'transparent',
//         // backgroundColor: '#fff',
//         elevation: 0,

//     }

// };
//   render() {
//     return (
//       <View style={styles.container}>
//           <Tabs>
//           {/* First tab */}
//           <View title="WELCOME"  style={styles.content}>
//             <Text style={styles.header}>
//               Welcome to React Native
//             </Text>
//             <Text style={styles.text}>
//               The best technology to build cross platform mobile apps with
//             </Text>
//           </View>
//           {/* Second tab */}
//           <View title="NATIVE" style={styles.content}>
//             <Text style={styles.header}>
//               Truly Native
//             </Text>
//             <Text style={styles.text}>
//               Components you define will end up rendering as native platform widgets
//             </Text>
//           </View>
//           {/* Third tab */}
//           <View title="EASY" style={styles.content}>
//             <Text style={styles.header}>
//               Ease of Learning
//             </Text>
//             <Text style={styles.text}>
//               It’s much easier to read and write comparing to native platform’s code
//             </Text>
//           </View>

//         </Tabs>
//         </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   // App container
//   container: {
//     flex: 1,                            // Take up all screen
//     backgroundColor: '#C2185B',         // Background color
//   },
//   // Tab content container
//   content: {
//     flex: 1,                            // Take up all available space
//     justifyContent: 'center',           // Center vertically
//     alignItems: 'center',               // Center horizontally
//     backgroundColor: '#C2185B',  
//     color:'blue'       // Darker background for content area
//   },
//   // Content header
//   header: {
//     margin: 10,                         // Add margin
//     color: '#FFFFFF',                   // White color
//     fontFamily: 'Avenir',               // Change font family
//     fontSize: 26,                       // Bigger font size
//   },
//   // Content text
//   text: {
//     marginHorizontal: 20,               // Add horizontal margin
//     color: 'rgba(255, 255, 255, 0.75)', // Semi-transparent text
//     textAlign: 'center',                // Center
//     fontFamily: 'Avenir',
//     fontSize: 18,
//   },
// });




















// import React, { Component } from 'react';
// import { Text, View } from 'react-native';
// import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json

// const FooScreen = () => <Center><Text>Foo</Text></Center>;
// const BarScreen = () => <Center><Text>Bar</Text></Center>;

// const components = {
//   Foo: FooScreen,
//   Bar: BarScreen,
// };

// const Center = ({ children }) => (
//   <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>{children}</View>
// ); 

// class Content extends Component {
//   render() {
//     return(
//       <View>
//         <Text>{}</Text>
//       </View>
//     );
//   }

// }

// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {};
//   }

//   componentWillMount() {
//     const pages = [
//       { screenName: 'Foo', componentName: 'Foo' },
//       { screenName: 'Bar', componentName: 'Foo' },
//     ];

//     setTimeout(() => {
//       const screens = {};
//       pages.forEach(page => {
//         screens[page.screenName] = { screen: components[page.componentName] };
//       });
//       this.setState({ tabs: TabNavigator(screens) });
//     }, 2000);
//   }

//   render() {
//     if (this.state.tabs) {
//       return <this.state.tabs />;
//     }
//     return <Center><Text>Loading...</Text></Center>;
//   }
// }
