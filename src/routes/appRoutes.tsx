import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import { HomePage } from './homePage';
import { OverlayPage } from './overlayPage';
import { QueueInfoPage } from './queueInfoPage';
import { connectSocket } from '../store/modules/socketModule';
import { useAppDispatch } from '../types/thunk';

export const AppRoutes: React.FC = (props) => {
    const dispatch = useAppDispatch();

    // const isConnected = useAppSelector((state) => state.socket.isConnected);
    // const isConnecting = useAppSelector((state) => state.socket.isConnecting);

    React.useEffect(() => {
        dispatch(connectSocket());
    }, []);
    
    return (
        <Routes>
            <Route
                path={''}
                element={<HomePage />}
            />

            <Route
                path="/home"
                element={<HomePage />}

            />

            <Route
                path="/queue-info"
                element={<QueueInfoPage />}
            />

            <Route
                path="/overlay"
                element={<OverlayPage />}
            />
        </Routes>
    );
};