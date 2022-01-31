import './currentQueue.less';

import * as React from 'react';

import { Avatar, Button, Card, Col, Divider, Row, Tooltip, message } from 'antd';
import { getCurrentQueueItems, setCurrentLevel } from '../../../store/modules/queueModule';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

import { RoleTag } from '../../roleTag';

export const CurrentQueue: React.FC = (props) => {
    const dispatch = useAppDispatch();

    const queueItems = useAppSelector((state) => state.queue.currentQueueItems);

    React.useEffect(() => {
        async function loadQueue(): Promise<void> {
            const action = await dispatch(getCurrentQueueItems());

            if (getCurrentQueueItems.rejected.match(action)) {
                // Rejected
                message.error(`Error loading queue items: ${action.payload?.response?.data.message}`);

                return;
            }
        }

        loadQueue();
    }, []);

    return (
        <Card
            bordered={true}
            className="current-queue"
            title="Current Queue"
        >
            {queueItems?.map((queueItem, index) => {
                return (
                    <Row
                        key={queueItem.id}
                        align="middle"
                        justify="space-between"
                    >
                        <Col
                            xxl={2}
                            xl={2}
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                        >
                            <Avatar className="avatar active" size="large">
                                {index + 1}
                            </Avatar>
                        </Col>

                        <Col
                            xxl={12}
                            xl={12}
                            lg={12}
                            md={12}
                            sm={24}
                            xs={24}
                        >
                            <Row
                                align="middle"
                                justify="center"
                            >
                                <Col span={24} className="username">
                                    {queueItem.username}
                                </Col>

                                <Col span={24} className="level-code">
                                    {queueItem.levelCode} 
                                </Col>

                                <Col style={{ margin: 5 }}>
                                    {queueItem.isSkip &&
                                        <RoleTag type="skipped" />
                                    }

                                    {queueItem.isMakerCode &&
                                        <RoleTag type="makercode" />
                                    }

                                    {queueItem.isVip &&
                                        <RoleTag type="vip" />
                                    }

                                    {queueItem.isSub &&
                                        <RoleTag type="sub" />
                                    }
                        
                                    {queueItem.isMod &&
                                        <RoleTag type="mod" />
                                    }
                                </Col>
                            </Row>
                        </Col>

                        <Col
                            xxl={10}
                            xl={10}
                            lg={10}
                            md={10}
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
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <Tooltip
                                        key={`${queueItem.id}-play`} 
                                        title={`Select ${queueItem.username}'s level to play now. If there is a level in progress, it will be returned to the queue in its original position`}
                                    >
                                        <Button 
                                            className="current-level-action"
                                            type="primary"
                                            onClick={async (e) => {
                                                const action = await dispatch(setCurrentLevel(queueItem.username));

                                                if (setCurrentLevel.rejected.match(action)) {
                                                    // rejected
                                                    message.error(`Error setting level: ${action.payload?.response?.data.message ?? action.error.message}`);
                                                } else {
                                                    message.success(`${queueItem.username}'s level has been selected`);
                                                }
                                            }}
                                        >
                                                Play Now
                                        </Button>
                                    </Tooltip>
                                </Col>

                                <Col 
                                    xxl={12}
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <Tooltip
                                        key={`${queueItem.id}-remove`}
                                        title={`Remove ${queueItem.username}'s level from the queue`}
                                    >
                                        <Button 
                                            className="current-level-action"
                                            type="primary" 
                                            danger={true}
                                        >
                                                Remove
                                        </Button>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Col>

                        <Divider />
                    </Row>
                );
            })}
            
        </Card>
    );
};