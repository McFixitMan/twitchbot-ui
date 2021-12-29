import * as React from 'react';

import { GroupOutlined, HomeOutlined, MessageOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Route, Routes } from 'react-router-dom';

import { ChatPage } from './chatPage';
import { HomePage } from './homePage';
import { OverlayPage } from './overlayPage';
import { QueueInfoPage } from './queueInfoPage';
import { connectSocket } from '../store/modules/socketModule';
import { useAppDispatch } from '../types/thunk';

interface AppRoute {
    title: string;
    path: string;
    component: React.ReactNode;
    icon?: React.ReactNode;
}

export const routes: {[key: string]: AppRoute} = {
    home: {
        title: 'Home',
        path: '/',
        component: <HomePage />,
        icon: <HomeOutlined />,
    },
    chat: {
        title: 'Chat',
        path: '/chat',
        component: <ChatPage />,
        icon: <MessageOutlined />,
    },
    queue: {
        title: 'Queue',
        path: '/queue',
        component: <QueueInfoPage />,
        icon: <OrderedListOutlined />,
    },
    overlay: {
        title: 'Overlay',
        path: '/overlay',
        component: <OverlayPage />,
        icon: <GroupOutlined />,
    },
};

export const AppRoutes: React.FC = (props) => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(connectSocket());
    }, []);
    
    return (
        <Routes>
            {Object.keys(routes).map((key) => {
                return (
                    <Route
                        key={routes[key].path}
                        path={routes[key].path}
                        element={routes[key].component}
                    />
                );
            })}
        </Routes>
    );
};