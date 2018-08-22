import React, { Component } from 'react';
import axios from 'axios';
import Constant from '../Constants/Constant';
import { connect } from 'react-redux';
import * as action from './action/action';
import Dialog from 'react-native-dialog';
import { Fonts } from './Fonts';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Button,
    TextInput,
    Image,
    TouchableOpacity

} from 'react-native';

import Modal from 'react-native-modalbox';
class ChooseRole extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0
        }
    };


    constructor(props) {
        super(props);
        this.state = {
            role: '',
            errRole: false,
            dialogVisible: false,
            showDialogParent: false,
            showDialogChild: false,
            showDialogGrandparent: false,
            showDialogRelative: false,
            showDialogFriend: false,
        };
    }
    showDialogParent = () => {
        this.setState({ dialogVisible: true });
    };
    showDialogChild = () => {
        this.setState({ dialogVisible: true });
    };
    showDialogGrandparent = () => {
        this.setState({ dialogVisible: true });
    };
    showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };
    validateFormField() {
        var isvalid = false;
        //alert(this.state.role);
        if (this.state.role == "") {
            this.setState({ errRole: true });
            isvalid = false;
        } else {
            this.props.setUserRoles(this.state.role);
            this.setState({ errRole: false });
            isvalid = true;
        }
        return isvalid;
    }
    submitSuggestion() {

        // alert(this.props.LoginData.UserRole); 
        // this.props.setUserRoles(this.state.role);
        this.refs.viamsg.close();
        let currentuser = this.props.LoginData.listusers;
        console.log('current user', currentuser);
        console.log('current user', currentuser.status);
        this.props.setRoleInfo(this.state.role);
        if (currentuser.status == false) {
            currentuser.role = this.state.role;
            console.log('currentuser.role', currentuser.role);

            let updateRole = {
                "userId": currentuser.userID,
                "familyId": currentuser.familyId,
                "role": this.state.role,
            }
            console.log('userId', currentuser.userID);
            console.log('familyId', currentuser.familyId);
            console.log('rolesss', this.state.role);

            axios({
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                url: Constant.base_url + '/users/update/role',
                data: updateRole
            }).then((data) => {
                console.log("SUCCESS Update Role", data);
            }).catch((err) => {

                console.log("ERR", err);
            });
        } else {
            var role = this.state.role;
            var familyUsers = this.props.LoginData.AddedFamilyUser;
            if (familyUsers && familyUsers.length > 0) {
                familyUsers.forEach(user => {
                    if (user._id == currentuser.userID) {
                        user.role = role;
                    }
                });
            }


            let updateRole = {

                "role": this.state.role,
            }
            console.log('current user', currentuser.status);
            console.log('rolesss', this.state.role);
            console.log('current id', currentuser.userID);


            axios({
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                url: Constant.base_url + '/users/updaterole/' + currentuser.userID,
                data: updateRole
            }).then((data) => {
                console.log("Success updaterole", data);
            }).catch((err) => {

                console.log("errrole", err);
            });


        }
        const { navigate } = this.props.navigation;
        var isValid = this.validateFormField(this);
        if (isValid) {
            this.setState({ dialogVisible: false });
            this.props.setUpdatedRoleInfo(this.state.role);

            navigate('AddMember');
        }
    }
    showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <Text style={styles.title}>{"Choose Role"}</Text>
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
                <View>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title style={{ textAlign: 'center' }}>Family role</Dialog.Title>
                        <Dialog.Input
                            value={this.state.role}
                            onChangeText={(role) => this.setState({ role }, () => { this.setState({ errRole: false }) })}
                        />
                        <Text style={styles.errorMsg}>{this.state.errRole ? "Please enter the role" : ""}</Text>
                        <Dialog.Button label='Done' onPress={this.submitSuggestion.bind(this)} style={styles.btDone} />
                    </Dialog.Container>
                </View>
                {/* <Modal style={styles.modalStyle} position={'center'} ref={'loader'} backdropPressToClose={false}>
                    <Text>Loading</Text>
                    <ActivityIndicator size='large' />
                </Modal> */}
                <Modal style={styles.viamsgbox} position={'center'} ref={'viamsg'} swipeArea={10} backdropPressToClose={false} coverScreen={true}>
                    <View style={styles.modelcontainer1} >

                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={() => this.refs.viamsg.close()}>
                                <Image source={require('../Image/closeicon.png')}
                                    style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        <View >
                            <Text style={styles.familyrole}>Family Role</Text>
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
        justifyContent: 'center'
    },
    grandparent1: {
        alignItems: 'center',
        justifyContent: 'center'
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
        currentuserinfo: state.currentuserinfo,
    }
}
const DispatchToProps = (dispatch) => {
    return {
        setRoleInfo: (roleInfo) => {
            dispatch(action.setRoleInfomation(roleInfo));
        },
        setUserRoles: (userrole) => {
            dispatch(action.setUserRole(userrole));
        },
        setUpdatedRoleInfo: (updateRoleInfo) => {
            dispatch(action.setUpdatedRoleInfomation(updateRoleInfo));
        }
    }
}
export default connect(StateToProps, DispatchToProps)(ChooseRole);