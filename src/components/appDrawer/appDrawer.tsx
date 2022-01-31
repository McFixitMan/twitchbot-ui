import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../types/thunk';

import { AppMenu } from '../appMenu';
import { Drawer } from 'antd';
import { changeDrawerState } from '../../store/modules/appDrawerModule';

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
            <AppMenu mode="vertical" />
        </Drawer>
    );
};