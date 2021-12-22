import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import { HomePage } from './homePage';

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
        </Routes>
    );
};