import { BotState } from '../../entities/botState';

export interface BotStateState {
    isLoading: boolean;
    botState?: BotState;
}