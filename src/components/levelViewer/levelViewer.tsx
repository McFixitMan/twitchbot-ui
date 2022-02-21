import * as React from 'react';

import { Spin } from 'antd';
import { useAppSelector } from '../../types/thunk';

const LEVEL_VIEWER_URL = 'https://www.smm2-viewer.com/courses/';

export const LevelViewer: React.FC = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const iframeRef = React.createRef<HTMLIFrameElement>();

    const levelCode = useAppSelector((state) => state.levelViewer.levelCode);

    return (
        isLoading
            ?
            <Spin size="large" />
            :
            <iframe 
                ref={iframeRef}
                onLoadStart={() => setIsLoading(true)} 
                onLoad={() => setIsLoading(false)}
                style={{ width: '100%', height: '100%' }} 
                src={`${LEVEL_VIEWER_URL}${levelCode}`} 
                onScrollCapture={() => console.log('scrollcapture')}
                onScroll={() => alert('scroll')}
            />
    );
};