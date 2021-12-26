import './queueRecord.less';

import * as React from 'react';

import { Card, Col, Divider, Row, Statistic, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

import { getQueueRecord } from '../../../store/modules/queueModule';

export const QueueRecord: React.FC = (props) => {
    const dispatch = useAppDispatch();

    const queueRecord = useAppSelector((state) => state.queue.queueRecord);

    React.useEffect(() => {
        async function loadRecord(): Promise<void> {
            const action = await dispatch(getQueueRecord());

            if (getQueueRecord.rejected.match(action)) {
                message.error(`Error loading queue record: ${action.payload?.response?.data.message ?? action.error.message}`);
            }
        }

        loadRecord();
    }, []);

    let winPercent: number = 0;

    if (!!queueRecord) {
        const totalLevels = queueRecord.wins + queueRecord.losses;

        winPercent = totalLevels > 0
            ? (queueRecord.wins / totalLevels) * 100
            : 0;
    } else {
        winPercent = 0;
    }

    return (
        <Card 
            bordered={true}
            className="queue-record"
        >
            <Row
                align="middle"
                justify="start"
            >
                <Col span={24} style={{ textAlign: 'left' }}>
                    <span className="panel-title">Record</span>
                </Col>

                <Col span={24}>
                    <Row
                        align="middle"
                        justify="center"
                    >
                        <Col span={12}>
                            <Statistic
                                title={'Wins'}
                                className={'wins'}
                                value={queueRecord?.wins ?? '/'}
                            />
                        </Col>
                        <Col span={12}>
                            <Statistic
                                title={'Losses'}
                                className={'losses'}
                                value={queueRecord?.losses ?? '/'}
                            />
                        </Col>

                        <Divider />

                        <Col span={12}>
                            <Statistic
                                className={'percent'}
                                value={queueRecord ? winPercent : '/'}
                                precision={0}
                                suffix={'%'}
                            />
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Card>
    );
};