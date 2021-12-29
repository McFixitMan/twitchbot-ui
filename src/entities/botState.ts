import { Queue } from './queue';
import { QueueItem } from './queueItem';

export interface BotState {
    id: number;
    activeQueue?: Queue;
    activeQueueItem?: QueueItem;
    lastCommand?: string;
    startedAt?: Date;
}