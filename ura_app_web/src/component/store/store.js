
import { createStore, combineReducers } from 'redux';
import {Reducer_UserData} from '../reducer/reducer';

export const store = createStore(combineReducers({LoginUser:Reducer_UserData}));

