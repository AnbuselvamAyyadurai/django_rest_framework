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



export default class Newfamilysmartcontract extends Component {
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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={{ flex: 0.15 }}>
                    <Text style={styles.title}>New Family Smart Contract</Text>
                </View>

                <View style={{ flex: 0.73 }}>
                    <TextInput underlineColorAndroid='black' style={styles.input} placeholder="Name your task" />
                    <TextInput underlineColorAndroid='black' style={styles.input} placeholder="Description" />
                </View>

                <View style={{ flex: 0.12, justifyContent: 'center', alignItems: 'center' }}  >
                    <TouchableOpacity style={styles.nextbtn} onPress={() => navigate('Assignto')}>
                        <Text style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: 25, fontFamily: Fonts.AvenirLTStdBlack, }}>Next</Text>

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
        fontSize: 27,
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

    }

})