import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as action from './action/action';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Fonts } from './Fonts';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
    Image,
} from 'react-native';
const mobileformat = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
import TextInputMask from 'react-native-text-input-mask';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';

var options = {
    title: 'Select Avatar',
    customButtons: [
        // { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class Register extends React.Component {
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
            avatarSource: null,
            imgBase64: '',
            username: "",
            email: "",
            password: "",
            mobileno: "",
            userStatus: "Pending",
            hidePassword: true,
            errusername: false,
            erruserid: false,
            errPassword: false,
            errPhoneno: false,
            errValidusername: false,
            errValiduserid: false,
            errValidPassword: false,
            errValidPhoneno: false,
            errColorName: false,
            errColorEmail: false,
            errColorPass: false,
            errColorMobile: false,
            enteredText: '',
            useree: '',
            userImage: require('../Image/Camera.jpg'),
            fontLen: 0
        }
    }
    componentDidMount() {
        //this.props.setUserID();
        console.log("Connection successfulsly");

        this.props.setUserID("TESS");
        // console.log("UserID=",this.props.LoginData.UserID);

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
                this.setState({ errIMGURL: response.data });
                let source = { uri: 'data:image/jpeg;base64,' + response.data }
                console.log("Source: " + source);
                console.log("Source URI: " + source.uri);
                this.setState({
                    userImage: source,
                    imgBase64: source.uri
                });
                console.log(this.state.imgBase64);
            }
        });
    }

    handlerSubmit() {
        var thisObj = this;
        var isValid = this.validateFormField();

        console.log("1:", this.state.username);
        console.log("2:", this.state.email);
        console.log("3:", this.state.password);
        console.log("4:", this.state.mobileno);
        console.log("5:", this.state.imgBase64);
        if (isValid) {
            let UserInfo = {
                UserName: this.state.username,
                Email: this.state.email,
                Password: this.state.password,
                MobileNo: this.state.mobileno,
                UserImage: this.state.imgBase64,
                userStatus: "Pending",
            }
            this.props.setUserInfo(UserInfo);
            console.log("MMUUL:", this.props.LoginData.UserInfo);
            const { navigate } = this.props.navigation;
            navigate('CreateFamily');
        } else {
            console.log("validation failed");
        }
    }
    validateFormField() {
        // alert("validation starts");
        var isValid = false;
        var isValidImage = false;
        var isValidUsername = false;
        var isValidPassword = false;
        var isValidEmail = false;
        var isValidMobileno = false;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let pwdformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (this.state.errIMGURL == "" || this.state.errIMGURL == null) {
            isValidImage = false;
            this.refs.toast.show('Please choose image');
        } else {
            isValidImage = true;
            // this.setState({ imgValidation: false });
        }
        if (this.state.username == '') {
            this.setState({ errusername: true, errColorName: true });
            isValidUsername = false;
        } else if ((this.state.username != '')) {
            if ((this.state.username.length < 1) || (this.state.username.length > 25)) {
                this.setState({ errValidusername: true, errColorName: true });
                isValidUsername = false;
            }
            else {
                isValidUsername = true;
            }
        }
        if (this.state.email == '') {
            this.setState({ erruserid: true, errColorEmail: true });
            isValidEmail = false;
        }
        else if ((mailformat.test(this.state.email) == false)) {
            this.setState({ errValiduserid: true, errColorEmail: true });
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

        if (this.state.mobileno == '') {
            this.setState({ errPhoneno: true, errColorMobile: true });
            isValidMobileno = false;
        }
        else if (this.state.mobileno != '') {
            if ((mobileformat.test(this.state.mobileno) == false)) {
                this.setState({ errValidPhoneno: true, errColorMobile: true });
                // this.setState({errPhoneno:false});
                isValidMobileno = false;
            }
            else {
                isValidMobileno = true;
            }
        }
        if (isValidUsername == true && isValidEmail == true && isValidPassword == true && isValidMobileno == true && isValidImage == true)
            isValid = true;
        console.log(isValid);
        return isValid;

    }

    changeFont(username) {
        this.setState({ fontLen: 0 });
        if (username.length > 0) {
            this.setState({ fontLen: 1 });
        }
        console.log(username.length);
        console.log(this.state.fontLen);

    }

    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    render() {

        return (
            <KeyboardAwareScrollView style={styles.contain} >
                <View style={styles.container}>

                    <View style={styles.container1}>
                        <Text style={styles.title}>Register</Text>
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
                        <Text style={styles.errorMsg}>{this.state.imgValidation ? "Please choose image..." : ""}</Text>

                        <Text style={styles.profiletxt}>  Add a profile photo </Text>
                    </View>
                    <View style={styles.container3}>
                        <TextInput
                            style={styles.input}
                            value={this.state.username}
                            placeholderStyle={styles.textboxfieldd}
                            placeholder="Your name" maxLength={15}
                            underlineColorAndroid={this.state.errColorName ? 'red' : 'black'}
                            fontFamily={this.state.username.length > 0 ? Fonts.AvenirLTStdBlack : Fonts.AvenirLTStdBook}
                            onChangeText={(username) => this.setState({ username },
                                () => {
                                    this.setState({ errusername: false, errColorName: false, errValidusername: false, })
                                })}
                        />
                        <Text style={styles.errorMsg}>{this.state.errusername ? "Enter the name" : ""}</Text>
                        <Text style={styles.errorMsg}>{this.state.errValidusername ? " Invalid name" : ""}</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.email}
                            placeholder="Your email" keyboardType="email-address"
                            underlineColorAndroid={this.state.errColorEmail ? 'red' : 'black'}
                            fontFamily={this.state.email.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack}
                            onChangeText={(email) => this.setState({ email }, () => { this.setState({ erruserid: false, errValiduserid: false, errColorEmail: false }) })}
                        />
                        <Text style={styles.errorMsg}>{this.state.erruserid ? "Enter the emailId" : ""}</Text>
                        <Text style={styles.errorMsg}>{this.state.errValiduserid ? "Invalid email" : ""}</Text>
                        <View >
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
                            <Text style={styles.errorMsg}>{this.state.errValidPassword ? "Max 6 characters" : ""}</Text>
                        </View>





                        <TextInputMask mask={"[000]-[000]-[0000]"}
                            style={styles.input}
                            value={this.state.mobileno}
                            maxLength={12}
                            keyboardType='numeric'
                            placeholder="Your mobile number"
                            placeholderStyle={styles.textboxfieldd}

                            underlineColorAndroid={this.state.errColorMobile ? 'red' : 'black'}
                            onChangeText={(mobileno) => this.setState({ mobileno }, () => { this.setState({ errPhoneno: false, errValidPhoneno: false, errColorMobile: false }) })}
                            fontFamily={this.state.mobileno.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack} />
                        <Text style={styles.errorMsg}>{this.state.errPhoneno ? "Enter the mobile no" : ""}</Text>
                        <Text style={styles.errorMsg}>{this.state.errValidPhoneno ? "Invalid mobile no (format ###-###-####)" : ""}</Text>
                    </View >
                    <View style={styles.container4} >
                        <TouchableOpacity onPress={this.handlerSubmit.bind(this)} style={styles.nextbtn}>
                            <Text style={styles.nexttxt}
                                onPress={this.handlerSubmit.bind(this)}
                            >Next</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </KeyboardAwareScrollView>
        );
    }
    testhandler(e) {
        console.log("PPPP:::", this.props.LoginData.UserInfo);
    }
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: '#ffffff',

    },
    container: {
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingBottom: 25

    },

    container1: {
        height: '4%'

    },
    container2: {
        marginTop: 8,
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
        fontSize: 28,
        color: '#000000',
    },
    profiletxt: {
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
    },
    input: {
        fontSize: 22,
        paddingBottom: 20,
        color: '#000000'
    },
    textboxfieldd: {
        fontSize: 22,
        color: 'blue',


        paddingBottom: 20,

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
    nexttxt: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.AvenirLTStdBlack
    },
    nextbtn: {
        backgroundColor: '#6887ff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 65
    },

    visibilityBtn:
    {
        position: 'absolute',
        right: 3,
        height: 40,
        width: 35,
        padding: 5,
        marginTop: 20
    },
    btnImage:
    {
        resizeMode: 'contain',
        padding: 10,
        marginTop: -10,
        height: 25,
        width: 25,
    },

});
const StateToProps = (state) => {
    return {
        LoginData: state.LoginUser,
    }
}

const DispatchToProps = (dispatch) => {
    return {
        setUserID: (userid) => {
            dispatch(action.setUserIDStore(userid));
        },
        setUserInfo: (userinfo) => {
            dispatch(action.setUserInfomation(userinfo));
        }
    }
}
export default connect(StateToProps, DispatchToProps)(Register);









