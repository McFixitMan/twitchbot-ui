import { Socket } from 'socket.io-client';

// import { SocketEvent } from '../types/socket';

// import { SocketEvent } from 'freedom-pas.shared/enums/socketEvent';
// import { config } from '../config';

export class AppSocket {
    private onChange: (isConnected: boolean) => void;
    private onMessage: (message: string) => void;
    private socket: Socket | undefined;

    constructor(onChange: (isConnected: boolean) => void, onMessage: (message: string) => void) {
        this.onChange = onChange;
        this.onMessage = onMessage;

    }

    public connect = (token: string): void => {
        // this.socket = io(config.socketIoUrl, { 
        //     auth: {
        //         token: token ?? '',
        //     },  
        //     autoConnect: false,    
        // });
        // this.socket = io('localhost', { 
        //     auth: {
        //         token: token ?? '',
        //     },  
        //     autoConnect: false,    
        // });

        // this.socket.on(SocketEvent.Connect, this.onConnected);
        // this.socket.on(SocketEvent.Disconnect, this.onDisconnected);

        // connect
        // this.socket.connect();
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