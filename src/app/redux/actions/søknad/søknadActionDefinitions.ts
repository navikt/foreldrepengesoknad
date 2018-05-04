import { SøkerPartial } from '../../../types/søknad/Søknad';

export enum SøknadActionKeys {
    'UPDATE_SØKER' = 'updateSøker'
}

export interface UpdateSøker {
    type: SøknadActionKeys.UPDATE_SØKER;
    payload: SøkerPartial;
}

export type SøknadAction = UpdateSøker;
