import { SummaryActionKeys, SummaryActionTypes } from './summaryActionDefinitions';
import { StegID } from '../../../util/routing/stegConfig';
import { SummaryState } from '../../reducers/summaryReducer';

export function approveSteg(stegID: StegID): SummaryActionTypes {
    return {
        type: SummaryActionKeys.APPROVE_STEP,
        stegID
    };
}

export function updateSummary(payload: SummaryState): SummaryActionTypes {
    return {
        type: SummaryActionKeys.UPDATE_SUMMARY,
        payload
    };
}

export default {
    approveSteg,
    updateSummary
};
