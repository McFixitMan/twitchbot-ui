import './currentLevel.less';

import * as React from 'react';

import { Avatar, Button, Card, Col, Empty, List, Popover, Row, Tag, Tooltip, message } from 'antd';
import { DollarCircleOutlined, FastForwardOutlined, FlagOutlined, HeartOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';
import { getBotState, loseCurrentLevel, reQueueCurrentLevel, removeCurrentLevel, unselectCurrentLevel, winCurrentLevel } from '../../../store/modules/queueModule';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

import { getDateDifferenceTimeString } from '../../../utility/dateHelper';

export const CurrentLevel: React.FC = (props) => {
    const dispatch = useAppDispatch();
    
    // const currentLevel = useAppSelector((state) => state.queue.currentLevel);
    const botState = useAppSelector((state) => state.queue.botState);

    const [timeOnLevel, setTimeOnLevel] = React.useState('');

    React.useEffect(() => {
        async function loadBotState(): Promise<void> {
            const action = await dispatch(getBotState());

            if (getBotState.rejected.match(action)) {
                message.error(`Error loading current level: ${action.payload?.response?.data.message}`);
            } 
        }

        loadBotState();

    }, []);

    React.useEffect(() => {
        const timer = setInterval(() => {
            if (!!botState && !!botState.startedAt) {
                setTimeOnLevel(getDateDifferenceTimeString(botState.startedAt, new Date()));
            } else {
                setTimeOnLevel('');
            }
        }, 1000);

        return () => {
            setTimeOnLevel('');
            clearInterval(timer);
        };
    }, [botState]);

    return (
        <Card 
            title="Current Level"
            className="current-level"
        >
            <Row
                align="middle"
                justify="start"
            >
                {!!botState?.activeQueueItem
                    ?
                    <Col span={24}>
                        <List.Item      
                            style={{ width: '100%' }}      
                                                 
                            actions={[
                                (
                                    <Tooltip
                                        key={`${botState.activeQueueItem?.id}-win`} 
                                        title="Set the current level as a win"
                                    >
                                        <Button 
                                            className="current-level-action"
                                            
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
                                            Win
                                        </Button>
                                    </Tooltip>
                                    
                                ),
                                (
                                    <Tooltip
                                        key={`${botState.activeQueueItem?.id}-lose`} 
                                        title="Set the current level as a loss"
                                    >
                                        <Button 
                                            className="current-level-action"
                                        
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
                                            Lose
                                        </Button>
                                    </Tooltip>
                                ),
                                (
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
                                            className="current-level-action"
                                            danger={true}
                                        >
                                            Remove...
                                        </Button>
                                    </Popover>
                                    
                                ),

                            ]}
                        >
                            <List.Item.Meta
                                title={<span className="username">{botState.activeQueueItem?.username}</span>}
                                description={
                                    <Row
                                        align="middle"
                                        justify="center"
                                    >
                                        <Col span={24} className="level-code">
                                            {botState.activeQueueItem?.levelCode} 
                                        </Col>
                                        <Col style={{ margin: 5 }}>
                                            {botState.activeQueueItem?.isSkip &&
                                                <Tag color="magenta" className="tag"><FastForwardOutlined /> Skipped</Tag>
                                            }
                                            {botState.activeQueueItem?.isMakerCode &&
                                                <Tag color="orange" className="tag"><UserOutlined /> MakerCode</Tag>
                                            }
                                            {botState.activeQueueItem?.isVip &&
                                                <Tag color="red" className="tag"><HeartOutlined /> VIP</Tag>
                                            }
                                            {botState.activeQueueItem?.isSub &&
                                                <Tag color="blue" className="tag"><DollarCircleOutlined /> Sub</Tag>
                                            }
                                            {botState.activeQueueItem?.isMod &&
                                                <Tag color="green" className="tag"><ToolOutlined /> Mod </Tag>
                                            }
                                        </Col>
                                        
                                        <Col span={24} style={{ textAlign: 'center' }}>
                                            {timeOnLevel}&nbsp;
                                        </Col>
                                    </Row>
                                }
                                avatar={<Avatar className="avatar active" size="large"><FlagOutlined /></Avatar>}
                            />
                        </List.Item>
                    </Col>
                    :
                    <Col span={24}>
                        <Empty 
                            image={Empty.PRESENTED_IMAGE_SIMPLE} 
                            description="There is no current level" 
                        />
                    </Col>
                }
            </Row>
        </Card>
    );  
};