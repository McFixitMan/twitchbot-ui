import { LevelState } from './levelState';
import { Queue } from './queue';

export interface QueueItem {
    id: number;
    levelCode: string;
    username: string;
    isMod: boolean;
    isVip: boolean;
    isSub: boolean;
    isSkip: boolean;
    isMakerCode: boolean;
    createdAt: Date;
    queue?: Queue;
    levelState?: LevelState;
}