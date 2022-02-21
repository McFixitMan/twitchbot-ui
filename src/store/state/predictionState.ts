import { Prediction } from '../../entities/prediction';

export interface PredictionState {
    isLoading: boolean;
    currentPrediction: Prediction | undefined;
}