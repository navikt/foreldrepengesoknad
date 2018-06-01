import { Skjemadata } from '../../../types/søknad/Søknad';
import { BarnPartial } from '../../../types/søknad/Barn';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { UtenlandsoppholdPartial } from '../../../types/søknad/Utenlandsopphold';

export enum SøknadActionKeys {
    'UPDATE_ANNEN_FORELDER' = 'updateAnnenForelder',
    'UPDATE_BARN' = 'updateBarn',
    'UPDATE_VEDLEGG' = 'updateVedlegg',
    'UPDATE_UTENLANDSOPPHOLD' = 'updateUtenlandsopphold',
    'UPDATE_SØKNAD' = 'updateSøknad'
}

export interface UpdateBarn {
    type: SøknadActionKeys.UPDATE_BARN;
    payload: BarnPartial;
}

export interface UpdateAnnenForelder {
    type: SøknadActionKeys.UPDATE_ANNEN_FORELDER;
    payload: AnnenForelderPartial;
}

export interface UpdateUtenlandsopphold {
    type: SøknadActionKeys.UPDATE_UTENLANDSOPPHOLD;
    payload: UtenlandsoppholdPartial;
}

export interface UpdateSøknad {
    type: SøknadActionKeys.UPDATE_SØKNAD;
    payload: Skjemadata;
}

export type SøknadAction =
    | UpdateBarn
    | UpdateSøknad
    | UpdateAnnenForelder
    | UpdateUtenlandsopphold;
