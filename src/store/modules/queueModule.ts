import { BotState } from '../../entities/botState';
import { HttpMethod } from '../../types/httpMethod';
import { Mm2LevelInfo } from '../../entities/mm2LevelInfo';
import { Mm2User } from '../../entities/mm2User';
import { Queue } from '../../entities/queue';
import { QueueItem } from '../../entities/queueItem';
import { QueueRecord } from '../../entities/queueRecord';
import { QueueState } from '../state/queueState';
import { callApi } from '../../utility/api';
import { createApiThunk } from '../../types/thunk';
import { createReducer } from '@reduxjs/toolkit';

export const getCurrentQueue = createApiThunk<Queue, undefined>('queue/getCurrentQueue', async (_noInput, thunkApi) => {
    const { data } = await callApi<Queue>('queue/getCurrentQueue');

    return data;
});

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

export const setWeightedRandomLevel = createApiThunk<QueueItem, undefined>('queue/setWeightedRandomLevel', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/setWeightedRandomLevel', HttpMethod.POST);

    return data;
});

export const setSubNextLevel = createApiThunk<QueueItem, undefined>('queue/setSubNextLevel', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/setSubNextLevel', HttpMethod.POST);

    return data;
});

export const setSubRandomLevel = createApiThunk<QueueItem, undefined>('queue/setSubRandomLevel', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/setSubRandomLevel', HttpMethod.POST);

    return data;
});

export const getQueueRecord = createApiThunk<QueueRecord, undefined>('queue/getQueueRecord', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueRecord>('queue/getQueueRecord');

    return data;
});

export const getBotState = createApiThunk<BotState, undefined>('queue/getBotState', async (_noInput, thunkApi) => {
    const { data } = await callApi<BotState>('queue/getBotState');

    return data;
});

export const removeCurrentLevel = createApiThunk<QueueItem, undefined>('queue/removeCurrentLevel', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/removeCurrentLevel', HttpMethod.POST);

    return data;
});

export const unselectCurrentLevel = createApiThunk<QueueItem, undefined>('queue/unselectCurrentLevel', async(_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/unselectCurrentLevel', HttpMethod.POST);

    return data;
});

export const reQueueCurrentLevel = createApiThunk<QueueItem, undefined>('queue/reQueueCurrentLevel', async (_noInput, thunkApi) => {
    const { data } = await callApi<QueueItem>('queue/reQueueCurrentLevel', HttpMethod.POST);

    return data;
});

export const getQueueState = createApiThunk<string, undefined>('queue/getQueueState', async (_noInput, thunkApi) => {
    const { data } = await callApi<string>('queue/getQueueState');

    return data;
});

export const openQueue = createApiThunk<void, undefined>('queue/openQueue', async (_noInput, thunkApi) => {
    await callApi('queue/openQueue', HttpMethod.POST);
});

export const closeQueue = createApiThunk<void, undefined>('queue/closeQueue', async (_noInput, thunkApi) => {
    await callApi('queue/closeQueue', HttpMethod.POST);
});

export const createQueue = createApiThunk<Queue, undefined>('queue/createQueue', async (_noInput, thunkApi) => {
    const { data } = await callApi<Queue>('queue/createQueue', HttpMethod.POST);

    return data;
});

export const loadLastQueue = createApiThunk<Queue | undefined, undefined>('queue/loadLastQueue', async (_noInput, thunkApi) => {
    const { data } = await callApi<Queue | undefined>('queue/loadLastQueue', HttpMethod.POST);

    return data;
});

export const getMm2LevelInfoByCode = createApiThunk<Mm2LevelInfo, string>('queue/getMm2LevelInfoByCode', async (levelCode, thunkApi) => {
    const { data } = await callApi<Mm2LevelInfo>(`queue/getMm2LevelInfoByCode/${levelCode}`);

    return data;
});

