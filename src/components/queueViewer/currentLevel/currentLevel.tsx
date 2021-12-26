import * as React from 'react';

import { Avatar, Button, Card, Col, Empty, List, Row, Tag, message } from 'antd';
import { DollarCircleOutlined, FastForwardOutlined, FlagOutlined, HeartOutlined, ToolOutlined, UserOutlined } from '@ant-design/icons';
import { getCurrentLevel, loseCurrentLevel, winCurrentLevel } from '../../../store/modules/queueModule';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

export const CurrentLevel: React.FC = (props) => {
    const dispatch = useAppDispatch();
    
    const currentLevel = useAppSelector((state) => state.queue.currentLevel);

    React.useEffect(() => {
        async function loadCurrentLevel(): Promise<void> {
            const action = await dispatch(getCurrentLevel());

            if (getCurrentLevel.rejected.match(action)) {
                // Rejected
                message.error(`Error loading current level: ${action.payload?.response?.data.message}`);

                return;
            } else if (getCurrentLevel.fulfilled.match(action)) {
                // Finished
            } 
        }

        loadCurrentLevel();
    }, []);

    return (
        <Card 
            style={{ margin: 10 }} 
            bordered={true}
            className="current-level"
        >
            <Row
                align="middle"
                justify="start"
            >
                <Col span={24} style={{ textAlign: 'left' }}>
                    <span className="panel-title">Current Level</span>
                </Col>
                {!!currentLevel
                    ?
                    <Col span={24}>
                        <List.Item      
                            style={{ width: '100%' }}                           
                            actions={[
                                (
                                    <Button 
                                        className="current-level-action"
                                        key={`${currentLevel.id}-play`} 
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
                                ),
                                (
                                    <Button 
                                        className="current-level-action"
                                        key={`${currentLevel.id}-remove`} 
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
                                ),
                            ]}
                        >
                            <List.Item.Meta
                                title={<span className="username">{currentLevel.username}</span>}
                                description={
                                    <Row
                                        align="middle"
                                        justify="center"
                                    >
                                        <Col span={24} className="level-code">
                                            {currentLevel.levelCode} 
                                        </Col>
                                        <Col style={{ margin: 5 }}>
                                            {currentLevel.isSkip &&
                                                <Tag color="magenta" className="tag"><FastForwardOutlined /> Skipped</Tag>
                                            }
                                            {currentLevel.isMakerCode &&
                                                <Tag color="orange" className="tag"><UserOutlined /> MakerCode</Tag>
                                            }
                                            {currentLevel.isVip &&
                                                <Tag color="red" className="tag"><HeartOutlined /> VIP</Tag>
                                            }
                                            {currentLevel.isSub &&
                                                <Tag color="blue" className="tag"><DollarCircleOutlined /> Sub</Tag>
                                            }
                                            {currentLevel.isMod &&
                                                <Tag color="green" className="tag"><ToolOutlined /> Mod </Tag>
                                            }
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