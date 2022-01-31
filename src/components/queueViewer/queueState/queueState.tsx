import './queueState.less';

import * as React from 'react';

import { Col, Row, Switch, Tooltip, message } from 'antd';
import { closeQueue, getCurrentQueue, openQueue } from '../../../store/modules/queueModule';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

export const QueueState: React.FC = (props) => {
    const dispatch = useAppDispatch();

    const currentQueue = useAppSelector((state) => state.queue.currentQueue);
    const isLoading = useAppSelector((state) => state.queue.isLoading);

    React.useEffect(() => {
        const loadCurrentQueue = async (): Promise<void> => {
            const action = await dispatch(getCurrentQueue());

            if (getCurrentQueue.rejected.match(action)) {
                message.error(`Error getting current queue: ${action.payload?.response?.data.message ?? action.error.message}`);
            }
        };

        loadCurrentQueue();
    }, []);

    return (
        <Row
            align="middle"
            justify="center"
            style={{ margin: 20 }}
            className={`queue-state`}
        >

            <Col>
                <Row
                    align="middle"
                    justify="center"
                    gutter={15}
                    style={{ transform: 'scale(2, 2)', textTransform: 'uppercase', fontWeight: 'lighter' }}
                >
                    <Col>
                        <Tooltip
                            title={`${currentQueue?.queueState?.code === 'open' ? 'Close' : 'Open'} the queue`}
                        >
                            <Switch 
                                loading={isLoading}
                                checked={currentQueue?.queueState?.code === 'open'}
                                onChange={async (e) => {
                                    if (e === true) {
                                        const action = await dispatch(openQueue());

                                        if (openQueue.rejected.match(action)) {
                                            message.error(`Error opening queue: ${action.payload?.response?.data.message ?? action.error.message}`);
                                        } else if (openQueue.fulfilled.match(action)) {
                                            message.success('Queue opened');
                                        }
                                    } else {
                                        const action = await dispatch(closeQueue());

                                        if (closeQueue.rejected.match(action)) {
                                            message.error(`Error closing queue: ${action.payload?.response?.data.message ?? action.error.message}`);
                                        } else if (closeQueue.fulfilled.match(action)) {
                                            message.success('Queue closed');
                                        }
                                    }
                                }}
                            /> 
                        </Tooltip>
                        
                            
                    </Col>
                    <Col>
                        <span className={currentQueue?.queueState?.code === 'open' ? 'open' : 'closed'}>The queue is {currentQueue?.queueState?.label}</span>
                        
                    </Col>
                </Row>
                    
                
            </Col>
            
        </Row>
    );
};