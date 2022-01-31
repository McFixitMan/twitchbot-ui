import * as React from 'react';

import { Col, Row } from 'antd';

import { CurrentLevelWidget } from '../../../components/widgets';

export const CurrentLevelWidgetOverlay: React.FC = (props) => {
    return (
        <Row
            align="top"
            justify="start"
            className="overlay-page"
        >
            <Col span={24}>
                <CurrentLevelWidget />
            </Col>
        </Row>
    );
};