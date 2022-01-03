import * as React from 'react';

import { Col, Row, Tag, Tooltip } from 'antd';
import { CrownOutlined, DollarCircleOutlined, HeartOutlined, RobotOutlined, ToolOutlined, VideoCameraOutlined } from '@ant-design/icons';

import { ChatMessage as Message } from '../../../entities/chatMessage';

interface ChatMessageProps {
    chatMessage: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = (props) => {
    const { badges, userColor, username, message, sentAt } = props.chatMessage;

    return (
        <Tooltip
            title={sentAt.toLocaleTimeString('en-CA', {
                timeStyle: 'medium',
            })}
            placement="bottomLeft"
            trigger="click"
        >
            <Row>   
                <Col style={{ marginTop: '8px' }}>
                    {badges.isBot &&
                <Tooltip
                    title="Bot"
                >
                    <Tag color="red"><RobotOutlined /></Tag>
                </Tooltip>
                    }
                    {badges.isBroadcaster &&
                <Tooltip
                    title="Broadcaster"
                >
                    <Tag color="red"><VideoCameraOutlined /></Tag>
                </Tooltip>
                    }

                    {badges.isMod &&
                <Tooltip
                    title="Mod"
                >
                    <Tag color="green"><ToolOutlined /></Tag>
                </Tooltip>
                    }

                    {badges.isSub &&
                <Tooltip
                    title="Sub"
                >
                    <Tag color="blue"><DollarCircleOutlined /></Tag>
                </Tooltip>
                    }

                    {badges.isVip &&
                <Tooltip
                    title="VIP"
                >
                    <Tag color="red"><HeartOutlined /></Tag>
                </Tooltip>
                    }

                    {badges.isFounder &&
                <Tooltip
                    title="Founder"
                >
                    <Tag color="gold"><CrownOutlined /></Tag>
                </Tooltip>
                    }

                    <span style={{ color: userColor }}>{username}: &nbsp;</span>
                
                    <span style={{ color: badges.isBot ? '#7a7a7a' : undefined }}>{message}</span>
                </Col>
            
            </Row>
        </Tooltip>
        
    );
};