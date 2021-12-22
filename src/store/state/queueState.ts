import { Queue } from '../../entities/queue';
import { QueueItem } from '../../entities/queueItem';

export interface QueueState {
    isLoading: boolean;
    
    currentQueue?: Queue;
    currentQueueItems?: Array<QueueItem>;
}