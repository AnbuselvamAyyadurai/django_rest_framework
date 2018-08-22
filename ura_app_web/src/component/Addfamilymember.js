/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TextInput, AsyncStorage,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-picker';
import TextInputMask from 'react-native-text-input-mask';
import Constant from '../Constants/Constant';
import { connect } from 'react-redux';
import * as action from './action/action';
import axios from 'axios';
import { Fonts } from './Fonts';
import { Wallet } from 'ethers';
import Toast, { DURATION } from 'react-native-easy-toast'


var options = {
  title: 'Select Avatar',
  customButtons: [
    //   { name: 'fb', title: 'Choose Photo from Facebook' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class Addfamilymember extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent',
      backgroundColor: '#fff',
      elevation: 0
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      valSuccess: false,
      avatarSource: null,
      imgBase64: '',
      userName: '',
      email: '',
      password: '',
      mobileNo: '',
      errUserName: false,
      errValidUserName: false,
      errEmail: false,
      errUserId: false,
      errValidMailId: false,
      errPassword: false,
      errMobileNo: false,
      errValidPassword: false,
      errValidMobileno: false,
      hidePassword: true,
      errColorName: false,
      errColorEmail: false,
      errColorMobile: false,
      errColorPass: false,
      imgValidation: false,
      errIMGURL: "",
      userImage: require('../Image/Camera.jpg')
    }
  }
  showAlert = () => {
    Alert.alert(
      'Network error..'
    )
  }
  showImage() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({ errIMGURL: response.data })
        let source = { uri: 'data:image/jpeg;base64,' + response.data }
        console.log(source);
        console.log(source.uri);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          userImage: source,
          imgBase64: source.uri
        });
        console.log(this.state.imgBase64);
      }
    });
  }
  validateFormField() {
    var isValidImage = false;
    var isValidUsername = false;
    var isValidPassword = false;
    var isValidEmail = false;
    var isValidMobileno = false;
    // console.log(isValid);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var pwdformat = "/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/";
    // var mobileformat = "/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/";
    const mobileformat = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    if (this.state.errIMGURL == "" || this.state.errIMGURL == null) {
      isValidImage = false;
      this.refs.toast.show('Please choose image');
    } else {
      isValidImage = true;
      // this.setState({ imgValidation: false });
    }
    if (this.state.userName == '') {
      this.setState({ errUserName: true, errColorName: true });
      isValidUsername = false;
    } else if ((this.state.userName != '')) {
      if ((this.state.userName.length < 1) || (this.state.userName.length > 25)) {
        this.setState({ errValidUserName: true, errColorName: true });
        isValidUsername = false;
      }
      else {
        isValidUsername = true;
      }
    }
    if (this.state.mobileNo == '') {
      this.setState({ errMobileNo: true, errColorMobile: true });
      isValidMobileno = false;
    }
    else if ((mobileformat.test(this.state.mobileNo) == false)) {
      this.setState({ errValidMobileno: true, errColorMobile: true });
      isValidMobileno = false;
    }
    else {
      isValidMobileno = true;
    }
    if (this.state.email == '') {
      this.setState({ errEmail: true, errColorEmail: true });
      isValidEmail = false;
    }
    else if ((mailformat.test(this.state.email) == false)) {
      this.setState({ errValidEmailid: true, errColorEmail: true });
      isValidEmail = false;
    }
    else {
      isValidEmail = true;
    }
    if (this.state.password == '') {
      this.setState({ errPassword: true, errColorPass: true });
      isValidPassword = false;
    } else if ((this.state.password != '')) {
      if ((this.state.password.length < 6)) {
        this.setState({ errValidPassword: true, errColorPass: true });
        isValidPassword = false;
      }
      else {
        isValidPassword = true;
      }
    }

    if (isValidUsername == true && isValidPassword == true && isValidEmail == true && isValidMobileno == true && isValidImage == true) {
      console.log("success");
      this.state.valSuccess = true;
      console.log(this.state.valSuccess)
      this.refs.viamsg.open();
    }
    else {
      console.log("failed");
      this.state.valSuccess = false;
    }
    // console.log(this.state.valSuccess);
    // return isValid;
  }
  componentDidMount() {
    ///   alert(this.props.LoginData.UserRole); 
  }
  createWallet() {
    let wallet = Wallet.createRandom();
    console.log("Address: ", wallet.address);
    console.log("privateKey: ", wallet.privateKey);
    return wallet;
  }
  submitSuggestion() {
    this.refs.viamsg.close();
    this.refs.loader.open();
    const { navigate } = this.props.navigation;
    //alert(this.props.LoginData.Role);
    // var isValid = this.validateFormField(this);
    console.log(this.state.valSuccess);


    if (this.state.valSuccess == true) {

      let data = this.props.LoginData.RegUserData;
      console.log("||", data);
      let familyid = '';
      let role = this.props.LoginData.UserRole;
      console.log("ROlE:", role);
      data.map((item, key) => {
        console.log("Key=>>:", item.FamilyID);
        familyid = item.FamilyID;
      });
      let userInputData =

      {
        "user": {
          "name": this.state.userName,//"balsa",
          "username": this.state.email,//"balsdsdsdsakumautytsadfjtytud.n@mitosistech.com",
          "password": this.state.password,//"12345678",
          "mobile": this.state.mobileNo,//"9090456456",
          "userStatus": "Pending",
          "loginUser": "true",
          "picture": this.state.imgBase64,
        },
        "family": {
          "familyId": familyid,//"1241241251251512312313",
          "role": role//"Parent"
        }
      }
      console.log("userDetails", userInputData)
      this.props.setUserData(userInputData);
      // {
      //   "user": {
      //     "name": this.state.userName,//"basdasdfdla",
      //     "username": this.state.email,//"balafdsmsdsdsaassdfdfsdran.n@mitoistech.com",
      //     "password": this.state.password,//"balsdamiasasdsdto",
      //     "mobile": this.state.mobileNo,//"9034s34343490",
      //     "picture": this.state.imgBase64,
      //     "role": this.props.LoginData.Role
      //   },
      //   "family":{
      //     "familyId":familyid,//"1241241251251512312313",
      //     "role":role//"Parent"
      //     }
      // }
      try {
        axios({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          url: Constant.base_url + '/users',
          data: userInputData
        }).then((data) => {
          // this.refs.viamsg.close();
          this.refs.loader.close();
          this.refs.notify.open();
          console.log("SUCCESS", data);

          wallet = this.createWallet();
          console.log("successwallet", wallet);

          let AccountsData = {
            "userId": data.data.data._id,
            "accNumber": wallet.address,
            "username": this.state.email,
            "privateKey": wallet.privateKey,
            "lock": "false"
          }
          console.log("data", JSON.stringify(AccountsData));

          axios({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            url: Constant.base_url + '/accounts',
            data: AccountsData
          }).then((data) => {
            console.log("SUCCESS", data);
          }).catch((err) => {
            this.dataError = true;
            console.log("error", err);
          });

          // }).catch((err) => {
          //   this.refs.notify.close();
          //   //  this.showAlert();
          //   console.log("ERRORS", err);

          GetMethodAPI("GET", Constant.base_url + "/users/members/families/" + familyid)
            .then((data) => {
              let sample2 = data.data;
              let sample3 = sample2.users;
              this.props.setFamilyUser(sample3);
              console.log("sccesss", data);
            }).catch((error) => {
              console.log("failed");
            })
        }).catch((err) => {
          console.log("ERRORS", err);
          if (err.message == "Request failed with status code 422") {
            this.refs.loader.close();
            Alert.alert(
              'Username aldready exists...'
            )
          }
          if (err.message == "Request failed with status code 500") {
            this.refs.loader.close();
            Alert.alert(
              'Username aldready exists...'
            )
          }
          if (err.message == "Network Error") {
            this.refs.loader.close();
            Alert.alert(
              'Network error..'
            )
          }
        });
      } catch (err) {
        this.refs.notify.close();
        this.showAlert();

      }
    }
    else {
      console.log("Validation failed..")
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
            <Text style={styles.title}> Add new family member</Text>
          </View>
          <View style={styles.container2}>

            <TouchableOpacity onPress={this.showImage.bind(this)} style={styles.profileimg} >
              <Image source={this.state.userImage} style={styles.familyImg} />
            </TouchableOpacity>
            <Toast ref="toast"
              position='top'
              positionValue={200}
              fadeInDuration={750}
              fadeOutDuration={750}
              opacity={0.8}
            />
            <Text style={styles.profiletxt}>  Add a profile photo </Text>
          </View>


          <View style={styles.container3}>
            {/* Name */}
            <TextInput
              style={styles.input}
              value={this.state.userName}
              fontFamily={this.state.userName.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack}
              placeholder="Your name" maxLength={15}
              underlineColorAndroid={this.state.errColorName ? 'red' : 'black'}
              onChangeText={(userName) => this.setState({ userName }, () => { this.setState({ errUserName: false, errColorName: false, errValidUserName: false }) })}
            />

            <Text style={styles.errorMsg}>{this.state.errUserName ? "Enter the user name" : ""}</Text>
            <Text style={styles.errorMsg}>{this.state.errValidUserName ? "Invalid name" : ""}</Text>




            {/* Email Address */}
            <TextInput
              style={styles.input}
              value={this.state.email}
              fontFamily={this.state.email.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack}
              keyboardType="email-address"
              placeholder="Your email"
              underlineColorAndroid={this.state.errColorEmail ? 'red' : 'black'}
              onChangeText={(email) => this.setState({ email }, () => { this.setState({ errEmail: false, errValidEmailid: false, errColorEmail: false }) })}
            />
            <Text style={styles.errorMsg}>{this.state.errEmail ? "Enter the email" : ""}</Text>
            <Text style={styles.errorMsg}>{this.state.errValidEmailid ? "Invalid email " : ""}</Text>




            {/* password */}
            <View>
              <TextInput style={styles.input}
                value={this.state.password}
                fontFamily={this.state.password.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack}
                placeholder="Your password" secureTextEntry={this.state.hidePassword}
                underlineColorAndroid={this.state.errColorPass ? 'red' : 'black'}
                onChangeText={(password) => this.setState({ password }, () => { this.setState({ errPassword: false, errValidPassword: false, errColorPass: false }) })}
              />
              <TouchableOpacity activeOpacity={0.8}
                style={styles.visibilityBtn}
                onPress={this.managePasswordVisibility}>
                <Image source={(this.state.hidePassword) ? require('../Image/hide.png') : require('../Image/show.png')}
                  style={styles.btnImage} />
              </TouchableOpacity>

              <Text style={styles.errorMsg}>{this.state.errPassword ? "Enter the password" : ""}</Text>
              <Text style={styles.errorMsg}>{this.state.errValidPassword ? "Invalid password max 6 char" : ""}</Text>
            </View>


            {/* Mobile Number */}

            <TextInputMask mask={"[000]-[000]-[0000]"}
              style={styles.input}
              //value={this.state.mobileno}
              maxLength={12}
              keyboardType='numeric'
              style={styles.input}
              value={this.state.mobileNo}
              fontFamily={this.state.mobileNo.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack}
              placeholder="Your mobile number"
              underlineColorAndroid={this.state.errColorMobile ? 'red' : 'black'}
              onChangeText={(mobileNo) => this.setState({ mobileNo }, () => { this.setState({ errMobileNo: false, errValidMobileno: false, errColorMobile: false }) })}
            //onChangeText={this.handlerMobileNo.bind(this)} 
            />

            <Text style={styles.errorMsg}>{this.state.errMobileNo ? "Enter the mobile no" : ""}</Text>
            <Text style={styles.errorMsg}>{this.state.errValidMobileno ? "Invalid mobile no (format ###-###-####)" : ""}</Text>


          </View >

          {/* Done button */}

          <View style={styles.container4} >
            <TouchableOpacity onPress={() => this.validateFormField()}
              style={styles.donebtn}>
              <Text style={styles.donetxt}
                onPress={() => this.validateFormField()}
              >Done</Text>
            </TouchableOpacity>
          </View>





          <Modal style={styles.viamsgbox} position={'center'} ref={'viamsg'} swipeArea={10} backdropPressToClose={false} coverScreen={true}>
            <View style={{ flex: 1, margin: 15 }} >

              <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => this.refs.viamsg.close()}>
                  <Image source={require('../Image/closeicon.png')}
                    style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                </TouchableOpacity>
              </View>
              <View >
                <Text style={styles.notifystyle} > Notify {this.state.userName} Via  </Text>
              </View>
              <View style={{ justifyContent: 'center', marginTop: '5%' }}>
                <View style={{ justifyContent: 'center', borderBottomWidth: 0.5, padding: 20 }}>
                  <TouchableOpacity>
                    <Text style={styles.smstxt} > SMS </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', padding: 20 }}>
                  {/* <Text onPress={() =>this.submitSuggestion(this.refs.viamsg.close(this.refs.viasms.open()))}> Email </Text> */}
                  <TouchableOpacity onPress={() => this.submitSuggestion()}>
                    <Text onPress={() => this.submitSuggestion()} style={styles.smstxt} > Email </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal style={styles.modalStyle} position={'center'} ref={'loader'} backdropPressToClose={false} coverScreen={true}>
            <Text>Loading</Text>
            <ActivityIndicator size='large' />
          </Modal>

          <Modal style={styles.viasmsbox} position={'center'} ref={'notify'} swipeArea={10} backdropPressToClose={false} coverScreen={true}>
            <View style={{ flex: 1, margin: '5%' }} >

              <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => this.refs.notify.close()}>
                  <Image source={require('../Image/closeicon.png')}
                    style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '5%' }} >
                <Text style={styles.senttxt} >
                  Notification sent. </Text>
              </View>

              <View style={{ alignItems: 'center', marginTop: '15%' }}>
                <TouchableOpacity onPress={() => navigate("AddMember")} style={styles.okbtn} >
                  <Text style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 20,
                    fontFamily: Fonts.AvenirLTStdBlack

                  }} onPress={() => navigate("AddMember")}> Okay </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAwareScrollView>
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
    paddingBottom: 25

  },

  container1: {
    height: '5%'

  },
  container2: {
    marginTop: 15,
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'

  },
  container3: {
    marginTop: 15,
  },
  container4: {

    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 24,
    color: '#000000',
  },
  profiletxt: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },

  notifystyle: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',

  },
  input: {
    fontSize: 22,
    paddingBottom: 20
  },

  errorMsg: {
    fontFamily: Fonts.AvenirLTStdBook,
    fontSize: 22,
    color: "#F44336",
  },
  profileimg: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  familyImg: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },


  donetxt: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.AvenirLTStdBlack

  },
  donebtn: {
    backgroundColor: '#6887ff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 65
  },


  modalStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '40%',
    borderRadius: 20,
  },


  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5,

  },
  btnImage:
  {
    resizeMode: 'contain',
    padding: 10,
    marginTop: 5,
    height: 25,
    width: 25,
  },
  smstxt: {
    fontSize: 22,
    fontFamily: Fonts.AvenirLTStdBook,
  },

  viamsgbox: {
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '37%',
    width: '80%',
    borderRadius: 20
  },

  viasmsbox: {
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '34%',
    width: '80%',
    borderRadius: 20
  },
  senttxt: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.AvenirLTStdBlack,
    color: '#09bc03'
  },

  okbtn: {

    backgroundColor: '#6887ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    height: '55%',
    textAlign: 'center'

  }
});
const GetMethodAPI = function (method, mailSendURL) {
  var promise = new Promise(function (resolve, reject) {
    axios({
      method: method,
      url: mailSendURL,

    }).then((data) => {
      resolve(data);
    })
      .catch((err) => {
        console.log("DATA ", err);
        reject(err);
      });
  })
  return promise;
}
const StateToProps = (state) => {
  return {
    LoginData: state.LoginUser,
  }
}
const DispatchToProps = (dispatch) => {
  return {
    setRoleInfo: (roleInfo) => {
      dispatch(action.setRoleInfomation(roleInfo));
    },
    setFamilyUser: (familydata) => {
      dispatch(action.setAddedFamilyUser(familydata));
    },
    setUserData: (userInputdata) => {
      dispatch(action.setUservalues(userInputdata));
    }
  }
}
export default connect(StateToProps, DispatchToProps)(Addfamilymember);