import { AnyAction, Middleware } from 'redux';
import { connectSocket, connectionChanged, disconnectSocket } from '../modules/socketModule';

import { AppDispatch } from '../../types/thunk';
import { AppSocket } from '../../utility/socket';
import { RootState } from '../reducers';

export const socketMiddleware: Middleware<Record<string, unknown>, RootState, AppDispatch> = (store) => {
    const onConnectionChange = (isConnected: boolean): void => {
        store.dispatch(connectionChanged(isConnected));
    };

    const onIncomingMessage = (message: string): void => {
        // bleh
    };

    const socket = new AppSocket(onConnectionChange, onIncomingMessage);

    return (next) => <A extends AnyAction>(action: A) => {
        // const token = store.getState().security.accessToken;
        const token = '';
        
        if (connectSocket.match(action)) {
            socket.connect(token ?? '');
        }

        if (disconnectSocket.match(action)) {
            socket.disconnect();
        }

        return next(action);
    };
};
