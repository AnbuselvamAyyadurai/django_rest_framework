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
    TouchableOpacity

} from 'react-native';
import { Fonts } from './Fonts';
import { connect } from 'react-redux';
import * as action from './action/action';
import Constant from '../Constants/Constant';




class CreateNew extends Component {
    static navigationOptions = {
        // title: 'Create New',
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
            task: '',
            errtask: false,
            errValidtask: false,
            errColorTask: false,
            description: '',
            errdescription: false,
            errValiddescription: false,
            errColorDesc: false,



        }

    }
    handlerSubmit() {
        var thisObj = this;
        var isValid = thisObj.validateFormField();

        console.log("1:", thisObj.state.task);
        console.log("2:", thisObj.state.description);

        if (isValid) {
            let TaskInfo = {
                Task: thisObj.state.task,
                Description: thisObj.state.description,

            }
            thisObj.props.setTaskInfo(TaskInfo);
            const { navigate } = thisObj.props.navigation;
            navigate('Assignto');
        } else {
            console.log("validation failed");
        }
    }
    validateFormField() {
        var isValid = false;

        var isValidtasks = false;
        var isValiddescriptions = false

        if (this.state.task == '') {
            this.setState({ errtask: true, errColorTask: true });
            isValidtasks = false;
        } else if ((this.state.task != '')) {
            if ((this.state.task.length < 1) || (this.state.task.length > 25)) {
                this.setState({ errValidtask: true, errColorTask: true });
                isValidtasks = false;
            }
            else {
                isValidtasks = true;
            }
        }
        if (this.state.description == '') {
            this.setState({ errdescription: true, errColorDesc: true });
            isValiddescriptions = false;
        } else if ((this.state.description != '')) {
            if ((this.state.description.length < 1) || (this.state.description.length > 25)) {
                this.setState({ errValiddescription: true, errColorDesc: true });
                isValiddescriptions = false;
            }
            else {
                isValiddescriptions = true;
            }
        }

        if (isValidtasks == true && isValiddescriptions == true)
            isValid = true;
        console.log(isValid);
        return isValid;


    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={{ flex: 0.15 }}>
                    <Text style={styles.title}>New Family Smart Contract</Text>
                </View>
                <View style={{ flex: 0.73 }}>
                    <TextInput
                        style={styles.input}
                        value={this.state.task}
                        placeholderStyle={styles.textboxfieldd}
                        placeholder="Name your task" maxLength={15}
                        underlineColorAndroid={this.state.errColorTask ? 'red' : 'black'}
                        fontFamily={this.state.task.length > 0 ? Fonts.AvenirLTStdBlack : Fonts.AvenirLTStdBook}
                        onChangeText={(task) => this.setState({ task },
                            () => {
                                this.setState({ errtask: false, errColorTask: false, errValidtask: false, })
                            })}
                    />
                    <Text style={styles.errorMsg}>{this.state.errtask ? "Enter the task" : ""}</Text>
                    <Text style={styles.errorMsg}>{this.state.errValidtask ? " must be filled" : ""}</Text>


                    <TextInput
                        style={styles.input}
                        value={this.state.description}
                        placeholderStyle={styles.textboxfieldd}
                        placeholder="Description" maxLength={15}
                        underlineColorAndroid={this.state.errColorDesc ? 'red' : 'black'}
                        fontFamily={this.state.description.length > 0 ? Fonts.AvenirLTStdBlack : Fonts.AvenirLTStdBook}
                        onChangeText={(description) => this.setState({ description },
                            () => {
                                this.setState({ errdescription: false, errColorDesc: false, errValiddescription: false, })
                            })}
                    />
                    <Text style={styles.errorMsg}>{this.state.errdescription ? "Enter the description" : ""}</Text>
                    <Text style={styles.errorMsg}>{this.state.errValiddescription ? " must be filled" : ""}</Text>


                </View>

                <View style={{ flex: 0.12, justifyContent: 'center', alignItems: 'center' }}  >
                    <TouchableOpacity style={styles.nextbtn}
                        onPress={() => this.handlerSubmit()}>
                        <Text style={{
                            textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: 'white',
                            fontSize: 25, fontFamily: Fonts.AvenirLTStdBlack,
                        }}>Next</Text>

                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: '5%'

    },
    title: {
        fontSize: 25,
        fontFamily: Fonts.AvenirLTStdBlack,
        color: '#000000'

    },
    input: {
        fontSize: 24,
        fontFamily: Fonts.AvenirLTStdBook,
        paddingTop: 15,
        paddingBottom: 20


    },
    nextbtn: {

        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6887ff',
        width: '90%',
        height: '100%'

    },
    errorMsg: {
        fontFamily: Fonts.AvenirLTStdBook,
        fontSize: 22,
        color: "#F44336",
    },

})
const StateToProps = (state) => {
    return {

    }
}

const DispatchToProps = (dispatch) => {
    return {

        setTaskInfo: (TaskInfo) => {
            dispatch(action.setTaskInfo(TaskInfo));
        }
    }
}
export default connect(StateToProps, DispatchToProps)(CreateNew);
