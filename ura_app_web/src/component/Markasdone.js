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
    TouchableOpacity,
    FlatList,
    TextInput,
    Alert
} from 'react-native';
import { Fonts } from './Fonts';

import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-picker';
var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class Markasdone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            familyImage: require('../Image/Child.png'),
            names: [
                {
                    id: 0,
                    url: require('../Image/images.jpg'),
                    name: 'sakthiii'
                },
                {
                    id: 1,
                    url: require('../Image/images.jpg'),
                    name: 'bala'
                },
            ]
        };
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
                let source = { uri: 'data:image/jpeg;base64,' + response.data }
                // console.log("Base64:" + imageBase64);
                console.log(source);
                console.log(source.uri);
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                // this.state.imageSource=imageBase64;
                // console.log(this.state.imageSource);
                this.setState({
                    familyImage: source,
                    // familyImgBase64: source.uri
                });
            }
        });
    }

    componentDidMount() {

        return fetch('https://reactnativecode.000webhostapp.com/FruitsList.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: responseJson
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    GetGridViewItem(fruit_name) {

        Alert.alert(fruit_name);

    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.taskdescription} >
                    <Text style={{ fontSize: 30, fontFamily: Fonts.AvenirLTStdBlack, color: 'white' }}> Wash the dishes</Text>
                </View>
                <View style={styles.taskproof}>
                    <ScrollView>
                        <View style={{ marginTop: '2%' }} >
                            <Text style={styles.txt}> Proof of task completion:</Text>
                        </View>
                        <View style={{ marginTop: '2%', flexDirection: 'row' }}>
                            <View style={{
                                flexDirection: 'column', borderWidth: 0.8, marginBottom: '3%', borderColor: '#1ac83f',
                                marginRight: '2%', borderRadius: 15, width: 100, height: 100, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <TouchableOpacity onPress={this.showImage.bind(this)} >
                                    <Image source={require('../Image/plus.png')} style={{ width: 35, height: 35, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center' }} />
                                </TouchableOpacity>
                                <Text style={{ textAlign: 'center', color: '#1ac83f' }}> {"Add Photo or \nvideo"}</Text>
                            </View>
                            <FlatList horizontal={true}
                                data={this.state.dataSource}
                                renderItem={({ item }) =>
                                    <View style={styles.GridViewBlockStyle}>
                                        <Text
                                            style={styles.GridViewInsideTextItemStyle}
                                            onPress={this.GetGridViewItem.bind(this, item.fruit_name, this.state.names.name)} >
                                            {item.fruit_name}
                                        </Text>
                                        <Text> Hihiih</Text>


                                    </View>
                                }
                                keyExtractor={(item, index) => index}
                            />
                        </View>

                        <View style={styles.aligntxt}>
                            <Text style={styles.txt}>Status:</Text>
                            <Text style={styles.txt1}>Expires in 0d3h59m59s</Text>
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
                                <Text style={styles.txt2} >$5.00 USD </Text>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 0.8, margin: '3%' }}>
                            <View>
                                <Text style={styles.txt}> Assigned to:</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '20%', justifyContent: 'center' }}>
                                    <TouchableOpacity >
                                        <Image source={require('../Image/Child.png')} style={styles.assigntoimg} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '80%', justifyContent: 'center', }}>
                                    <Text style={styles.txt1}> sakthivel</Text>
                                    <Text style={styles.txt1}> sakthivel.v@mitosistech.com</Text>
                                </View>
                            </View>

                        </View>
                        <Text style={styles.txt}> Activity</Text>
                        <View style={{ flexDirection: 'column', marginTop: '3%', marginBottom: '3%' }}>
                            {
                                this.state.names.map((item, index) => (
                                    <TouchableOpacity style={{ marginBottom: '3%' }}
                                        key={item.id}

                                    // style={styles.container}
                                    // onPress={() => this.alertItemName(item)}
                                    >

                                        <View style={{ flexDirection: 'row', backgroundColor: '#969baf', borderRadius: 20 }}>
                                            {/* <View style={{width: '15%', justifyContent:'center', borderRadius:20, backgroundColor:'white'}}> */}
                                            <View style={{
                                                width: '15%', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20,

                                            }}>
                                                <TouchableOpacity style={{
                                                    justifyContent: 'center', alignItems: 'center', height: 35, borderRadius: 35 / 2, margin: 3, borderWidth: 0.8
                                                }}>
                                                    <Image source={item.url}
                                                        style={{
                                                            width: 35,
                                                            height: 35,
                                                            resizeMode: 'contain',
                                                            borderRadius: 35 / 2
                                                        }}
                                                    />

                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ justifyContent: 'center', width: '85%' }} >
                                                <Text > {item.name}  </Text>
                                            </View>
                                        </View >
                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Text  > Apr 03 at 03:33 PM  </Text>
                                        </View>
                                    </TouchableOpacity>

                                ))
                            }
                        </View>
                        <Text style={styles.txt1}> sakthivel.v@mitosistech.com</Text>
                        <Text style={styles.txt1}> sakthivel.v@mitosistech.com</Text>
                        <Text style={styles.txt1}> sakthivel.v@mitosistech.com</Text>

                    </ScrollView>
                </View>

                <TouchableOpacity onPress={() => this.refs.Addcomment.open()} activeOpacity={0.5} style={styles.addcmt} >
                    <Text style={styles.btntxt1}> Add Comment</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={() => navigate('Time')} style={styles.requesttime} >
                    <Text style={styles.btntxt1}>{"Request Time \nExtension"}</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5} onPress={() => this.refs.confirm.open()} style={styles.markasdone} >
                    <Text style={styles.btntxt}> MARK AS DONE</Text>
                </TouchableOpacity>

                {/* Model for Mark as done    */}

                <Modal backdropPressToClose={false} avoidKeyboard={false} style={styles.confirmpopup} position={'center'} ref={'confirm'} swipeArea={10}>

                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '3%', marginRight: '2%' }}>
                        <TouchableOpacity onPress={() => this.refs.confirm.close()}>
                            <Image source={require('../Image/closeicon.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                        <Text style={{ fontSize: 24, textAlign: 'center', color: '#000000', fontFamily: Fonts.AvenirLTStdBlack, }} > Confirmation </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                        <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: Fonts.AvenirLTStdRoman, color: '#000000', }}>
                            {"Do you want to mark this task \nas done?"} </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}  >
                        <TouchableOpacity style={styles.markasdonebtn} onPress={() => this.refs.confirm.close()}>
                            <Text style={styles.markasdonebtn1} >Yes, mark it as done!</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '1%' }}  >
                        <TouchableOpacity style={styles.cancelbtn} onPress={() => this.refs.confirm.close()}>
                            <Text style={styles.cancelbtn1} >Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>

                <Modal
                    backdropPressToClose={false}
                    coverScreen={true}
                    avoidKeyboard={true}
                    backdrop={true}
                    style={styles.addcmtbox} position={'center'} ref={'Addcomment'} swipeArea={10}>

                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '3%', marginRight: '2%' }}>
                        <TouchableOpacity onPress={() => this.refs.Addcomment.close()}>
                            <Image source={require('../Image/closeicon.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                        <Text style={{ fontSize: 24, textAlign: 'center', color: '#000000', fontFamily: 'Avenir LT Std' }} > Add Comment </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                        <TextInput placeholder='Enter comment here..' style={{ width: '80%', fontSize: 20, fontFamily: 'Avenir LT Std', }}>
                        </TextInput>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}  >
                        <TouchableOpacity style={styles.markasdonebtn} onPress={() => this.refs.Addcomment.close()}>
                            <Text style={styles.donebtn1} >Done</Text>
                        </TouchableOpacity>
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
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        left: 20,
        bottom: 100,
    },
    btntxt1: {
        fontSize: 19,
        color: 'white',
        fontFamily: Fonts.AvenirLTStdBlack,
        textAlign: 'center'
    },

    btntxt: {
        fontSize: 22,
        color: 'white',
        fontFamily: Fonts.AvenirLTStdBlack,
        textAlign: 'center'
    },
    requesttime: {
        borderRadius: 15,
        backgroundColor: '#6887ff',
        position: 'absolute',
        width: '46%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 100,
    },
    markasdone: {
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
    txt1: {
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 18,
        color: '#000000',
    },
    txt2: {
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 15,
        color: '#000000',
    },
    aligntxt: {
        marginTop: '3%',

    },
    confirmpopup: {
        width: '80%',
        height: '60%',
        borderRadius: 10
    },
    markasdonebtn: {

        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6887ff',
        width: '90%',
        height: 60,
    },
    cancelbtn: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 60
    },
    markasdonebtn1: {
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
        fontFamily: 'Avenir LT Std',
    },


    addcmtbox: {
        width: '80%',
        height: '50%',
        borderRadius: 10
    },
    donebtn1: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: Fonts.AvenirLTStdBlack,

    },
    GridViewBlockStyle: {

        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 100,
        width: 100,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 15

    }
    ,

    GridViewInsideTextItemStyle: {

        color: '#fff',
        padding: 10,
        fontSize: 18,
        justifyContent: 'center',

    },
});
