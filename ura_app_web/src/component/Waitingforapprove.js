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
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Fonts } from './Fonts';

import Modal from 'react-native-modalbox';

export default class Waitingforapprove extends Component {

    state = {
        names: [
            {
                id: 0,
                url: require('../Image/parent.png')

            },
            {
                id: 1,
                url: require('../Image/Child.png')
            },
        ]
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.taskdescription} >
                    <Text style={{
                        fontSize: 30, fontFamily: Fonts.AvenirLTStdBlack, color: 'white',
                    }}> Wash the dishes</Text>
                </View>



                <View style={styles.taskproof}>
                    <ScrollView>

                        <View style={{ marginTop: '2%' }} >
                            <Text style={styles.txt}> Proof of Task Completion:</Text>
                        </View>
                        <View style={{ marginTop: '2%', flexDirection: 'row' }}>
                            {
                                this.state.names.map((item, index) => (
                                    <TouchableOpacity
                                        key={item.id}

                                    // style={styles.container}
                                    // onPress={() => this.alertItemName(item)}
                                    >
                                        {/* <ScrollView > */}
                                        <View style={{
                                            flexDirection: 'row', borderWidth: 0.8,
                                            marginBottom: '3%', marginRight: '2%', borderRadius: 15, width: 100, height: 100
                                        }}>
                                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                                <Image source={item.url} style={styles.roleImg} />
                                            </TouchableOpacity>
                                        </View>
                                        {/* </ScrollView > */}
                                    </TouchableOpacity>

                                ))
                            }
                        </View>

