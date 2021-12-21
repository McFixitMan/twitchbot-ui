import * as React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from './homePage';

export const AppRoutes: React.FC = (props) => {
    return (
        <Routes>
            <Route
                path=""
                element={<HomePage />}
            />
        </Routes>
    );
};