import { createAction, createReducer } from '@reduxjs/toolkit';

import { ChatMessage } from '../../entities/chatMessage';
import { ChatState } from '../state/chatState';
import { Chatter } from '../../entities/chatter';
import { HttpMethod } from '../../types/httpMethod';
import { callApi } from '../../utility/api';
import { createApiThunk } from '../../types/thunk';

export const addChatMessage = createAction<ChatMessage>('chat/addChatMessage');

export const setUsernameFilter = createAction<string>('chat/setUsernameFilter');

export const sendChatMessage = createApiThunk<unknown, string>('chat/sendChatMessage', async (message, thunkApi) => {
    await callApi('chat/sendChatMessage', HttpMethod.POST, {
        message: message,
    });
});

export const getChatters = createApiThunk<Array<Chatter>, undefined>('chat/getChatters', async (_noInput, thunkApi) => {
    const { data } = await callApi<Array<Chatter>>('chat/getChatters');

    return data;
});

export const permitLink = createApiThunk<void, string>('chat/permitLink', async (username, thunkApi) => {
    await callApi('chat/permitLink', HttpMethod.POST, {
        username: username,
    });
});

const initialState: ChatState = {
    chatMessages: [],
    usernameFilter: undefined,
    chatters: [],
    isLoadingChatters: false,
};

export const chatReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addChatMessage, (state, action) => {
            state.chatMessages.push(action.payload);
        })
        .addCase(setUsernameFilter, (state, action) => {
            state.usernameFilter = action.payload;
        })
        .addCase(getChatters.pending, (state) => {
            state.isLoadingChatters = true;
            state.chatters = [];
        })
        .addCase(getChatters.fulfilled, (state, action) => {
            state.isLoadingChatters = false;
            state.chatters = [...action.payload];
        })
        .addCase(getChatters.rejected, (state) => {
            state.isLoadingChatters = false;
            state.chatters = [];
        });
});