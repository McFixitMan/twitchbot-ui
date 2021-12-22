import * as React from 'react';

import { Button, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../types/thunk';

import { PageWrapper } from '../../components/pageWrapper';
import { getCurrentQueueItems } from '../../store/modules/queueModule';

interface QueueInfoPageProps {

}

export const QueueInfoPage: React.FC<QueueInfoPageProps> = (props) => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state) => state.queue.isLoading);
    const queueItems = useAppSelector((state) => state.queue.currentQueueItems);

    return (
        <PageWrapper
            pageTitle="Queue Info"
            isLoading={isLoading}
        >
            <div>
                <Button
                    type="primary"
                    onClick={async () => {
                        const action = await dispatch(getCurrentQueueItems());

                        if (getCurrentQueueItems.rejected.match(action)) {
                            // Rejected
                            message.error(`Error loading queue items: ${action.payload?.response?.data.message}`);

                            return;
                        } else if (getCurrentQueueItems.fulfilled.match(action)) {
                            // Finished
                            message.success('Loaded queue items');
                        }
                    }}
                >
                    Load?
                </Button>
            </div>

            <ul>
                {queueItems?.map((item) => {
                    return (
                        <li key={item.id}>{item.username}: {item.levelCode}</li>
                    );
                })}
            </ul>
        </PageWrapper>
    );
};