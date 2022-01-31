import * as React from 'react';

import { Button, Col, Row, Tooltip, message } from 'antd';
import { createQueue, loadLastQueue } from '../../../store/modules/queueModule';

import { useAppDispatch } from '../../../types/thunk';

export const QueueCreator: React.FC = (props) => {
    const dispatch = useAppDispatch();

    return (
        <Row
            align="middle"
            justify="center"
            style={{ height: '100%', margin: '10px 0' }}
            gutter={15}
        >
            <Col span={12}>
                <Tooltip
                    title="Create a new queue"
                >
                    <Button
                        type="ghost"
                        style={{ width: '100%' }}
                        onClick={async () => {
                            const action = await dispatch(createQueue());

                            if (createQueue.rejected.match(action)) {
                                message.error(`Error creating queue: ${action.payload?.response?.data.message ?? action.error.message}`);
                            } else if (createQueue.fulfilled.match(action)) {
                                message.success(`New queue created`);
                            }
                        }}
                    >
                        New Queue
                    </Button>
                </Tooltip>
                
            </Col>

            <Col span={12}>
                <Tooltip
                    title="Load the most recent queue that isn't the current queue"
                >
                    <Button
                        type="ghost"
                        style={{ width: '100%' }}
                        onClick={async () => {
                            const action = await dispatch(loadLastQueue());

                            if (loadLastQueue.rejected.match(action)) {
                                message.error(`Error loading last queue: ${action.payload?.response?.data.message ?? action.error.message}`);
                            } else if (loadLastQueue.fulfilled.match(action)) {
                                message.success(`Last queue loaded`);
                            }
                        }}
                    >
                        Load Last Queue
                    </Button>
                </Tooltip>
                
            </Col>
        </Row>
    );
};