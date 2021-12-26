import { AnyAction, Middleware } from 'redux';
import { AppSocket, SocketEvent } from '../../utility/socket';
import { connectSocket, connectionChanged, disconnectSocket } from '../modules/socketModule';

import { AppDispatch } from '../../types/thunk';
import { RootState } from '../reducers';
import { reloadQueueData } from '../modules/queueModule';

export const socketMiddleware: Middleware<Record<string, unknown>, RootState, AppDispatch> = (store) => {
    const onConnectionChange = (isConnected: boolean): void => {
        store.dispatch(connectionChanged(isConnected));
    };

    const onIncomingEvent = (event: SocketEvent, ...args: Array<unknown>): void => {
        switch (event) {
            case SocketEvent.queueChanged: {
                store.dispatch(reloadQueueData());
                break;
            }

            default: {
                break;
            }
        }
    };

    const socket = new AppSocket(onConnectionChange, onIncomingEvent);

    return (next) => <A extends AnyAction>(action: A) => {
        if (connectSocket.match(action)) {
            socket.connect();
        }

        if (disconnectSocket.match(action)) {
            socket.disconnect();
        }

        return next(action);
    };
};
