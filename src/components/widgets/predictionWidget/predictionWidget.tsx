import './predictionWidget.less';

import * as React from 'react';

import { Statistic, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../types/thunk';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { getActivePrediction } from '../../../store/modules/predictionModule';

export const PredictionWidget: React.FC = (props) => {
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

    if (isLoadingPrediction || !currentPrediction) {
        return <></>;
    }

    return (
        <div className="prediction-widget">
            <Statistic
                title="Prediction:"
                value={currentPrediction.title}
                prefix={<QuestionCircleOutlined />}
            />
        </div>
        
    );
};