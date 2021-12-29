import { createAction, createReducer } from '@reduxjs/toolkit';

import { ChatMessage } from '../../entities/chatMessage';
import { ChatState } from '../state/chatState';

export const addChatMessage = createAction<ChatMessage>('chat/addChatMessage');

const initialState: ChatState = {
    chatMessages: [],
};

export const chatReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addChatMessage, (state, action) => {
            state.chatMessages.push(action.payload);
        });
});