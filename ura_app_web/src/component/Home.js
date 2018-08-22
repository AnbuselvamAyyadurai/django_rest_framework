import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Button,
    Image,
    Linking,

} from 'react-native';
import { YellowBox } from 'react-native';
import { Fonts } from './Fonts';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

console.disableYellowBox = true
class Home extends Component {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings(
            ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
            ]);
    }
    static navigationOptions = {
        header: null,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: '#2853ea',
            shadowColor: 'transparent',
            elevation: 0
        }
    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                console.log("URL:  ", url);
                this.navigateScreen(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
        }
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL = (event) => {
        console.log("event.url: ", event.url)
        this.navigate(event.url);
    }
    navigateScreen = (url) => {
        const { navigate } = this.props.navigation;
        const route = url.replace(/.*?:\/\//g, '');
        console.log(route);
        // const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];
        const id = route.split('/')[1];
        const familyId = route.split('/')[2];
        // const routeName = url;
        console.log("Routename-->", routeName);
        console.log("User Id-->", id);
        console.log("family Id-->", familyId);
        // console.log("Condition-->", routeName == 'https://welcome/');
        if (routeName == 'uraapp') {
            console.log(" Condition Success");
            navigate('Regsign', id);
        };
        if (routeName == 'uraapplication') {
            navigate('ChangePassword', id);
        };

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <LinearGradient colors={['#2952ea', '#6887ff',]} style={styles.LinearGradientStyle}
                start={{ x: 0.5, y: 0.0 }} end={{ x: 0.6, y: 0.75 }}
            >

                <View style={styles.mainView}>
                    <View style={styles.URAimg}>
                        <Image source={require('../Image/Urallowance_logo.png')} style={styles.imgalign} />
                    </View>
                    <View style={styles.createFamilyIcon}>
                        <TouchableOpacity onPress={() => navigate('Register')}
                            style={styles.submit}>
                            <Text style={styles.submitText}
                                onPress={() => navigate('Register')}
                            >CREATE NEW FAMILY</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signIn}>
                        <TouchableOpacity onPress={() => navigate('Signin')}>
                            <Text style={styles.submitText2}
                                onPress={() => navigate('Signin')}
                            >SIGN IN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    mainView: {

        // backgroundColor: '#2853ea'
    },
    URAimg: {
        height: '70%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    createFamilyIcon: {
        height: '15%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    signIn: {
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    imgalign: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        width: '80%',
        height: '100%',
    },
    submit: {
        backgroundColor: '#09bc03',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '65%'
    },
    submitText2: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.AvenirLTStdBlack
    },
    submitText: {

        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.AvenirLTStdBlack

    },

    LinearGradientStyle: {
        flex: 1,


    },
});
export default Home;