import { QueueItem } from '../../entities/queueItem';
import { QueueState } from '../state/queueState';
import { callApi } from '../../utility/api';
import { createApiThunk } from '../../types/thunk';
import { createReducer } from '@reduxjs/toolkit';

export const getCurrentQueueItems = createApiThunk<Array<QueueItem>, undefined>('queue/getCurrentQueueItems', async (_noInput, thunkApi) => {
    const { data } = await callApi<Array<QueueItem>>('queue/getAll');

    return data;
});

const initialState: QueueState = {
    isLoading: false,
    currentQueue: undefined,
    currentQueueItems: [],
};

export const queueReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getCurrentQueueItems.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getCurrentQueueItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentQueueItems = action.payload;
        })
        .addCase(getCurrentQueueItems.rejected, (state, action) => {
            state.isLoading = false;
            state.currentQueueItems = [];
        });
});