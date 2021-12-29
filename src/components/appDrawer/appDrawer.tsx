import * as React from 'react';

import { Col, Drawer, Menu, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../types/thunk';

import { NavLink } from 'react-router-dom';
import { changeDrawerState } from '../../store/modules/appDrawerModule';
import { routes } from '../../routes/appRoutes';

interface AppDrawerProps {
    
}

export const AppDrawer: React.FC<AppDrawerProps> = (props) => {
    const dispatch = useAppDispatch();

    const isDrawerOpen = useAppSelector((state) => state.drawer.isDrawerOpen);

    return (
        <Drawer
            visible={isDrawerOpen}
            placement="left"
            closable={true}
            title="Menu"
            mask={true}
            onClose={() => dispatch(changeDrawerState(false))}
        >
            <Menu
                className="appDrawerMenu"
                mode="vertical"
                selectable={false}
            >
                {Object.keys(routes).map((key) => {
                    return (
                        <Menu.Item key={key}>
                            <NavLink 
                                to={routes[key].path} 
                                onClick={() => dispatch(changeDrawerState(false))}
                            >
                                <Row
                                    align="middle"
                                    justify="start"
                                    gutter={10}
                                >
                                    <Col>
                                        {routes[key].icon}
                                    </Col>
                                    <Col>
                                        {routes[key].title}
                                    </Col>
                                </Row>
                            </NavLink>
                        </Menu.Item> 
                    );
                })}
            </Menu>
        </Drawer>
    );
};