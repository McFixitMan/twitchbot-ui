import * as React from 'react';

import { Col, Row } from 'antd';

import { ApiOutlined } from '@ant-design/icons';
import { ChatViewer } from '../../components/chatViewer';
import { PageWrapper } from '../../components/pageWrapper';
import { useAppSelector } from '../../types/thunk';

export const ChatPage: React.FC = (props) => {
    const isConnected = useAppSelector((state) => state.socket.isConnected);
    
    return (
        <PageWrapper
            isNonIdeal={!isConnected}
            nonIdealIcon={<ApiOutlined />}
            nonIdealHeader="Not Connected"
            nonIdealSubheader="Unable to connect to the server!"
        >
            {!!isConnected &&
            <Row
                align="middle"
                justify="center"
            >
                <Col span={20}>
                    <ChatViewer />
                </Col>
            </Row>
            }
        </PageWrapper>
    );
};