import * as React from 'react';

import { LevelInfo } from './levelInfo';
import { Mm2Info } from '../../../store/state/queueState';
import { UserInfo } from './userInfo';

interface Mm2ItemInfoProps {
    mm2Info: Mm2Info;
}

export const Mm2ItemInfo: React.FC<Mm2ItemInfoProps> = (props) => {
    const isMakerCode = props.mm2Info.isMakerCode;

    if (isMakerCode === true) {
        return (
            <UserInfo mm2User={props.mm2Info.info} />
        );
    }

    if (isMakerCode === false) {
        return (
            <LevelInfo mm2LevelInfo={props.mm2Info.info} />
        );
    } 


    return <></>;
};