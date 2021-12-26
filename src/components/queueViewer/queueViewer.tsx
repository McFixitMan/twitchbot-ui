import './queueViewer.less';

import * as React from 'react';

import { BulbOutlined, DisconnectOutlined, LoadingOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../types/thunk';

import { CurrentLevel } from './currentLevel';
import { CurrentQueue } from './currentQueue';
import { QueueControls } from './queueControls';
import { QueueRecord } from './queueRecord/queueRecord';
import { connectSocket } from '../../store/modules/socketModule';

interface QueueViewerProps {

}

export const QueueViewer: React.FC<QueueViewerProps> = (props) => {
    const dispatch = useAppDispatch();

    const isConnected = useAppSelector((state) => state.socket.isConnected);
    const isConnecting = useAppSelector((state) => state.socket.isConnecting);

    React.useEffect(() => {
        dispatch(connectSocket());
    }, []);

    return (
        <Row className="queue-viewer">
            <Col 
                span={24}
            >
                {isConnecting
                    ? <span className="socket-state connecting"><LoadingOutlined /> Connecting...</span>
                    : isConnected 
                        ? <span className="socket-state connected"><BulbOutlined /> Connected</span> 
                        : <span className="socket-state disconnected"><DisconnectOutlined /> Disconnected</span>
                }
            </Col>
            <Col span={24}>
                <QueueControls />
            </Col>
            <Col span={24}>
                <CurrentLevel />
            </Col>
            <Col span={24}>
                <Row
                    gutter={5}
                >
                    <Col span={18}>
                        <CurrentQueue />
                    </Col>
                    <Col span={6}>
                        <QueueRecord />
                    </Col>
                </Row>
                
            </Col>
        </Row>
            
    );
};