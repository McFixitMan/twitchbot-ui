import { createAction, createReducer } from '@reduxjs/toolkit';

import { LevelViewerState } from '../state/levelViewerState';

export const activateLevelViewer = createAction<string | undefined>('levelViewer/activateLevelViewer');
export const deactivateLevelViewer = createAction<void>('levelViewer/deactivateLevelViewer');

const initialState: LevelViewerState = {
    levelCode: undefined,
    isActive: false,
};

export const levelViewerReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(activateLevelViewer, (state, action) => {
            state.isActive = true;
            state.levelCode = action.payload;
        })
        .addCase(deactivateLevelViewer, (state, action) => {
            state.isActive = false;
            state.levelCode = undefined;
        });
});