import * as React from 'react';

import { Button, Col, Row, message } from 'antd';
import { setNextLevel, setRandomLevel } from '../../../store/modules/queueModule';

import { useAppDispatch } from '../../../types/thunk';

export const QueueControls: React.FC = (props) => {
    const dispatch = useAppDispatch();

    return (
        <Row 
            style={{ margin: 10 }}
            gutter={10}
        >
            <Col span={6}>
                <Button 
                    type="primary"
                    className="action-button"
                    size="large"
                    onClick={async (e) => {
                        const action = await dispatch(setNextLevel());

                        if (setNextLevel.rejected.match(action)) {
                            message.error(`Error changing level: ${action.payload?.response?.data.message ?? action.error.message}`);
                        } else if (setNextLevel.fulfilled.match(action)) {
                            message.success(`Next level is set to ${action.payload.levelCode} (${action.payload.username})`);
                        }
                    }}
                >
                            Next
                </Button>
            </Col>

            <Col span={6}>
                <Button 
                    type="primary"
                    danger={true}
                    size="large"
                    className="action-button"
                    onClick={async (e) => {
                        const action = await dispatch(setRandomLevel());

                        if (setRandomLevel.rejected.match(action)) {
                            message.error(`Error changing level: ${action.payload?.response?.data.message ?? action.error.message}`);
                        } else if (setRandomLevel.fulfilled.match(action)) {
                            message.success(`Next level is set to ${action.payload.levelCode} (${action.payload.username})`);
                        }
                    }}
                >
                            Random
                </Button>
            </Col>

            <Col span={6}>
                <Button 
                    type="dashed"
                    className="action-button"
                    size="large"
                >
                            SubNext
                </Button>
            </Col>

            <Col span={6}>
                <Button 
                    type="dashed"
                    className="action-button"
                    size="large"
                >
                            SubRandom
                </Button>
            </Col>
        </Row>
    );
};