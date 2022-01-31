import { BotState } from '../../entities/botState';
import { Mm2LevelInfo } from '../../entities/mm2LevelInfo';
import { Mm2User } from '../../entities/mm2User';
import { Queue } from '../../entities/queue';
import { QueueItem } from '../../entities/queueItem';
import { QueueRecord } from '../../entities/queueRecord';

interface Mm2LevelInfoProps {
    isMakerCode: false;
    code: string;
    info: Mm2LevelInfo;
}

interface Mm2UserInfoProps {
    isMakerCode: true;
    code: string;
    info: Mm2User;
}

export type Mm2Info = Mm2LevelInfoProps | Mm2UserInfoProps;

export interface QueueState {
    isLoading: boolean;
    
    botState?: BotState;
    currentQueue?: Queue;
    currentLevel?: QueueItem;
    currentQueueItems?: Array<QueueItem>;
    queueRecord?: QueueRecord;

    isLoadingMm2Info: boolean;
    currentMm2Info?: Mm2Info;
}