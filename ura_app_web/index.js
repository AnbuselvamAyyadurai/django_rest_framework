import { AppRegistry } from 'react-native';
import App from './App';
import ReduxStoreConfig from './ReduxStoreConfig.js';
import HomeNavigate from './src/component/HomeNavigate';


/*import { createStore, combineReducers } from 'redux';

const initialState = {
	
	UserInfo:[],
    FamilyInfo:[],
    UserID:"",
    Password:"",
};

const Reducer_UserData = (state = initialState, action)=> {
	switch(action.type){
        case "USER_INFO":
        state={
            ...state,
            articleList:action.payload
        }
        break;
        case "FAMILY_INFO":
        state={
            ...state,
            FamilyInfo:action.payload
        }
        case "USER_ID":
        state={
            ...state,
            UserID:action.payload,
        }
        break;
        case "PASSWORD":
        state={
            ...state,
            Password:action.payload
        }
    }
	return state;
}

const store = createStore(Reducer_UserData);*/

AppRegistry.registerComponent('ura_app_web', () => ReduxStoreConfig);
