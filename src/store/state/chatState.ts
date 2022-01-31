import { ChatMessage } from '../../entities/chatMessage';
import { Chatter } from '../../entities/chatter';

export interface ChatState {
    chatMessages: Array<ChatMessage>;
    usernameFilter?: string;
    chatters: Array<Chatter>;
    isLoadingChatters: boolean;
}