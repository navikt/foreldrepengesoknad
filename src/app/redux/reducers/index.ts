import Søknad from '../../types/søknad/Søknad';
import søknad from './søknadReducer';
import common, { CommonState } from './commonReducer';
import api, { ApiReducerState } from './apiReducer';
import uttaksplan from 'uttaksplan/redux/reducers';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import attachments, {
    AttachmentReducerState
} from 'storage/attachment/redux/attachmentReducer';

interface MainState extends UttaksplanAppState {
    søknad: Søknad;
    common: CommonState;
    api: ApiReducerState;
    attachments: AttachmentReducerState;
}

export type AppState = MainState & UttaksplanAppState & AttachmentReducerState;

export default { søknad, common, api, uttaksplan, attachments };
