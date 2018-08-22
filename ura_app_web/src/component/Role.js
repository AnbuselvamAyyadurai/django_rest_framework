import React, { Component } from 'react';
import Dialog from 'react-native-dialog';
import axios from 'axios';
import { connect } from 'react-redux';
import * as action from './action/action';
import Constant from '../Constants/Constant';
import { Wallet } from 'ethers';
import { Fonts } from './Fonts'

import Modal from 'react-native-modalbox';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    ActivityIndicator,
    TouchableHighlight,
    Button,
    Image,
    TouchableOpacity,
    TextInput

} from 'react-native';


class Role extends Component {
    static navigationOptions = {
        headerMode: 'none',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: '#3c58e8',
            shadowColor: 'transparent',
            backgroundColor: '#fff',
            elevation: 0,
            // navBarHidden: true
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            role: '',
            errRole: false,
            headerVisible: ""
        };
    }
    showAlert = () => {
        Alert.alert(
            'Network error..'
        )
    }

    validateFormField() {
        var isvalid = false;
        if (this.state.role == '') {
            this.setState({ errRole: true });
            isvalid = false;
        } else {
            this.setState({ errRole: false });
            isvalid = true;
        }
        return isvalid;
    }
    createWallet() {
        let wallet = Wallet.createRandom();
        console.log("Address: ", wallet.address);
        console.log("privateKey: ", wallet.privateKey);
        return wallet;
    }
    submitSuggestion() {
        const { navigate } = this.props.navigation;
        var thisObj = this;
        var isValid = this.validateFormField(this);
        var UserInfo = this.props.LoginData.UserInfo;
        var FamilyInfo = this.props.LoginData.FamilyInfo;
        if (isValid) {
            this.refs.viamsg.close();
            this.refs.loader.open();
            // userInput.user.role = this.state.role;
            let userInputData =
            {
                "user": {
                    "name": UserInfo.UserName,
                    "username": UserInfo.Email,
                    "password": UserInfo.Password,
                    "mobile": UserInfo.MobileNo,
                    "picture": UserInfo.UserImage,
                    "role": this.state.role,//'parent'
                    "userStatus": "Pending",
                    "loginUser": "false"
                },
                "family": {
                    "familyName": FamilyInfo.FamilyName,  //'sdad',//FamilyInfo.FamilyName
                    "familyAdmin": UserInfo.UserName,   //'oiuyoiuy',//this.state.username,
                    "familyPic": FamilyInfo.FamilyImage
                }
            }
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                url: Constant.base_url + '/users/reg',
                data: userInputData
            }).then((data) => {
                console.log("REG PAGE", data);
                this.refs.loader.close();
                let sample = data.data;
                let sample2 = sample.data;
                let sample3 = sample2.user;
                let familyData = sample2.family;
                let userdata = {
                    Name: sample3.name,
                    UserID: sample3.username,
                    Image: sample3.picture,
                    FamilyName: FamilyInfo.FamilyName,
                    FamilyID: familyData._id,
                    UserIds: sample3._id,
                    Role: sample3.role,
                }
                var dd = [];
                dd.push(userdata);
                this.props.setRegUserData(dd);
                console.log("FamilyInfo.FamilyName=>", familyData._id);
                wallet = this.createWallet();
                console.log("successwallet", wallet);
                let AccountsData = {
                    "userId": sample3._id,
                    "accNumber": wallet.address,
                    "username": UserInfo.Email,
                    "privateKey": wallet.privateKey,
                    "lock": "false"
                }
                console.log("data", AccountsData);
                try {
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
                } catch (err) {
                    this.refs.loader.close();
                    // this.showAlert();
                    console.log("Error" + err);
                }
                this.refs.loader.close();
                let famName = FamilyInfo.FamilyName
                navigate('AddMember', famName);
                //  navigate('AddMember');
            }).catch((err) => {
                console.log(err.message);
                console.log("ERRORS", err);
                if (err.message == "Request failed with status code 422") {
                    this.refs.loader.close();
                    Alert.alert(
                        'Username already exists...'
                    )
                }
                if (err.message == "Network Error") {
                    this.refs.loader.close();
                    Alert.alert(
                        'Network error..'
                    )
                }
            });

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <Text style={styles.title}>{"What's your role in the \nfamily ?"}</Text>
                </View>
                <View style={styles.childView}>

                    <View style={styles.parent}>
                        <TouchableOpacity onPress={() => this.setState({ role: 'Parent' }, () => this.refs.viamsg.open())}>
                            <Image source={require('../Image/parent.png')} style={styles.roleImg} />
                            <Text style={styles.roleText}>Parent</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.child} >
                        <TouchableOpacity onPress={() => this.setState({ role: 'Child' }, () => this.refs.viamsg.open())}>
                            <Image source={require('../Image/Child.png')} style={styles.roleImg} />
                            <Text style={styles.roleText}>Child</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.childView}>
                    <View style={styles.grandparent} >
                        <TouchableOpacity onPress={() => this.setState({ role: 'Grandparent' }, () => this.refs.viamsg.open())}>
                            <View style={styles.grandparent1}>
                                <Image source={require('../Image/GrandParent.png')} style={styles.roleImg} />
                            </View>
                            <View style={styles.grandparent1}>
                                <Text style={styles.roleText}>Grandparent</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.relative}>
                        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => this.setState({ role: 'Relative' }, () => this.refs.viamsg.open())}>
                            <Image source={require('../Image/Relative.png')} style={styles.roleImg} />
                            <Text style={styles.roleText}>Relative</Text>
                        </TouchableOpacity >
                    </View >
                </View >

                <View style={styles.childView}>
                    <View style={styles.friend}>
                        <TouchableOpacity onPress={() => this.setState({ role: 'Friend' }, () => this.refs.viamsg.open())}>
                            <Image source={require('../Image/Friend.png')} style={styles.roleImg} />
                            <Text style={styles.roleText}>Friend</Text>
                        </TouchableOpacity >
                    </View>

                    <View style={styles.other}>
                        <TouchableOpacity onPress={() => this.setState({ role: 'Other' }, () => this.refs.viamsg.open())}>
                            <Text style={styles.otherText}>Other</Text>
                        </TouchableOpacity >
                    </View>
                </View>





                <Modal style={styles.modalStyle} position={'center'} ref={'loader'} backdropPressToClose={false} coverScreen={true}>
                    <Text>Loading</Text>
                    <ActivityIndicator size='large' />
                </Modal>
                <Modal style={styles.viamsgbox} position={'center'} ref={'viamsg'} swipeArea={10} backdropPressToClose={false} coverScreen={true}>
                    <View style={styles.modelcontainer1}  >

                        <View style={styles.modelcontainer2} >
                            <TouchableOpacity onPress={() => this.refs.viamsg.close()}>
                                <Image source={require('../Image/closeicon.png')}
                                    style={styles.closeicon} />
                            </TouchableOpacity>
                        </View>
                        <View >
                            <Text style={styles.familyrole}> Family Role  </Text>
                        </View>
                        <View style={styles.rolebind}>
                            <TextInput
                                style={styles.txtstyle}
                                value={this.state.role}
                                underlineColorAndroid='black'
                                onChangeText={(role) => this.setState({ role }, () => { this.setState({ errRole: false }) })}
                                placeholder="What's your role in the family?"
                            // onChangeText={(password) => this.setState({ password }, () => { this.setState({ errPassword: false, errColorPass: false, errValidPassword: false }) })}
                            />
                        </View>
                        <View style={styles.donebtn}>
                            <TouchableOpacity onPress={this.submitSuggestion.bind(this)} style={styles.submit}>
                                <Text style={styles.submitText}
                                    onPress={this.submitSuggestion.bind(this)}
                                >Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    // container1: {
    //     height: '5%'
    // },
    childView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '27%'
    },
    submit: {
        backgroundColor: '#6887ff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginTop: 20,
        height: 60,

    },
    submitText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.AvenirLTStdBlack
    },
    title: {
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 28,
        color: '#000000',
    },
    roleImg: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    parent: {
        backgroundColor: '#44b50b',
        width: '48.5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,

    },
    child: {
        backgroundColor: '#6887ff',
        width: '48.5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,


    },
    grandparent: {
        backgroundColor: '#ffa234',
        width: '48.5%',
        borderRadius: 10,
        justifyContent: 'center',

    },
    grandparent1: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    relative: {
        backgroundColor: '#c868ff',
        width: '48.5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,


    },
    friend: {
        backgroundColor: '#ff6868',
        width: '48.5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,


    },
    other: {
        backgroundColor: 'white',
        width: '48.5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'black',


    },
    roleText: {
        fontFamily: Fonts.AvenirLTStdBook,
        fontSize: 22,
        color: '#ffffff',
        textAlign: 'center',


    },
    otherText: {
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 21,
        color: '#000000',
        textAlign: 'center',


    },
    btDone: {
        backgroundColor: '#3c58e8',
        padding: 15,
        textAlign: 'center',
        borderRadius: 10,
        color: 'white',
        width: 250,
        marginTop: 20
    },
    errorMsg: {
        fontFamily: Fonts.AvenirLTStdBook,
        fontSize: 22,
        color: "#F44336",
        marginLeft: 20
    },
    modalStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        width: '40%',
        borderRadius: 20,
    },
    viamsgbox: {
        height: '38%',
        width: '80%',
        borderRadius: 20
    },
    modelcontainer1: {
        flex: 1,
        margin: 15
    },
    modelcontainer2: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    closeicon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    familyrole: {
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 21,
        textAlign: 'center',
        color: '#000000'
    },
    rolebind: {
        justifyContent: 'center',
        marginTop: '5%'
    },
    txtstyle: {
        fontSize: 21,
        paddingBottom: 20,
        color: '#000000',
        fontFamily: Fonts.AvenirLTStdBlack,
    },
    donebtn: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
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
        },
        setRegUserData: (userinfo) => {
            dispatch(action.setRegUserData(userinfo));
        }
    }
}
export default connect(StateToProps, DispatchToProps)(Role);