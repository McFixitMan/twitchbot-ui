import * as React from 'react';

import { ChatMessage } from '../../../entities/chatMessage';
import { ChatMessage as ChatMessageComponent } from '../chatMessage';
import { DynamicListContext } from './chatReceivedMessages';

interface ChatRowProps {
    index: number;
    width: number;
    data: Array<ChatMessage>
    style: React.CSSProperties;
}

export const ChatRow: React.FC<ChatRowProps> = ({ index, width, data, style }) => {
    const { setSize } = React.useContext(DynamicListContext);
    const rowRoot = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!!rowRoot.current) {
            setSize?.(index, rowRoot.current.getBoundingClientRect().height);
        }
    }, [index, setSize, width]);

    return (
        <div
            style={style}
        >
            <div 
                ref={rowRoot}
                style={{ textAlign: 'left' }}
            >
                <ChatMessageComponent chatMessage={data[index]} />
            </div>

        </div>
    );
};