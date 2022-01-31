import * as React from 'react';

import { Col, Row, Tooltip } from 'antd';

import { ChatMessage as Message } from '../../../entities/chatMessage';
import { RoleTag } from '../../roleTag';

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
                        <RoleTag
                            type="bot"
                            showText={false}
                        />
                    }
                    {badges.isBroadcaster &&
                        <RoleTag
                            type="broadcaster"
                            showText={false}
                        />
                    }

                    {badges.isMod &&
                        <RoleTag
                            type="mod"
                            showText={false}
                        />
                    }

                    {badges.isSub &&
                        <RoleTag
                            type="sub"
                            showText={false}
                        />
                    }

                    {badges.isVip &&
                        <RoleTag
                            type="vip"
                            showText={false}
                        />
                    }

                    {badges.isFounder &&
                        <RoleTag
                            type="founder"
                            showText={false}
                        />
                    }

                    <span style={{ color: userColor }}>{username}: &nbsp;</span>
                
                    <span style={{ color: badges.isBot ? '#7a7a7a' : undefined }}>{message}</span>
                </Col>
            
            </Row>
        </Tooltip>
        
    );
};