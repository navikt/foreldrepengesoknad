import { createSelector } from 'reselect';
import { søknadSelector, selectPerioderSomSkalSendesInn } from './søknadSelector';
import { apiSelector } from './apiSelector';
import { selectSøknadsinfo } from './søknadsinfoSelector';
import Søknad from 'app/types/søknad/Søknad';
import { ApiState } from 'app/redux/reducers/apiReducer';
import { Søknadsinfo } from './types';
import { findMissingAttachments } from 'app/util/attachments/missingAttachmentUtil';

export const selectMissingAttachments = createSelector(
    [søknadSelector, apiSelector, selectSøknadsinfo, selectPerioderSomSkalSendesInn],
    (søknad: Søknad, api: ApiState, søknadsinfo: Søknadsinfo) => {
        return findMissingAttachments(søknad, api, søknadsinfo);
    }
);
