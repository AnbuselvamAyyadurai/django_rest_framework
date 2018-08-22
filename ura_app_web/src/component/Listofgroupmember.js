import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    ScrollView
} from 'react-native'
import axios from 'axios';
import { connect } from 'react-redux';
import * as action from './action/action';
import Constant from '../Constants/Constant';
import { Fonts } from './Fonts';

class Listofgroupmember extends Component {

    static navigationOptions = {
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
            backgroundColor: '#fff',
            elevation: 0,

        }
    };
    state = {
        names: [],
        familyName: '',
        userstatus: '',
        selectuser: ''
    }
    // alertItemName = (item) => {
    //     alert(item.name)
    // }
    componentDidMount() {
        var that = this;
        var listfamily = that.props.navigation.state.params.familyList;
        console.log('listfamily', listfamily);
        that.setState({ familyName: listfamily.familyName })
        axios({
            method: "GET",
            url: Constant.base_url + '/users/members/families/' + listfamily._id,

            // url: Constant.base_url + '/users/members/families/' + "5b766cb5ef74d938a22de6d4",
            Headers: {
                "Content-Type": "application/json",
            }
        }).then(({ data }) => {
            console.log("familymembers", data.users);

            console.log("this.props.LoginData.data", this.props.LoginData.data);
            var loginuser = this.props.LoginData.data;


            that.setState({
                names: data.users,
                userstatus: loginuser.accounts.userId
            });
            console.log('names', that.state.names)



        }).catch((err) => {
            console.log("errors", err);

        });
    }

    selectmember(selectUserinfo) {
        var self = this;
        self.setState({ selectuser: selectUserinfo })
        console.log("select:", self.state.selectuser);
        self.props.setSelectUserInfo(selectUserinfo);
        // thisobj.props.setSelectUser(selectUserinfo)
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>

                <View style={{ height: '8%', margin: '5%' }}>
                    <Text style={styles.title}>{this.state.familyName}</Text>
                </View>
                <FlatList showsVerticalScrollIndicator={false}
                    data={this.state.names}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onLongPress={() => this.selectmember(item)}>
                            <View style={{
                                flexDirection: 'row', borderWidth: 0.5, borderRadius: 15,
                                marginLeft: '5%', marginRight: '5%', marginTop: '1%', marginBottom: '1%', padding: 10
                            }}>
                                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity >
                                        <Image source={{ uri: Constant.Img_url + item.picture }} style={styles.roleImg} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '80%', justifyContent: 'center' }}>
                                    <Text style={styles.text}>
                                        {item.name}{this.state.userstatus == item._id ? " (You)" : ""}
                                    </Text>
                                    <Text style={styles.role}>
                                        {item.role == item.role ? item.role : item.myFamily[0].role}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
                <View style={{ height: '13%', justifyContent: 'center', alignItems: 'center', }}  >
                    <TouchableOpacity style={styles.nextbtn}
                        onPress={() => navigate('Setreward')}>
                        <Text style={{
                            textAlign: 'center',
                            // justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: 25,
                            fontFamily: Fonts.AvenirLTStdBlack,

                        }}>Next</Text>
                    </TouchableOpacity>

                </View>

            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.AvenirLTStdBlack,
        color: '#000000'
    },
    text: {
        color: '#000000',
        fontFamily: Fonts.AvenirLTStdBlack,

        fontSize: 20,
    },
    roleImg: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        // resizeMode: 'contain',


    },
    role: {

        fontFamily: Fonts.AvenirLTStdBook,


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
})

const StateToProps = (state) => {
    return {
        LoginData: state.LoginUser,
        data: state.data,
    }
}

const DispatchToProps = (dispatch) => {
    return {
        // setSelectUser: (selectUserinfo) => {
        //     dispatch(action.setSelectUser(selectUserinfo));
        // },
        setSelectUserInfo: (selectUserinfo) => {
            dispatch(action.setSelectUserInfo(selectUserinfo));
        }
    }
}
export default connect(StateToProps, DispatchToProps)(Listofgroupmember);