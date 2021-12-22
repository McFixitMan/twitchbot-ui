import { Queue } from './queue';

export interface QueueState {
    id: number;
    code: string;
    label: string;
    queues?: Array<Queue>
}