export const getMm2UserInfoByCode = createApiThunk<Mm2User, string>('queue/getMm2UserInfoByCode', async (levelCode, thunkApi) => {
    const { data } = await callApi<Mm2User>(`queue/getMm2UserInfoByCode/${levelCode}`);

    return data;
});

export const reloadQueueData = createApiThunk<unknown, undefined>('queue/reloadQueueData', async (_noInput, thunkApi) => {
    await thunkApi.dispatch(getCurrentQueue());
    await thunkApi.dispatch(getCurrentQueueItems());
    await thunkApi.dispatch(getQueueRecord());
    await thunkApi.dispatch(getBotState());

    return;
});

const initialState: QueueState = {
    botState: undefined,
    currentMm2Info: undefined,
    currentLevel: undefined,
    currentQueue: undefined,
    currentQueueItems: [],
    isLoading: false,
    isLoadingMm2Info: false,
    queueRecord: undefined,
};

export const queueReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getCurrentQueue.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getCurrentQueue.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentQueue = action.payload;
        })
        .addCase(getCurrentQueue.rejected, (state, action) => {
            state.isLoading = false;
            state.currentQueue = undefined;
        })
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
        .addCase(setWeightedRandomLevel.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(setWeightedRandomLevel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentLevel = action.payload;
        })
        .addCase(setWeightedRandomLevel.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(setSubNextLevel.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(setSubNextLevel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentLevel = action.payload;
        })
        .addCase(setSubNextLevel.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(setSubRandomLevel.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(setSubRandomLevel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentLevel = action.payload;
        })
        .addCase(setSubRandomLevel.rejected, (state, action) => {
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
        })
        .addCase(getBotState.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBotState.fulfilled, (state, action) => {
            state.isLoading = false;
            state.botState = action.payload;
        })
        .addCase(getBotState.rejected, (state) => {
            state.isLoading = false;
            state.botState = undefined;
        })
        .addCase(removeCurrentLevel.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(removeCurrentLevel.fulfilled, (state) => {
            state.isLoading = false;
            state.currentLevel = undefined;
        })
        .addCase(removeCurrentLevel.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(unselectCurrentLevel.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(unselectCurrentLevel.fulfilled, (state) => {
            state.isLoading = false;
            state.currentLevel = undefined;
        })
        .addCase(unselectCurrentLevel.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(reQueueCurrentLevel.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(reQueueCurrentLevel.fulfilled, (state) => {
            state.isLoading = false;
            state.currentLevel = undefined;
        })
        .addCase(reQueueCurrentLevel.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(createQueue.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(createQueue.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentQueue = action.payload;
        })
        .addCase(createQueue.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(loadLastQueue.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loadLastQueue.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentQueue = action.payload;
        })
        .addCase(loadLastQueue.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(getMm2LevelInfoByCode.pending, (state, action) => {
            state.isLoadingMm2Info = true;
            state.currentMm2Info = undefined;
        })
        .addCase(getMm2LevelInfoByCode.fulfilled, (state, action) => {
            state.isLoadingMm2Info = false;

            state.currentMm2Info = {
                isMakerCode: false,
                code: action.meta.arg,
                info: action.payload,
            };
        })
        .addCase(getMm2LevelInfoByCode.rejected, (state, action) => {
            state.isLoadingMm2Info = false;
            state.currentMm2Info = undefined;
        })
        .addCase(getMm2UserInfoByCode.pending, (state, action) => {
            state.isLoadingMm2Info = true;
            state.currentMm2Info = undefined;
        })
        .addCase(getMm2UserInfoByCode.fulfilled, (state, action) => {
            state.isLoadingMm2Info = false;

            state.currentMm2Info = {
                isMakerCode: true,
                code: action.meta.arg,
                info: action.payload,
            };
        })
        .addCase(getMm2UserInfoByCode.rejected, (state, action) => {
            state.isLoadingMm2Info = false;
            state.currentMm2Info = undefined;
        });
});