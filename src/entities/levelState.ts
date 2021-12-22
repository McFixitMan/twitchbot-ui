import { QueueItem } from './queueItem';

export interface LevelState {
    id: number;
    code: string;
    label: string;
    queueItems?: Array<QueueItem>;
}