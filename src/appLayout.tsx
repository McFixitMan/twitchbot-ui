import * as React from 'react';

import { AppDrawer } from './components/appDrawer';
import { AppHeader } from './components/appHeader';
import { AppRoutes } from './routes/appRoutes';
import { PredictionAlert } from './components/predictionAlert';
import { useLocation } from 'react-router-dom';

export const AppLayout: React.FC = (props) => {
    const location = useLocation();

    return (
        <div 
            className="core-layout__viewport main-content"
        >
            <div className="layout-main">
                <div className="layout-header">
                    <AppHeader />
                </div>
                            
                <div className="layout-routes">
                    {!location.pathname.toLowerCase().includes('overlay') &&
                        <PredictionAlert />
                    }
                    
                    <AppRoutes />
                </div>

                {/* <div className="layout-footer">
                            <Footer />
                        </div> */}
            </div>

            <AppDrawer />
        </div>
    );
};