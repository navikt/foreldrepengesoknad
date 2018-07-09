import { StegID } from '../../../util/routing/stegConfig';

export enum SummaryActionKeys {
    'EXPAND_SUMMARY' = 'expandSummary',
    'APPROVE_STEP' = 'approveStep',
    'FLAG_STEP' = 'flagStep'
}

interface ApproveSummary {
    type: SummaryActionKeys.APPROVE_STEP;
    stegID: StegID;
}

interface FlagSummary {
    type: SummaryActionKeys.FLAG_STEP;
}

export type SummaryActionTypes = ApproveSummary | FlagSummary;
