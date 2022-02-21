import { Socket, io } from 'socket.io-client';

export enum SocketEvent {
    connect = 'connect',
    disconnect = 'disconnect',
    levelAdded = 'levelAdded',
    queueChanged = 'queueChanged',
    chatMessage = 'chatMessage',
    predictionStarted = 'predictionStarted',
    predictionEnded = 'predictionEnded',
}

export class AppSocket {
    private onChange: (isConnected: boolean) => void;
    private onEvent: (message: SocketEvent, ...args: Array<unknown>) => void;
    private socket: Socket | undefined;

    constructor(onChange: (isConnected: boolean) => void, onEvent: (event: SocketEvent, ...args: Array<unknown>) => void) {
        this.onChange = onChange;
        this.onEvent = onEvent;

    }

    public connect = (): void => {
        this.socket = io('http://localhost:1337', { 

            autoConnect: false,    
        });

        this.socket.on(SocketEvent.connect, this.onConnected);
        this.socket.on(SocketEvent.disconnect, this.onDisconnected);

        this.socket.onAny((eventName, ...args) => {
            this.onEvent(eventName, args);
        });

        // connect
        this.socket.connect();
    };

    public onConnected = (): void => {
        // this.socket?.on(SocketEvent.Message, this.onMessage);
        this.onChange(true);
    };

    public onDisconnected = (): void => {
        this.onChange(false);
    };

    public disconnect = (): void => {
        this.socket?.close();
    };

    // public sendMessage = (message: string): void => {
    //     if (typeof this.socket?.emit === 'function') {
    //         this.socket?.emit(SocketEvent.Message, message);
    //     } else {
    //         console.error('Cannot emit socket messages. Socket.io not connected');
    //     }
    // }
}