import './app.less';

import { AppHeader } from './components/appHeader';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'antd';
import React from 'react';

const App: React.FC = (props) => {
    return (
        <div className="App">
            <BrowserRouter>
                <div 
                    className="core-layout__viewport main-content"
                >
                    <div className="layout-main">
                        <div className="layout-header">
                            <AppHeader />
                        </div>

                        <div className="layout-routes">
                            <AppRoutes />
                        </div>

                        {/* <div className="layout-footer">
                            <Footer />
                        </div> */}
                    </div>

                    {/* <AppDrawer /> */}
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
