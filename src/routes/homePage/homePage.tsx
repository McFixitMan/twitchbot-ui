import * as React from 'react';

import { Col, Row } from 'antd';

import { PageWrapper } from '../../components/pageWrapper';

export const HomePage: React.FC = (props) => {
    return (
        <PageWrapper
            pageTitle="Home"
        >
            <Row
                align="middle"
                justify="center"
            >
                <Col>Yo</Col>
            </Row>
        </PageWrapper>
    );
};