import './app.less';

import { AppDrawer } from './components/appDrawer';
import { AppHeader } from './components/appHeader';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { configureStore } from './store/createStore';

export const store = configureStore();

const App: React.FC = (props) => {
    return (
        <div className="App">
            <Provider
                store={store}
            >
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

                        <AppDrawer />
                    </div>
                </BrowserRouter>
            </Provider>
            
        </div>
    );
};

export default App;
