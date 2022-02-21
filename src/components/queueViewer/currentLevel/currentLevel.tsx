import './currentLevel.less';

import * as React from 'react';

import { Avatar, Button, Card, Col, Empty, Popover, Row, Spin, Tooltip, message } from 'antd';
import { DeleteOutlined, FlagOutlined, FrownOutlined } from '@ant-design/icons';
import { getBotState, getMm2LevelInfoByCode, getMm2UserInfoByCode, loseCurrentLevel, reQueueCurrentLevel, removeCurrentLevel, unselectCurrentLevel, winCurrentLevel } from '../../../store/modules/queueModule';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

import { Mm2ItemInfo } from '../mm2Info';
import { RoleTag } from '../../roleTag';
import { activateLevelViewer } from '../../../store/modules/levelViewerModule';
import { getApiErrorMessage } from '../../../utility/api';
import { getDateDifferenceTimeString } from '../../../utility/dateHelper';

export const CurrentLevel: React.FC = (props) => {
    const dispatch = useAppDispatch();
    
    const botState = useAppSelector((state) => state.queue.botState);
    const currentMm2Info = useAppSelector((state) => state.queue.currentMm2Info);
    const isLoadingMm2Info = useAppSelector((state) => state.queue.isLoadingMm2Info);

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
        return (
            <Card
                title="Current Level"
                bordered={true}
                className="current-level"
            >
                <Row
                    align="middle"
                    justify="center"
                >
                    <Col span={24}>
                        <Empty 
                            image={Empty.PRESENTED_IMAGE_SIMPLE} 
                            description="There is no current level" 
                        />
                    </Col>
                </Row>
            </Card>
            
        );
    }

    return (
        <Card
            title="Current Level"
            bordered={true}
            className="current-level"
        >
            <Row
                align="middle"
                justify="center"
            >
                <Col
                    xxl={2}
                    xl={2}
                    lg={2}
                    md={2}
                    sm={0}
                    xs={0}
                >
                    <Avatar className="avatar active" size="large">
                        <FlagOutlined />
                    </Avatar>
                </Col>

                <Col 
                    xxl={4}
                    xl={4}
                    lg={4}
                    md={22}
                    sm={24}
                    xs={24}
                    className="time-on-level"
                >
                    {timeOnLevel}&nbsp;
                </Col>       

                <Col
                    xxl={6}
                    xl={6}
                    lg={6}
                    md={12}
                    sm={24}
                    xs={24}
                >
                    <Row
                        align="middle"
                        justify="center"
                    >
                        <Col span={24} className="username">
                            {botState?.activeQueueItem?.username}
                        </Col>

                        <Col span={24} className="level-code">
                            {botState?.activeQueueItem?.levelCode} 
                        </Col>

                        <Col style={{ margin: 5 }}>
                            {botState?.activeQueueItem?.isSkip &&
                            <RoleTag type="skipped" />
                            }

                            {botState?.activeQueueItem?.isMakerCode &&
                            <RoleTag type="makercode" />
                            }

                            {botState?.activeQueueItem?.isVip &&
                            <RoleTag type="vip" />
                            }

                            {botState?.activeQueueItem?.isSub &&
                            <RoleTag type="sub" />
                            }
                        
                            {botState?.activeQueueItem?.isMod &&
                            <RoleTag type="mod" />
                            }
                        </Col>
                    </Row>
                </Col>

                <Col 
                    xxl={6}
                    xl={6}
                    lg={6}
                    md={12}
                    sm={24}
                    xs={24}
                >
                    {!!currentMm2Info && !!currentMm2Info.info
                        ?
                        <Mm2ItemInfo mm2Info={currentMm2Info} />
                        :
                        isLoadingMm2Info
                            ?
                            <Spin />
                            :
                            <Empty description="Level info not found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                
                </Col>

                <Col
                    xxl={6}
                    xl={6}
                    lg={6}
                    md={24}
                    sm={24}
                    xs={24}
                >
                    <Row
                        gutter={5}
                        align="middle"
                        justify="center"
                        style={{ margin: 10 }}
                    >
                        <Col 
                            xxl={8}
                            xl={24}
                            lg={24}
                            md={8}
                            sm={8}
                            xs={8}
                        >
                            <Tooltip
                                key={`${botState.activeQueueItem?.id}-win`} 
                                title="Set the current level as a win"
                            >
                                <Button 
                                    className="current-level-action"
                                    size="large"
                                    type="primary"
                                    onClick={async (e) => {
                                        const action = await dispatch(winCurrentLevel());

                                        if (winCurrentLevel.rejected.match(action)) {
                                            message.error(`Error completing level: ${action.payload?.response?.data.message ?? action.error.message}`);
                                        } else if (winCurrentLevel.fulfilled.match(action)) {
                                            message.success('Set level as won');
                                        }
                                    }}
                                >
                                    <FlagOutlined /> <span className="current-level-action-text">Win</span>
                                </Button>
                            </Tooltip>
                        </Col>

                        <Col 
                            xxl={8}
                            xl={24}
                            lg={24}
                            md={8}
                            sm={8}
                            xs={8}
                        >
                            <Tooltip
                                key={`${botState.activeQueueItem?.id}-lose`} 
                                title="Set the current level as a loss"
                            >
                                <Button 
                                    className="current-level-action"
                                    size="large"
                                    type="primary" 
                                    danger={true}
                                    onClick={async (e) => {
                                        const action = await dispatch(loseCurrentLevel());

                                        if (loseCurrentLevel.rejected.match(action)) {
                                            message.error(`Error completing level: ${action.payload?.response?.data.message ?? action.error.message}`);
                                        } else if (loseCurrentLevel.fulfilled.match(action)) {
                                            message.success('Set level as loss');
                                        }
                                    }}
                                >
                                    <FrownOutlined /> <span className="current-level-action-text">Lose</span>
                                </Button>
                            </Tooltip>
                        </Col>

                        <Col 
                            xxl={8}
                            xl={24}
                            lg={24}
                            md={8}
                            sm={8}
                            xs={8}
                        >
                            <Popover
                                key={`${botState.activeQueueItem.id}-other-actions`}
                                content={
                                    <Row gutter={10}>
                                        <Col>
                                            <Tooltip
                                                title="Remove the current level and return it to its original queue position"
                                            >
                                                <Button 
                                                    className="current-level-action"
                                                    type="ghost"
                                                    size="large"
                                                    key={`${botState.activeQueueItem?.id}-unselect`} 
                                                    onClick={async (e) => {
                                                        const action = await dispatch(unselectCurrentLevel());

                                                        if (unselectCurrentLevel.rejected.match(action)) {
                                                            message.error(`Error unselecting level: ${action.payload?.response?.data.message ?? action.error.message}`);
                                                        } else if (unselectCurrentLevel.fulfilled.match(action)) {
                                                            message.success('Unselected the current level');
                                                        }
                                                    }}
                                                >
                                                            Unselect
                                                </Button>
                                            </Tooltip>
                                                    
                                        </Col>
                                        <Col>
                                            <Tooltip
                                                title="Remove the current level and move it to the back of the queue"
                                            >
                                                <Button 
                                                    className="current-level-action"
                                                    key={`${botState.activeQueueItem?.id}-requeue`} 
                                                    size="large"
                                                    onClick={async (e) => {
                                                        const action = await dispatch(reQueueCurrentLevel());

                                                        if (reQueueCurrentLevel.rejected.match(action)) {
                                                            message.error(`Error removing level: ${action.payload?.response?.data.message ?? action.error.message}`);
                                                        } else if (reQueueCurrentLevel.fulfilled.match(action)) {
                                                            message.success('Re-Queued the current level');
                                                        }
                                                    }}
                                                >
                                                            Re-Queue
                                                </Button>
                                            </Tooltip>
                                                    
                                        </Col>

                                        <Col>
                                            <Tooltip
                                                title="Remove the current level from the queue entirely"
                                            >
                                                <Button 
                                                    className="current-level-action"
                                                    key={`${botState.activeQueueItem?.id}-remove`} 
                                                    size="large"
                                                    danger={true}
                                                    onClick={async (e) => {
                                                        const action = await dispatch(removeCurrentLevel());

                                                        if (removeCurrentLevel.rejected.match(action)) {
                                                            message.error(`Error removing level: ${action.payload?.response?.data.message ?? action.error.message}`);
                                                        } else if (removeCurrentLevel.fulfilled.match(action)) {
                                                            message.success('Removed the current level');
                                                        }
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </Tooltip>
                                                    
                                        </Col>
                                    </Row>
                                }
                            >
                                <Button
                                    type="dashed"
                                    size="large"
                                    className="current-level-action"
                                    danger={true}
                                >
                                    <DeleteOutlined /> <span className="current-level-action-text">Remove</span>
                                </Button>
                            </Popover>
                        </Col>

                        <Col span={24}>
                            <Tooltip
                                title={`View the level in course viewer`}
                            >
                                <Button
                                    className="current-level-action view-level"
                                    type="primary"
                                    size="large"
                                    onClick={() => dispatch(activateLevelViewer(botState.activeQueueItem?.levelCode))}
                                >
                                            View Level
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
        
    );
};