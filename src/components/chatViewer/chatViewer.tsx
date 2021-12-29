import * as React from 'react';

import { Button, Card, Col, Empty, Row } from 'antd';

import { ChatMessage } from './chatMessage';
import { useAppSelector } from '../../types/thunk';

export const ChatViewer: React.FC = (props) => {
    const endOfMessagesRef = React.useRef<HTMLDivElement>(null);

    const chatMessages = useAppSelector((state) => state.chat.chatMessages);

    const [isAutoScrolling, setIsAutoScrolling] = React.useState(true);

    const scrollToBottom = (): void => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    };

    React.useEffect(() => {
        if (isAutoScrolling) {
            scrollToBottom();
        }
        
    }, [chatMessages]);

    return (

        <Card 
            title="Chat Viewer"
            className="chat-viewer"
        >
            {chatMessages.length === 0 &&
                <Empty description="No Messages Received" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
            {chatMessages.map((msg, index) => {
                return (
                    <Row
                        key={`msg${index}`}
                        align="top"
                        justify="start"
                        style={{ padding: 5 }}
                    >
                        <Col 
                            span={24}
                            style={{ textAlign: 'left' }}
                        >
                            <ChatMessage 
                                chatMessage={msg}
                            />
                        </Col>
                    </Row>
                );
            })}

            <Row
                align="middle"
                justify="center"
                ref={endOfMessagesRef}
                style={{ marginTop: 30 }}
            >
                <Col>
                    {isAutoScrolling
                        ?
                        <Button 
                            type="primary" 
                            danger={true}
                            onClick={() => setIsAutoScrolling(false)}
                        >
                            Pause Autoscroll
                        </Button>
                        :
                        <Button 
                            type="primary" 
                            onClick={() => setIsAutoScrolling(true)}
                        >
                            Resume Autoscroll
                        </Button>
                    }</Col>
            </Row>
        </Card>
    );
};