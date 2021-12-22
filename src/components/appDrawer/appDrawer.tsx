import * as React from 'react';

import { Drawer, Menu } from 'antd';
import { useAppDispatch, useAppSelector } from '../../types/thunk';

import { HomeOutlined } from '@ant-design/icons';
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
                <Menu.ItemGroup title="Pages"> 
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
                </Menu.ItemGroup>
            </Menu>
        </Drawer>
    );
};