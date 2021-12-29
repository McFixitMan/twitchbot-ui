import * as React from 'react';

import { Avatar, Button, Card, Col, List, Row, Tag, Tooltip, message } from 'antd';
import { DollarCircleOutlined, FastForwardOutlined, HeartOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';
import { getCurrentQueueItems, setCurrentLevel } from '../../../store/modules/queueModule';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

export const CurrentQueue: React.FC = (props) => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state) => state.queue.isLoading);
    const queueItems = useAppSelector((state) => state.queue.currentQueueItems);

    React.useEffect(() => {
        async function loadQueue(): Promise<void> {
            const action = await dispatch(getCurrentQueueItems());

            if (getCurrentQueueItems.rejected.match(action)) {
                // Rejected
                message.error(`Error loading queue items: ${action.payload?.response?.data.message}`);

                return;
            } else if (getCurrentQueueItems.fulfilled.match(action)) {
                // Finished
                
            } 
        }

        loadQueue();
    }, []);

    return (
        <Card
            bordered={false}
            className="current-queue"
            title="Current Queue"
        >
            <Row
                align="middle"
                justify="start"
            >
                <Col span={24}>
                    <List
                        style={{ width: '100%' }}
                        loading={isLoading}
                        itemLayout="horizontal"
                        dataSource={queueItems}
                        size="small"
                        renderItem={(item, index) => (
                            <List.Item
                                key={item.username}     
                                style={{ width: '100%' }}                           
                                actions={[
                                    (
                                        <Tooltip
                                            key={`${item.id}-play`} 
                                            title={`Select ${item.username}'s level to play now. If there is a level in progress, it will be returned to the queue in its original position`}
                                        >
                                            <Button 
                                                className="current-level-action"
                                                type="primary"
                                                onClick={async (e) => {
                                                    const action = await dispatch(setCurrentLevel(item.username));

                                                    if (setCurrentLevel.rejected.match(action)) {
                                                    // rejected
                                                        message.error(`Error setting level: ${action.payload?.response?.data.message ?? action.error.message}`);
                                                    } else if (setCurrentLevel.fulfilled.match(action)) {
                                                    // huzzah
                                                        message.success(`${item.username}'s level has been selected`);
                                                    }
                                                }}
                                            >
                                                Play Now
                                            </Button>
                                        </Tooltip>
                                        
                                    ),
                                    (
                                        <Tooltip
                                            key={`${item.id}-remove`}
                                            title={`Remove ${item.username}'s level from the queue`}
                                        >
                                            <Button 
                                                className="current-level-action"
                                                type="primary" 
                                                danger={true}
                                            >
                                                Remove
                                            </Button>
                                        </Tooltip>
                                        
                                    ),
                                ]}
                            >
                                <List.Item.Meta
                                    title={<span className="username">{item.username}</span>}
                                    description={
                                        <Row
                                            align="middle"
                                            justify="center"
                                        >
                                            <Col span={24} className="level-code">
                                                {item.levelCode} 
                                            </Col>

                                            {(
                                                item.isSkip ||
                                                item.isMakerCode ||
                                                item.isVip ||
                                                item.isSub ||
                                                item.isMod
                                            ) &&
                                            <Col style={{ margin: 5 }}>
                                                {item.isSkip &&
                                                        <Tag color="magenta" className="tag"><FastForwardOutlined /> Skipped</Tag>
                                                }
                                                {item.isMakerCode &&
                                                        <Tag color="orange" className="tag"><UserOutlined /> MakerCode</Tag>
                                                }
                                                {item.isVip &&
                                                        <Tag color="red" className="tag"><HeartOutlined /> VIP</Tag>
                                                }
                                                {item.isSub &&
                                                        <Tag color="blue" className="tag"><DollarCircleOutlined /> Sub</Tag>
                                                }
                                                {item.isMod &&
                                                        <Tag color="green" className="tag"><ToolOutlined /> Mod </Tag>
                                                }
                                            </Col>
                                            }
                                        </Row>
                                    }
                                    avatar={<Avatar size="large" className="avatar">{index + 1}</Avatar>}
                                />
                            </List.Item>
                        
                        )}
                    />
                </Col>
            </Row>
        </Card>
    );
};