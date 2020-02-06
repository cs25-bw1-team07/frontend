import axiosWithAuth from '../../utils/axiosWithAuth';

import {
    INIT_PLAYER_START,
    INIT_PLAYER_SUCCESS,
    INIT_PLAYER_ERROR,
    FETCH_MAP_START,
    FETCH_MAP_SUCCESS,
    FETCH_MAP_ERROR,
    MOVE_PLAYER_START,
    MOVE_PLAYER_SUCCESS,
    MOVE_PLAYER_ERROR
} from './Types';

export const initPlayer = () => {
    return dispatch => {
        dispatch({ type: INIT_PLAYER_START });
        axiosWithAuth('game')
            .get('/api/adv/init/')
            .then(res => {
                dispatch({ type: INIT_PLAYER_SUCCESS, payload: res });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: INIT_PLAYER_ERROR });
            })
    }
};

export const getMap = room => {
    return dispatch => {
        dispatch({ type: FETCH_MAP_START });
        axiosWithAuth('game')
            /* /api/adv/rooms/ */
            .get('/api/adv/rooms/')
            .then(res => {
                let coordinates = [];
                if (document.querySelector('[style="fill: white; stroke: #ff00c7; stroke-width: 3px;"]')) {
                    document.querySelector('[style="fill: white; stroke: #ff00c7; stroke-width: 3px;"]').setAttribute('style', 'fill: #150042; stroke: #ff00c7; stroke-width: 3px;')
                }
                // extract x and y coordinates and set to state
                // eslint-disable-next-line
                res.data.rooms.map((el, i) => {
                    const x = el[6];
                    const y = el[7];
                    let obj = { x: x, y: y, size: 10, color: 1}
                    if (el[0] === room) {
                        obj.color = 2

                    }
                    coordinates.push(obj);
                })
                res.coordinates = coordinates;
                dispatch({ type: FETCH_MAP_SUCCESS, payload: res });
            })
            .catch(err => {
                dispatch({ type: FETCH_MAP_ERROR });
            })
    }
};

export const movePlayer = direction => {
    // will need to pass in a string (ex: 'n')
    return dispatch => {
        dispatch({ type: MOVE_PLAYER_START });
        axiosWithAuth('game')
            .post('/api/adv/move/', { direction: direction })
            .then(res => {
                console.log(res);
                dispatch({ type: MOVE_PLAYER_SUCCESS, payload: res });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: MOVE_PLAYER_ERROR });
            })
    }
};