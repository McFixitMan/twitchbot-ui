import { appDrawerReducer } from './modules/appDrawerModule';
import { combineReducers } from '@reduxjs/toolkit';
import { socketReducer } from './modules/socketModule';

export const makeRootReducer = 
    combineReducers({
        drawer: appDrawerReducer,
        socket: socketReducer,
    });

export default makeRootReducer;

export type RootState = ReturnType<typeof makeRootReducer>;