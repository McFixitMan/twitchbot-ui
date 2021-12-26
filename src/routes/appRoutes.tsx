import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import { HomePage } from './homePage';
import { OverlayPage } from './overlayPage';
import { QueueInfoPage } from './queueInfoPage';

export const AppRoutes: React.FC = (props) => {
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