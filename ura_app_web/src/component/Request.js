import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  TouchableHighlight
} from 'react-native';
import RequestTo from './RequestTo';
import { StackNavigator } from 'react-navigation';
import TextInputMask from 'react-native-text-input-mask';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fonts } from './Fonts';

export default class Request extends Component {
  state = {
    uracions: '',
    dallor: '',
    errmsg: false,
    txtbordercolor: false

  }

  static navigationOptions = {
    title: '',
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: '#ffffff',
      shadowColor: 'transparent',
      backgroundColor: '#fff',
      elevation: 0
    }
  };

  amount() {
    if (this.state.dallor == 0) {
      this.setState({ errmsg: true })
    }
    else if (this.state.dallor != 0) {
      this.props.navigation.navigate('RequestTo', this.state.dallor)
    }
  }

  render() {
    // const { navigate } = this.props.navigation;
    console.log("uracoin", this.state.uracions)
    console.log("doller", this.state.dallor)
    return (
      <KeyboardAwareScrollView style={styles.contain} >
        <View style={styles.container}>
          <View style={styles.container1}>
            <Text style={styles.title}>Request</Text>
          </View>
          <View style={styles.container2} >
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '20%' }} />
              <View style={{ flexDirection: 'column', width: '50%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.txt}>{'\u0024'}</Text>
                  <TextInputMask mask={"[0000000000]"}
                    style={styles.txt}
                    underlineColorAndroid='transparent'
                    keyboardType='numeric'
                    onChangeText={(dallor) => this.setState({ uracions: dallor * 454.20, dallor: dallor },
                      () => { this.setState({ errmsg: false }) }
                    )} />

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -15 }}>
                  <Text style={styles.uracionsstyle}>{this.state.uracions}</Text>
                  <Text style={styles.uracionsstyle}> URA  </Text>
                </View>
              </View>
              <View style={{ width: '25%', marginTop: '12%', marginLeft: "5%" }} >
                <TouchableOpacity>
                  <Image source={require('../Image/sortarrow.png')} style={styles.sortarrow} />
                </TouchableOpacity>
              </View>

            </View>
            <Text style={styles.errtxt} >{this.state.errmsg ? "Enter amount" : ""}</Text>
          </View>

          <View style={{ height: '12%', justifyContent: 'center', alignItems: 'center', }}  >
            <TouchableOpacity style={styles.nextbtn}
              onPress={() => { this.amount() }


              }>
              <Text style={styles.nexttxt}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
console.log("doller", this.dallor)
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 25
  },
  container1: {
    height: '15%'

  },
  container2: {

    height: '60%',
    flexDirection: 'column'
  },
  title: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 30,
    color: '#000000',
  },
  txt: {
    fontSize: 50,
    color: '#2952ea',
    fontFamily: Fonts.AvenirLTStdBlack,

  },
  uracionsstyle: {
    fontSize: 21,
    color: '#2952ea',
    fontFamily: Fonts.AvenirLTStdBook,
  },
  sortarrow: {
    width: 40,
    height: 50,
    resizeMode: 'contain'
  },
  errtxt: {
    color: 'red'
  },
  nexttxt: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 22,
    fontFamily: Fonts.AvenirLTStdBlack


  },
  nextbtn: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6887ff',
    width: '90%',
    height: 65
  },
});

