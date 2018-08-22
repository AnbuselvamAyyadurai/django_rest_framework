
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import * as action from './action/action';
import axios from 'axios';
import Constant from '../Constants/Constant';
import { Fonts } from './Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
class Signin extends React.Component {
  static navigationOptions = {

    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: '#3c58e8',
      shadowColor: 'transparent',
      backgroundColor: '#fff',
      elevation: 0
    }


  };
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: '',
      userStatus: '',
      hidePassword: true,
      erruserid: false,
      errpassword: false,
      errValiduserid: false,
      errValidpassword: false,
      errColoruserid: false,
      errColorPass: false,
      errusernotexist: false,
      typedText: 'please type your text',
      loginUserInfo: [],
    };
  }


  // validateFormField() {
  //   var isvalid = false;
  //   if (this.state.userid == "") {
  //     this.setState({ errUserid: true });
  //     isvalid = false;
  //   } else {
  //     this.setState({ errUserid: false });
  //     isvalid = true;
  //   }
  //   if (this.state.password == "") {
  //     this.setState({ errPassword: true });
  //     isvalid = false;
  //   } else {
  //     this.setState({ errPassword: false });
  //     isvalid = true;
  //   }
  //   return isvalid;
  // }
  validateFormField() {
    var isValid = false;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.userid == '') {
      this.setState({ erruserid: true, errColoruserid: true });
      isValid = false;
    }
    else if ((mailformat.test(this.state.userid) == false)) {
      this.setState({ errValiduserid: true, errColoruserid: true });
      isValid = false;
    }
    else {
      isValid = true;
    }
    if (this.state.password == '') {
      this.setState({ errpassword: true, errColorPass: true });
      isValid = false;
    } else if ((this.state.password != '')) {
      if ((this.state.password.length < 6)) {
        this.setState({ errValidpassword: true, errColorPass: true });
        isValid = false;
      }

      else {
        isValid = true;
      }
    }
    return isValid;
  }
  key() {
    var that = this;
    axios({
      method: "GET",

      url: Constant.base_url + '/users/details/' + this.state.userid,
      Headers: {
        "Content-Type": "application/json",
      }
    }).then(({ data }) => {
      console.log("loginuserdetails", data);
      that.setState({ loginUserInfo: data });
      console.log("loginUserInfo", that.state.loginUserInfo);
      that.props.setLoginUser(data);
      AsyncStorage.setItem('loginUser', JSON.stringify(data));

      // console.log(data.token);
      this.setState({ errUserNotExist: false });
      if (data.users.loginUser == true) {
        console.log("datas", data.users.loginUser);
        this.props.navigation.navigate('Welcome', data.users.username);
      }
      else {
        this.props.navigation.navigate('HomeNavigate');
      }
    }).catch((err) => {
      console.log("error", err);
    });
  }

  submitSuggestion() {


    const { navigate } = this.props.navigation;
    var isValid = this.validateFormField(this);
    if (isValid) {
      axios({
        method: 'POST',
        url: Constant.base_url + '/auth',
        data: {
          username: this.state.userid,   //'balamurugan.r@mitosistech.com',
          password: this.state.password, //'balamurugan'
          userStatus: "activate",
        }
      }).then(({ data }) => {
        console.log("value", data);
        this.key();

      }).catch((err) => {
        console.log(err);
        this.setState({ errUserNotExist: true });
      })
    } else {
      console.log("Validation not success")
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
            <Text style={styles.title} >Sign in to URAllowance</Text>
          </View>
          <View style={styles.container2} >
            <TextInput
              style={styles.input}
              value={this.state.userid}
              fontFamily={this.state.userid.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack}
              placeholder="Your email"
              underlineColorAndroid={this.state.errColoruserid ? 'red' : 'black'}
              onChangeText={(userid) => this.setState({ userid }, () => { this.setState({ erruserid: false, errColoruserid: false, errValiduserid: false }) })}
              keyboardType='email-address'
            />
            <Text style={styles.errorMsg}>{this.state.erruserid ? "Enter your user id" : ""}</Text>
            <Text style={styles.errorMsg}>{this.state.errValiduserid ? "Invalid user id" : ""}</Text>
            <View >
              <TextInput style={styles.input}
                value={this.state.password}
                fontFamily={this.state.password.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack}
                placeholder="Your password" secureTextEntry={this.state.hidePassword}
                underlineColorAndroid={this.state.errColorPass ? 'red' : 'black'}
                onChangeText={(password) => this.setState({ password }, () => { this.setState({ errpassword: false, errValidpassword: false, errColorPass: false }) })}
              />
              <TouchableOpacity activeOpacity={0.8}
                style={styles.visibilityBtn}
                onPress={this.managePasswordVisibility}>
                <Image source={(this.state.hidePassword) ? require('../Image/hide.png') : require('../Image/show.png')}
                  style={styles.btnImage} />
              </TouchableOpacity>
              <Text style={styles.errorMsg}>{this.state.errpassword ? "Enter the password" : ""}</Text>
              <Text style={styles.errorMsg}>{this.state.errValidpassword ? "Invalid password" : ""}</Text>
              <Text style={styles.errorMsg}>{this.state.errUserNotExist ? "Username or password are incorrect" : ""}</Text>
              <Text style={styles.forgetpass}
                onPress={() => navigate('ForgetPassword')}>
                Forgot password?
          </Text>
            </View>
            <View style={styles.signIn}>
              <TouchableOpacity
                onPress={this.submitSuggestion.bind(this)}
                style={styles.submit}>
                <Text style={styles.submitText}
                  onPress={this.submitSuggestion.bind(this)}
                >Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView >
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
    paddingHorizontal: 20
  },
  title: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 28,
    color: '#000000',
  },
  container1: {
    marginBottom: '8%',
    marginBottom: '15%'
  },
  container2: {
    height: '92%'
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
  errorMsg: {
    fontFamily: ' Avenir LT Std',
    fontSize: 18,
    color: "#F44336",
  },
  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 17,
    marginTop: 20
  },
  input: {
    fontSize: 22,
    paddingBottom: 20
  },
  btnImage:
  {
    resizeMode: 'contain',
    marginTop: -23,
    marginLeft: -20,
    height: 26,
    width: 26,
  },
  forgetpass: {
    fontSize: 18,
    color: '#09bc03',
    fontFamily: Fonts.AvenirLTStdLight
  },
  signIn: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
const StateToProps = (state) => {
  return {


  }
}
const DispatchToProps = (dispatch) => {
  return {
    setLoginUser: (data) => {
      dispatch(action.setLoginUserDetails(data));
      // console.log('console.log("loginuserdetails", data);', data)
    },

  }
}
export default connect(StateToProps, DispatchToProps)(Signin);

