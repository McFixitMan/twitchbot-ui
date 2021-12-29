import * as React from 'react';

import { Affix, Col, Row } from 'antd';

import { ApiOutlined } from '@ant-design/icons';
import { ChatViewer } from '../../components/chatViewer';
import { PageWrapper } from '../../components/pageWrapper';
import { QueueViewer } from '../../components/queueViewer';
import { useAppSelector } from '../../types/thunk';

interface QueueInfoPageProps {

}

export const QueueInfoPage: React.FC<QueueInfoPageProps> = (props) => {

    const isConnected = useAppSelector((state) => state.socket.isConnected);

    const stickyContainer = React.useRef<HTMLDivElement>(null);
    // const [stickyContainer, setStickyContainer] = React.useState<HTMLDivElement | null>(null);

    return (
        <PageWrapper
            isNonIdeal={!isConnected}
            nonIdealIcon={<ApiOutlined />}
            nonIdealHeader="Not Connected"
            nonIdealSubheader="Unable to connect to the server!"
            innerRef={stickyContainer}
        >
            {!!isConnected &&
            <Row
                align="top"
                justify="center"
            >
                
                <Col span={16}>
                    <QueueViewer />
                </Col>

                <Col 
                    
                    span={8}
                >
                    <Affix
                        target={() => stickyContainer.current}
                    >
                        <ChatViewer />
                    </Affix>
                    
                </Col>
            </Row>
            }
        </PageWrapper>
    );
};