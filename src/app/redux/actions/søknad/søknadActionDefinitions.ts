import { SøkerPartial } from '../../../types/søknad/Søknad';
import { BarnPartial } from '../../../types/søknad/Barn';

export enum SøknadActionKeys {
    'UPDATE_BARN' = 'updateBarn',
    'UPDATE_SØKER' = 'updateSøker'
}

export interface UpdateSøker {
    type: SøknadActionKeys.UPDATE_SØKER;
    payload: SøkerPartial;
}

export interface UpdateBarn {
    type: SøknadActionKeys.UPDATE_BARN;
    payload: BarnPartial;
}

export type SøknadAction = UpdateSøker | UpdateBarn;
