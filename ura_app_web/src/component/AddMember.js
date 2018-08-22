import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import * as action from './action/action';
import axios from 'axios';
import { Fonts } from './Fonts';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Button,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    TouchableOpacity,


} from 'react-native';
var screen = Dimensions.get('window');
import PTRView from 'react-native-pull-to-refresh';
import Constant from '../Constants/Constant';

class AddMember extends React.Component {
    constructor() {
        super();
        this.state = {
            Name: "",
            familyId: "",
            Image: "",
            UserID: "",
            userInfo: '',
            FamilyName: "",
            loginUser: '',
            username: '',
            names: [],
            buttonColor: 'white',
            isDisable: true,
            listOfUsers: '',
            roleList: "",
            uname: "",
            // FamilyID:"",
            userRole: '',
            ursname: '',
            ursstatus: '',
            currentuserinfo: '',
            userStatus: '',
            updateuserRole: ''


        }
    }
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params}`,
        headerTitleStyle: {
            width: '80%',
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 22,
            fontFamily: Fonts.AvenirLTStdBlack,
            color: '#000000',
        },
        headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
            backgroundColor: '#fff',
            elevation: 0,

        }
    })

    componentDidMount() {
        //alert("test");
        var thisObj = this;
        console.log("this.props.LoginData.RegUserData", this.props.LoginData.RegUserData);
        let data = this.props.LoginData.RegUserData;
        let familyid = '';
        //console.log("||",data.Name);
        data.map((item, key) => {
            console.log("Key", item.Name);
            console.log("Key", item.Image);
            thisObj.setState({ Name: item.Name });
            thisObj.setState({ Image: item.Image });
            thisObj.setState({ UserID: item.UserID });
            thisObj.setState({ FamilyName: item.FamilyName });
            thisObj.setState({ userStatus: item.userStatus })
            thisObj.setState({ familyId: item.FamilyID })
            familyid = item.FamilyID;
        });
        axios({
            method: "GET",
            url: Constant.base_url + "/users/members/families/" + familyid,
        }).then((data) => {
            console.log("response data:=>", data);
            // let sample = data.data;
            let sample2 = data.data;
            console.log("response sample2:=>", sample2);
            let sample3 = sample2.users;
            console.log("console data:=>", sample3);
            this.setState({
                listOfUsers: sample3
            })
            let temp2 = [];
            sample3.map((item, key) => {
                temp2.push({
                    id: 0,
                    name: item.name,
                    username: item.username,
                    loginUser: item.loginUser,
                    userStatus: item.userStatus,
                    picture: item.picture,
                    _id: item._id,
                    status: this.handlerCheckCurrentUser(item._id), // item.name
                    role: item.role,
                    familyRole: item.role
                })
                console.log("Constant.Img_url+item.picture=", Constant.Img_url + item.picture);
            });
            // this.setState({ names: temp2 });
            console.log('temp2', temp2)
            this.props.setFamilyUser(temp2);
            this.handlerAddFamilyData();
        }).catch((err) => {
            console.log("console error data:=>", err);
        })
    }
    handlerCheckCurrentUser(paramuserid) {
        // alert("test");
        let flag = false;
        let data = this.props.LoginData.RegUserData;
        let userid = '';
        data.map((item, key) => {
            userid = item.UserIds;
        });
        if (userid == paramuserid) {
            flag = true
        } else {
            flag = false
        }
        return flag;
    }

    setRole(user, callback) {
        user.familyRole = "Test";
        console.log("Inside get role method")
        let uid = user.userID;
        let famId = user.familyId;
        var cUser = user;
        axios({
            method: 'POST',
            url: Constant.base_url + '/users/role',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            data: {
                userId: uid,
                familyId: famId
            }
        }).then(({ data }) => {
            callback(data);

        }).catch((err) => {
            console.log("ERROR", err)
        })

    }





    handlerAddFamilyData() {
        console.log("Product", this.props.LoginData.AddedFamilyUser);
        console.log('updaterolesss', this.props.LoginData.updateRoleInfo);
        // this.setState({ updateuserRole: this.props.LoginData.updateRoleInfo });
        // console.log('updateuserRole', updateuserRole);
        let temp2 = [];
        console.log("LOG", this.props.LoginData.AddedFamilyUser);
        // let familyRole = this.familyRole(this.props.LoginData.AddedFamilyUser);
        this.props.LoginData.AddedFamilyUser.map((item, key) => {
            var user = {
                id: 0,
                name: item.name,
                username: item.username,
                loginUser: item.loginUser,
                userStatus: item.userStatus,
                userID: item._id,
                familyId: this.state.familyId,
                url: Constant.Img_url + item.picture, //item.url,//require('../Image/parent.png'),
                status: this.handlerCheckCurrentUser(item._id), // item.name
                role: item.role,
                familyRole: "No Family Role"
            }
            var self = this;
            this.setRole(user, function (data) {
                let familyRole = "No Family Role";

                console.log("GET ROLE SUCCESS DATA", data)
                if (data.users[0] && data.users[0].myFamily[0] && data.users[0].myFamily[0].role) {
                    familyRole = data.users[0].myFamily[0].role;
                }

                console.log("Set family role in the record:" + familyRole);

                user.familyRole = familyRole

                // if(user.status == false)
                // familyRole = user.role;

                temp2.push(user)

                console.log("TEMP 2", temp2);

                self.setState({ names: temp2 });
                let len = temp2.length;
                console.log('len', len);
                if (len > 1) {
                    self.setState({
                        buttonColor: '#6887ff',
                        isDisable: false
                    })
                }
                console.log('buttoncolor', self.state.buttonColor)
                console.log("End get role method");
            });


        });

    }

    handlerAddFamily() {
        const { navigate } = this.props.navigation;
        navigate('Addnewuserexist');
    }

    handlerSignIn() {
        const { navigate } = this.props.navigation;
        navigate('Home');
    }
    SelectRole() {
        const { navigate } = this.props.navigation;
        navigate('ChooseRole');
    }


    Resend() {

        let urvalue = this.props.LoginData.userInputdata;
        var that = this;
        console.log('urname', urvalue.user.name);
        console.log('urusername', urvalue.user.username);
        console.log('urpassword', urvalue.user.password);

        let resendinput = {
            "name": urvalue.user.name, // "sakthi"
            "username": urvalue.user.username,// "sakthivel.v@mitosistech.com",
            "password": urvalue.user.password // "123456"
        }
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            url: Constant.base_url + '/users/resendnotification',
            data: resendinput
        }).then((data) => {
            console.log("Success data", data);
            that.refs.Resend.close();
            that.refs.mailsent.open();

        })
            .catch((err) => {

                console.log("resenderror", err);
            });


    };

    finduser(listusers) {

        if (listusers.loginUser == false) {

            this.refs.modal1.open();
            this.setState({ ursname: listusers.name });
            this.setState({ loginUser: listusers.loginUser });
            this.setState({ ursstatus: listusers.status });

            console.log('listusers', listusers);
            this.setState({ currentuserinfo: listusers });
            this.props.setCurrentUser(listusers);

        } else {
            var that = this;
            that.refs.Resend.open();
            console.log('listusers', listusers);

            that.setState({ username: listusers.username });
            console.log('username', listusers.username);

            axios({
                method: 'GET',
                url: Constant.base_url + '/users/user/' + listusers.username,
                Headers: {
                    "Content-Type": "application/json",
                }

            }).then((data) => {
                console.log("userdetailsss", data);
                console.log("userdetailsss", data.data.user[0].name);
                let resenduser = data.data.user[0].name;
                console.log('usernames', resenduser);
                that.setState({ uname: resenduser });
                // that.refs.Resend.open()

            }).catch((err) => {
                console.log('errors', err)
            });

        }
    };




    updateRoles() {
        let userdetail = this.state.names;
        userdetail.map((item, key) => {
            var updateRole = {

                userId: item.userID,
                familyId: this.state.familyId,
                role: item.role,

            }
            console.log('updateRole', updateRole)
        })

        // let updateRole = {
        //     userId: userdetail.userID,
        //     familyId: userdetail.familyId,
        //     role: userdetail.role
        // }
        // console.log('userId', this.userId);
        // console.log('familyId', familyId);


    }





    editRole(listname) {
        var that = this;
        alert(item.name)
    }


    editofrole() {
        var that = this;
        axios({
            method: 'GET',
            url: Constant.base_url + '/users/user/' + this.state.username,
            Headers: {
                "Content-Type": "application/json",
            }

        }).then((data) => {
            console.log("userdetailsss", data);
            console.log("userdetailsss", data.data.user[0].name);
            let resenduser = data.data.user[0].name;
            console.log('usernames', resenduser);
            that.setState({ uname: resenduser });
            that.refs.Resend.open()

        }).catch((err) => {
            console.log('errors', err)
        });

    }
    render() {

        return (
            <View style={styles.container}>
                <PTRView onRefresh={this.handlerAddFamilyData.bind(this)} >
                    <View style={styles.container1}>
                        <Text style={styles.title}>Add family members</Text>
                    </View>

                    <FlatList showsVerticalScrollIndicator={false} style={styles.flatliststyle}
                        data={this.state.names}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity >
                                <View style={styles.listcontainer}>
                                    <View style={styles.imgcontainer} >
                                        <Image source={{ uri: item.url }} style={styles.imgalign} />
                                    </View>
                                    <View style={styles.namecontainer}>
                                        <Text style={styles.text}>{item.name}{item.status == true ? " (You)" : ""}</Text>
                                        <Text style={styles.text1}>{item.username}</Text>
                                        <Text style={styles.text1}>
                                            {item.status == true ? item.role : item.familyRole ? item.familyRole + "" : item.familyRole + " (Pending Account)"}</Text>
                                        {/* <Text style={styles.text1}>{item.role}</Text> */}
                                    </View>
                                    <View style={styles.dotcontainer}>
                                        <TouchableOpacity onPress={() => this.finduser(item)}
                                        // onPress={() => this.refs.modal1.open()}
                                        // onPress={() => this.refs.Resend.open()}
                                        // onPress={() => this.editofrole(item.name)}
                                        // onPress={() => this.editRole(item.name)}
                                        >
                                            <Image source={require('../Image/3Dotted.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity >
                        } />


                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
                        <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }} >
                            <TouchableOpacity onPress={this.handlerAddFamily.bind(this)}>
                                <Image source={require('../Image/createnew_green.png')} style={styles.addIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '75%', justifyContent: 'center' }} >
                            <Text onPress={this.handlerAddFamily.bind(this)} style={{
                                fontFamily: Fonts.AvenirLTStdBlack,
                                fontSize: 20,
                                color: '#27ae60',
                            }} > ADD ANOTHER</Text>
                        </View>
                    </View>
                    <Modal backdropPressToClose={false} style={styles.modal} coverScreen={true} position={'bottom'} ref={'modal1'} swipeArea={20}>
                        <View style={{ width: screen.width, marginTop: -10 }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5 }}>
                                <View style={{ width: '90%' }}>
                                    <Text style={{
                                        fontSize: 19,
                                        fontFamily: Fonts.AvenirLTStdBlack,
                                        color: '#000000',
                                        paddingLeft: 10,
                                        paddingBottom: 5
                                    }} >{this.state.ursname}{this.state.ursstatus == true ? " (You)" : ""}</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <TouchableOpacity onPress={() => this.refs.modal1.close()}>
                                        <Image source={require('../Image/Close.png')} style={styles.closeIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 10 }}>
                                <View style={{ width: '10%' }}>
                                    <TouchableOpacity>
                                        <Image source={require('../Image/Edit.png')} style={styles.closeIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '90%' }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontFamily: Fonts.AvenirLTStdBlack,
                                        color: '#000000',
                                        paddingLeft: 10
                                    }} onPress={() => this.refs.modal1.close(this.props.navigation.navigate('ChooseRole'))}
                                    >Edit Family Role</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal backdropPressToClose={false} style={styles.Resendmodel} coverScreen={true} position={'bottom'} ref={'Resend'} swipeArea={20}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingRight: 5, paddingLeft: 10, paddingVertical: 10 }}>
                                <View style={{ width: '90%', justifyContent: 'center' }}>
                                    <Text
                                        style={{
                                            fontSize: 19,
                                            fontFamily: Fonts.AvenirLTStdBlack,
                                            color: '#000000',
                                            paddingBottom: 2
                                        }} >{this.state.uname}</Text>
                                </View>
                                <View style={{ width: '10%', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => this.refs.Resend.close()}>
                                        <Image source={require('../Image/Close.png')} style={styles.closeIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'center', }}>
                                <View style={{ width: '15%', }}>
                                    <TouchableOpacity onPress={() => this.Resend()}>
                                        <Image source={require('../Image/Resend.png')} style={styles.Resendicon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '85%' }}>
                                    <Text onPress={() => this.Resend()}
                                        style={{
                                            fontSize: 20,
                                            fontFamily: Fonts.AvenirLTStdBlack,
                                            color: '#000000',
                                        }} >
                                        Resend Notification</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal backdropPressToClose={false} style={styles.mailsentbox} coverScreen={true} position={'center'} ref={'mailsent'} swipeArea={20}>
                        <View style={{ flex: 1 }}>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '83%' }}>

                                </View>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: 10 }}>
                                    <TouchableOpacity onPress={() => this.refs.mailsent.close()}>
                                        <Image source={require('../Image/Close.png')} style={styles.closeIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontFamily: Fonts.AvenirLTStdBlack,
                                        textAlign: 'center',
                                        color: '#09bc03',
                                    }} >
                                    {"Mail is successfully \nsent"}</Text>

                                <View style={styles.Okay}>
                                    <TouchableOpacity onPress={() => this.refs.mailsent.close()} style={styles.submit}>
                                        <Text style={styles.submitText}
                                            onPress={() => this.refs.mailsent.close()}
                                        >Okay</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    </Modal>





                </PTRView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <TouchableOpacity disabled={this.state.isDisable} opacity={0.0} onPress={this.handlerSignIn.bind(this)} style={{
                        borderRadius: 15,
                        backgroundColor: this.state.buttonColor,
                        width: '80%',
                        height: 65,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} >
                        <Text style={styles.btntxt}>Finish Registraion</Text>
                    </TouchableOpacity>
                </View>
            </View >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingBottom: 25
    },
    container1: {

        marginBottom: '10%'
    },
    listcontainer: {
        flexDirection: 'row',
        marginBottom: '5%',
        justifyContent: 'center',
    },
    imgcontainer: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 28,
        color: '#000000',
    },

    namecontainer: {
        width: '65%',
        justifyContent: 'center'
    },
    text: {
        fontSize: 19,
        fontFamily: Fonts.AvenirLTStdBlack,
        color: '#000000',
    },
    text1: {
        fontSize: 17,
        fontFamily: Fonts.AvenirLTStdBook,
        color: '#000000',
    },
    dotcontainer: {
        width: '10%',
        marginRight: '2%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    btntxt: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.AvenirLTStdBlack
    },
    imgalign: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
    },
    textAlign: {
        width: '80%',
    },
    addIcon: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
    },
    closeIcon: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: 24,
        width: 24,
        resizeMode: 'contain',
        paddingBottom: 5
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },

    Resendicon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    Resendmodel: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 115,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    mailsentbox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '32%',
        width: '70%',
        borderRadius: 15
    },

    flatliststyle: {
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
        width: 150,
        height: 55
    },
    Okay: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const StateToProps = (state) => {
    return {
        LoginData: state.LoginUser,
        userInputdata: state.userInputdata,
        // updateRoleInfo: state.updateRoleInfo,

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
        },
        setFamilyUser: (familydata) => {
            dispatch(action.setAddedFamilyUser(familydata));
        },
        setCurrentUser: (listusers) => {
            dispatch(action.setCurrentUser(listusers));
        },
    }
}
export default connect(StateToProps, DispatchToProps)(AddMember);

