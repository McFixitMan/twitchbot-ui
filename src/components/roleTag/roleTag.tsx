import * as React from 'react';

import { CrownOutlined, DollarCircleOutlined, FastForwardOutlined, HeartOutlined, RobotOutlined, SketchOutlined, ToolOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Tag, TagProps, Tooltip } from 'antd';

import { LiteralUnion } from 'antd/lib/_util/type';

interface CustomTagProps {
    icon: React.ReactNode;
    text: string;
    color: LiteralUnion<'green' | 'pink' | 'red' | 'yellow' | 'orange' | 'cyan' | 'blue' | 'purple' | 'geekblue' | 'magenta' | 'volcano' | 'gold' | 'lime' | 'success' | 'processing' | 'error' | 'default' | 'warning', string>;
    showIcon?: boolean;
    showText?: boolean;
    showTooltip?: boolean;
}

export const CustomTag: React.FC<CustomTagProps> = (props) => {
    const showIcon = props.showIcon ?? true;
    const showText = props.showText ?? true;
    const showTooltip = props.showTooltip ?? !showText;

    return (
        showTooltip
            ?
            <Tooltip
                title={props.text}
            >
                <Tag
                    className="tag"
                    color={props.color}
                >
                    {showIcon ? props.icon : undefined}
                    {showIcon && showText ? ' ' : ''}
                    {showText ? props.text : ''}
                </Tag>
            </Tooltip>
            :
            <Tag
                className="tag"
                color={props.color}
            >
                {showIcon ? props.icon : undefined}
                {showIcon && showText ? ' ' : ''}
                {showText ? props.text : ''}
            </Tag>
    );
};


interface RoleTagProps extends TagProps {
    type: 'bot' | 'broadcaster' | 'founder' | 'makercode' | 'mod' | 'skipped' | 'sub' | 'twitch' | 'vip';
    showIcon?: boolean;
    showText?: boolean;
    showTooltip?: boolean;
}

export const RoleTag: React.FC<RoleTagProps> = (props) => {
    switch (props.type) {
        case 'bot': {
            return (
                <CustomTag
                    {...props}
                    color="red"
                    icon={<RobotOutlined />}
                    text="Bot"
                />
            );
        }
        case 'broadcaster': {
            return (
                <CustomTag
                    {...props}
                    color="red"
                    icon={<VideoCameraOutlined />}
                    text="Broadcaster"
                />
            );
        }
        case 'founder': {
            return (
                <CustomTag
                    {...props}
                    color="gold"
                    icon={<CrownOutlined />}
                    text="Founder"
                />
            );
        }
        case 'makercode': {
            return (
                <CustomTag
                    {...props}
                    color="orange"
                    icon={<UserOutlined />}
                    text="MakerCode"
                />
            );
        }
        case 'mod': {
            return (
                <CustomTag
                    {...props}
                    color="green"
                    icon={<ToolOutlined />}
                    text="Mod"
                />
            );
        }
        case 'skipped': {
            return (
                <CustomTag
                    {...props}
                    color="magenta"
                    icon={<FastForwardOutlined />}
                    text="Skipped"
                />
            );
        }
        case 'sub': {
            return (
                <CustomTag
                    {...props}
                    color="blue"
                    icon={<DollarCircleOutlined />}
                    text="Sub"
                />
            );
        }
        case 'twitch': {
            return (
                <CustomTag
                    {...props}
                    color="cyan"
                    icon={<SketchOutlined />}
                    text="Twitch Staff"
                />
            );
        }
        case 'vip': {
            return (
                <CustomTag
                    {...props}
                    color="red"
                    icon={<HeartOutlined />}
                    text="VIP"
                />
            );
        }
        default: {
            return (
                <></>
            );
        }
    }

};