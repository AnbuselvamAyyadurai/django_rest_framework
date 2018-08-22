import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
// import Dialog from 'react-native-dialog';
import Modal from 'react-native-modalbox';
import Constant from '../Constants/Constant';
import { Fonts } from './Fonts';

import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AnimateLoadingButton from 'react-native-animate-loading-button';
export default class RequestTo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accountno: '',
      tofielderr: false,
      lengthoferr: false,
      userInfo: { user: { name: '', username: '', picture: '' } }
    }
  }

  static navigationOptions = {
    // title: '',
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
      backgroundColor: '#ffffff',
      shadowColor: 'transparent',
      backgroundColor: '#fff',
      elevation: 0,
      paddingRight: 15
    }
  };
  // _onPressHandler() {
  //   this.loadingButton.showLoading(true);

  //   // mock
  //   setTimeout(() => {
  //     this.loadingButton.showLoading(false);
  //   }, 2000);
  // }

  Sendamount() {
    var that = this;
    axios({
      method: "GET",
      url: Constant.base_url + '/accounts/address/' + that.state.accountno,
      Headers: {
        "Content-Type": "application/json",
      }
    }).then(({ data }) => {
      console.log("details", data);
      that.setState({ userInfo: data });
      if (that.state.accountno == 0) {

        that.setState({ tofielderr: true })
      }
      else if (that.state.accountno.length < 42) {
        that.setState({ lengthoferr: true })

      } else {
        that.refs.confirm.open()

      }
    }).catch((err) => {
      console.log("error", err);
    });
  }

  render() {
    const dallor = this.props.navigation.state.params;
    console.log("dall:", dallor)
    return (
      <KeyboardAwareScrollView style={styles.contain} >
        <View style={styles.container}>
          <View style={styles.container1}>
            <Text style={styles.title}>Request</Text>
            <Text style={styles.title}> {'\u0024'}{dallor}</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.totxt}> From:  </Text>
            <TextInput underlineColorAndroid='#000000' style={styles.input} placeholder="Enter name or Select From Contacts"
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
            <Text style={styles.notetxt}> Note:  </Text>
            <TextInput underlineColorAndroid='#000000' style={styles.input1} placeholder="Description" />
          </View>
          <View style={styles.container3} >
            <TouchableOpacity style={styles.sendbtn}
              onPress={() => this.Sendamount()}>
              <Text style={styles.sendbtntxt} onPress={() => this.Sendamount()} >Send Request</Text>
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
                    <Text style={styles.sendtxt}>Request </Text>
                  </View>
                  <View>
                    <Text style={styles.dalloramountstyle}> {'\u0024'}{dallor}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sendtxt}> from</Text>
                  </View>
                </View>
                <View style={styles.modelcontainer2child}>
                  <View style={{ width: '20%' }}><Image source={{ uri: Constant.Img_url + this.state.userInfo.user.picture }}
                    style={styles.profileimage} />
                  </View>
                  <View style={{ width: '60%' }}>
                    <Text style={styles.nameemailtxt}> {this.state.userInfo.user.name} </Text>
                    <Text style={styles.nameemailtxt}> {this.state.userInfo.user.username}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center' }}>
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
                      color: '#ffffff',
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      fontFamily: 'Avenir LT Std',
                      color: '#ffffff'
                    }} onPress={() => this.refs.confirm.close(this.refs.okaybtn.open())}> Confirm </Text>
                    {/* // }} onPress={() => this.refs.confirm.close(this.refs.tryagainbtn.open())}> Confirm </Text> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal backdropPressToClose={false} style={styles.okaypopup} position={'center'} ref={'okaybtn'} swipeArea={10}>
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
                <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'Avenir LT Std', color: '#90ee90' }}>
                  {"Your Request was successfully \nsent"}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.okbtn}>
                  <Text style={styles.oktxt} onPress={() => this.props.navigation.navigate('Wallet')}> Okay </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal backdropPressToClose={false} style={styles.tryagainpopup} position={'center'} ref={'tryagainbtn'} swipeArea={10}>
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
                    fontSize: 16,
                    fontFamily: 'Avenir LT Std',
                    color: 'red'
                  }}> {"There's a problem processing your '\n'transaction please try again later."}</Text>
                </View>
              </View>
              <View style={{ width: '10%' }} />
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.tryagainbtn}>
                  <Text style={styles.trytxt} onPress={this.handleCancel}> Try again </Text>
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
  container3: {
    flex: 0.12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 30,
    color: '#000000',
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
    paddingLeft: 15
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
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 20,
    fontFamily: Fonts.AvenirLTStdBlack
  },
  errtxt: {
    color: 'red'
  },
  notetxt: {
    fontSize: 23,
    color: '#1e272e',
    marginTop: 5,
    fontFamily: Fonts.AvenirLTStdBlack,

  },
  input: {
    fontSize: 16,
    width: '91%',
    fontFamily: Fonts.AvenirLTStdBook,
    paddingBottom: 20

  },
  input1: {
    fontSize: 16,
    width: '91%',
    fontFamily: Fonts.AvenirLTStdBook,
    paddingBottom: 20


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
    fontSize: 20,
    color: '#000000'

  },
  dalloramountstyle: {
    fontFamily: Fonts.AvenirLTStdBlack,
    fontSize: 24,
    color: '#000000'
  },
  nameemailtxt: {
    fontSize: 23,
    fontFamily: Fonts.AvenirLTStdBlack,
    color: '#000000'
  },
  confirmbtn: {
    marginTop: 20,
    backgroundColor: '#6887ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 250,
    height: 50,
    textAlign: 'center'
  },
  okaypopup: {
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '35%',
    width: '80%',
    borderRadius: 20
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
    marginTop: 20,
    backgroundColor: '#6887ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 250,
    height: 50,
    textAlign: 'center'
  },
  trytxt: {
    color: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'Avenir LT Std',
    color: '#ffffff'
  },
  confirmpopup: {
    height: '50%',
    width: '80%',
    borderRadius: 20
  },
  tryagainpopup: {
    height: '35%',
    width: '80%',
    borderRadius: 20
  },
});

