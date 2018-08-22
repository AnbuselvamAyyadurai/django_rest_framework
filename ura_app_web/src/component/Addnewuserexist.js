
import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import * as action from './action/action';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  FlatList,
  Image,
  Alert,
  Linking
} from 'react-native';
import { Fonts } from './Fonts'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { SearchBar } from 'react-native-elements'
import Constant from '../Constants/Constant'
import CustomComponent from 'react-native-elements';
//import { Header} from 'react-native-elements';

const TempComponent = [];
class Addnewuserexist extends React.Component {
  static navigationOptions = {
    // headerTitle: <SearchBar
    // placeholder="Search"
    // ref={search => this.search = search}
    // onChangeText={()=>Addnewuserexist.handleSearchUser2()}
    // // onChangeText={this.handleSearchUser2()}
    // // onClear={()=>this.handleOnClearText()}
    // // onClear={this.handleOnClearText()}
    // icon={{ type: 'evilicon', name: 'search', size: '50' }}
    // inputStyle={{ backgroundColor: '#dee0e2', fontSize: 16, fontWidth: 30, height: 40, color: 'black' }}
    // containerStyle={{ backgroundColor: 'white', borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, width: '100%', marginLeft: -5, marginRight: 15, borderRadius: 25 }}
    // clearIcon={{ name: 'close-o', }}
    // />,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: '#3c58e8',
      shadowColor: 'transparent',
      backgroundColor: '#fff',
      IsEnableAddFamily: false,
      elevation: 0,
      TempArrVal: [],
      userId: '',
      currentSearch: "",
      UserDetails: []
    }
  };
  constructor() {
    super();
    this.state = {
      signuptext: false,
      names: [
        // {
        // id: 0,
        // name: 'bala',
        // place: 'chennai',
        // url: require('../Image/parent.png')
        // },   
        // {
        // id: 1,
        // name: 'sakthi',
        // place: 'chennai',
        // url: require('../Image/parent.png')
        // }
      ],
      SearchedData: [],
      btn_Name: "Add Family",
      // stateURL: 'http://192.168.0.49:3001/app/view/images/profile_pictures/6uCxDlr5UFKA.jpeg',
    }
  }

  static handleSearchUser2() {
    // alert("test");
    // test();
  }
  handleSearchUser(e) {
    var thisObj = this;
    this.setState({ currentSearch: e });
    var l = "";
    if (e == null || e == "") {
      e = 'Ma'
    }
    //mailSendURL, data, method
    SaveDataAPICallMailSend(Constant.base_url + '/users/name/' + e, null, 'GET')
      .then(({ data }) => {
        console.log("EXISTS", data);
        var dt = [];
        data.users.map((item, key) => {
          dt.push({
            id: 0,
            name: item.name,
            username: item.username,
            url: Constant.Img_url + item.picture,//require('../Image/parent.png'),
            userID: item._id,
            status: this.CheckAddedMembers(item._id),// item.name
          });
          this.setState({ SearchedData: dt });
          console.log("this.CheckAddedMembers(item._id)=>", this.CheckAddedMembers(item._id))
        });
        thisObj.setState({ names: dt });
        this.setState({ TempArrVal: data.users });
      }).catch((err) => {
        console.log("ERRORS", err);
      });
  }
  renderItem(data) {
    return (
      <View >
        <View>
          {TempComponent}
        </View>
      </View>
    )
  }
  handleOnClearText(e) {
    // alert(e);
    if (this.search != null) this.search.focus();
  }
  lhandlerAddToFamily(e) {
    // alert(e);
  }
  handlerAddToFamily(e) {
    // this.handlerFamilyCheck();
    this.setState({
      userId: e
    });
    console.log("user-id", e);
    let LoginMemberData = this.props.LoginData.RegUserData;
    let data = this.props.LoginData.RegUserData;
    //console.log("||",data.Name);
    let familyid = '';
    data.map((item, key) => {
      console.log("Key=>>:", item.FamilyID);
      familyid = item.FamilyID;
    });
    //alert("=>"+LoginMemberData.FamilyID);
    let userData = {
      "userId": e,//"5b1e7001a14d1f1eecdbee94",
      "familyId": familyid,//"5b1f60a588c5661888c6d2e7",
      "status": "false"
    }
    axios({
      method: 'POST',
      url: Constant.base_url + '/users/attachuser/',
      data: userData,
    }).then((data) => {
      console.log("OUTPUT:", data);
      this.setState({
        IsEnableAddFamily: true
      });
      //this.handlerFamilyCheck();
      GetMethodAPI("GET", Constant.base_url + '/users/members/families/' + familyid)
        .then((data) => {
          let sample2 = data.data;
          let sample3 = sample2.users;
          console.log("console data:=>", sample3);
          let userid = [];
          sample3.map((item, index) => {
            userid.push({
              UserID: item._id
            });
            console.log("{item.username}", item._id);
          });
          this.props.setFamilyUser(sample3);
          this.setState({ UserDetails: userid });
          let temp = this.state.SearchedData;
          let temp2 = [];
          temp.map((item, key) => {
            temp2.push({
              id: 0,
              name: item.name,
              username: item.username,
              url: item.url,
              userID: item.userID,
              status: this.CheckAddedMembers(item.userID),// item.name
            })
            this.setState({ names: temp2 });
            let len = temp2.length;
            if (len >= 1) {
              this.setState({
                signuptext: true,


              })

            }
          });
          temp2.map((item, key) => {
            console.log("status", item.status);
            console.log("username", item.username);
          });
          this.setState({ names: temp2 });
        }).catch((err) => {
          console.log("error with api calling");
        })

      //this.handlerFamilyCheck();
    }).catch((err) => {
      console.log("ERROR:", err);
    });
  }
  componentDidMount() {
    // Addnewuserexist.handleSearchUser2();
    this.handlerFamilyCheck();
  }
  handlerFamilyCheck() {
    let data = this.props.LoginData.RegUserData;
    console.log("this.props.LoginData.RegUserData==>", this.props.LoginData.RegUserData);
    //console.log("||",data.Name);
    let familyid = '';
    data.map((item, key) => {
      console.log("Key=>>:", item.FamilyID);
      familyid = item.FamilyID; //familyid = item.FamilyID;
    });

    axios({
      method: "GET",
      url: Constant.base_url + '/users/members/families/' + familyid,
    }).then((data) => {
      // let sample = data.data;
      let sample2 = data.data;
      let sample3 = sample2.users;
      console.log("console data:=>", sample3);
      let userid = [];
      sample3.map((item, index) => {
        userid.push({
          UserID: item._id
        });
        console.log("{item.username}", item._id);
      });
      this.props.setFamilyUser(sample3);
      this.setState({ UserDetails: userid });
    }).catch((err) => {
      console.log("console error data:=>", err);
    })
  }
  CheckAddedMembers(e) {

    var flag = false;
    console.log("UserDetailsData=>", this.state.UserDetails);
    this.state.UserDetails.map((item, key) => {
      console.log("POIMT:", e + "==" + item.UserID);
      if (e == item.UserID) {
        flag = true;
      }
    });
    return flag;
  }
  render() {
    // let Image_Http_URL = { uri: Constant.Img_url + '/images/profile_pictures/6uCxDlr5UFKA.jpeg' };
    const { navigate } = this.props.navigation;
    // inside your render function
    return (
      <KeyboardAwareScrollView style={styles.contain} >
        <View style={styles.container}>
          <View style={styles.container1}>
            <View style={styles.backicon}>
              <TouchableOpacity onPress={() => navigate('AddMember')} >
                <Image source={require('../Image/Back_arrow.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.searchbar}>
              <SearchBar
                placeholder="Search"
                ref={search => this.search = search}
                onChangeText={this.handleSearchUser.bind(this)}
                // onClear={()=>this.handleOnClearText()}
                onClear={this.handleOnClearText()}
                icon={{ type: 'evilicon', name: 'search', size: '100' }}
                inputStyle={{
                  backgroundColor: '#dee0e2',
                  height: 40,
                  fontSize: 19,
                  fontFamily: Fonts.AvenirLTStdBook,
                  color: '#000000', borderRadius: 10
                }}
                containerStyle={{ backgroundColor: 'white', borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, width: '100%' }}
                clearIcon={{ name: 'close-o', size: '80' }}
              />
            </View>

          </View>

          <FlatList showsVerticalScrollIndicator={false}
            data={this.state.names}
            renderItem={({ item, index }) =>
              // <TouchableOpacity key={item.name}>
              <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderTopWidth: 0.5, padding: 10 }}>
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity >
                    <Image source={{ uri: item.url }} style={styles.roleImg} />
                  </TouchableOpacity>
                </View>
                <View style={{ width: '50%', justifyContent: 'center' }}>
                  <Text style={styles.name}>
                    {item.name}
                  </Text>
                  <Text style={styles.name1}>
                    {item.username}
                  </Text>
                </View>
                <View style={{ width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={{
                    justifyContent: 'center', alignItems: 'center',
                    // backgroundColor: ((this.state.IsEnableAddFamily) && (item.userID == this.state.userId) && (item.addedUser == true)&&(item.status==true)) ? 'grey' : 'blue', borderRadius: 10, width: '90%', height: 30
                    backgroundColor: (item.status == true) ? 'grey' : '#6887ff', borderRadius: 10, width: '95%', height: 30
                  }}
                    onPress={() => this.handlerAddToFamily(item.userID)}
                    // disabled={((this.state.IsEnableAddFamily) && (item.userID == this.state.userId)&&(item.status==false)) ? true : false}
                    //new comments disabled={((this.state.IsEnableAddFamily==true) && (item.userID == this.state.userId)&&(item.status==true)) ? true : false}
                    // disabled={((item.userID == item.userID)&&(item.status==true)) ? true : false}
                    disabled={(item.status == true) ? true : false}
                  >
                    <Text style={styles.added}>{(item.status == true) ? "Added" : "Add to family"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              // </TouchableOpacity>

            } />
          {/* <View style={styles.textcontainer} > */}
          <View style={{
            marginTop: this.state.signuptext ? 30 : 250,
            // marginTop: this.state.signuptext,
            // marginBottom: '5%',
            justifyContent: 'center',
            alignItems: 'center'
          }} >

            <Text style={styles.text} >
              Adding a new user to the family?
                </Text>
            <Text style={styles.text1}
              onPress={this.handlerNavigationFun.bind(this)}>
              Signin them up here
              </Text>
          </View>

        </View>
      </KeyboardAwareScrollView>
    );
  }
  handlerNavigationFun(e) {
    this.props.navigation.navigate('AddNewMemberRole');
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
    justifyContent: 'center',
    alignItems: 'center'

  },
  container1: {
    flexDirection: 'row',

  },
  backicon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%'
  },
  searchbar: {
    width: '90%'
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  name: {
    fontSize: 19,
    fontFamily: Fonts.AvenirLTStdBlack,
    color: '#000000',

  },
  name1: {
    fontSize: 17,
    fontFamily: Fonts.AvenirLTStdBook,
    color: '#000000',
  },
  textcontainer: {
    marginTop: 250,
    // marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: Fonts.AvenirLTStdBook,
    fontSize: 17,
    color: '#000000',
  },
  text1: {
    fontFamily: Fonts.AvenirLTStdBook,
    fontSize: 17,
    color: '#6887ff',


  },
  added: {

    fontSize: 15,
    fontFamily: Fonts.AvenirLTStdBook,
    color: '#ffffff',

  },
  roleImg: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,

  },
});

const SaveDataAPICallMailSend = function (mailSendURL, data, method) {
  var promise = new Promise(function (resolve, reject) {
    axios({
      method: method,
      url: mailSendURL,
      data: data,

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
    setFamilyUser: (familydata) => {
      dispatch(action.setAddedFamilyUser(familydata));
    }
  }
}

export default connect(StateToProps, DispatchToProps)(Addnewuserexist);