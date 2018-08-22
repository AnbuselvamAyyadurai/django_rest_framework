import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    Button,
    Image,
    Linking,
    TextInput,
    TouchableOpacity,
    Alert

} from 'react-native';
import axios from 'axios';
import Constant from '../Constants/Constant';
import Modal from 'react-native-modalbox';
import DeviceInfo from 'react-native-device-info';
import FloatingLabel from 'react-native-floating-labels';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceId: '',
            username: '',
            errusername: false,
            errColorPass: false,
            errValidUsername: false
        }
    }
    static navigationOptions = {
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            elevation: 0
        }
    }
    componentDidMount() {
        const uniqueId = DeviceInfo.getUniqueID();
        console.log("uniqueId:==>", uniqueId);
        this.setState({
            deviceId: uniqueId
        })
        console.log("State DeviceId==>", this.state.deviceId);
        console.log("User name==>", this.state.username);
    }
    validateFormField() {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let isValid = false;
        if (this.state.username == '') {
            this.setState({ errusername: true, errColorPass: true })
            isValid = false;
        } else if ((mailformat.test(this.state.username) == false)) {
            this.setState({ errValidUsername: true })
            isValid = false;
        }
        else {
            isValid = true;
        }
        return isValid;
    }
    submitSuggestion() {
        const uniqueId = DeviceInfo.getUniqueID();
        console.log("uniqueId:==>", uniqueId);
        this.setState({
            deviceId: uniqueId
        })
        console.log("State DeviceId==>", this.state.deviceId);
        console.log("User name==>", this.state.username);
        let isValid = this.validateFormField();
        console.log(isValid);
        if (isValid) {
            let userInputData =
            {
                "recover": {
                    "deviceId": this.state.deviceId
                }
            }
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                url: Constant.base_url + '/users/rec/' + this.state.username,
                data: userInputData
            }).then((data) => {
                console.log("Successfully done", data);
                this.refs.notify.open();
            }).catch((err) => {
                console.log("err.status", err.message);
                if (err.message == "Request failed with status code 404") {
                    Alert.alert(
                        'Mail id not found..'
                    )
                }
                if (err.message == "Network Error") {
                    Alert.alert(
                        'Network error..'
                    )
                }
            })
        }
        else {
            console.log("Validation failed");
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView style={styles.contain} >
                <View style={styles.container}>
                    <View style={styles.container1}>
                        <Text style={styles.title} >Forget password</Text>
                    </View>
                    {/* <View style={styles.Title1}>
                        <Text style={styles.input1}>Enter Email ID</Text>
                    </View>
                    <View style={styles.Title2}>
                        <TextInput underlineColorAndroid={this.state.errColorPass ? 'red' : 'black'} style={styles.input}
                            placeholder="Email id"
                            onChangeText={(username) => this.setState({ username },
                                () => { this.setState({ errusername: false, errValidUsername: false, errColorPass: false }) })} />
                        <Text style={styles.errorMsg}>{this.state.errusername ? "Enter mail id" : ""}</Text>
                        <Text style={styles.errorMsg}>{this.state.errValidUsername ? "Invalid mail id" : ""}</Text>
                    </View> */}
                    <View style={styles.Title2}>
                        <FloatingLabel
                            labelStyle={styles.labelInput}
                            inputStyle={styles.inputlab}
                            style={styles.formInput}
                            underlineColorAndroid={this.state.errColorPass ? 'red' : 'black'}
                            onChangeText={(username) => this.setState({ username },
                                () => { this.setState({ errusername: false, errValidUsername: false, errColorPass: false }) })}

                        >Enter Email ID</FloatingLabel>

                        <Text style={styles.errorMsg}>{this.state.errusername ? "Enter mail id" : ""}</Text>
                        <Text style={styles.errorMsg}>{this.state.errValidUsername ? "Invalid mail id" : ""}</Text>
                    </View>
                    <View style={styles.submitbtn}>

                        <TouchableOpacity onPress={this.submitSuggestion.bind(this)} style={styles.submit}>
                            <Text style={styles.submitText}
                                onPress={this.submitSuggestion.bind(this)}
                            >Submit</Text>
                        </TouchableOpacity>
                    </View>




                    <Modal style={styles.modalStyle} position={'center'} ref={'notify'} backdropPressToClose={false} coverScreen={true}>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={() => this.refs.notify.close()}>
                                <Image source={require('../Image/closeicon.png')}
                                    style={styles.closeicon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.Check}> Link sent to registered email </Text>

                        <View style={styles.okaybtn}>
                            <TouchableOpacity onPress={() => this.refs.notify.close(navigate('Home'))} style={styles.submit1}>
                                <Text style={styles.submitText1}
                                    onPress={() => this.refs.notify.close(navigate('Home'))}
                                >Okay</Text>
                            </TouchableOpacity>
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
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20
    },
    container1: {
        marginBottom: '8%',
        // marginBottom: '15%'
    },
    title: {
        fontFamily: ' Avenir LT Std',
        fontSize: 26,
        color: '#000000',
        fontWeight: '600',
    },
    input1: {
        fontFamily: ' Avenir LT Std',
        fontSize: 20,
        color: '#000000',
        fontWeight: '600',
    },
    Title1: {
        marginTop: 40
    },
    Title2: {
        marginTop: 40
    },
    submitText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Avenir LT Std'
    },
    submit: {
        backgroundColor: '#6887ff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 65
    },
    submitbtn: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMsg: {
        fontFamily: ' Avenir LT Std',
        fontSize: 18,
        color: "#F44336",
    },
    modalStyle: {
        height: '30%',
        width: '80%',
        borderRadius: 20,
    },
    input: {
        fontSize: 18,
        fontFamily: 'Avenir LT Std',
        paddingBottom: 20
    },

    Okay: {
        marginLeft: 80,
        marginRight: 15,
        borderRadius: 7,
        width: '50%',
    },
    Check: {
        fontFamily: ' Avenir LT Std',
        fontSize: 18,
        color: '#000000',
        textAlign: 'center'
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
        width: '50%',
        height: 40
    },
    okaybtn: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeicon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        margin: 15
    },
    labelInput: {
        color: '#000000',
        fontSize: 20,
    },
    // formInput: {
    //     // borderBottomWidth: 1.5,

    //     // fontSize: 30,
    //     borderColor: '#333',
    // },
    inputlab: {
        fontSize: 20,
        borderWidth: 0,
        borderColor: 'transparent',
        marginTop: 35
    }
});
export default ForgetPassword;