import * as React from 'react';

import { Col, Row, Tooltip } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, RobotOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../types/thunk';

import { NavLink } from 'react-router-dom';
import { changeDrawerState } from '../../store/modules/appDrawerModule';

interface AppHeaderProps {

}

export const AppHeader: React.FC<AppHeaderProps> = (props) => {
    const dispatch = useAppDispatch();
    const isDrawerOpen = useAppSelector((state) => state.drawer.isDrawerOpen);

    const handleDrawerClicked = (toOpen: boolean): void => {
        dispatch(changeDrawerState(toOpen));
    };

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
                        {isDrawerOpen === true
                            ?
                            <MenuFoldOutlined
                                className="header-icon"
                                style={{ fontSize: 20, marginLeft: 16, marginRight: 16, cursor: 'pointer' }}
                                onClick={() => handleDrawerClicked(false)}
                            />
                            :
                            <Tooltip title="Open Menu" placement="bottomRight">
                                <MenuUnfoldOutlined
                                    className="header-icon"
                                    style={{ fontSize: 20, marginLeft: 16, marginRight: 16, cursor: 'pointer' }}
                                    onClick={() => handleDrawerClicked(true)}
                                />
                            </Tooltip>
                                    
                        }
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