import { createAction, createReducer } from '@reduxjs/toolkit';

import { SocketState } from '../state/socketState';

export const connectSocket = createAction<void>('socket/connect');
export const disconnectSocket = createAction<void>('socket/disconnect');
export const connectionChanged = createAction<boolean>('socket/connectionChanged');

const initialState: SocketState = {
    isConnected: false,
    hasError: false,
};

export const socketReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(connectionChanged, (state, action) => {
            state.isConnected = action.payload;
            state.hasError = false;
        });
});