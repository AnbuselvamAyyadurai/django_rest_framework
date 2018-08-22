// import React, { Component } from 'react';
// import {
//     Text,
//     TouchableOpacity,
//     View,
//     StyleSheet
// } from 'react-native';
// import CountDown from 'react-native-countdown-component';


// export default class Set extends Component {

//     render() {

//         return (
//             <View style={styles.container}>

//                 <CountDown
//                     until={10}
//                     onFinish={() => alert('finished')}
//                     onPress={() => alert('hello')}
//                     size={20}
//                 />
//             </ View>

//         );
//     }
// }



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: '5%',
//         backgroundColor: 'white',

//     },
//     nextbtn: {
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#6887ff',
//         width: '90%',
//         height: '100%'

//     }
// });

// import React, { Component } from 'react';
// import { TextInput, Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

// import { TabNavigator } from 'react-navigation';


// class HamburgerIcon extends Component {

//     toggleDrawer = () => {

//         console.log(this.props.navigationProps);

//         this.props.navigationProps.toggleDrawer();

//     }

//     render() {

//         return (
//             <View style={styles.container}>

//                 <View style={{ width: '8%' }}>

//                     <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
//                         <Image source={require('../Image/Menubar.png')}
//                             style={{ width: 32, height: 32, resizeMode: 'contain' }} />
//                     </TouchableOpacity>
//                 </View >
//                 <View style={{ width: '84%' }}>
//                     <SearchBar
//                         placeholder="Search"
//                         icon={{ type: 'evilicon', name: 'search', }}
//                         iconStyle={{
//                             width: 50,
//                             height: 50,
//                             resizeMode: 'contain'
//                         }}
//                         inputStyle={{
//                             backgroundColor: '#dee0e2',
//                             fontSize: 18,
//                             color: '#000000',
//                             borderRadius: 10,
//                             backgroundColor: '#e4e4e5'
//                         }}
//                         containerStyle={{
//                             backgroundColor: 'white',
//                             width: '100%',
//                             borderBottomWidth: 0,
//                             borderTopWidth: 0

//                         }}


//                     />
//                 </View>
//                 <View style={{ width: '8%' }}>
//                     <TouchableOpacity >
//                         <Image source={require('../Image/message.png')}
//                             style={{ width: 31, height: 31, resizeMode: 'contain' }} />
//                     </TouchableOpacity>
//                 </View>
//             </View>

//         );


//     }
// }

// class Home extends Component {

//     render() {
//         return (

//             <Text> Home</Text>

//         );
//     }
// }
// class Settings extends Component {
//     render() {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Text> Settings </Text>
//             </View>
//         );
//     }
// }

// const Set = TabNavigator({

//     Home: {
//         screen: Home,


//         header: <Text>Hiiiiii</Text>,

//         headerStyle: {
//             width: '100%'
//         },


//     },
//     Settings: {
//         screen: Settings
//     },


// })
// export default Set;




// import * as React from 'react';
// import { View, StyleSheet, Dimensions, Text } from 'react-native';
// import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

// const FirstRoute = () => (
//     <View style={[styles.container, { marginTop: 100, backgroundColor: '#ff4081' }]} />
// );
// const SecondRoute = () => (
//     <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
// );

// export default class Set extends React.Component {
//     state = {
//         index: 0,
//         routes: [
//             { key: 'first', title: 'First' },
//             { key: 'second', title: 'Second' },
//         ],
//     };

//     render() {
//         return (


//             <TabView
//                 navigationState={this.state}
//                 renderScene={SceneMap({
//                     first: FirstRoute,
//                     second: SecondRoute,
//                 })}
//                 onIndexChange={index => this.setState({ index })}
//                 initialLayout={{ width: Dimensions.get('window').width }}
//             />


//         )
//     }
// }

// const styles = StyleSheet.create({

//     container: {

//         justifyContent: 'center',
//         flex: 1,
//         backgroundColor: 'white',
//         paddingLeft: '3%',
//         paddingRight: '3%',
//         paddingTop: '3%',
//         paddingBottom: '1%'

//     },
// })
import React, { Component } from 'react';
import {
    Container, Header, Content, Tab, Tabs, Text, View, TouchableOpacity,
    Image,
    ScrollView
} from 'native-base';





class Tab1 extends Component {
    render() {
        return (
            <Container>


                <Text>hiii</Text>
            </Container>
        );
    }
}
class Tab2 extends Component {
    render() {
        return (
            <Container>


                <Text>hiii</Text>
            </Container>
        );
    }
}
class Tab3 extends Component {
    render() {
        return (
            <Container>


                <Text>hiii</Text>
            </Container>
        );
    }
}
export default class Set extends Component {
    state = {
        grouplist: [
            {
                name: 'vel',
                place: 'chennai',
            },
            {
                name: 'vel',
                place: 'chennai',
            },
            {
                name: 'vel',
                place: 'chennai',
            },
        ]
    }
    render() {
        return (
            <Container>
                <Header>
                    <View>


                        <Text style={{ color: 'red' }}>Hiiiiii</Text>

                    </View>
                </Header>
                <Tabs>
                    <Tab heading="Tab1">
                        <Tab1 />
                    </Tab>
                    <Tab heading="Tab2">
                        <Tab2 />
                    </Tab>
                    <Tab heading="Tab3">
                        <Tab3 />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}