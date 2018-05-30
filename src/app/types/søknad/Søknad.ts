import ISøknadsvedlegg from './Søknadsvedlegg';
import AnnenForelder, { AnnenForelderPartial } from './AnnenForelder';

import Utenlandsopphold, { UtenlandsoppholdPartial } from './Utenlandsopphold';
import { Periode } from 'uttaksplan/types';
import { BarnPartial, Barn } from './Barn';

type Foreldrepengesøknad = 'foreldrepengesøknad';

export enum SøkerRolle {
    MOR = 'MOR',
    MOR2 = 'MOR2',
    FAR = 'FAR',
    FAR2 = 'FAR2',
    MEDMOR = 'MEDMOR',
    MEDFAR = 'MEDFAR',
    FORESATT = 'FORESATT',
    FORESATT2 = 'FORESATT2'
}

export enum Søkersituasjon {
    FØDSEL = 'fødsel',
    ADOPSJON = 'adopsjon',
    STEBARN = 'stebarn',
    FORELDREANSVAR = 'foreldreansvar'
}

interface Søknad {
    type: Foreldrepengesøknad;
    harGodkjentVilkår: boolean;
    annenForelder: AnnenForelder;
    situasjon: Søkersituasjon;
    barn: Barn;
    utenlandsopphold: Utenlandsopphold;
    uttaksplan: Periode[];
    vedlegg: ISøknadsvedlegg;
    søkerRolle: SøkerRolle;
    erSelvstendigNæringsdrivende: boolean;
    erFrilanser: boolean;
    erMorForSyk: boolean;
}

export interface SøknadPartial {
    type?: Foreldrepengesøknad;
    annenForelder: AnnenForelderPartial;
    situasjon?: Søkersituasjon;
    harGodkjentVilkår: boolean;
    barn: BarnPartial;
    utenlandsopphold: UtenlandsoppholdPartial;
    uttaksplan?: Periode[];
    vedlegg: ISøknadsvedlegg;
    søkerRolle?: SøkerRolle;
    erSelvstendigNæringsdrivende?: boolean;
    erFrilanser?: boolean;
    erMorForSyk?: boolean;
}

export type Skjemadata = Partial<Søknad>;

export default Søknad;
