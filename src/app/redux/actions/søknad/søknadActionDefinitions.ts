import { SøkerPartial, SøknadPartial } from '../../../types/søknad/Søknad';
import { BarnPartial } from '../../../types/søknad/Barn';
import { VedleggPartial } from '../../../types/søknad/Vedlegg';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { UtenlandsoppholdPartial } from '../../../types/søknad/Utenlandsopphold';

export enum SøknadActionKeys {
    'UPDATE_ANNEN_FORELDER' = 'updateAnnenForelder',
    'UPDATE_BARN' = 'updateBarn',
    'UPDATE_SØKER' = 'updateSøker',
    'UPDATE_VEDLEGG' = 'updateVedlegg',
    'UPDATE_UTENLANDSOPPHOLD' = 'updateUtenlandsopphold',
    'UPDATE_SØKNAD' = 'updateSøknad'
}

export interface UpdateSøker {
    type: SøknadActionKeys.UPDATE_SØKER;
    payload: SøkerPartial;
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
    payload: SøknadPartial;
}

export interface UpdateVedlegg {
    type: SøknadActionKeys.UPDATE_VEDLEGG;
    payload: VedleggPartial;
}

export type SøknadAction =
    | UpdateSøker
    | UpdateBarn
    | UpdateSøknad
    | UpdateVedlegg
    | UpdateAnnenForelder
    | UpdateUtenlandsopphold;
