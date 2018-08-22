/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


import Home from './src/component/Home';
import Register from './src/component/Register';
import Signin from './src/component/Signin';
import CreateFamily from './src/component/Createfamily';
import Addfamilymember from './src/component/Addfamilymember';
import Addnewuserexist from './src/component/Addnewuserexist';
import AddNewMemberRole from './src/component/AddNewMemberRole';
import AddMember from './src/component/AddMember';
import Role from './src/component/Role'
import Welcome from './src/component/Welcome';
import existsigin from './src/component/existsigin';
import HomeNavigate from './src/component/HomeNavigate'
import Wallet from './src/component/Wallet';
import Send from './src/component/Send';
import SendTo from './src/component/SendTo';
import Request from './src/component/Request';
import RequestTo from './src/component/RequestTo';
import SmartContracts from './src/component/SmartContracts';
import Newfamilysmartcontract from './src/component/Newfamilysmartcontract';
import Assignto from './src/component/Assignto';
import CreateNew from './src/component/CreateNew';
import Notifications from './src/component/Notifications';
import Listofgroupmember from './src/component/Listofgroupmember';
import Setreward from './src/component/Setreward';
import Waitingforapprove from './src/component/Waitingforapprove';
import Markasdone from './src/component/Markasdone';
import Regsign from './src/component/Regsign';
import samples from './src/component/samples';
import Sample from './src/component/Sample';
import ForgetPassword from './src/component/ForgetPassword';
import ChangePassword from './src/component/ChangePassword';
import ChooseRole from './src/component/ChooseRole';
import Time from './src/component/Time'
import Set from './src/component/Set';

export default Navigation = StackNavigator({

  Home: {
    screen: Home,
  },
  Register: {
    screen: Register,
  },
  ForgetPassword: {
    screen: ForgetPassword
  },
  ChangePassword: {
    screen: ChangePassword
  },
  CreateFamily: {
    screen: CreateFamily,
  },
  Signin: {
    screen: Signin,
  },
  HomeNavigate: {
    screen: HomeNavigate,
    navigationOptions: {
      header: null,
    }
  },
  Role: {
    screen: Role,
  },
  Welcome: {
    screen: Welcome,
  },
  existsigin: {
    screen: existsigin,
  },
  Regsign: {
    screen: Regsign
  },
  AddMember: {
    screen: AddMember,
    // navigationOptions: {
    //   headerLeft: null,
    // }
  },
  Addnewuserexist: {
    screen: Addnewuserexist,
    navigationOptions: {
      header: null,
    }
  },
  AddNewMemberRole: {
    screen: AddNewMemberRole,
  },
  Addfamilymember: {
    screen: Addfamilymember,
  },

  Wallet: {
    screen: Wallet,
  },
  SmartContracts: {
    screen: SmartContracts,
  },
  CreateNew: {
    screen: CreateNew,
  },
  Notifications: {
    screen: Notifications,
  },
  Send: {
    screen: Send,
  },
  SendTo: {
    screen: SendTo,
  },
  Request: {
    screen: Request,
  },
  RequestTo: {
    screen: RequestTo,
  },
  Newfamilysmartcontract: {
    screen: Newfamilysmartcontract,
  },
  Assignto: {
    screen: Assignto,
  },
  Listofgroupmember: {
    screen: Listofgroupmember
  },
  Setreward: {
    screen: Setreward
  },
  Waitingforapprove: {
    screen: Waitingforapprove
  },
  Markasdone: {
    screen: Markasdone,
  },
  samples: {
    screen: samples
  },
  Sample: {
    screen: Sample
  },
  ChooseRole: {
    screen: ChooseRole
  },
  Time: {
    screen: Time
  },

  // Set: {
  //   screen: Set
  // },
})