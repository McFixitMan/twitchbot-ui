import * as React from 'react';

import { Button, Col, Divider, Input, List, Row, Tooltip, message } from 'antd';
import { getChatters, permitLink } from '../../../store/modules/chatModule';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

import { RoleTag } from '../../roleTag';
import { getDateDifferenceTimeString } from '../../../utility/dateHelper';
import { useEscapeKey } from '../../../hooks/useEscapeKey';

export const Chatters: React.FC = (props) => {
    const dispatch = useAppDispatch();

    const chatters = useAppSelector((state) => state.chat.chatters);
    const isLoading = useAppSelector((state) => state.chat.isLoadingChatters);

    const [nextRefresh, setNextRefresh] = React.useState<Date>();
    const [timeToRefresh, setTimeToRefresh] = React.useState('');
    const [requestRefresh, setRequestRefresh] = React.useState(true);
    const [usernameFilter, setUsernameFilter] = React.useState('');

    useEscapeKey(() => {
        setUsernameFilter('');
    });

    let isMounted = false;

    const loadChattersAsync = async(): Promise<void> => {
        const action = await dispatch(getChatters());

        if (getChatters.rejected.match(action)) {
            message.error(`Error loading chatters: ${action.payload?.response?.data.message ?? action.error.message}`);
        } else {
            const now = new Date();
            now.setTime(now.getTime() + (1000 * 120));
            setNextRefresh(now);
        }
    };

    React.useEffect(() => {
        isMounted = true;

        return () => {
            isMounted = false;
        };
    }, []);

    React.useEffect(() => {
        const timer = setInterval(async () => {
            if (!!nextRefresh && isMounted) {

                const now = new Date();

                if (now >= nextRefresh) {
                    setNextRefresh(undefined);
                    setTimeToRefresh('');
                    setRequestRefresh(true);
                } else {
                    setTimeToRefresh(getDateDifferenceTimeString(now, nextRefresh));
                }
            }
        }, 1000);

        if (requestRefresh === true) {
            setRequestRefresh(false);
            loadChattersAsync();
        }

        return () => {
            clearInterval(timer);
        };
    }, [requestRefresh, nextRefresh]);

    return (
        <Row>
            <Col 
                span={24}
                style={{ textAlign: 'center' }}
            >
                Refreshing in {timeToRefresh}...
            </Col>
            <Col span={24}>
                <Divider style={{ fontSize: '2em' }}>{chatters.length} Chatters</Divider>
            </Col>
            <Col span={24}>
                <Row
                    align="middle"
                    justify="center"
                    style={{ marginBottom: 20 }}
                >
                    <Col>
                        <Input
                            placeholder={'Filter by username...'}
                            value={usernameFilter}
                            onChange={(e) => setUsernameFilter(e.currentTarget.value)}
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col>
                        <Button 
                            type="default"
                            onClick={(e) => setUsernameFilter('')}
                        >
                        Clear Filter
                        </Button>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <List
                    loading={isLoading}
                    dataSource={!!usernameFilter ? chatters.filter(x => x.username.toLowerCase().includes(usernameFilter.toLowerCase())) : chatters}
                    renderItem={(chatter) => {
                        const actionRow: Array<React.ReactNode> = [
                            <Tooltip key="permit" title={`Permit ${chatter.username} to send one link within 60 seconds`}>
                                <Button 
                                    size="small"
                                    onClick={async () => {
                                        const action = await dispatch(permitLink(chatter.username));

                                        if (permitLink.rejected.match(action)) {
                                            message.error(`Error permitting link: ${action.payload?.response?.data.message ?? action.error.message}`);
                                        }
                                    }}
                                >
                                    Permit
                                </Button>
                            </Tooltip>
                            ,
                        ];

                        if (chatter.isMod) {
                            actionRow.push(
                                <RoleTag 
                                    type="mod"
                                    key="mod"
                                    showText={false}
                                />
                            );
                        }
                        if (chatter.isVip) {
                            actionRow.push(
                                <RoleTag 
                                    type="vip"
                                    key="vip"
                                    showText={false}
                                />
                            );
                        }
                        if (chatter.isAdmin || chatter.isGlobalMod || chatter.isStaff) {
                            actionRow.push(
                                <RoleTag
                                    type="twitch"
                                    key="twitch"
                                    showText={false}
                                />
                            );
                        }

                        return (
                            <List.Item
                                actions={actionRow}
                            >
                                {chatter.username}
                            </List.Item>
                        );
                        
                    }}
                />
            </Col>
            
        </Row>
    );
};