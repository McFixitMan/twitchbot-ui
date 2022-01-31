import './queueViewer.less';

import * as React from 'react';

import { Col, Row } from 'antd';

import { CurrentLevel } from './currentLevel';
import { CurrentQueue } from './currentQueue';
import { QueueControls } from './queueControls';
import { QueueCreator } from './queueCreator';
import { QueueRecord } from './queueRecord/queueRecord';
import { QueueState } from './queueState';

interface QueueViewerProps {

}

export const QueueViewer: React.FC<QueueViewerProps> = (props) => {

    return (
        <Row className="queue-viewer">
            <Col 
                xxl={{ span: 10, offset: 7 }}
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 24, offset: 0 }}
                md={{ span: 24, offset: 0 }}
                sm={{ span: 24, offset: 0 }}
                xs={{ span: 24, offset: 0 }}
            >
                <QueueState />
            </Col>

            <Col
                xxl={7}
                xl={7}
                lg={24}
                md={24}
                sm={24}
                xs={24}
            >
                <QueueCreator />
            </Col>
            
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
                    <Col
                        xxl={6}
                        xl={6}
                        lg={6}
                        md={24}
                        sm={24}
                        xs={24}
                    >
                        <QueueRecord />
                    </Col>
                    
                    <Col 
                        xxl={18}
                        xl={18}
                        lg={18}
                        md={24}
                        sm={24}
                        xs={24}
                    >
                        <CurrentQueue />
                    </Col>
                    
                </Row>
                
            </Col>
        </Row>
            
    );
};