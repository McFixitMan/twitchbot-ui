import * as React from 'react';

import { AlertOutlined, DollarOutlined, FieldTimeOutlined, QuestionCircleOutlined, StepForwardOutlined } from '@ant-design/icons';
import { Button, Col, Row, Tooltip, message } from 'antd';
import { setNextLevel, setRandomLevel, setSubNextLevel, setSubRandomLevel, setWeightedRandomLevel } from '../../../store/modules/queueModule';

import { useAppDispatch } from '../../../types/thunk';

export const QueueControls: React.FC = (props) => {
    const dispatch = useAppDispatch();

    return (
        <Row 
            style={{ margin: 10 }}
            gutter={10}
            align="middle"
            justify="center"
        >
            <Col
                xxl={5}
                xl={5}
                lg={24}
                md={24}
                sm={24}
                xs={24}
            >
                <Tooltip
                    title="Set the current level to the next level in the queue"
                    placement="bottom"
                >
                    <Button 
                        type="primary"
                        className="action-button"
                        size="large"
                        icon={<StepForwardOutlined />}
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
                </Tooltip>
               
            </Col>

            <Col
                xxl={5}
                xl={5}
                lg={12}
                md={12}
                sm={12}
                xs={12}
            >
                <Tooltip
                    title="Set the current level to a random level from the queue"
                    placement="bottom"
                >
                    <Button 
                        type="primary"
                        danger={true}
                        size="large"
                        icon={<QuestionCircleOutlined />}
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
                </Tooltip>
            </Col>

            <Col
                xxl={5}
                xl={5}
                lg={12}
                md={12}
                sm={12}
                xs={12}
            >
                <Tooltip
                    title={<span>Set the current level to a random level from the queue <strong>weighted by how long they have been in the queue</strong></span>}
                    placement="bottom"
                >
                    <Button 
                        type="default"
                        danger={true}
                        size="large"
                        icon={<FieldTimeOutlined />}
                        className="action-button"
                        onClick={async (e) => {
                            const action = await dispatch(setWeightedRandomLevel());

                            if (setWeightedRandomLevel.rejected.match(action)) {
                                message.error(`Error changing level: ${action.payload?.response?.data.message ?? action.error.message}`);
                            } else if (setWeightedRandomLevel.fulfilled.match(action)) {
                                message.success(`Next level is set to ${action.payload.levelCode} (${action.payload.username})`);
                            }
                        }}
                    >
                        Weight Random
                    </Button>
                </Tooltip>
            </Col>

            <Col
                xxl={4}
                xl={4}
                lg={12}
                md={12}
                sm={12}
                xs={12}
            >
                <Tooltip
                    title="Set the current level to the next level in the queue that was added by a subscriber"
                    placement="bottom"
                >
                    <Button 
                        type="dashed"
                        className="action-button"
                        size="large"
                        icon={<DollarOutlined />}
                        onClick={async () => {
                            const action = await dispatch(setSubNextLevel());

                            if (setSubNextLevel.rejected.match(action)) {
                                message.error(`Error changing level: ${action.payload?.response?.data.message ?? action.error.message}`);
                            } else if (setSubNextLevel.fulfilled.match(action)) {
                                message.success(`Next level is set to ${action.payload.levelCode} (${action.payload.username})`);
                            }
                        }}
                    >
                        SubNext
                    </Button>
                </Tooltip>
                
            </Col>

            <Col
                xxl={4}
                xl={4}
                lg={12}
                md={12}
                sm={12}
                xs={12}
            >
                <Tooltip
                    title="Set the current level to a random level from the queue that was added by a subscriber"
                    placement="bottom"
                >
                    <Button 
                        type="dashed"
                        className="action-button"
                        icon={<AlertOutlined />}
                        size="large"
                        onClick={async () => {
                            const action = await dispatch(setSubRandomLevel());

                            if (setSubRandomLevel.rejected.match(action)) {
                                message.error(`Error changing level: ${action.payload?.response?.data.message ?? action.error.message}`);
                            } else if (setSubRandomLevel.fulfilled.match(action)) {
                                message.success(`Next level is set to ${action.payload.levelCode} (${action.payload.username})`);
                            }
                        }}
                    >
                        SubRandom
                    </Button>
                </Tooltip>
                
            </Col>
        </Row>
    );
};