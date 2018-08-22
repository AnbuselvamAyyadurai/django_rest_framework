import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    TextInput,
    TouchableOpacity,
    Alert

} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast'
import axios from 'axios';

import Modal from 'react-native-modalbox';
import DeviceInfo from 'react-native-device-info';
import Constant from '../Constants/Constant'

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            userId: '',
            deviceId: '',
            errPassword: false,
            errConfirmPassword: false,
            errColorPass: false,
            errColorPass2: false,
            errValidPassword: false,
            errValidConfirmPassword: false,
            hidePassword: true,
            hideconfirmPassword: true,
        }
    }
    componentDidMount() {
        const recoverId = this.props.navigation.state.params;
        console.log("Recover ID==>", recoverId);
        const uniqueId = DeviceInfo.getUniqueID();
        console.log(" Device uniqueId:==>", uniqueId);
        this.setState({
            deviceId: uniqueId
        })
        console.log("State DeviceId==>", this.state.deviceId);
        fetch({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            url: Constant.base_url + '/recovers/' + recoverId,
        }).then((data) => {
            data.json()
                .then((response) => {
                    this.setState({
                        userId: response.recover.userId
                    })
                }).catch((err) => {
                    console.log(err);
                })
        }).catch((err) => {
            console.log(err);
        })
    }
    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    manageconfirmPasswordVisibility = () => {
        this.setState({ hideconfirmPassword: !this.state.hideconfirmPassword });
    }
    validateFormField() {
        var isValidPassword = false;
        var isValidConfirmPassword = false;
        var isValid = false;
        if (this.state.password == '') {
            this.setState({ errPassword: true, errColorPass: true });
        } else if ((this.state.password != '')) {
            if ((this.state.password.length < 6)) {
                this.setState({ errValidPassword: true, errColorPass: true });
            }
            else {
                isValidPassword = true;
            }
        }
        if (this.state.confirmPassword == '') {
            this.setState({ errConfirmPassword: true, errColorPass2: true });
        }
        else if ((this.state.confirmPassword != '')) {
            if ((this.state.confirmPassword.length < 6)) {
                this.setState({ errValidConfirmPassword: true, errColorPass2: true });
            }
            else {
                isValidConfirmPassword = true;
            }
        }
        if (isValidPassword == true && isValidConfirmPassword == true) {
            isValid = true;
        }
        return isValid;
    }
    submitSuggestion() {
        const { navigate } = this.props.navigation;
        var isValid = this.validateFormField();
        var password = this.state.password;
        var confirmPassword = this.state.confirmPassword;
        console.log("password == confirmPassword", password == confirmPassword)
        console.log("isValid", isValid);
        if (isValid) {
            if (password == confirmPassword) {
                const recoverID = this.props.navigation.state.params;
                console.log("Success", recoverID);
                let userInputData =
                {
                    "userId": this.state.userId,
                    "deviceId": this.state.deviceId,
                    "newPassword": this.state.confirmPassword
                }
                axios({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    url: Constant.base_url + '/users/changePass/' + recoverID,
                    data: userInputData
                }).then((data) => {
                    console.log("Successfully done", data);
                    this.refs.notify.open();
                }).catch((err) => {
                    console.log("Error acquired", err);
                    if (err.message == "Request failed with status code 422") {
                        this.refs.notifyLink.open();
                    }
                    if (err.message == "Network Error") {
                        Alert.alert(
                            'Network error..'
                        )
                    }
                })
            } else {
                this.refs.toast.show('Password mismatch');
            }
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.mainView}>
                <View style={styles.Title}>
                    <Text style={styles.titleText}>Change password</Text>
                </View>
                <View style={styles.Password1}>
                    <Text style={styles.passwordText1} >Enter password</Text>
                    <View style={styles.name}>
                        <TextInput style={styles.input}
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
                    </View>
                    <Text style={styles.errorMsg} >{this.state.errPassword ? "Enter password" : ""}</Text>
                    <Text style={styles.errorMsg} >{this.state.errValidPassword ? "Max 6 characters" : ""}</Text>
                    <Text style={styles.passwordText1}>Confirm password</Text>
                    <View style={styles.name}>
                        <TextInput style={styles.input}
                            placeholder="Confirm password" secureTextEntry={this.state.hideconfirmPassword}
                            underlineColorAndroid={this.state.errColorPass ? 'red' : 'black'}
                            onChangeText={(confirmPassword) => this.setState({ confirmPassword: confirmPassword }, () => { this.setState({ errConfirmPassword: false, errValidConfirmPassword: false, errColorPass2: false }) })} />
                        <TouchableOpacity activeOpacity={0.8}
                            style={styles.visibilityBtn}
                            onPress={this.manageconfirmPasswordVisibility}>
                            <Image source={(this.state.hideconfirmPassword) ? require('../Image/hide.png') : require('../Image/show.png')}
                                style={styles.btnImage} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.errorMsg}>{this.state.errConfirmPassword ? "Enter password" : ""}</Text>
                    <Text style={styles.errorMsg} >{this.state.errValidConfirmPassword ? "Max 6 characters" : ""}</Text>
                    <View style={styles.Done} >
                        <TouchableOpacity style={styles.nextbtn} onPress={this.submitSuggestion.bind(this)}>
                            <Text style={styles.nexttxt}>Done</Text>
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

                    <Text style={styles.Check}>{"Password Successfully \nchanged.."}</Text>

                    <View style={styles.okaybtn}>
                        <TouchableOpacity onPress={() => this.refs.notify.close(navigate('Home'))} style={styles.submit1}>
                            <Text style={styles.submitText1}
                                onPress={() => this.refs.notify.close(navigate('Home'))}
                            >Okay</Text>
                        </TouchableOpacity>
                    </View>


                    {/* <Text style={styles.Check}>Password Successfully changed..</Text>
                    <TouchableHighlight
                        style={styles.Okay}
                        underlayColor='#0657db' onPress={() => this.refs.notify.close(navigate('Home'))}>
                        <Text style={styles.submitText3}
                        >Okay</Text>
                    </TouchableHighlight> */}
                </Modal>
                <Modal style={styles.modalStyle} position={'center'} ref={'notifyLink'} backdropPressToClose={false} coverScreen={true}>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => this.refs.notifyLink.close()}>
                            <Image source={require('../Image/closeicon.png')}
                                style={styles.closeicon} />
                        </TouchableOpacity>
                    </View>



                    <Text style={styles.Check1}>Link expired..</Text>

                    <View style={styles.okaybtn}>
                        <TouchableOpacity onPress={() => this.refs.notifyLink.close(navigate('Home'))} style={styles.submit1}>
                            <Text style={styles.submitText1}
                                onPress={() => this.refs.notifyLink.close(navigate('Home'))}
                            >Okay</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={styles.Check}>Link expired..</Text> */}
                    {/* <TouchableHighlight
                        style={styles.Okay}
                        underlayColor='#0657db' onPress={() => this.refs.notifyLink.close(navigate('Home'))}>
                        <Text style={styles.submitText3}
                        >Okay</Text>
                    </TouchableHighlight> */}
                </Modal>
                <Toast ref="toast"
                    position='top'
                    positionValue={250}
                    fadeInDuration={750}
                    fadeOutDuration={750}
                    opacity={0.8}
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20
    },
    titleText: {
        fontFamily: ' Avenir LT Std',
        fontSize: 26,
        color: '#000000',
        fontWeight: '600',

    },
    Title: {
        height: '10%',
        justifyContent: 'center'
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
    errorMsg: {
        fontFamily: ' Avenir LT Std',
        fontSize: 18,
        color: "#F44336",
    },
    Password1: {
        height: '60%',
        marginTop: '5%'
    },
    passwordText1:
    {
        fontFamily: ' Avenir LT Std',
        fontSize: 20,
        color: '#000000',


    },
    input: {
        fontSize: 18,
        fontFamily: 'Avenir LT Std',
        width: '100%',
    },
    Done: {
        marginTop: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nexttxt: {
        textAlign: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: 'Avenir LT Std',
        fontWeight: 'bold',
    },
    nextbtn: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6887ff',
        width: '80%',
        height: 60
    },
    Okay: {
        marginLeft: 80,
        marginRight: 15,
        borderRadius: 7,
        width: '50%',
        height: 80
    },
    Check: {
        fontFamily: ' Avenir LT Std',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#09bc03'
    },
    Check1: {
        fontFamily: ' Avenir LT Std',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },

    submitText3: {
        color: '#fff',
        textAlign: 'center',
        backgroundColor: '#3c58e8',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#3c58e8',
        color: 'white',
        fontSize: 25,
        fontFamily: ' AvenirLTStd',
    },
    modalStyle: {
        height: '35%',
        width: '80%',
        borderRadius: 20,
    },
    submitText1: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Avenir LT Std'
    },
    submit1: {
        backgroundColor: '#6887ff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 65
    },
    okaybtn: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeicon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        margin: 15
    }
})

export default ChangePassword;