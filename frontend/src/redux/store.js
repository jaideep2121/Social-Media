import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSllice.js"

import socketSlice from "./SocketSlice.jsx"
import chatSlice from "./chatSlice.jsx"
import rtnSlice from "./rtnSlice.js"
import rostSlice from "./rost.Slice.jsx"

import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth:authSlice,
  
    socketio:socketSlice,
    chat:chatSlice,
    realTimeNotification:rtnSlice,
    rost:rostSlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:  {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;