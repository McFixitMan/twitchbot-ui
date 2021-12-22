import * as React from 'react';

import { Drawer, Menu } from 'antd';
import { HomeOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../types/thunk';

import { NavLink } from 'react-router-dom';
import { changeDrawerState } from '../../store/modules/appDrawerModule';

interface AppDrawerProps {
    
}

export const AppDrawer: React.FC<AppDrawerProps> = (props) => {
    const dispatch = useAppDispatch();

    const isDrawerOpen = useAppSelector((state) => state.drawer.isDrawerOpen);

    const handleCloseDrawer = (): void => {
        dispatch(changeDrawerState(false));
    };

    // const handleThemeClicked = (): void => {
    //     dispatch(changeThemeDrawerState(true));
    // };

    return (
        <Drawer
            visible={isDrawerOpen}
            placement="left"
            closable={true}
            title="Menu"
            mask={true}
            onClose={() => handleCloseDrawer()}
        >
            <Menu
                className="appDrawerMenu"
                mode="vertical"
                selectable={false}
            >
                <Menu.Item key="home">
                    <NavLink 
                        to={''} 
                        onClick={() => handleCloseDrawer()}
                    >
                        <span>
                            <HomeOutlined style={{ fontSize: '1.2em' }} />
                            <span>Home</span>
                        </span>
                    </NavLink>
                </Menu.Item> 

                <Menu.Item key="queue-info">
                    <NavLink 
                        to={'/queue-info'} 
                        onClick={() => handleCloseDrawer()}
                    >
                        <span>
                            <OrderedListOutlined style={{ fontSize: '1.2em' }} />
                            <span>Queue Info</span>
                        </span>
                    </NavLink>
                </Menu.Item> 
            </Menu>
        </Drawer>
    );
};