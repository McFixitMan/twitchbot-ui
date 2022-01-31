import * as React from 'react';

import { Col, Row } from 'antd';

import { Mm2User } from '../../../entities/mm2User';

interface UserInfoProps {
    mm2User: Mm2User;
}

export const UserInfo: React.FC<UserInfoProps> = (props) => {
    return (
        <Row
            align="middle"
            justify="start"
        >
            <Col
                span={24}
            >
                Maker: {props.mm2User.name}
            </Col>

            <Col
                span={24}
            >
                Likes: {props.mm2User.likes}
            </Col>
        </Row>
    );
};