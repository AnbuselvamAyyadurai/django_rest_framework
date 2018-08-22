import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
// import Dialog from 'react-native-dialog';
import Modal from 'react-native-modalbox';
import { wallet } from 'ethers';
import { Fonts } from './Fonts';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import { connect } from 'react-redux';
import * as action from './action/action';
import Constant from '../Constants/Constant';
class SendTo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accountno: '',
      tofielderr: false,
      lengthoferr: false,
      userInfo: { user: { name: '', username: '', picture: '' } },
      toAccount: ''
    }
  }

  static navigationOptions = {

    headerRight: <TouchableOpacity >
      <Image source={require('../Image/QRcode.png')}
        style={{
          width: 25,
          height: 25,
          resizeMode: 'contain'
        }} />
    </TouchableOpacity>,
    // title: '',

    headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent',
      backgroundColor: '#fff',
      elevation: 0,
      paddingRight: 15
    }
  };
  // _onPressHandler() {
  // this.loadingButton.showLoading(true);

  // // mock
  // setTimeout(() => {
  // this.loadingButton.showLoading(false);
  // }, 2000);
  // }

  componentWillMount() {

    AsyncStorage.getItem('loginUser').then((value) => {
      var userLogin = JSON.parse(value);
      console.log("Async login user: " + userLogin)
      this.setState({ 'userLogin': userLogin })
    });
  }

  Sendamount() {

    var Self = this;
    console.log('accountno', Self.state.accountno);
    console.log('constant url:', Constant.base_url + '/accounts/address/' + Self.state.accountno);
    axios({
      method: "GET",
      url: Constant.base_url + '/accounts/address/' + Self.state.accountno,
      Headers: {
        "Content-Type": "application/json",
      }
    }).then(({ data }) => {
      console.log("details", data);
      // var logDetails = thatObj.props.LoginData.data;
      // console.log('logDetailsacc', logDetails.accounts.accNumber);
      Self.setState({ userInfo: data });
      Self.setState({ toAccount: data });
      if (Self.state.accountno == 0) {

        Self.setState({ tofielderr: true })
      }
      else if (Self.state.accountno.length < 42) {
        Self.setState({ lengthoferr: true })

      }
      // else if () {


      // }
      else {
        Self.refs.confirm.open()

      }
    }).catch((err) => {
      console.log("error", err);
    });
  }

  Transaction() {
    // var amount = this.props.navigation.state.params + '';
    var amount = this.props.navigation.state.params.dallor;
    var urAmount = this.props.navigation.state.params.uracions;
    urAmount = urAmount.toFixed(5);
    console.log("amount:", amount);
    console.log("urAmount:", urAmount);
    let ethers = require('ethers');
    let utils = require('ethers/utils');
    var privateKey = this.state.userLogin.accounts.privateKey;
    console.log("privatekey;", privateKey);

    var wallet = new ethers.Wallet(privateKey);
    wallet.provider = ethers.providers.getDefaultProvider('ropsten');


    wallet.getBalance().then(function (balance) {


      var etherString = utils.formatEther(balance);

      console.log("Balance: " + etherString);
    });

    // var address = '0xb84360f45aD4A3857729B9371F74f31c7B4a521c';
    // var amount = utils.parseEther('0.5');
    var address = this.state.accountno;
    console.log("hi", address);
    var amountval = utils.parseEther(urAmount);
    console.log("hwwlo", amountval);
    var that = this;
    var sendPromise = wallet.send(address, amountval)
      .then(function (transactionHash) {
        console.log(transactionHash);
        that.refs.confirm.close(that.refs.okaybtn.open());

      }).catch((err) => {
        console.log("ERROR", err)
        that.refs.confirm.close(that.refs.tryagainpopup.open());
      })


  }

  tarnsDetails() {
    var thatObj = this;
    var amount = thatObj.props.navigation.state.params.dallor;
    var urAmount = "";
    urAmount = thatObj.props.navigation.state.params.uracions;
    var logDetails = thatObj.props.LoginData.data;
    // var date = new Date();
    // var d = date.toString();
    let date = moment(new Date()).format('DD MMMM YYYY');
    console.log('dates', date);
    let time = moment(new Date()).format('HH:mma');
    console.log('cur_times', time);
    console.log('logDetails', logDetails);
    var toAddress = thatObj.state.toAccount;
    console.log('toAddress', toAddress);
    console.log('ID', logDetails.accounts.userId);
    console.log('date', date);
    console.log('time', time);
    console.log('usd', amount);
    console.log('ura', urAmount);
    console.log('from', logDetails.accounts.accNumber);
    console.log('to', toAddress.accountById.accNumber);
    console.log('name', toAddress.user.name);
    console.log('image', toAddress.user.picture);
    console.log(Constant.base_url + '/transactions/send');

    var JsonData = JSON.stringify({

      "userIdFrom": logDetails.accounts.userId,
      "userIdTo": toAddress.accountById.userId,
      "date": date,
      "time": time,
      "usd": amount,
      "ura": urAmount.toString(),
      "from": logDetails.accounts.accNumber,
      "to": toAddress.accountById.accNumber,
      "name": toAddress.user.name,
      "picture": Constant.Img_url + toAddress.user.picture
    });
    console.log("JData" + JsonData);
    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //   Accept: 'application/json'
      },
      url: Constant.base_url + '/transactions/send',
      data: JsonData,
    }).then((data) => {
      console.log("Success data", data);
      thatObj.refs.okaybtn.close();
      thatObj.props.navigation.navigate('Wallet');
    })
      .catch((err) => {
        console.log("resenderror", err);
      });


  };

  // tarnsDetails() {
  //   var thatObj = this;
  //   var amount = thatObj.props.navigation.state.params.dallor;
  //   var urAmount = thatObj.props.navigation.state.params.uracions;
  //   var logDetails = thatObj.props.LoginData.data;
  //   // var date = new Date("03/08/2015");
  //   // var d = date.toString();
  //   // var date = new Date().getDate();
  //   // var month = new Date().getMonth() + 0;
  //   // var year = new Date().getFullYear();
  //   console.log('logDetails', logDetails);
  //   var toAddress = thatObj.state.toAccount;
  //   console.log('toAddress', toAddress);

  //   var Toname = toAddress.user.name;
  //   console.log('Toname', Toname);
  //   console.log('ID', logDetails.accounts.userId);
  //   // console.log('date', d);
  //   console.log('usd', amount);
  //   console.log('ura', urAmount);
  //   console.log('to', toAddress.accountById.accNumber);
  //   console.log('name', toAddress.user.name);
  //   console.log('image', toAddress.user.picture);
  //   console.log(Constant.base_url + '/api/transactions/send');
  //   let transactionDetails = {
  //     "userId": logDetails.accounts.userId,
  //     "date": d,
  //     "usd": amount,
  //     "ura": urAmount,
  //     "transType": "send",
  //     "to": toAddress.accountById.accNumber,
  //     "name": toAddress.user.name,
  //     "image": "addaddaadad",
  //   }
  //   axios({
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     url: Constant.base_url + '/api/transactions/send',
  //     data: transactionDetails
  //   }).then((data) => {
  //     console.log("Success data", data);

  //     // thatObj.refs.okaybtn.close();
  //     // thatObj.props.navigation.navigate('Wallet');

  //   })
  //     .catch((err) => {

  //       console.log("resenderror", err);
  //     });
  // }

  render() {
    const dallor = this.props.navigation.state.params.dallor;
    const uracions = this.props.navigation.state.params.uracions;

    // const dall= this.props.navigation.state.params.dallor
    console.log("dall:", dallor);
    console.log("uracions:", uracions);

    return (
      <KeyboardAwareScrollView style={styles.contain} >
        <View style={styles.container}>
          <View style={styles.container1}>
            <Text style={styles.title}>Send</Text>
            <Text style={styles.title}> {'\u0024'}{dallor}</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.totxt}> To: </Text>
            <TextInput underlineColorAndroid='black' style={styles.input} placeholder="Enter URA Address or Select From Contacts"
              maxLength={42}

              onChangeText={(accountno) => this.setState({ accountno },
                () => this.setState({ tofielderr: false, lengthoferr: false }))} />
            <View>
              <TouchableOpacity style={styles.contactBtn}>
                <Image source={require('../Image/user_icons.png')} style={styles.btnImage} />
              </TouchableOpacity>
            </View>
            <Text style={styles.errtxt} >{this.state.tofielderr ? "Enter Account Number" : ""}</Text>
            <Text style={styles.errtxt} >{this.state.lengthoferr ? "Enter Minimum 42 char" : ""}</Text>
            <Text style={styles.notetxt}> Note: </Text>
            <TextInput underlineColorAndroid='black' style={styles.input1} placeholder="Description" />
          </View>
          <View style={styles.container3} >
            <TouchableOpacity onPress={() => this.Sendamount()} style={styles.sendbtn}
            >
              <Text style={styles.sendbtntxt} onPress={() => this.Sendamount()} >Send</Text>
            </TouchableOpacity>
          </View>

          <Modal backdropPressToClose={false} style={styles.confirmpopup} coverScreen={true} position={'center'} ref={'confirm'} swipeArea={10}>
            <View style={styles.modelmaincontainer}>

              <View style={{ margin: '5%' }} >
                <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => this.refs.confirm.close()}>
                    <Image source={require('../Image/closeicon.png')}
                      style={styles.closeicon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.modelcontainer2} >
                <Text style={styles.confirmtxt} >Confirmation</Text>
                <View style={styles.modelcontainer2child}>
                  <View>
                    <Text style={styles.sendtxt} onPress={() => this.key(this.Transaction())}>Send </Text>
                  </View>
                  <View>
                    <Text style={styles.dalloramountstyle}> {'\u0024'}{dallor}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sendtxt}> to</Text>
                  </View>
                </View>
                <View style={styles.modelcontainer2child}>
                  <View style={{ width: '20%' }}><Image source={{ uri: Constant.Img_url + this.state.userInfo.user.picture }}
                    style={styles.profileimage} />
                  </View>
                  <View style={{ width: '60%' }}>
                    <Text style={styles.nameemailtxt}>{this.state.userInfo.user.name}</Text>
                    <Text style={styles.nameemailtxt}>{this.state.userInfo.user.username}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity style={styles.confirmbtn}>

                    {/* <AnimateLoadingButton ref={c => (this.loadingButton = c)}
 width={250}
 height={50}
 enableWidthAnimation={false}
 title="Confirm"
 titleFontSize={20}
 fontFamily={'Avenir LT Std'}
 titleColor="white"
 backgroundColor="#6887ff"
 borderRadius={10}
 onPress={this._onPressHandler.bind(this)}
 /> */}
                    <Text style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 22,
                      fontFamily: Fonts.AvenirLTStdBlack,
                      color: '#ffffff'
                    }} onPress={() => this.Transaction()}> Confirm </Text>
                    {/* // }} onPress={() => this.refs.confirm.close(this.refs.tryagainbtn.open())}> Confirm </Text> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal backdropPressToClose={false} style={styles.okaypopup} position={'center'} coverScreen={true} ref={'okaybtn'} swipeArea={10}>
            <View style={{ flex: 1 }}>
              <View style={{ margin: '5%' }} >
                <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => this.refs.okaybtn.close()}>
                    <Image source={require('../Image/closeicon.png')}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 21, fontFamily: Fonts.AvenirLTStdBook, color: '#40AB1B' }}>
                  {"Your Transaction is being \nprocessed"}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.okbtn}>
                  <Text style={styles.oktxt} onPress={() => this.tarnsDetails()}> Okay </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal backdropPressToClose={false} style={styles.tryagainpopup} position={'center'} ref={'tryagainbtn'} coverScreen={true} swipeArea={10}>
            <View style={{ flex: 1 }}>
              <View style={{ margin: '5%' }} >
                <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => this.refs.tryagainbtn.close()}>
                    <Image source={require('../Image/closeicon.png')}
                      style={styles.closeicon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '10%' }} />
                <View style={{ width: '80%' }}>
                  <Text style={{
                    textAlign: 'center',
                    fontSize: 21,
                    fontFamily: Fonts.AvenirLTStdBook,
                    color: 'red'
                  }}> {"There's a problem processing your '\n'transaction please try again later."}</Text>
                </View>
              </View>
              <View style={{ width: '10%' }} />
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.tryagainbtn}>
                  <Text style={styles.trytxt} onPress={() => this.refs.tryagainbtn.close()} > Try again </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View >

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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 25
  },
  container1: {
    height: '15%',
    flexDirection: 'row'

  },
  container2: {
    height: '68%',
    flexDirection: 'column'
  },
  title: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 30,
    color: '#000000',
  },
  container3: {
    flex: 0.12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    width: '92%',
    fontFamily: Fonts.AvenirLTStdBook,
    paddingBottom: 20

  },
  input1: {
    fontSize: 16,
    width: '92%',
    fontFamily: Fonts.AvenirLTStdBook,
    paddingBottom: 20


  },

  totxt: {
    fontSize: 23,
    color: '#1e272e',
    fontFamily: Fonts.AvenirLTStdBlack,

  },
  qrimgstyle: {

  },

  btnImage:
  {
    resizeMode: 'contain',
    height: 30,
    width: 30,

  },
  sendbtn: {

    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6887ff',
    width: '90%',
    height: 65
  },
  sendbtntxt: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Fonts.AvenirLTStdBlack
  },
  errtxt: {
    fontFamily: ' Avenir LT Std',
    fontSize: 16,
    color: "#F44336",


  },
  notetxt: {
    fontSize: 22,
    color: '#1e272e',
    marginTop: 5,
    fontFamily: Fonts.AvenirLTStdBlack,

  },

  contactBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    resizeMode: 'contain',
    paddingLeft: 10,
    marginTop: -47.5,
    // borderBottomWidth: 1.6,
    width: '11.5%'


  },
  profileimage: {
    // resizeMode: 'contain',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  modelmaincontainer: {
    flex: 1
  },
  modelcontainer1: {
    margin: '5%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  modelcontainer2: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modelcontainer2child: {
    marginTop: '5%',
    flexDirection: 'row'
  },
  closeicon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  confirmtxt: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 24,
    color: '#000000'
  },
  sendtxt: {
    fontFamily: Fonts.AvenirLTStdBook,
    fontSize: 24,
    color: '#000000'
  },
  dalloramountstyle: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 24,
    color: '#000000'
  },
  nameemailtxt: {
    fontSize: 24,
    fontFamily: Fonts.AvenirLTStdBlack,
    color: '#000000'
  },
  confirmbtn: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6887ff',
    borderRadius: 15,
    width: 300,
    height: 55,

  },
  okaypopup: {
    // justifyContent: 'center',
    // alignItems: 'center',

    height: '35%',
    width: '80%',
    borderRadius: 15
  },
  okbtn: {
    marginTop: 20,
    backgroundColor: '#6887ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 250,
    height: 50,
    textAlign: 'center'
  },
  oktxt: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: Fonts.AvenirLTStdBlack

  },
  tryagainbtn: {
    marginTop: 25,
    backgroundColor: '#6887ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 300,
    height: 50,
    textAlign: 'center'
  },
  trytxt: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: Fonts.AvenirLTStdBlack

  },
  confirmpopup: {
    height: '48%',
    width: '90%',
    borderRadius: 20
  },
  tryagainpopup: {
    height: '35%',
    width: '80%',
    borderRadius: 20
  },
});

const StateToProps = (state) => {
  return {
    LoginData: state.LoginUser,
    data: state.data,

  }
}

const DispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(StateToProps, DispatchToProps)(SendTo);


