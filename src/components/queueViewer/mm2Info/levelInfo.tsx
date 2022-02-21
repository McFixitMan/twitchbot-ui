import './levelInfo.less';

import * as React from 'react';

import { Col, Divider, Row, Statistic, Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

import { Mm2LevelInfo } from '../../../entities/mm2LevelInfo';

interface LevelInfoProps {
    mm2LevelInfo: Mm2LevelInfo;
}

export const LevelInfo: React.FC<LevelInfoProps> = (props) => {
    return (
        <Row
            align="middle"
            justify="center"
            className="level-info"
        >
            <Col
                span={24}
                className="level-name"
            >
                {props.mm2LevelInfo?.name}
            </Col>

            <Col
                span={24}
                className="uploader"
            >
                by {props.mm2LevelInfo.uploader?.name}
            </Col>

            <Col
                span={24}
                className="level-description"
            >
                {props.mm2LevelInfo.description || '[No description]'}
            </Col>

            <Divider style={{ margin: 5 }} />

            <Col
                span={24}
                className="clear-rate"
            >
                <Statistic
                    title="Clear Rate"
                    className={(parseFloat(props.mm2LevelInfo.clear_rate)) >= 1.00 ? 'easy' : 'hard'}
                    value={`${props.mm2LevelInfo.clears} / ${props.mm2LevelInfo.attempts} (${props.mm2LevelInfo.clear_rate})`}
                />
            </Col>

            <Col
                xxl={12}
                xl={12}
                lg={24}
                md={12}
                sm={12}
                xs={12}
                className="world-record"
            >
                <Statistic
                    title="Clear"
                    value={props.mm2LevelInfo.upload_time_pretty}
                />

                
            </Col>

            <Col
                xxl={12}
                xl={12}
                lg={24}
                md={12}
                sm={12}
                xs={12}
            >
                <Tooltip
                    title={!!props.mm2LevelInfo.record_holder ? <Statistic title="Record Holder" value={props.mm2LevelInfo.record_holder?.name} /> : undefined}
                    overlayInnerStyle={{ fontSize: '2em' }}
                >
                    <Statistic
                        title="WR"
                        value={props.mm2LevelInfo.clears > 0 ? props.mm2LevelInfo.world_record_pretty : 'N/A'}
                    />
                </Tooltip>
                
            </Col>

            <Col span={24}>
                <Row
                    align="middle"
                    justify="center"
                >
                    <Col span={12}>
                        <Statistic
                            title="Likes"
                            value={props.mm2LevelInfo.likes}
                            prefix={<LikeOutlined />}
                        />
                    </Col>

                    <Col span={12}>
                        <Statistic
                            title="Boos"
                            value={props.mm2LevelInfo.boos}
                            prefix={<DislikeOutlined />}
                        />
                    </Col>
                </Row>
            </Col>
            
        </Row>
    );
};