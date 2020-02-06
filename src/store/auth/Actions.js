import axiosWithAuth from '../../utils/axiosWithAuth';

import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT
} from './Types';

export const userLogin = (data, history) => {
    return dispatch => {
        dispatch({type: LOGIN_START});
        axiosWithAuth('auth')
        .post('/api/login/', data)
        .then(res => {
            localStorage.setItem('token', res.data.key);
            dispatch({type: LOGIN_SUCCESS, payload: res.data})
            history.push('/')
        })
        .catch(err => {
            dispatch({type: LOGIN_FAILURE, payload: err})
        })
    }
}

export const userRegister = (data, history) => {
     return dispatch => {
        dispatch({type: REGISTER_START});
        return axiosWithAuth('auth')
        .post('/api/registration/', data)
        .then(res => {
            localStorage.setItem('token', res.data.key);
            dispatch({type: REGISTER_SUCCESS, payload: res.data});
            history.push('/login')
        })
        .catch(err => {
            dispatch({type: REGISTER_FAILURE, payload: err});
        });
};
}

export const logout = (history) => {
    return dispatch => {
        dispatch({type: LOGOUT})
        localStorage.removeItem('token')
        history.push('/login')
    }
};