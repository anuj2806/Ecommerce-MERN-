import {configureStore} from '@reduxjs/toolkit'
import { userAPI } from './api/userAPI';
import { userReaducer } from './reducer/userReaducer';


export const server = import.meta.env.VITE_SERVER;
export const store  = configureStore({
    reducer:{
        [userAPI.reducerPath]:userAPI.reducer,
        [userReaducer.name]:userReaducer.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
});