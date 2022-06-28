import authSlice from "./authSlice";
import keySearchSlice from "./keySearchSlice";
import {combineReducers} from 'redux';

export const appReducers = combineReducers({authSlice,keySearchSlice})