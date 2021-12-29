
export interface ChatMessage {
    badges: {
        isBroadcaster: boolean;
        isFounder: boolean;
        isMod: boolean;
        isSub: boolean;
        isVip: boolean;
        isBot: boolean;
    };
    userColor: string;
    username: string;
    message: string;
    sentAt: Date;
}