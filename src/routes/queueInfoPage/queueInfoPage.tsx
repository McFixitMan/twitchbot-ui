import * as React from 'react';

import { Col, Row } from 'antd';

import { PageWrapper } from '../../components/pageWrapper';
import { QueueViewer } from '../../components/queueViewer';

interface QueueInfoPageProps {

}

export const QueueInfoPage: React.FC<QueueInfoPageProps> = (props) => {

    return (
        <PageWrapper
            pageTitle="Queue Info"
        >
            <Row
                align="middle"
                justify="center"
            >
                <Col span={24}>
                    <QueueViewer />
                </Col>
            </Row>
        </PageWrapper>
    );
};