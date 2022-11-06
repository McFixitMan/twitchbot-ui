import './appHeader.less';

import * as React from 'react';

import { ApiOutlined, BulbOutlined, LoadingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, RobotOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import { useAppDispatch, useAppSelector } from '../../types/thunk';

import { AppMenu } from '../appMenu';
import { NavLink } from 'react-router-dom';
import { changeDrawerState } from '../../store/modules/appDrawerModule';

interface AppHeaderProps {

}

export const AppHeader: React.FC<AppHeaderProps> = (props) => {
    const dispatch = useAppDispatch();

    const isDrawerOpen = useAppSelector((state) => state.drawer.isDrawerOpen);
    const isConnecting = useAppSelector((state) => state.socket.isConnecting);
    const isConnected = useAppSelector((state) => state.socket.isConnected);

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
                            <Col className="header-menu-button">
                                {isDrawerOpen === true
                                    ?
                                    <MenuFoldOutlined
                                        className="header-icon"
                                        style={{ fontSize: 20, marginLeft: 16, marginRight: 16, cursor: 'pointer' }}
                                        onClick={() => dispatch(changeDrawerState(false))}
                                    />
                                    :
                                    <Tooltip title="Open Menu" placement="bottomRight">
                                        <MenuUnfoldOutlined
                                            className="header-icon"
                                            style={{ fontSize: 20, marginLeft: 16, marginRight: 16, cursor: 'pointer' }}
                                            onClick={() => dispatch(changeDrawerState(true))}
                                        />
                                    </Tooltip>
                                    
                                }
                            </Col>
                            <Col>
                                <NavLink
                                    to=""
                                >
                                    <Row>
                                        <div className="header-title" style={{ flex: 0, alignSelf: 'middle', marginLeft: 10, marginRight: 10 }}><span className="bold">Twitch</span><span className="lighter">BOT</span></div>
                                        <div style={{ flex: 0 }} className="header-icon"><RobotOutlined size={30} /></div>
                                    </Row>
                                </NavLink>
                            </Col>
                        </Row>
                        
                    </Col>
                    
                    <Col>
                        <Row>
                            <AppMenu 
                                mode="horizontal" 
                            />
                        </Row>
                        
                    </Col>
                    
                    <Col 
                        className={`socket-state-container ${isConnecting ? 'connecting' : isConnected ? 'connected' : 'disconnected'}`}
                        style={{ marginRight: 25 }}
                    >
                        <Tooltip
                            title={isConnecting ? 'Connecting to TwitchBOT server...' : isConnected ? 'Connected to TwitchBOT server' : 'Disconnected from TwitchBOT server'}
                        >
                            {isConnecting
                                ? <span className="socket-state"><LoadingOutlined /> <span className="socket-state-text">Connecting...</span></span>
                                : isConnected 
                                    ? <span className="socket-state"><BulbOutlined /> <span className="socket-state-text">Connected</span></span>
                                    : <span className="socket-state"><ApiOutlined /> <span className="socket-state-text">Disconnected</span></span>
                            }
                        </Tooltip>
                        
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};