import * as React from 'react';

import { Col, Row } from 'antd';
import { MenuUnfoldOutlined, RobotOutlined } from '@ant-design/icons';

import { NavLink } from 'react-router-dom';

interface AppHeaderProps {

}

export const AppHeader: React.FC<AppHeaderProps> = (props) => {
    return (
        <Row
            className="header"
            justify="space-between"
            align="middle"
        >
            <Col span={18}>
                <Row
                    align="middle"
                    justify="start"
                >
                    <div>
                        <MenuUnfoldOutlined 
                            className="header-icon"
                            style={{ fontSize: 20, marginLeft: 16, marginRight: 16, cursor: 'pointer' }}
                        />
                    </div>
                    
                    <NavLink
                        to=""
                    >
                        <Row>
                            <div className="header-title" style={{ flex: 0, alignSelf: 'middle', marginLeft: 10, marginRight: 10 }}><span className="bold">McFixit</span><span className="lighter">BOT</span></div>
                            <div style={{ flex: 0 }} className="header-icon"><RobotOutlined size={30} /></div>
                        </Row>
                    </NavLink>
                </Row>
            </Col>
        </Row>
    );
};