import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,

} from 'react-native'
import { SearchBar } from 'react-native-elements';
import Markasdone from './Markasdone';
import { Fonts } from './Fonts';
import axios from 'axios';
import { connect } from 'react-redux';
import * as action from './action/action';
import Constant from '../Constants/Constant';
import {
  Container, Header, Tab, Tabs,
} from 'native-base';
import Mytask from './Mytask';
import Managetask from './Managetask';



class SmartContracts extends Component {
  state = {
    dataSource: [],
    isLoading: true,
    listcolor: '',
    listtxt: 'green',
    names: [],
    taskbtn: '',
    managebtn: '',
    allbtn: '',
    alltxt: '',
    listcolor: '',
    listtxt: '',
    grouplist: [],

  };


  componentDidMount() {
    var that = this;
    var uservalues = that.props.LoginData.data;
    var user = uservalues.accounts.userId;
    console.log("uservalues", uservalues)
    axios({
      method: "GET",
      url: Constant.base_url + '/users/families/' + user,
      Headers: {
        "Content-Type": "application/json",
      }
    }).then(({ data }) => {
      console.log("userdetails", data.familyDetail);
      that.setState({
        loading: false,
        grouplist: data.familyDetail,

      })
      axios({
        method: 'GET',
        url: Constant.base_url + '/smartcontracts/contracts/' + uservalues.users.name,
        Headers: {
          "Content-Type": "application/json",
        }

      }).then(({ data }) => {
        console.log('successdata', data)
        that.setState({ names: data.manageContract })
        console.log('namearray:', that.state.names)
      }).catch((err) => {
        console.log('errors', err)
      });
    }).catch((err) => {
      console.log("error", err);
    });

  }






  render() {

    return (


      <Container style={styles.container}>
        <Header style={{ marginTop: 20, height: 80 }}>
          <View style={{ height: '100%', backgroundColor: 'white', paddingHorizontal: 15 }}>

            <View style={{ height: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <View style={{
                backgroundColor: this.state.allbtn, fontFamily: 'Avenir LT Std', fontSize: 20,
                textAlign: 'center', width: '15%', height: 40, borderRadius: 20, borderWidth: 0.8,
                justifyContent: 'center', alignItems: 'center', marginRight: 10
              }}>
                <TouchableOpacity onPress={() => this.setState({ allbtn: '#6887ff', alltxt: 'white', listcolor: 'white', listtxt: '#000000' })}  >
                  <Text style={{ color: this.state.alltxt, fontFamily: 'Avenir LT Std', fontSize: 20, textAlign: 'center' }}> All </Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal={true}
                showsHorizontalScrollIndicator={false} >
                <View style={{ width: '85%', flexDirection: 'row', backgroundColor: this.state.listcolor, }}>
                  {
                    this.state.grouplist.map((item, index) => (
                      <TouchableOpacity onPress={() => this.setState({ listcolor: '#6887ff', listtxt: 'white', allbtn: 'white', alltxt: '#000000' })}
                        key={item.id}

                      >

                        <View style={{ flexDirection: 'row', marginRight: 10, height: 40, borderRadius: 20, borderWidth: 0.8 }}>
                          <View style={{
                            justifyContent: 'center', alignItems: 'center'
                          }}>
                            <TouchableOpacity style={{
                              justifyContent: 'center',
                              alignItems: 'center', height: 35, borderRadius: 35 / 2, margin: 3, borderWidth: 0.8
                            }}>
                              <Image source={{ uri: Constant.Img_url + item.familyPic }}
                                style={{
                                  width: 35,
                                  height: 35,
                                  // resizeMode: 'contain',
                                  borderRadius: 35 / 2,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={{
                            justifyContent: 'center', textAlign: 'center',
                          }}>
                            <Text style={{
                              color: this.state.listtxt,
                              fontFamily: 'Avenir LT Std',
                              fontSize: 20, textAlign: 'center'
                            }} > {item.familyName}  </Text>
                          </View>
                        </View >

                      </TouchableOpacity>
                    ))
                  }

                </View>
              </ScrollView>
            </View>
          </View>
        </Header>
        <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 0, backgroundColor: '#ffffff', elevation: 0 }} tabBarPosition='overlayTop'>
          <Tab heading="MY TASK" style={{ backgroundColor: '#f2f7fd' }} tabStyle={{ backgroundColor: '#ffffff' }} textStyle={{ color: 'gray' }} activeTabStyle={{ backgroundColor: '#ffffff' }} activeTextStyle={{ color: '#000000', fontWeight: 'normal' }}>
            <Mytask />
          </Tab>
          <Tab heading="TASK MANAGE" style={{ backgroundColor: '#f2f7fd' }} tabStyle={{ backgroundColor: '#ffffff' }} textStyle={{ color: 'gray' }} activeTabStyle={{ backgroundColor: '#ffffff' }} activeTextStyle={{ color: '#000000', fontWeight: 'normal' }}>
            <Managetask />
          </Tab>

        </Tabs>
      </Container>
    )
  }
}









const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'

  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    // paddingLeft: '8%',
    color: '#000000'
  },
  text: {
    color: '#000000',
    fontFamily: 'Avenir LT Std',
    fontSize: 20,
    textAlign: 'center'
  },
  roleImg: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    resizeMode: 'contain',


  },
  role: {

    fontFamily: 'Avenir LT Std',

  },
  nextbtn: {
    borderRadius: 10,
    // margin:'3%',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#6887ff',
    width: '90%',
    height: '80%'

  },
  task: {
    fontSize: 20,
    // color: 'gray',
    textAlign: 'center',
    // color:this.state.taskbtn
  },
  task1: {
    fontSize: 20,
    textAlign: 'center',

  },
  text1: {
    fontSize: 18,
    color: '#000000',
    fontFamily: Fonts.AvenirLTStdBlack,

  },
  times: {
    fontSize: 18,
    fontFamily: Fonts.AvenirLTStdRoman,
    color: '#000000'
  },
  // tasks:{
  //   c
  // }
})










// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//     fontSize: 28,
//   },
//   scrolls: {
//     width: '100%'
//   },
//   tabDesign: {
//     backgroundColor: 'white',
//     color: 'black',
//     borderRadius: 10,
//     elevation: 4
//   }
// });



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
export default connect(StateToProps, DispatchToProps)(SmartContracts);