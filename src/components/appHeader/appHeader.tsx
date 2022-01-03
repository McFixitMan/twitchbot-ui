import './appHeader.less';

import * as React from 'react';

import { ApiOutlined, BulbOutlined, LoadingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RobotOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import { useAppDispatch, useAppSelector } from '../../types/thunk';

import { NavLink } from 'react-router-dom';
import { changeDrawerState } from '../../store/modules/appDrawerModule';

interface AppHeaderProps {

}

export const AppHeader: React.FC<AppHeaderProps> = (props) => {
    const dispatch = useAppDispatch();

    const isDrawerOpen = useAppSelector((state) => state.drawer.isDrawerOpen);
    const isConnecting = useAppSelector((state) => state.socket.isConnecting);
    const isConnected = useAppSelector((state) => state.socket.isConnected);

    const handleDrawerClicked = (toOpen: boolean): void => {
        dispatch(changeDrawerState(toOpen));
    };

    return (
        <Row
            className="header"
            justify="space-between"
            align="middle"
        >
            <Col span={24}>
                <Row
                    align="middle"
                    justify="space-between"
                >
                    <Col>
                        <Row
                            align="middle"
                            justify="start"
                        >
                            <Col>
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
                            </Col>
                            <Col>
                                <NavLink
                                    to=""
                                >
                                    <Row>
                                        <div className="header-title" style={{ flex: 0, alignSelf: 'middle', marginLeft: 10, marginRight: 10 }}><span className="bold">McFixit</span><span className="lighter">BOT</span></div>
                                        <div style={{ flex: 0 }} className="header-icon"><RobotOutlined size={30} /></div>
                                    </Row>
                                </NavLink>
                            </Col>
                        </Row>
                        
                    </Col>
                    
                    
                    
                    <Col 
                        className={`socket-state-container ${isConnecting ? 'connecting' : isConnected ? 'connected' : 'disconnected'}`}
                        style={{ marginRight: 25 }}
                    >
                        {isConnecting
                            ? <span className="socket-state"><LoadingOutlined /> Connecting...</span>
                            : isConnected 
                                ? <span className="socket-state"><BulbOutlined /> Connected</span> 
                                : <span className="socket-state"><ApiOutlined /> Disconnected</span>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};