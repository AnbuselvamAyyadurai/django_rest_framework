import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    ToastAndroid,
    TouchableHighlight
} from 'react-native';
import SendTo from './SendTo';
import { wallet } from 'ethers';
import TextInputMask from 'react-native-text-input-mask';
import { StackNavigator } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Fonts } from './Fonts';

export default class Setreward extends Component {
    state = {
        uracions: '',
        dallor: '',
        errmsg: false,
        txtbordercolor: false,
        balerr: false,
        subTotal: '',
        number: ''

    }

    static navigationOptions = {
        title: '',
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: '#ffffff',
            shadowColor: 'transparent',
            backgroundColor: '#fff',
            elevation: 0
        }
    };
    change() {
        var value = this.state.uracions;
        value = value.toFixed(5);
        this.setState({ subTotal: value });
        this.setState({ errmsg: false, balerr: false })

    }
    amount() {
        let ethers = require('ethers');
        let utils = require('ethers/utils');
        //   var privateKey = '0x57933432446b0ecd2d0c0a4efa5291d093168c748969d31f629337e870e18102';

        AsyncStorage.getItem('loginUser').then((value) => {
            var userLogin = JSON.parse(value);
            console.log("Async login user: " + userLogin)
            this.setState({ loginData: userLogin })

            var privateKey = this.state.loginData.accounts.privateKey;
            var wallet = new ethers.Wallet(privateKey);

            wallet.provider = ethers.providers.getDefaultProvider('ropsten');
            var that = this;
            wallet.getBalance().then(function (balance) {

                // balance is a BigNumber (in wei); format is as a sting (in ether)
                var etherString = utils.formatEther(balance);
                //this.refs.confirm.close(this.refs.okaybtn.open());
                console.log("Balance: " + etherString);
                var number = parseInt(etherString);
                var eth = number * 454.22
                that.setState({ number });
                that.setState({ ethbalance: eth.toFixed(2) });
                console.log("statebal: " + eth);

                console.log("Balance: " + number);
                console.log('this.state.dallor', that.state.dallor)


                if (that.state.dallor == 0) {
                    that.setState({ errmsg: true })
                }
                // else if ((that.state.dallor != 0) && (that.state.number > etherString)) {
                //   that.setState({ balerr: true })
                // }
                else {
                    that.props.navigation.navigate('Time', { dallor: that.state.dallor, uracions: that.state.uracions, })
                }

            });

        })

    }

    render() {


        return (
            <KeyboardAwareScrollView style={styles.contain} >
                <View style={styles.container}>
                    <View style={styles.container1}>
                        <Text style={styles.title}>Set a Reward</Text>
                    </View>
                    <View style={styles.container2} >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '20%' }} />
                            <View style={{ flexDirection: 'column', width: '50%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.txt}>{'\u0024'}</Text>
                                    <TextInputMask mask={"[0000000000]"}
                                        style={styles.txt}
                                        underlineColorAndroid='transparent'
                                        keyboardType='numeric'
                                        onChangeText={(dallor) => this.change(this.setState({ uracions: dallor / 454.22, dallor: dallor }),

                                        )} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -15 }}>
                                    <Text style={styles.uracionsstyle}>{this.state.subTotal}</Text>
                                    <Text style={styles.uracionsstyle}> URA  </Text>
                                </View>
                            </View>
                            <View style={{ width: '25%', marginTop: '12%', marginLeft: "5%" }} >
                                <TouchableOpacity>
                                    <Image source={require('../Image/sortarrow.png')} style={styles.sortarrow} />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <Text style={styles.errtxt} >{this.state.errmsg ? "Enter amount" : ""}</Text>
                        <Text style={styles.errtxt} >{this.state.balerr ? "insufficient amount" : ""}</Text>
                    </View>

                    <View style={{ height: '12%', justifyContent: 'center', alignItems: 'center', }}  >
                        <TouchableOpacity style={styles.nextbtn}
                            onPress={() => { this.amount() }

                                // this.props.navigation.navigate('SendTo',this.state.dallor)
                            }>
                            <Text onPress={() => this.amount()} style={styles.nexttxt}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
console.log("doller", this.dallor)
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingBottom: 25
    },
    container1: {
        height: '15%'

    },
    container2: {

        height: '60%',
        flexDirection: 'column'
    },
    title: {
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 30,
        color: '#000000',
    },
    txt: {
        fontSize: 50,
        color: '#2952ea',
        fontFamily: Fonts.AvenirLTStdBlack,

    },
    uracionsstyle: {
        fontSize: 21,
        color: '#2952ea',
        fontFamily: Fonts.AvenirLTStdBook,

    },
    sortarrow: {
        width: 40,
        height: 50,
        resizeMode: 'contain'
    },
    errtxt: {
        color: 'red'
    },
    nexttxt: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 22,
        fontFamily: Fonts.AvenirLTStdBlack

    },
    nextbtn: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6887ff',
        width: '90%',
        height: 65
    },
});

