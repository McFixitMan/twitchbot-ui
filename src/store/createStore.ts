import { AnyAction, Store, applyMiddleware, compose, createStore } from '@reduxjs/toolkit';
import { RootState, makeRootReducer } from './reducers';

import { AppDispatch } from '../types/thunk';
import { socketMiddleware } from './middleware/socketMiddleware';
import thunk from 'redux-thunk';

export function configureStore(initialState?: RootState): Store<RootState, AnyAction> & { dispatch: AppDispatch } {
    const composeEnhancers: <R>(a: R) => R = process.env.NODE_ENV === 'development' ? ((window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose) : compose;

    const store = createStore(makeRootReducer, initialState, composeEnhancers(applyMiddleware<AppDispatch, RootState>(thunk, socketMiddleware)));

    return store;
}