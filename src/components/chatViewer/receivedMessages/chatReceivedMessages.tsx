import * as React from 'react';

import { Button, Col, Empty, Row } from 'antd';

import AutoSizer from 'react-virtualized-auto-sizer';
import { ChatMessage } from '../../../entities/chatMessage';
import { ChatRow } from './chatRow';
import { VariableSizeList } from 'react-window';
import { useAppSelector } from '../../../types/thunk';

// NOTE:
// 
// Lots of virtualization stuff taken from here:
// https://codesandbox.io/s/xlfkq?file=/src/components/ListRow.tsx:280-285
// 
// Have a nice day.





export const DynamicListContext = React.createContext<Partial<{ setSize: (index: number, size: number) => void }>>({});

export const ChatReceivedMessages: React.FC = (props) => {
    const listRef = React.useRef<VariableSizeList>(null);
    const sizeMap = React.useRef<{ [key: string]: number }>({});

    const setSize = React.useCallback((index: number, size: number) => {
        // Performance: Only update the sizeMap and reset cache if an actual value changed
        if (!!sizeMap.current) {
            if (sizeMap.current[index] !== size) {
                sizeMap.current = { ...sizeMap.current, [index]: size };
                if (listRef.current) {
                    // Clear cached data and rerender
                    listRef.current.resetAfterIndex(0);
                }
            }
        }
    }, []);

    const getSize = React.useCallback((index) => {
        return sizeMap.current[index] || 10;
    }, []);

    // Increases accuracy by calculating an average row height
    // Fixes the scrollbar behaviour described here: https://github.com/bvaughn/react-window/issues/408
    const calcEstimatedSize = React.useCallback(() => {
        const keys = Object.keys(sizeMap.current);
        const estimatedHeight = keys.reduce((p, i) => p + sizeMap.current[i], 0);
        return estimatedHeight / keys.length;
    }, []);

    const chatMessages = useAppSelector((state) => state.chat.chatMessages);
    const usernameFilter = useAppSelector((state) => state.chat.usernameFilter);

    const [isAutoScrolling, setIsAutoScrolling] = React.useState(true);
    

    const scrollToBottom = (): void => {
        listRef.current?.scrollToItem(chatMessages.length - 1, 'smart');
    };

    React.useEffect(() => {
        if (isAutoScrolling) {
            // Scroll to bottom when chatMessages changes
            scrollToBottom();
        }
    }, [chatMessages]);


    const messageFilter = (value: ChatMessage): boolean => {
        return !!usernameFilter
            ? value.username.toLowerCase().includes(usernameFilter.toLowerCase())
            : true;
    };

    const filteredMessages = chatMessages.filter(messageFilter);

    return (
        <DynamicListContext.Provider value={{ setSize }}>
            <div>                
                <Row>
                    {chatMessages.length === 0 &&
                        <Col span={24} style={{ height: '40vh' }}>
                            <Empty description="No Messages Received" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </Col>
                    }
                    {chatMessages.length > 0 &&
                    <Col span={24} style={{ height: '40vh' }}>
                        <AutoSizer>
                            {({ height, width }) => (
                                <VariableSizeList
                                    ref={listRef}
                                    width={width}
                                    height={height}
                                    itemData={filteredMessages}
                                    itemCount={filteredMessages.length}
                                    itemSize={getSize}
                                    overscanCount={4}
                                    estimatedItemSize={calcEstimatedSize()}
                                >
                                    {({ ...props }) => <ChatRow {...props} width={width} />}
                                </VariableSizeList>
                            )}
                        </AutoSizer>
                    </Col>
                    }
                </Row>

                <Row
                    align="middle"
                    justify="center"
                    gutter={10}
                    style={{ margin: 15 }}
                >
                    <Col>
                        {isAutoScrolling
                            ?
                            <Button 
                                type="primary" 
                                danger={true}
                                onClick={() => setIsAutoScrolling(false)}
                            >
                                Pause Autoscroll
                            </Button>
                            :
                            <Button 
                                type="primary" 
                                onClick={() => setIsAutoScrolling(true)}
                            >
                                Resume Autoscroll
                            </Button>
                        }
                    </Col>
                    <Col>
                        <Button
                            onClick={() => scrollToBottom()}
                        >
                            Scroll to Bottom
                        </Button>
                    </Col>
                </Row>
                  
            </div>
        </DynamicListContext.Provider>
        
    );
};