                        <View style={styles.aligntxt}>
                            <Text style={styles.txt}>Status:</Text>
                            <Text style={styles.txt2}> Waiting for approval</Text>
                        </View>
                        <View style={styles.aligntxt} >
                            <Text style={styles.txt}> Time left:</Text>
                            <Text style={styles.txt1}> 08:25:00</Text>
                        </View>
                        <View style={styles.aligntxt} >
                            <Text style={styles.txt}> Description:</Text>
                            <Text style={styles.txt1}> This is your first task</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '3%' }} >
                            <View style={{ width: '80%' }}>
                                <Text style={styles.txt}> Reward:</Text>
                                <Text style={styles.txt1}> 0.00063 URA</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.txt1} > $ 5.00 </Text>
                            </View>
                        </View>
                        <View style={styles.aligntxt}>
                            <Text style={styles.txt}> Assigned to:</Text>
                            <View style={{ marginTop: '1%' }}>
                                {
                                    this.state.names.map((item, index) => (
                                        <TouchableOpacity
                                            key={item.id}
                                        // style={styles.container}
                                        // onPress={() => this.alertItemName(item)}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: '20%', justifyContent: 'center' }}>
                                                    <TouchableOpacity >
                                                        <Image source={item.url} style={styles.assigntoimg} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ width: '80%', justifyContent: 'center', }}>
                                                    <Text style={styles.txt1}> sakthivel</Text>
                                                    <Text style={styles.txt1}> sakthivel.v@mitosistech.com</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    ))
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <TouchableOpacity onPress={() => this.refs.Editoptions.open()} activeOpacity={0.5} style={styles.addcmt} >
                    <Text style={styles.btntxt1}> Add Comment</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} style={styles.tasknotyet} >
                    <Text style={styles.btntxt1}>{"Task is not \nyet done"}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={() => this.refs.approve.open()} style={styles.approvetaskcomplete} >
                    <Text style={styles.btntxt}> APPROVE TASK COMPLETION</Text>
                </TouchableOpacity>

                {/* Model for approve     */}

                <Modal backdropPressToClose={false} style={styles.approvepopup} position={'center'} ref={'approve'} swipeArea={10}>

                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '3%', marginRight: '2%' }}>
                        <TouchableOpacity onPress={() => this.refs.approve.close()}>
                            <Image source={require('../Image/closeicon.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                        <Text style={{ fontSize: 24, textAlign: 'center', color: '#000000', fontFamily: Fonts.AvenirLTStdBlack, }} > Confirmation </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#000000', fontFamily: Fonts.AvenirLTStdRoman }}>
                            {"Do you want to approve this \ntask completion?"} </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}  >
                        <TouchableOpacity style={styles.approvebtn} onPress={() => this.refs.approve.close()}>
                            <Text style={styles.approvebtn1} >Yes, I approve</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '1%' }}  >
                        <TouchableOpacity style={styles.cancelbtn} onPress={() => this.refs.approve.close()}>
                            <Text style={styles.cancelbtn1} >Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>


                <Modal backdropPressToClose={false} style={styles.editoptionsbox} position={'bottom'} ref={'Editoptions'} swipeArea={20}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', borderBottomWidth: 1, padding: 10 }} >
                            <View style={{ width: '92%', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: Fonts.AvenirLTStdRoman, color: '#000000', fontSize: 22, }}>Wash the dishes</Text>
                            </View>
                            <View style={{ width: '8%', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.refs.Editoptions.close()}>
                                    <Image source={require('../Image/closeicon.png')}
                                        style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', borderBottomWidth: 1, padding: 15 }}  >
                            <View style={{ width: '15%', justifyContent: 'center' }}>
                                <TouchableOpacity >
                                    <Image source={require('../Image/edit_v1.png')}
                                        style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '85%', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: Fonts.AvenirLTStdBlack, color: '#000000', fontSize: 20, }}
                                    onPress={() => this.refs.Editoptions.close()}> Edit </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', borderBottomWidth: 1, padding: 15 }}  >
                            <View style={{ width: '15%', justifyContent: 'center' }}>
                                <TouchableOpacity >
                                    <Image source={require('../Image/delete.png')}
                                        style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '85%', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: Fonts.AvenirLTStdBlack, color: '#000000', fontSize: 20, }}>Delete</Text>
                            </View>
                        </View>
                    </View>
                </Modal>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '4%',
        backgroundColor: 'white',
    },

    taskdescription: {
        height: '30%',
        // fontFamily: Fonts.AvenirLTStdBlack,
        backgroundColor: '#6887ff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // margin:'5%'
    },
    taskproof: {
        height: '70%',
        backgroundColor: 'white',
        //  marginLeft:'5%',
        //  marginRight:'5%'
    },
    addcmt: {
        borderRadius: 15,
        backgroundColor: '#969baf',
        position: 'absolute',
        width: '46%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        bottom: 90,
    },
    btntxt1: {
        color: 'white',
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 19,
        textAlign: 'center'
    },

    btntxt: {
        fontSize: 21,
        color: 'white',
        fontFamily: Fonts.AvenirLTStdBlack,
        textAlign: 'center'
    },
    tasknotyet: {
        borderRadius: 15,
        backgroundColor: '#f35555',
        position: 'absolute',
        width: '46%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 100,
    },
    approvetaskcomplete: {
        borderRadius: 15,
        backgroundColor: '#1ac83f',
        position: 'absolute',
        width: '97%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        right: 20,
        bottom: 15,
    },
    roleImg: {
        // borderRadius: 15,
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
    assigntoimg: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        resizeMode: 'contain',
    },
    txt: {
        color: '#000000',
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 23
    },
    txt2: {

        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 19,
        color: 'lightgreen',
    },
    txt1: {

        fontFamily: Fonts.AvenirLTStdRoman,
        fontSize: 19,
        color: '#000000',
    },
    aligntxt: {
        marginTop: '3%'
    },
    approvepopup: {
        width: '80%',
        height: '60%',
        borderRadius: 10
    },
    approvebtn: {

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6887ff',
        width: '90%',
        height: 70,
    },
    cancelbtn: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 70
    },
    approvebtn1: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: Fonts.AvenirLTStdBlack,
    },
    cancelbtn1: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gray',
        fontSize: 20,
        fontFamily: Fonts.AvenirLTStdBook,
    },
    editoptionsbox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '27%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
});
