import * as React from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { HomeOutlined, MessageOutlined, OrderedListOutlined, PercentageOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Route, Routes, useLocation } from 'react-router-dom';

import { ChatPage } from './chatPage';
import { CurrentLevelWidgetOverlay } from './overlayPage/currentLevelWidgetOverlay';
import { HomePage } from './homePage';
import { QueueInfoPage } from './queueInfoPage';
import { QueueRecordWidgetOverlay } from './overlayPage/queueRecordWidgetOverlay';
import { connectSocket } from '../store/modules/socketModule';
import { useAppDispatch } from '../types/thunk';

interface AppRouteProps {
    title?: string;
    path: string;
    component: React.ReactNode;
    icon?: React.ReactNode;
    groupName?: string;
}

class AppRoute {
    title: string;
    path: string;
    component: React.ReactNode;
    icon?: React.ReactNode;
    groupName: string;

    constructor(props: AppRouteProps) {
        this.title = props.title ?? '';
        this.path = props.path;
        this.component = props.component;
        this.icon = props.icon;
        this.groupName = props.groupName ?? '';
    }
}

export const routes: {[key: string]: AppRoute} = {
    home: new AppRoute({
        title: 'Home',
        path: '/',
        component: <HomePage />,
        icon: <HomeOutlined />,
    }),
    queue: new AppRoute({
        title: 'Queue',
        path: '/queue',
        component: <QueueInfoPage />,
        icon: <OrderedListOutlined />,
    }),
    chat: new AppRoute({
        title: 'Chat',
        path: '/chat',
        component: <ChatPage />,
        icon: <MessageOutlined />,
    }),
    currentLevelOverlay: new AppRoute({
        title: 'Level Overlay',
        path: '/current-level-overlay',
        component: <CurrentLevelWidgetOverlay />,
        icon: <PlayCircleOutlined />,
        groupName: 'Overlays',
    }),
    queueRecordOverlay: new AppRoute({
        title: 'Record Overlay',
        path: '/queue-record-overlay',
        component: <QueueRecordWidgetOverlay />,
        icon: <PercentageOutlined />,
        groupName: 'Overlays',
    }),
};

export const AppRoutes: React.FC = (props) => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    React.useEffect(() => {
        dispatch(connectSocket());
    }, []);
    
    return (
        <TransitionGroup component={null}>
            <CSSTransition key={location.key} classNames="fade" timeout={3000}>
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
            </CSSTransition>
        </TransitionGroup>
        
    );
};