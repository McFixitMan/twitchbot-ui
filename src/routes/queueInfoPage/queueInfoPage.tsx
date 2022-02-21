import * as React from 'react';

import { Col, Modal, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../types/thunk';

import { ApiOutlined } from '@ant-design/icons';
import { LevelViewer } from '../../components/levelViewer';
import { PageWrapper } from '../../components/pageWrapper';
import { QueueViewer } from '../../components/queueViewer';
import { deactivateLevelViewer } from '../../store/modules/levelViewerModule';

interface QueueInfoPageProps {

}

export const QueueInfoPage: React.FC<QueueInfoPageProps> = (props) => {
    const dispatch = useAppDispatch();

    const isConnected = useAppSelector((state) => state.socket.isConnected);
    const isLevelViewerActive = useAppSelector((state) => state.levelViewer.isActive);

    const stickyContainer = React.useRef<HTMLDivElement>(null);
    

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
                
                <Col
                    xxl={18}
                    xl={20}
                    lg={22}
                    md={24}
                    sm={24}
                >
                    <QueueViewer />
                </Col>

                {/* <Col 
                    span={8}
                >
                    <Affix
                        target={() => stickyContainer.current}
                    >
                        <ChatViewer />
                    </Affix>
                </Col> */}
            </Row>
            }

            <Modal
                visible={isLevelViewerActive}
                onCancel={() => dispatch(deactivateLevelViewer())}
                onOk={() => dispatch(deactivateLevelViewer())}
                className="level-viewer-modal"
                okButtonProps={{ style: { display: 'none' } }}
                cancelText="Close"
                closable={true}
                destroyOnClose={true}
            >
                <LevelViewer />
            </Modal>
        </PageWrapper>
    );
};