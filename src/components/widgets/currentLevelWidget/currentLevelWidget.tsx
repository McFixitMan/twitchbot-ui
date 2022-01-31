import './currentLevelWidget.less';

import * as React from 'react';

import { Col, Row, Spin, Statistic, message } from 'antd';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';
import { getBotState, getMm2LevelInfoByCode, getMm2UserInfoByCode } from '../../../store/modules/queueModule';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

import { getApiErrorMessage } from '../../../utility/api';
import { getDateDifferenceTimeString } from '../../../utility/dateHelper';

export const CurrentLevelWidget: React.FC = (props) => {
    const dispatch = useAppDispatch();
    
    const botState = useAppSelector((state) => state.queue.botState);
    const currentMm2Info = useAppSelector((state) => state.queue.currentMm2Info);

    const [lastMm2LevelInfoCode, setLastMm2LevelInfoCode] = React.useState('');
    const [timeOnLevel, setTimeOnLevel] = React.useState('');

    const loadBotState = async (): Promise<void> => {
        const action = await dispatch(getBotState());

        if (getBotState.rejected.match(action)) {
            message.error(`Error loading current level: ${getApiErrorMessage(action.payload)}`);
        }
    };

    const loadMm2LevelInfo = async (code: string, isMakerCode: boolean): Promise<void> => {
        if (isMakerCode) {
            const action = await dispatch(getMm2UserInfoByCode(code));

            if (getMm2UserInfoByCode.rejected.match(action)) {
                message.error(`Error loading mm2User: ${getApiErrorMessage(action.payload)}`);
            }
        } else {
            const action = await dispatch(getMm2LevelInfoByCode(code));

            if (getMm2LevelInfoByCode.rejected.match(action)) {
                message.error(`Error loading mm2LevelInfo: ${getApiErrorMessage(action.payload)}`);
            }
        }
        
    };

    React.useEffect(() => {
        loadBotState();
    }, []);

    React.useEffect(() => {
        if (!!botState?.activeQueueItem && botState.activeQueueItem.levelCode !== lastMm2LevelInfoCode) {
            loadMm2LevelInfo(botState.activeQueueItem.levelCode, botState.activeQueueItem.isMakerCode);

            setLastMm2LevelInfoCode(botState.activeQueueItem.levelCode);
        }

        const timer = setInterval(() => {
            if (!!botState && !!botState.startedAt) {
                setTimeOnLevel(getDateDifferenceTimeString(botState.startedAt, new Date()));
            } else {
                setTimeOnLevel('');
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [botState, lastMm2LevelInfoCode]);

    if (!botState?.activeQueueItem) {
        return <></>;
    }

    return (
        <Row
            align="middle"
            justify="space-between"
            className="current-level-widget"
        >
            <Col span={18}>
                <Row
                    align="middle"
                    justify="space-between"
                    gutter={15}
                >
                    <Col className="level-info-container">
                        <span className="level-code">{botState.activeQueueItem.levelCode}</span>
                    </Col>
                    
                    {!!currentMm2Info 
                        ?
                        <Col className="level-info-container">
                            {currentMm2Info.isMakerCode
                                ?
                                <>
                                    {currentMm2Info.info.name} (Maker Code)
                                </>
                                :
                                <>
                                    "<span className="level-name">{currentMm2Info.info.name}</span>" by {currentMm2Info.info.uploader.name} ({currentMm2Info.info.clear_rate})
                                </>
                            }
                        </Col>
                        :
                        <Col className="level-info-container">
                            <Spin size="large" />
                        </Col>
                    }

                    {!!currentMm2Info && currentMm2Info.isMakerCode === false
                        ?
                        <Col>
                            <Row gutter={30}>
                                <Col>
                                    <Statistic 
                                        className="feedback"
                                        value={currentMm2Info.info.likes} 
                                        prefix={<LikeFilled />} 
                                    />
                                </Col>

                                <Col>
                                    <Statistic
                                        className="feedback"
                                        value={currentMm2Info.info.boos}
                                        prefix={<DislikeFilled />}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        :
                        <Col className="level-info-container">
                            <Spin size="large" />
                        </Col>
                    }
                </Row>
            </Col>

            <Col className="time-on-level">
                {timeOnLevel}
            </Col>
        </Row>
    );
};