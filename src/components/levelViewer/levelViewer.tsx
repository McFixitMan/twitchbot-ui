import * as React from 'react';

import { Spin } from 'antd';

interface LevelViewerProps {
    levelCode: string;
}

export const LevelViewer: React.FC<LevelViewerProps> = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const iframeRef = React.createRef<HTMLIFrameElement>();

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
                src={`https://www.smm2-viewer.com/courses/${props.levelCode}`} 
                onScrollCapture={() => console.log('scrollcapture')}
                onScroll={() => alert('scroll')}
            />
            
        
        
    );
};