import * as React from 'react';

import { PageWrapper } from '../../components/pageWrapper';

interface QueueInfoPageProps {

}

export const QueueInfoPage: React.FC<QueueInfoPageProps> = (props) => {
    return (
        <PageWrapper
            pageTitle="Queue Info"
        >
            <div>Queue Info Page!</div>
        </PageWrapper>
    );
};