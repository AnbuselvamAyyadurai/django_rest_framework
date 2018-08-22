import * as React from "react";
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from "react-redux";
import { store } from './src/component/store/store';

// const initialState = {
// 	UserInfo:[],
//     FamilyInfo:[],
//     UserID:"",
//     Password:"",
// };

// const Reducer_UserData = (state = initialState, action)=> {
// 	switch(action.type){
//         case "USER_INFO":
//         state={
//             ...state,
//             articleList:action.payload
//         }
//         break;
//         case "FAMILY_INFO":
//         state={
//             ...state,
//             FamilyInfo:action.payload
//         }
//         case "USER_ID":
//                 state={
//                     ...state,
//                     UserID:action.payload,
//                 }
//         break;
//         case "PASSWORD":
//                 state={
//                     ...state,
//                     Password:action.payload
//                 }
//     }
// 	return state;
// }

// const store = createStore(combineReducers({LoginUser:Reducer_UserData}));

export default class Setup extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}