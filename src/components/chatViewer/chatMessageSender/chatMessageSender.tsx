import * as React from 'react';

import { Input } from 'antd';
import { sendChatMessage } from '../../../store/modules/chatModule';
import { useAppDispatch } from '../../../types/thunk';

export const ChatMessageSender: React.FC = (props) => {
    const dispatch = useAppDispatch();
    const [message, setMessage] = React.useState('');

    return (
        <Input.Search 
            placeholder="Type a message..."
            enterButton="Send"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            onSearch={async (v, e) => {
                if (!!message.trim()) {
                    await dispatch(sendChatMessage(message.trim()));
                    setMessage('');
                }
                
            }}
        />
    );
};