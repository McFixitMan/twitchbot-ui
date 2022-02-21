import { createAction, createReducer } from '@reduxjs/toolkit';

import { HttpMethod } from '../../types/httpMethod';
import { Prediction } from '../../entities/prediction';
import { PredictionState } from '../state/predictionState';
import { callApi } from '../../utility/api';
import { createApiThunk } from '../../types/thunk';

export const clearPrediction = createAction<void>('prediction/clearPrediction');

export const getActivePrediction = createApiThunk<Prediction, undefined>('prediction/getActivePrediction', async (_noInput, thunkApi) => {
    const { data } = await callApi<Prediction>('prediction/getActivePrediction');

    return data;
});

export const resolvePrediction = createApiThunk<void, 1 | 2>('prediction/resolvePrediction', async (outcome, thunkApi) => {
    await callApi('prediction/resolvePrediction', HttpMethod.POST, {
        outcome: outcome,
    });
});

export const cancelPrediction = createApiThunk<void, undefined>('prediction/cancelPrediction', async (_noInput, thunkApi) => {
    await callApi('prediction/cancelPrediction', HttpMethod.POST);
});

const initialState: PredictionState = {
    isLoading: false,
    currentPrediction: undefined,
};

export const predictionReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getActivePrediction.pending, (state, action) => {
            state.isLoading = true;
            state.currentPrediction = undefined;
        })
        .addCase(getActivePrediction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentPrediction = action.payload || undefined;
        })
        .addCase(getActivePrediction.rejected, (state, action) => {
            state.isLoading = false;
            state.currentPrediction = undefined;
        })
        .addCase(clearPrediction, (state, action) => {
            state.isLoading = false;
            state.currentPrediction = undefined;
        })
        .addCase(resolvePrediction.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(resolvePrediction.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        .addCase(resolvePrediction.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(cancelPrediction.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(cancelPrediction.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        .addCase(cancelPrediction.rejected, (state, action) => {
            state.isLoading = false;
        });

});