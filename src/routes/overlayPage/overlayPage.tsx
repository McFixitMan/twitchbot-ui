import * as React from 'react';

import { Col, Row } from 'antd';

import { QueueRecord } from '../../components/queueViewer';

export const OverlayPage: React.FC = (props) => {
    return (
        <Row
            align="bottom"
            justify="end"
            style={{ height: '100%' }}
        >
            <Col>
                <QueueRecord />
            </Col>
            
        </Row>
    );
};