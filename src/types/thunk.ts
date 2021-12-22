import { AsyncThunk, AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AnyAction } from 'redux';
import { ApiError } from '../utility/api';
import { AxiosError } from 'axios';
// import { ApiResult } from 'freedom-pas.shared/models/payloads/apiResult';
import { RootState } from '../store/reducers';

export interface ThunkAPIConfig {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: AxiosError<ApiError>;
}

export const createApiThunk = <Returned, ThunkArg = unknown, >(
    type: string,
    thunk: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkAPIConfig>,    // <-- very unsure of this - have tried many things here
): AsyncThunk<Returned, ThunkArg, ThunkAPIConfig> => {
    return createAsyncThunk<Returned, ThunkArg, ThunkAPIConfig>(
        type,
        async (arg, thunkAPI) => {
            try {
                // do some stuff here that happens on every action
                return await thunk(arg, thunkAPI);
            } catch (err) {
                // do some stuff here that happens on every error
                return thunkAPI.rejectWithValue(err as AxiosError<ApiError>);
            }
        },
    );
};

export type AppThunkAction<R> = ThunkAction<R, RootState, undefined, AnyAction>;

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;