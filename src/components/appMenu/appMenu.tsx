import './appMenu.less';

import * as React from 'react';

import { Col, Menu, MenuProps, Row } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';

import { MenuOutlined } from '@ant-design/icons';
import { changeDrawerState } from '../../store/modules/appDrawerModule';
import { groupBy } from '../../utility/collections';
import { routes } from '../../routes/appRoutes';
import { useAppDispatch } from '../../types/thunk';

interface AppMenuProps extends MenuProps {
    ignoreHome?: boolean;
}

export const AppMenu: React.FC<AppMenuProps> = (props) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const groupedRoutes = groupBy(Object.keys(routes).map((key) => routes[key]), x => x.groupName);

    const { ignoreHome, ...menuProps } = props;

    return (
        <Menu
            {...menuProps}
            className="app-menu"
            selectable={false}
            defaultSelectedKeys={['']}
            selectedKeys={[location.pathname]}
            disabledOverflow={true}
        >
            {Object.keys(groupedRoutes).map((key, index) => {
                // Our key here will be the groupName because of the groupBy used above
                const itemArray = groupedRoutes[key];

                if (!key) {
                    // No key means its a direct route
                    return (
                        itemArray.map((item) => {
                            if (ignoreHome && item.title.toLowerCase() === 'home') {
                                return undefined;
                            }
                            return (
                                <Menu.Item key={item.path} className={`menu-item${item.path === location.pathname ? ' active' : ''}`}>
                                    <NavLink 
                                        to={item.path} 
                                        onClick={() => dispatch(changeDrawerState(false))}
                                        className="menu-item-link"
                                    >
                                        <Row
                                            align="middle"
                                            justify="start"
                                            gutter={10}
                                        >
                                            <Col className="menu-item-link-icon">
                                                {item.icon}
                                            </Col>
                                            <Col>
                                                {item.title}
                                            </Col>
                                        </Row>
                                    </NavLink>
                                </Menu.Item> 
                            );
                        })
                    );
                } else {
                    // We have a key, and therefore a group
                    const isActive = itemArray.some(x => x.path === location.pathname);
                    return (
                        <Menu.SubMenu title={key} icon={<MenuOutlined />} key={`${key}${index}`} className={`sub-menu${isActive ? ' active' : ''}`}>
                            {itemArray.map((item) => {
                                return (
                                    <Menu.Item key={item.path} className={`menu-item`}>
                                        <NavLink 
                                            to={item.path} 
                                            onClick={() => dispatch(changeDrawerState(false))}
                                            className="menu-item-link"
                                        >
                                            <Row
                                                align="middle"
                                                justify="start"
                                                gutter={10}
                                            >
                                                <Col className="menu-item-link-icon">
                                                    {item.icon}
                                                </Col>
                                                <Col>
                                                    {item.title}
                                                </Col>
                                            </Row>
                                        </NavLink>
                                    </Menu.Item>
                                );
                                    
                            })}
                        </Menu.SubMenu>
                    );
                }            
            })}

            
        </Menu>
    );
};