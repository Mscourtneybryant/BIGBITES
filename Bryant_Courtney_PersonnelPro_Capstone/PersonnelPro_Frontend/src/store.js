import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './actions/authReducer';


const store = configureStore({
    reducer: {
        user: userReducer, 
        auth: authReducer,
    },
});

export default store;