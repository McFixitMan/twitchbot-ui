import { BotState } from '../../entities/botState';
import { Queue } from '../../entities/queue';
import { QueueItem } from '../../entities/queueItem';
import { QueueRecord } from '../../entities/queueRecord';

export interface QueueState {
    isLoading: boolean;
    
    botState?: BotState;
    currentQueue?: Queue;
    currentLevel?: QueueItem;
    currentQueueItems?: Array<QueueItem>;
    queueRecord?: QueueRecord;
}