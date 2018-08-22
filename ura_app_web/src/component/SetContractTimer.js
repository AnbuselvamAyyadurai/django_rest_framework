// import React, { Component } from 'react';
// import { Text, View, StyleSheet, Picker } from 'react-native';
// import { Constants } from 'expo';

// export default class SetContractTimer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       state: 'Java'
//     }
//   }
  
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.paragraph}>
//           Change code in the editor and watch it change on your phone!
//           Save to get a shareable url. You get a new url each time you save.
//         </Text>
//         <Picker
//           style={{width: 100}}
//           selectedValue={this.state.language}
//           onValueChange={(lang) => this.setState({language: lang})}>
//           <Picker.Item label="Java" value="java" />
//           <Picker.Item label="JavaScript" value="js" />
//         </Picker>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#34495e',
//   },
// });