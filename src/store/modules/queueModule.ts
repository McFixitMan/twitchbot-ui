import { HttpMethod } from '../../types/httpMethod';
import { QueueItem } from '../../entities/queueItem';
import { QueueRecord } from '../../entities/queueRecord';
import { QueueState } from '../state/queueState';
import { callApi } from '../../utility/api';
import { createApiThunk } from '../../types/thunk';
import { createReducer } from '@reduxjs/toolkit';

export const getCurrentQueueItems = createApiThunk<Array<QueueItem>, undefined>('queue/getCurrentQueueItems', async (_noInput, thunkApi) => {
    const { data } = await callApi<Array<QueueItem>>('queue/getCurrentQueueItems');

    return data;
});

export const setCurrentLevel = createApiThunk<QueueItem, string>('queue/setCurrentLevel', async (username, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/setCurrentLevel', HttpMethod.POST, {
        username: username,
    });
    
    return data;
});

export const getCurrentLevel = createApiThunk<QueueItem, undefined>('queue/getCurrentLevel', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/getCurrentLevel');

    return data;
});

export const winCurrentLevel = createApiThunk<QueueItem, undefined>('queue/winCurrentLevel', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/winCurrentLevel', HttpMethod.POST);

    return data;
});

export const loseCurrentLevel = createApiThunk<QueueItem, undefined>('queue/loseCurrentLevel', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/loseCurrentLevel', HttpMethod.POST);

    return data;
});

export const setNextLevel = createApiThunk<QueueItem, undefined>('queue/setNextLevel', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/setNextLevel', HttpMethod.POST);

    return data;
});

export const setRandomLevel = createApiThunk<QueueItem, undefined>('queue/setRandomLevel', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/setRandomLevel', HttpMethod.POST);

    return data;
});

export const getQueueRecord = createApiThunk<QueueRecord, undefined>('queue/getQueueRecord', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueRecord>('queue/getQueueRecord');

    return data;
});

export const reloadQueueData = createApiThunk<unknown, undefined>('queue/reloadQueueData', async (_noInput, thunkApi) => {
    await thunkApi.dispatch(getCurrentQueueItems());
    await thunkApi.dispatch(getCurrentLevel());
    await thunkApi.dispatch(getQueueRecord());

    return;
});

const initialState: QueueState = {
    isLoading: false,
    currentQueue: undefined,
    currentLevel: undefined,
    currentQueueItems: [],
    queueRecord: undefined,
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
        })
        .addCase(setCurrentLevel.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(setCurrentLevel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentLevel = action.payload;
        })
        .addCase(setCurrentLevel.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(getCurrentLevel.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getCurrentLevel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentLevel = action.payload;
        })
        .addCase(getCurrentLevel.rejected, (state, action) => {
            state.isLoading = false;
            state.currentLevel = undefined;
        })
        .addCase(winCurrentLevel.pending, (state, action) =>  {
            state.isLoading = true;
        })
        .addCase(winCurrentLevel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentLevel = undefined;
        })
        .addCase(winCurrentLevel.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(loseCurrentLevel.pending, (state, action) =>  {
            state.isLoading = true;
        })
        .addCase(loseCurrentLevel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentLevel = undefined;
        })
        .addCase(loseCurrentLevel.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(setNextLevel.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(setNextLevel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentLevel = action.payload;
        })
        .addCase(setNextLevel.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(setRandomLevel.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(setRandomLevel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentLevel = action.payload;
        })
        .addCase(setRandomLevel.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(getQueueRecord.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getQueueRecord.fulfilled, (state, action) => {
            state.isLoading = false;
            state.queueRecord = action.payload;
        })
        .addCase(getQueueRecord.rejected, (state, action) => {
            state.isLoading = false;
            state.queueRecord = undefined;
        });
});