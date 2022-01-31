import './overlayPage.less';

import * as React from 'react';

import { Col, Row } from 'antd';

import { CurrentLevelWidget } from '../../components/widgets';
import { QueueRecord } from '../../components/queueViewer';

export const OverlayPage: React.FC = (props) => {
    return (
        <Row
            align="top"
            justify="start"
            className="overlay-page"
        >
            <Col span={24}>
                <CurrentLevelWidget />
            </Col>
            <Col span={4} offset={20}>
                <QueueRecord 
                    showTitle={false}
                    
                />
            </Col>
            
        </Row>
    );
};