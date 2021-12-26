import { createAction, createReducer } from '@reduxjs/toolkit';

import { SocketState } from '../state/socketState';

export const connectSocket = createAction<void>('socket/connect');
export const disconnectSocket = createAction<void>('socket/disconnect');
export const connectionChanged = createAction<boolean>('socket/connectionChanged');

const initialState: SocketState = {
    isConnecting: false,
    isConnected: false,
    hasError: false,
};

export const socketReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(connectSocket, (state, action) => {
            state.isConnecting = true;
            state.isConnected = false;
        })
        .addCase(connectionChanged, (state, action) => {
            state.isConnecting = false;
            state.isConnected = action.payload;
            state.hasError = false;
        });
});