import * as React from 'react';

import { Card, Col, Row } from 'antd';

import { ChatFilter } from './chatFilter';
import { ChatMessageSender } from './chatMessageSender';
import { ChatReceivedMessages } from './chatReceivedMessages';
import { Chatters } from './chatters';

export const ChatViewer: React.FC = (props) => {
    return (
        <Row>
            <Col
                xxl={18}
                xl={18}
                lg={16}
                md={24}
                sm={24}
                xs={24}
                style={{ margin: '5px 0' }}
            >
                <Card
                    title="Chat"
                    bordered={true}
                >
                    <ChatFilter />
                    <ChatReceivedMessages />
                    <ChatMessageSender />
                </Card>
            </Col>
            
            <Col
                xxl={6}
                xl={6}
                lg={8}
                md={24}
                sm={24}
                xs={24}
                style={{ margin: '5px 0' }}
            >
                <Card
                    title="Chatters"
                    bordered={true}
                >
                    <Chatters />
                </Card>
            </Col>
        </Row>
        
    );
};