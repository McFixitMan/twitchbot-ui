import { appDrawerReducer } from './modules/appDrawerModule';
import { chatReducer } from './modules/chatModule';
import { combineReducers } from '@reduxjs/toolkit';
import { levelViewerReducer } from './modules/levelViewerModule';
import { predictionReducer } from './modules/predictionModule';
import { queueReducer } from './modules/queueModule';
import { socketReducer } from './modules/socketModule';

export const makeRootReducer = 
    combineReducers({
        chat: chatReducer,
        drawer: appDrawerReducer,
        levelViewer: levelViewerReducer,
        prediction: predictionReducer,
        queue: queueReducer,
        socket: socketReducer,
    });

export default makeRootReducer;

export type RootState = ReturnType<typeof makeRootReducer>;