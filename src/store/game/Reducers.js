
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

const initialState = {
    isLoading: false,
    error: '',
    map: {},
    player: {},
};

export const gameReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case INIT_PLAYER_START:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case INIT_PLAYER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                player: payload
            };
        case INIT_PLAYER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        case FETCH_MAP_START:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case FETCH_MAP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                map: payload,
            };
        case FETCH_MAP_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
                player: payload
            };
        case MOVE_PLAYER_START:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case MOVE_PLAYER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                player: payload
            };
        case MOVE_PLAYER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
}
