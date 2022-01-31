import './queueRecordWidgetOverlay.less';

import * as React from 'react';

import { Col, Row } from 'antd';

import { QueueRecord } from '../../../components/queueViewer/queueRecord';

export const QueueRecordWidgetOverlay: React.FC = (props) => {
    return (
        <Row
            align="bottom"
            justify="end"
            className="overlay-page"
            style={{ height: '100%' }}
        >
            <Col span={3} offset={20}>
                <QueueRecord 
                    showTitle={false}
                />
            </Col>
            
        </Row>
    );
    
};