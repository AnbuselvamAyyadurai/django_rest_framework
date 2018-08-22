import React, { Component } from 'react';
import {
Platform,
StyleSheet,
Text,
View,
ActivityIndicator
} from 'react-native';
import LoadingButton from 'react-native-loading-button';
// import MaterialButton from 'react-native-material-loading-button';


export default class loading extends Component {

constructor(props) {
super(props);
this.state = {
isLoading: false
};
}



render() {
return (
<View style={styles.container}>
<Text style={{fontSize:25, textAlign:'center'}}>Loading</Text>
<ActivityIndicator size="large"/>
</View>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'white',
},
welcome: {
fontSize: 20,
textAlign: 'center',
margin: 10,
},
instructions: {
textAlign: 'center',
color: '#333333',
marginBottom: 5,
},
});