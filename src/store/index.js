import { combineReducers } from "redux";
import { registerReducer, loginReducer } from './auth/Reducers';
import { gameReducer } from './game/Reducers';


export default combineReducers({ registerReducer, loginReducer, gameReducer })