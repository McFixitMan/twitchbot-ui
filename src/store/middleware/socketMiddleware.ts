import { AnyAction, Middleware } from 'redux';
import { AppSocket, SocketEvent } from '../../utility/socket';
import { clearPrediction, getActivePrediction } from '../modules/predictionModule';
import { connectSocket, connectionChanged, disconnectSocket } from '../modules/socketModule';

import { AppDispatch } from '../../types/thunk';
import { ChatMessage } from '../../entities/chatMessage';
import { RootState } from '../reducers';
import { addChatMessage } from '../modules/chatModule';
import { reloadQueueData } from '../modules/queueModule';

export const socketMiddleware: Middleware<Record<string, unknown>, RootState, AppDispatch> = (store) => {
    const onConnectionChange = (isConnected: boolean): void => {
        store.dispatch(connectionChanged(isConnected));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onIncomingEvent = async (event: SocketEvent, ...args: Array<any>): Promise<void> => {
        for (const arg of args) {
            for (const a of arg) {
                handleDates(a);
            }
        }
        switch (event) {
            case SocketEvent.queueChanged: {
                await store.dispatch(reloadQueueData());
                break;
            }

            case SocketEvent.chatMessage: {
                const msg = args[0][0] as ChatMessage;

                if (!!msg?.username && !!msg?.message) {
                    store.dispatch(addChatMessage(msg));
                }
                
                break;
            }

            case SocketEvent.predictionStarted: {
                await store.dispatch(getActivePrediction());

                break;
            }

            case SocketEvent.predictionEnded: {
                store.dispatch(clearPrediction());
                
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


// https://stackoverflow.com/a/66238542
const isoDateFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

function isIsoDateString(value: string): boolean {
    return isoDateFormat.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleDates(body: Record<any, any>): unknown {
    if (body === null || body === undefined || typeof body !== 'object') {
        return body;
    }
        
    for (const key of Object.keys(body)) {
        const value = body[key];

        if (!!value && typeof value === 'string') {
            if (isIsoDateString(value)) {
                body[key] = new Date(value);
            }
            
        }

        else if (typeof value === 'object' && value !== null) {
            // Recurse to handle other nested objects with dates
            handleDates(value);
        }
    }
}