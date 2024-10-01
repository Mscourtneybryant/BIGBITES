import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './authConstants';

const initialState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    isAuthenticated: null,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload);
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
                error: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                error: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem('token',action.payload);
            return {
                ...state,
                isAuthenticated: false,
                token: null,
            };
        default:
            return state;
    }
};

export default authReducer;