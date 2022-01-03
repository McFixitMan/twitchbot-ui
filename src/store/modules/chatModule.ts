import { createAction, createReducer } from '@reduxjs/toolkit';

import { ChatMessage } from '../../entities/chatMessage';
import { ChatState } from '../state/chatState';
import { HttpMethod } from '../../types/httpMethod';
import { callApi } from '../../utility/api';
import { createApiThunk } from '../../types/thunk';

export const addChatMessage = createAction<ChatMessage>('chat/addChatMessage');

export const sendChatMessage = createApiThunk<unknown, string>('chat/sendChatMessage', async (message, thunkApi) => {
    await callApi('chat/sendChatMessage', HttpMethod.POST, {
        message: message,
    });
});

export const setUsernameFilter = createAction<string>('chat/setUsernameFilter');

const initialState: ChatState = {
    chatMessages: [],
    usernameFilter: undefined,
};

export const chatReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addChatMessage, (state, action) => {
            state.chatMessages.push(action.payload);
        })
        .addCase(setUsernameFilter, (state, action) => {
            state.usernameFilter = action.payload;
        });
});