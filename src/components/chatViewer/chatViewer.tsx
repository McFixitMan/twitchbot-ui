import * as React from 'react';

import { Card } from 'antd';
import { ChatFilter } from './chatFilter';
import { ChatMessageSender } from './chatMessageSender';
import { ChatReceivedMessages } from './receivedMessages';

export const ChatViewer: React.FC = (props) => {
    return (
        <>
            <Card
                title="Chat"
                bordered={true}
            >
                <ChatFilter />
                <ChatReceivedMessages />
                <ChatMessageSender />
            </Card>
        </>
        
    );
};