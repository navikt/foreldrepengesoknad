import { StegID } from '../../../util/routing/stegConfig';
import { SummaryState } from '../../reducers/summaryReducer';

export enum SummaryActionKeys {
    'EXPAND_SUMMARY' = 'expandSummary',
    'APPROVE_STEP' = 'approveStep',
    'FLAG_STEP' = 'flagStep',
    'UPDATE_SUMMARY' = 'updateSummary'
}

interface ApproveSummary {
    type: SummaryActionKeys.APPROVE_STEP;
    stegID: StegID;
}

interface FlagSummary {
    type: SummaryActionKeys.FLAG_STEP;
}

interface UpdateSummary {
    type: SummaryActionKeys.UPDATE_SUMMARY;
    payload: SummaryState;
}

export type SummaryActionTypes = ApproveSummary | FlagSummary | UpdateSummary;
