import './predictionAlert.less';

import * as React from 'react';

import { Alert, Button, Space, Spin, message } from 'antd';
import { cancelPrediction, getActivePrediction, resolvePrediction } from '../../store/modules/predictionModule';
import { useAppDispatch, useAppSelector } from '../../types/thunk';

export const PredictionAlert: React.FC = (props) => {
    const dispatch = useAppDispatch();

    const isLoadingPrediction = useAppSelector((state) => state.prediction.isLoading);
    const currentPrediction = useAppSelector((state) => state.prediction.currentPrediction);

    React.useEffect(() => {
        const loadPrediction = async (): Promise<void> => {
            const action = await dispatch(getActivePrediction());

            if (getActivePrediction.rejected.match(action)) {
                message.error(`Error loading prediction: ${action.payload?.response?.data.message ?? action.error.message}`);
            }
        };

        loadPrediction();
    }, []);

    if (isLoadingPrediction) {
        return (
            <Alert
                className="prediction-alert"
                description={
                    <div>
                        <span className="prediction-title">Active Prediction:</span> <span className="prediction-text"><Spin /> Loading ...</span>
                    </div>
                }
                showIcon={true}
                type="info"
                action={
                    <Space 
                        direction="horizontal"
                    >
                        <Button
                            size="small"
                            type="ghost"
                            disabled={true}
                            style={{ minWidth: '100px' }}
                        >
                            Outcome 1
                        </Button>

                        <Button
                            size="small"
                            type="ghost"
                            disabled={true}
                            style={{ minWidth: '100px' }}
                        >
                            Outcome 2
                        </Button>
                    </Space>
                }
            />
        );
        
    }

    if (!currentPrediction) {
        return <></>;
    }

    return (
        <Alert
            className="prediction-alert"
            description={
                <div>
                    <span className="prediction-title">Active Prediction:</span> <span className="prediction-text">{currentPrediction.title}</span>
                </div>
            }
            type="info"
            showIcon={true}
            action={
                <Space 
                    direction="horizontal"
                >
                    <Button 
                        size="small" 
                        type="primary"
                        style={{ minWidth: '100px' }}
                        onClick={async () => {
                            const action = await dispatch(resolvePrediction(1));

                            if (resolvePrediction.rejected.match(action)) {
                                message.error(`Error resolving prediction: ${action.payload?.response?.data.message ?? action.error.message}`);
                            }
                        }}
                    >
                        {currentPrediction.outcome1}
                    </Button>

                    <Button 
                        size="small" 
                        type="primary" 
                        danger={true}
                        style={{ minWidth: '100px' }}
                        onClick={async () => {
                            const action = await dispatch(resolvePrediction(2));

                            if (resolvePrediction.rejected.match(action)) {
                                message.error(`Error resolving prediction: ${action.payload?.response?.data.message ?? action.error.message}`);
                            }
                        }}
                    >
                        {currentPrediction.outcome2}
                    </Button>

                    <Button 
                        size="small" 
                        type="ghost" 
                        style={{ minWidth: '100px' }}
                        onClick={async () => {
                            const action = await dispatch(cancelPrediction());

                            if (cancelPrediction.rejected.match(action)) {
                                message.error(`Error cancelling prediction: ${action.payload?.response?.data.message ?? action.error.message}`);
                            }
                        }}
                    >
                        Cancel
                    </Button>
                </Space>
            }
        />
    );
};