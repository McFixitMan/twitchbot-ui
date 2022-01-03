import * as React from 'react';

import { Button, Col, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

import { setUsernameFilter } from '../../../store/modules/chatModule';
import { useEscapeKey } from '../../../hooks/useEscapeKey';

export const ChatFilter: React.FC = (props) => {
    const dispatch = useAppDispatch();
    const usernameFilter = useAppSelector((state) => state.chat.usernameFilter);
    
    useEscapeKey(() => {
        dispatch(setUsernameFilter(''));
    });

    return (
        <Row
            align="middle"
            justify="center"
            style={{ marginBottom: 20 }}
        >
            <Col span={12}>
                <Input
                    placeholder={'Filter by username...'}
                    value={usernameFilter}
                    onChange={(e) => dispatch(setUsernameFilter(e.currentTarget.value))}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col>
                <Button 
                    type="default"
                    onClick={(e) => dispatch(setUsernameFilter(''))}
                >
                    Clear Filter
                </Button>
            </Col>
        </Row>
    );
};