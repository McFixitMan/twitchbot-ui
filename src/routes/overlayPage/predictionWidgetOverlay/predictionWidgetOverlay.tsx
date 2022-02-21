import './predictionWidgetOverlay.less';

import * as React from 'react';

import { Col, Row } from 'antd';

import { PredictionWidget } from '../../../components/widgets/predictionWidget';

export const PredictionWidgetOverlay: React.FC = (props) => {
    return (
        <Row
            align="bottom"
            justify="end"
            className="overlay-page"
            gutter={20}
            style={{ marginRight: 25, height: '100%' }}
        >
            <Col span={4} offset={20}>
                <PredictionWidget />
            </Col>
        </Row>
    );
};