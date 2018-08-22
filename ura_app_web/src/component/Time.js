import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Fonts } from './Fonts';

import { connect } from 'react-redux';
import axios from 'axios';
import Constant from '../Constants/Constant';

class Time extends Component {
    state = {
        isVisible: true,
        chosenDate: ''
    };

    handlePicker = (time) => {
        this.setState({
            isVisible: false,
            chosenDate: moment(time).format('d HH:mm:ss')
        });
    }
    hidePicker = () => {
        this.setState({
            isVisible: false,

        });
    }
    showPicker = () => {
        this.setState({
            isVisible: true
        });
    }
    taskCreation() {
        var thatObj = this;
        var selectuser = thatObj.props.LoginData.selectUserinfo;

        var amount = thatObj.props.navigation.state.params.dallor;
        var urAmount = "";
        urAmount = thatObj.props.navigation.state.params.uracions;
        var tasks = thatObj.props.LoginData.TaskInfo;
        var data = thatObj.props.LoginData.data;
        console.log("selecting:", selectuser);
        var user = data.users.name;
        var date = new Date();
        console.log("tasks", tasks);
        console.log("tasks", tasks.Description);
        console.log('usd', amount);
        console.log('ura', urAmount);
        console.log("select:", selectuser.name);
        console.log("user:", user);


        var JsonData = JSON.stringify({
            "name": tasks.Task,
            "desription": tasks.Description,
            "assignTo": selectuser.name,
            "createdBy": user,
            "ura": urAmount.toString(),
            "usd": amount,
            "creationDate": date,
            "expiryDate": thatObj.state.chosenDate,
            "approved": "APPROVED",
            "status": "ASSINGED"
        });
        console.log("JData" + JsonData);
        console.log("1:", tasks.Task);
        console.log("2:", tasks.Description);
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //   Accept: 'application/json'
            },
            url: Constant.base_url + '/smartcontracts',
            data: JsonData,
        }).then((data) => {
            console.log("Success data", data);

        })
            .catch((err) => {
                console.log("errors", err);
            });
        thatObj.props.navigation.navigate('CreatNew');

    };

    render() {
        var selectuser = this.props.LoginData.selectUser;
        console.log("selecting :", selectuser);
        return (
            <View style={styles.container}>
                <View style={{ height: '8%' }}>

                    <Text style={{ fontFamily: Fonts.AvenirLTStdBlack, fontSize: 28, color: '#000000' }}>Set Contract Timer</Text>

                </View>
                <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{ color: 'blue', fontSize: 30 }}>{this.state.chosenDate} </Text>
                    <TouchableOpacity onPress={this.showPicker}>
                        <Text style={{ fontSize: 20, color: '#000000' }}>Set Time</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: '12%', justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}  >
                    <TouchableOpacity style={styles.nextbtn}
                        onPress={() => this.taskCreation()}>
                        <Text style={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: 25,
                            fontFamily: Fonts.AvenirLTStdBlack
                        }}>Done</Text>
                    </TouchableOpacity>

                </View>


                <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode='datetime'
                    datePickerModeAndroid='spinner'
                    is24Hour={false}
                />
            </ View>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        backgroundColor: 'white',

    },
    nextbtn: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6887ff',
        width: '90%',
        height: '100%'

    }
});
const StateToProps = (state) => {
    return {
        LoginData: state.LoginUser,
        data: state.data,
        TaskInfo: state.TaskInfo,
        selectUserinfo: state.selectUserinfo

    }
}

const DispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(StateToProps, DispatchToProps)(Time);
