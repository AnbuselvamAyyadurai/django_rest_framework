import React, { Component } from 'react';
import { Fonts } from './Fonts';
import { connect } from 'react-redux';
import * as action from './action/action';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Button,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity

} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast, { DURATION } from 'react-native-easy-toast'

var options = {
    title: 'Select Avatar',
    customButtons: [
        //   {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class CreateFamily extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#ffffff',
            shadowColor: 'transparent',
            backgroundColor: '#fff',
            elevation: 0
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            familyName: '',
            familyImage: require('../Image/Camera.jpg'),
            errFamilyName: false,
            familyImgBase64: ''
        };
    }
    validateFormField() {
        var isvalid = false;
        var isvalidFamilyName = true;
        // var str=new String(this.state.familyName)
        if ((this.state.familyName.length > 15) || (this.state.familyName == '')) {
            this.setState({ errFamilyName: true });
            isvalidFamilyName = false;
        } else {
            this.setState({ errFamilyName: false });
            isvalidFamilyName = true;
        }
        if (this.state.errIMGURL == "" || this.state.errIMGURL == null) {
            isValidImage = false;
            this.refs.toast.show('Please choose image');
        } else {
            isValidImage = true;
            // this.setState({ imgValidation: false });
        }
        if (isvalidFamilyName == true && isValidImage == true) {
            isValid = true;
            console.log(isValid);
            return isValid;
        }
    }
    submitSuggestion() {
        //const userInput=this.props.navigation.state.params;
        // console.log(userInput);
        //console.log(userInput.user.username);
        var isValid = this.validateFormField(this);
        if (isValid) {
            // console.log(userInput);
            //  userInput.family.familyName=this.state.familyName;
            // console.log(userInput);
            let familyInfo = {
                FamilyName: this.state.familyName,
                FamilyImage: this.state.familyImgBase64
            }
            this.props.setFamilyInfo(familyInfo);
            const { navigate } = this.props.navigation;
            navigate('Role');
        }
        // setFamilyInfo
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
                // let source = { uri: response.uri };
                this.setState({ errIMGURL: response.data });
                let source = { uri: 'data:image/jpeg;base64,' + response.data }
                console.log(source);
                console.log(source.uri);
                // ReadImageData.readImage(uri, (imageBase64) => {
                //     console.log(imageBase64);
                // });
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    familyImage: source,
                    familyImgBase64: source.uri
                });
            }
        });
    }
    render() {
        return (
            <KeyboardAwareScrollView style={styles.contain} >
                <View style={styles.container}>
                    <View style={styles.container1} >
                        <Text style={styles.title}>Create family</Text>
                    </View>
                    <View style={styles.container2}  >
                        <TouchableOpacity onPress={this.showImage.bind(this)}>
                            <Image source={this.state.familyImage} style={styles.familyImg} />
                        </TouchableOpacity>
                        <Toast ref="toast"
                            position='top'
                            positionValue={160}
                            fadeInDuration={750}
                            fadeOutDuration={750}
                            opacity={0.8}
                        />

                        <Text style={styles.title2}>Add a family crest</Text>
                    </View>
                    <View style={styles.container3} >
                        <TextInput
                            maxLength={15}
                            style={styles.input}
                            value={this.state.familyName}
                            underlineColorAndroid='black'
                            placeholder="Name your family"
                            onChangeText={(familyName) => this.setState({ familyName }, () => { this.setState({ errFamilyName: false }) })}
                            fontFamily={this.state.familyName.length == 0 ? Fonts.AvenirLTStdBook : Fonts.AvenirLTStdBlack} />
                        <Text style={styles.errorMsg}>{this.state.errFamilyName ? "Enter family name" : ""}</Text>
                    </View>
                    <View style={styles.container4}  >
                        <TouchableOpacity style={styles.nextbtn}
                            onPress={this.submitSuggestion.bind(this)}>
                            <Text onPress={this.submitSuggestion.bind(this)} style={styles.nexttxt}>Next</Text>
                        </TouchableOpacity>
                    </View>

                </View>
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
        // flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingBottom: 25

    },
    container2: {
        marginTop: '30%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    container3: {
        marginTop: '10%',

    },
    container4: {

        marginTop: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: Fonts.AvenirLTStdBlack,
        fontSize: 28,
        color: '#000000',
    },

    familyImg: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
    },
    title2: {
        fontFamily: Fonts.AvenirLTStdBlack,
        marginTop: '3%',
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
    },
    input: {
        height: 70,
        width: '100%',
        fontSize: 22,
        paddingBottom: 20

    },

    errorMsg: {
        fontFamily: Fonts.AvenirLTStdBook,
        fontSize: 22,
        color: "#F44336",
    },
    nexttxt: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.AvenirLTStdBlack

    },
    nextbtn: {
        backgroundColor: '#6887ff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 65
    },
})

const StateToProps = (state) => {
    return {
        LoginData: state.LoginUser,
    }
}

const DispatchToProps = (dispatch) => {
    return {
        setFamilyInfo: (familyinfo) => {
            dispatch(action.setFamilyInfomation(familyinfo));
        }
    }
}
export default connect(StateToProps, DispatchToProps)(CreateFamily);