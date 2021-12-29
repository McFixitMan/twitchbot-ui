import { ChatMessage } from '../../entities/chatMessage';

export interface ChatState {
    chatMessages: Array<ChatMessage>;
}