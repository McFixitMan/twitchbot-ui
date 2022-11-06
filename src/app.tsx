import './app.less';

import { AppLayout } from './appLayout';
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
                    <AppLayout />
                </BrowserRouter>
            </Provider>
            
        </div>
    );
};

export default App;
