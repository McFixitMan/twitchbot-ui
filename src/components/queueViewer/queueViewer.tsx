import './queueViewer.less';

import * as React from 'react';

import { Col, Row } from 'antd';

import { CurrentLevel } from './currentLevel';
import { CurrentQueue } from './currentQueue';
import { QueueControls } from './queueControls';
import { QueueRecord } from './queueRecord/queueRecord';

interface QueueViewerProps {

}

export const QueueViewer: React.FC<QueueViewerProps> = (props) => {

    return (
        <Row className="queue-viewer">
            <Col span={24}>
                <QueueControls />
            </Col>
            <Col span={24}>
                <CurrentLevel />
            </Col>
            <Col span={24}>
                <Row
                    gutter={5}
                >
                    <Col span={18}>
                        <CurrentQueue />
                    </Col>
                    <Col span={6}>
                        <QueueRecord />
                    </Col>
                </Row>
                
            </Col>
        </Row>
            
    );
};