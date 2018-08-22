
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Constant from '../Constants/Constant';
import Modal from 'react-native-modalbox';
import { Fonts } from './Fonts';


export default class Welcome extends React.Component {
  static navigationOptions = {
    headerLeft: null,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent',
      backgroundColor: '#fff',
      elevation: 0
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      password: '',
      loginUser: '',
      errusername: false,
      errPassword: false,
      hidePassword: true,
      errColorName: false,
      errColorPass: false,
      userImage: ''
    }
  }

  componentDidMount() {
    const userName = this.props.navigation.state.params;
    fetch({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      url: Constant.base_url + '/users/user/' + userName,
    }).then((data) => {
      data.json()
        .then((response) => {
          this.setState({
            name: response.user[0].name,
            username: response.user[0].username,
            userImage: Constant.Img_url + response.user[0].picture
          })
        }).catch((err) => {
          Alert.alert(
            'Network error..'
          )
        })
    }).catch((err) => {
      Alert.alert(
        'Network error..'
      )
    })
  }

  validateFormField = () => {
    var isValid = false;
    var isValidName = false;
    var isValidPassword = false;
    if (this.state.name == '') {
      this.setState({ errusername: true, errColorName: true });
      isValidName = false;
    }
    else {
      isValidName = true;
    }
    if (this.state.password == '') {
      this.setState({ errPassword: true, errColorPass: true });
      isValidPassword = false;
    } else if ((this.state.password != '')) {
      if ((this.state.password.length < 6)) {
        this.setState({ errValidPassword: true, errColorPass: true });
        isValidPassword = false
      }
      else {
        isValidPassword = true
      }
      if (isValidPassword == true && isValidName == true) {
        isValid = true;
      }
      return isValid;
    }

  }
  submitSuggestion() {
    const { navigate } = this.props.navigation;
    var isValid = this.validateFormField(this);
    if (isValid) {
      axios({
        method: 'PATCH',
        url: Constant.base_url + '/users/update/password',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        data: {
          username: this.state.username,
          password: this.state.password,
        }
      }).then(({ data }) => {
        this.refs.notify.open();

      }).catch((err) => {
        Alert.alert(
          'Network error..'
        )
      })
    } else {
      console.log("validation failed")
    }
  }
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAwareScrollView style={styles.contain} >
        <View style={styles.container}>
          <View style={styles.container1}>
            <Text style={styles.title} >Welcome!</Text>
            <Text style={styles.title1}>You have been added to Smith family</Text>
            <Text style={styles.title1}>Please confirm your profile details to get started.</Text>
          </View>
          <View style={{ marginTop: 12, alignItems: 'center', justifyContent: 'center' }} >
            <Image source={{ uri: this.state.userImage }} style={styles.familyImg} />

            <Text style={styles.profiletxt}>  Add a profile photo </Text>
          </View>
          <View style={{ marginTop: 20 }}>

            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={this.state.name}
              fontFamily={this.state.name.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack}
              underlineColorAndroid={this.state.errColorName ? 'red' : 'black'}
              onChangeText={(name) => this.setState({ name: name }, () => { this.setState({ errusername: false, errColorName: false, errValidusername: false }) })}
            />
            <Text style={styles.errorMsg}>{this.state.errusername ? "Enter the name" : ""}</Text>
            <Text style={styles.errorMsg}>{this.state.errValidusername ? " Enter the valid name" : ""}</Text>
            <View >
              <TextInput
                style={styles.input}
                value={this.state.password}
                fontFamily={this.state.password.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack}
                placeholder="Enter your new password" secureTextEntry={this.state.hidePassword}
                underlineColorAndroid={this.state.errColorPass ? 'red' : 'black'}
                onChangeText={(password) => this.setState({ password: password }, () => { this.setState({ errPassword: false, errValidPassword: false, errColorPass: false }) })}
              />
              <TouchableOpacity activeOpacity={0.8}
                style={styles.visibilityBtn}
                onPress={this.managePasswordVisibility}>
                <Image source={(this.state.hidePassword) ? require('../Image/hide.png') : require('../Image/show.png')}
                  style={styles.btnImage} />
              </TouchableOpacity>
              <Text style={styles.errorMsg}>{this.state.errPassword ? "Enter the password" : ""}</Text>
              <Text style={styles.errorMsg}>{this.state.errValidPassword ? "Enter the valid password" : ""}</Text>
            </View>
            <View style={styles.donebtn}>
              <TouchableOpacity onPress={this.submitSuggestion.bind(this)} style={styles.submit}>
                <Text style={styles.submitText}
                  onPress={this.submitSuggestion.bind(this)}
                >Done</Text>
              </TouchableOpacity>
            </View>
          </View>


          <Modal style={styles.modalStyle} position={'center'} ref={'notify'} backdropPressToClose={false} coverScreen={true}>
            <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => this.refs.notify.close()}>
                <Image source={require('../Image/closeicon.png')}
                  style={styles.closeicon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.Check}>Welcome {this.state.name}</Text>
            <Text style={styles.Check1}>{"Password changed \nsuccessfully"}</Text>
            <View style={styles.Okaybtn}>
              <TouchableOpacity onPress={() => this.refs.notify.close(navigate('HomeNavigate'))} style={styles.submit1}>
                <Text style={styles.submitText}
                  onPress={() => this.refs.notify.close(navigate('HomeNavigate'))}>Okay</Text>
              </TouchableOpacity>
            </View>


          </Modal>

        </View >
      </ KeyboardAwareScrollView >
    );
  }
}
const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: '#ffffff',

  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 15
  },
  container1: {
    marginBottom: '8%',
    // marginBottom: '15%'
  },

  title: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 28,
    color: '#000000',
    paddingBottom: 10,
  },
  title1: {

    fontSize: 17,
    fontFamily: Fonts.AvenirLTStdBook,
    color: '#000000'


  },
  submitText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.AvenirLTStdBlack

  },
  submit: {
    backgroundColor: '#6887ff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 65
  },
  submit1: {
    backgroundColor: '#6887ff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 60
  },
  errorMsg: {
    fontFamily: Fonts.AvenirLTStdBook,
    fontSize: 22,
    color: "#F44336",
  },
  profiletxt: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },

  input: {
    fontSize: 22,
    fontFamily: Fonts.AvenirLTStdBook,
    paddingBottom: 20
  },
  familyImg: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    marginBottom: 5,
  },

  name: {
    width: '100%',
    height: 40,
    fontSize: 16,
  },

  visibilityBtn: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5,
  },
  btnImage: {
    resizeMode: 'contain',
    padding: 10,
    marginTop: 10,
    height: 25,
    width: 25,
  },
  Okay: {
    marginLeft: 80,
    marginRight: 15,
    borderRadius: 7,
    width: '50%',
    height: 80
  },
  donebtn: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Okaybtn: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  Check: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,

  },
  Check1: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 17,
    color: '#09bc03',
    marginBottom: 20,
    textAlign: 'center'
  },
  closeicon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    margin: 15
  },

  modalStyle: {
    height: '40%',
    width: '80%',
    borderRadius: 20,
  },
});