import * as React from 'react';

import { Statistic } from 'antd';

export const OverlayPage: React.FC = (props) => {
    const deadline = Date.now() + 1000 * 60 * 10;
    return (
        <div
            style={{ width: '100%', height: '100%' }}
        >
            <div style={{ position: 'absolute', right: '0', bottom: '0', margin: '10px 50px' }}>
                <Statistic.Countdown 
                    value={deadline} 
                    valueStyle={{ color:'#68ED3C', fontSize: '5em' }}
                    format="m:ss"
                />
            </div>
        </div>
    );
};