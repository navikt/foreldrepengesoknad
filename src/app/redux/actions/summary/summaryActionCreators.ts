import {
    SummaryActionKeys,
    SummaryActionTypes
} from './summaryActionDefinitions';
import { StegID } from '../../../util/routing/stegConfig';

export function approveSteg(stegID: StegID): SummaryActionTypes {
    return {
        type: SummaryActionKeys.APPROVE_STEP,
        stegID
    };
}

export default {
    approveSteg
};
