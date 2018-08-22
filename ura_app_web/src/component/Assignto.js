/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Alert

} from 'react-native';
import axios from 'axios';
// import AnimateLoadingButton from 'react-native-animate-loading-button';
import { connect } from 'react-redux';
import * as action from './action/action';
import Constant from '../Constants/Constant';
import { Fonts } from './Fonts';

class Assignto extends Component {
    static navigationOptions = {
        title: '',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
            shadowColor: 'transparent',
            backgroundColor: '#fff',
            elevation: 0
        }
    };

    constructor(props) {

        super(props);

        this.state = {

            loading: true,
            names: [],
            members: '',
            selectuser: '',
            pressStatus: false,
            familyList: ''

        }

    }

    checkbox(ItemDetails) {
        // var ItemDetails = ItemDetails;
        this.setState({
            selectuser: ItemDetails._id,
            familyList: ItemDetails
        });
        console.log('ItemDetails', this.state.familyList);
        console.log('this.state.selectuser', this.state.selectuser)
    }
    componentDidMount() {
        var that = this;
        var famil = that.props.LoginData.data;

        console.log("task:", that.props.LoginData.TaskInfo);
        console.log("data:", famil);
        var user = famil.accounts.userId;
        console.log("syter:", user);
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
                names: data.familyDetail,

            })

            axios({
                method: "GET",
                url: Constant.base_url + '/users/members/families/' + that.state.names[0]._id,
                // url: Constant.base_url + '/users/members/families/' + "5b766cb5ef74d938a22de6d4",
                Headers: {
                    "Content-Type": "application/json",
                }
            }).then(({ data }) => {
                console.log("userdetailsid", data);
                // var count = 0;
                // for (var i = 0; i < data.users.userdetails._id.length; i++) {
                //     // s
                //     count++;
                //     console.log("count:", count++);
                //     that.setState({ members: count++ });
                //     console.log("members:", that.state.members);

                // }


            }).catch((err) => {
                console.log("error", err);
            });

        }).catch((err) => {
            console.log("error", err);
        });

        //     return fetch('https://reactnativecode.000webhostapp.com/FruitsList.php')
        //         .then((response) => response.json())
        //         .then((responseJson) => {
        //             this.setState({
        //                 loading: false,
        //                 dataSource: responseJson
        //             });
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        // }

        // GetGridViewItem(fruit_name) {
        //     Alert.alert(fruit_name);
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.ActivityIndicator_Style}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        return (

            <View style={styles.MainContainer}>
                <View style={{ height: '8%', }}>
                    <Text style={styles.title}>Assign to</Text>
                </View>

                <FlatList showsVerticalScrollIndicator={false}

                    data={this.state.names}
                    renderItem={({ item, index }) =>

                        <TouchableOpacity style={this.state.selectuser == item._id ? styles.buttonPress : styles.GridViewBlockStyle} onLongPress={() => this.checkbox(item)}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <TouchableOpacity>
                                    <Image source={{ uri: Constant.Img_url + item.familyPic }} style={styles.roleImg} />
                                </TouchableOpacity>
                                <Text style={styles.text}>{item.familyName}</Text>
                                <Text style={styles.text1} >{item.members}members</Text>

                            </View>
                        </TouchableOpacity>
                    }

                    keyExtractor={(item, index) => index}
                    numColumns={2}

                />

                <View style={{ height: '12%', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}  >
                    <TouchableOpacity style={styles.nextbtn}
                        onPress={() => this.props.navigation.navigate('Listofgroupmember', { familyList: this.state.familyList })}>
                        <Text style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: 25,
                            fontFamily: Fonts.AvenirLTStdBlack,
                        }}>Next</Text>
                    </TouchableOpacity>

                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingTop: '3%',
        paddingBottom: '1%'

    },

    ActivityIndicator_Style: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    GridViewBlockStyle: {

        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 150,
        margin: 5,
        backgroundColor: 'white',
        borderWidth: 0.6,
        borderRadius: 10

    }
    ,

    GridViewInsideTextItemStyle: {

        color: '#000000',
        padding: 10,
        fontSize: 18,
        justifyContent: 'center',

    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.AvenirLTStdBlack,
        color: '#000000',
        paddingBottom: 50,

    },
    nextbtn: {

        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6887ff',
        width: '90%',
        height: '100%'

    },
    roleImg: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        // resizeMode: 'contain'

    },
    text: {
        textAlign: 'center',
        fontFamily: Fonts.AvenirLTStdBlack,
        color: '#000000',
        fontSize: 20
    },
    text1: {
        textAlign: 'center',
        fontFamily: Fonts.AvenirLTStdBook,
    },
    buttonPress: {

        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 150,
        margin: 5,
        backgroundColor: 'green',
        borderWidth: 0.6,
        borderColor: 'green',
        borderRadius: 10
    }


});


const StateToProps = (state) => {
    return {
        LoginData: state.LoginUser,
        data: state.data,
        TaskInfo: state.TaskInfo

    }
}

const DispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(StateToProps, DispatchToProps)(Assignto);