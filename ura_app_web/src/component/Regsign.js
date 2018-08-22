
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    Linking
} from 'react-native';
import { Fonts } from './Fonts'

import axios from 'axios';
import Constant from '../Constants/Constant'
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
export default class Signin extends React.Component {
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
            hidePassword: true,
            erruserid: false,
            errpassword: false,
            errValiduserid: false,
            errValidpassword: false,
            errColoruserid: false,
            errColorPass: false,
            errusernotexist: false,
            typedText: 'please type your text'
        };
    }
    validateFormField() {
        var isValid = false;
        var isValidMailid = false;
        var isvalidPassword = false;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.userid == '') {
            this.setState({ erruserid: true, errColoruserid: true });
            isValidMailid = false;
        }
        else if ((mailformat.test(this.state.userid) == false)) {
            this.setState({ errValiduserid: true, errColoruserid: true });
            isValidMailid = false;
        }
        else {
            isValidMailid = true;
        }
        if (this.state.password == '') {
            this.setState({ errpassword: true, errColorPass: true });
            isvalidPassword = false;
        } else if ((this.state.password != '')) {
            if ((this.state.password.length < 6)) {
                this.setState({ errValidpassword: true, errColorPass: true });
                isvalidPassword = false;
            }
            else {
                isvalidPassword = true;
            }
        }
        if (isvalidPassword == true && isValidMailid == true) {
            isValid = true;
            console.log(isValid);
            return isValid
        }
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
                    password: this.state.password,  //'balamurugan'
                    userStatus: "activate",
                }
            }).then(({ data }) => {
                console.log(data);
                this.setState({ errUserNotExist: false });
                const mailId = this.state.userid;
                this.props.navigation.navigate('Welcome', mailId);
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
        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <Text style={styles.title} >Sign in</Text>
                    <Text style={styles.title1}>{"Please sign in below using the account \ninformations that we have sent"}. </Text>
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
                                style={styles.visibilityBtn1} />
                        </TouchableOpacity>
                        <Text style={styles.errorMsg}>{this.state.errpassword ? "Enter the password" : ""}</Text>
                        <Text style={styles.errorMsg}>{this.state.errValidpassword ? "Invalid password" : ""}</Text>

                        <Text style={styles.errorMsg}>{this.state.errUserNotExist ? "Username or password are incorrect" : ""}</Text>
                    </View>



                    <View style={styles.signIn}>
                        <TouchableOpacity onPress={this.submitSuggestion.bind(this)} style={styles.submit}>
                            <Text style={styles.submitText}
                                onPress={this.submitSuggestion.bind(this)}
                            >Sign in</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20
    },
    container1: {
        marginBottom: '8%',
        marginBottom: '15%'
    },

    title: {
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 28,
        color: '#000000',
    },
    title1: {
        fontFamily: Fonts.avenirltstdmedium,
        fontSize: 18,
        color: '#000000',
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
        height: '65%'
    },
    errorMsg: {
        fontFamily: ' Avenir LT Std',
        fontSize: 18,
        color: "#F44336",
    },
    input: {
        fontSize: 22,
        fontFamily: Fonts.AvenirLTStdBook,
        paddingBottom: 20
    },

    visibilityBtn1:
    {
        position: 'absolute',
        right: 3,
        height: 25,
        width: 25,
        resizeMode: 'contain'
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
    signIn: {
        marginTop: '13%',
        height: '21%',
        alignItems: 'center',
        justifyContent: 'center',
    },

});