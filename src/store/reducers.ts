import { appDrawerReducer } from './modules/appDrawerModule';
import { chatReducer } from './modules/chatModule';
import { combineReducers } from '@reduxjs/toolkit';
import { queueReducer } from './modules/queueModule';
import { socketReducer } from './modules/socketModule';

export const makeRootReducer = 
    combineReducers({
        chat: chatReducer,
        drawer: appDrawerReducer,
        queue: queueReducer,
        socket: socketReducer,
    });

export default makeRootReducer;

export type RootState = ReturnType<typeof makeRootReducer>;