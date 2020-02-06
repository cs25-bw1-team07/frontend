

import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
  } from './Types'

  const initialState = {
    isLoading: false,
    error: '',
    isAuth: !!localStorage.getItem('token')
  }

export const loginReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case LOGIN_START:
            return {
                ...state,
                error: "",
                isLoading: true
            };
            case LOGIN_SUCCESS:
            return {
                ...state,
                error: "",
                isAuth: true,
                isLoading: false,
                token: payload.key,
                isSuccess: true
            };
            case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
            default:
                return state;
    }
};



export const registerReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case REGISTER_START:
            return {
                ...state,
                error: "",
                isLoading: true
            };
            case REGISTER_SUCCESS:
            return {
                ...state,
                error: "",
                isAuth: true,
                token: payload.key,
                isLoading: false,
                users: [...state.users, payload],
            };
            case REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
            default:
                return state;
    }
};
