import { QueueItem } from './queueItem';
import { QueueState } from './queueState';

export interface Queue {
    id: number;
    title: string;
    description?: string;
    createdAt: Date;
    queueItems?: Array<QueueItem>;
    queueState?: QueueState;
}