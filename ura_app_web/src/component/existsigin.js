
import React,{Component} from 'react';
import {  
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import axios from 'axios';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
export default class existsigin extends React.Component{
  static navigationOptions = {
    
    headerTitleStyle :{ textAlign: 'center',alignSelf:'center'},
    headerStyle:{
        backgroundColor:'white',
        shadowColor: 'transparent',
        backgroundColor: '#fff',
        elevation:0
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
      userid: "",
      password: '',
      errUserid: false,
      errPassword: false,
      errUserNotExist:false,
      typedText: 'please type your text'
    };
  }


    validateFormField() {
      var isvalid=false;
      if (this.state.userid == "") {
        this.setState({errUserid:true});
        isvalid=false;
      }else{
        this.setState({errUserid:false});
        isvalid=true;
      }
      if (this.state.password == "") {
        this.setState({errPassword:true});
        isvalid=false;
      }else{
        this.setState({errPassword:false});
        isvalid=true;
      }
      return isvalid;
    } 


    submitSuggestion() {
     // alert("test");
      var thisObj = this;
         var isValid = this.validateFormField(this);
         if(isValid){
          axios({
            method: 'post',
            url: 'http://192.168.0.47:3000/api/auth',
            data: {
              username: thisObj.state.userid,//'marirawj.a@mitosistech.com',
              password: thisObj.state.password//'balamurugan'
            }
          }).then(({data})=>{
            console.log(data);
               console.log(data.token);
               thisObj.setState({errUserNotExist:false});
               //navigate('Home');
          }).catch((err)=>{
             console.log(err);
             thisObj.setState({errUserNotExist:true});
          })
           //navigate('Home');
         }else{
  
         }
    }
    managePasswordVisibility = () =>
    {
      this.setState({ hidePassword: !this.state.hidePassword });
    }
    render() {
      const { navigate }    = this.props.navigation;
      return(
        <View style={styles.container2}>
        <View style={{margin:20}}>
            <Text style={{color:'black',fontSize:25,}}>Sign in</Text>
            <Text>Please sign in below using the account </Text>
            <Text>information that we have sent.</Text>
          <TextInput
          style={styles.input}
          placeholder="Your Email"
          onChangeText={(userid) => this.setState({ userid },()=>{this.setState({errUserid:false})})}
          keyboardType='emailaddress'
        />
        <Text style={styles.errorMsg}>{this.state.errUserid ? "Enter the user id": ""}</Text> 
   
        

             <View >
             <TextInput  style={styles.input}
              placeholder="Your password" secureTextEntry={this.state.hidePassword}
              onChangeText={(password) => this.setState({ password },()=>{this.setState({errPassword:false})})}
            />
            <TouchableOpacity activeOpacity={0.8}
              style={styles.visibilityBtn}
               onPress={this.managePasswordVisibility}>
               <Image source={(this.state.hidePassword) ? require('../Image/hide.png') : require('../Image/show.png')} 
               style={styles.btnImage} />
             </TouchableOpacity>                                       
         <Text style={styles.errorMsg}>{this.state.errPassword ? "Enter the password": ""}</Text> 
         <Text style={styles.errorMsg}>{this.state.errUserNotExist ? "Invalid user name password": ""}</Text> 
         </View>
       
       
        {/* <Text 
              onPress={ ()=> navigate('Home')}>Navigate Signin to HomeScreen
          </Text> */}
        <TouchableHighlight
          style={styles.submit1}
          onPress={this.submitSuggestion.bind(this)}
          underlayColor='#0657db'>
          {/* style={[this.getFontSize(),styles.submitText]} */}
          <Text style={styles.submitText3}
            // onPress={() => navigate('Addnewuserexist')}
          >Sign in</Text>
        </TouchableHighlight>
         </View>
        
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    submitText3: {
      paddingTop: 20,
      paddingBottom: 20,
      color: '#fff',
      textAlign: 'center',
      backgroundColor: '#3c58e8',
      borderRadius: 15,
      borderWidth: 1,
      borderWidth: 1,
      borderColor: '#3c58e8',
      fontSize: 25,
      //marginBottom:300,
    },
    visibilityBtn:
    {
      position: 'absolute',
      right: 3,
      height: 40,
      width: 35,
      padding: 5,
      marginTop:40
  
    },
    btnImage:
    {
      resizeMode: 'contain',
      padding: 10,
      marginTop: -10,
      height: 25,
      width: 25,
    },
    errorMsg:{
      marginLeft:25,
      color:"#F44336",
    },
    submit1: {
      marginLeft: 40,
      marginRight: 40,
      marginTop: 25,
    },
    input: {
      height: 50,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 15,
      marginTop:20,
      fontSize: 15,
    },
    container2: {
      flex:1,
      backgroundColor: '#ffffff',
        
    },
  });