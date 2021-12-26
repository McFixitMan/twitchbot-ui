import { Queue } from '../../entities/queue';
import { QueueItem } from '../../entities/queueItem';
import { QueueRecord } from '../../entities/queueRecord';

export interface QueueState {
    isLoading: boolean;
    
    currentQueue?: Queue;
    currentLevel?: QueueItem;
    currentQueueItems?: Array<QueueItem>;
    queueRecord?: QueueRecord;
}