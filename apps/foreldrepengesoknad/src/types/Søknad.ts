import { AndreInntektskilder } from 'types/AndreInntektskilder';
import { VedleggDataType } from 'types/VedleggDataType';

import { AnnenForelder, Barn, Periode, Søkersituasjon } from '@navikt/fp-common';
import {
    ArbeidsforholdOgInntektFp,
    Dekningsgrad,
    Frilans,
    NæringDto,
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

export interface Søknad {
    type: 'foreldrepenger';
    harGodkjentVilkår: boolean;
    søkersituasjon: Søkersituasjon;
    barn: Barn;
    annenForelder: AnnenForelder;
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektFp;
    egenNæring: NæringDto;
    frilans: Frilans;
    andreInntektskilder: AndreInntektskilder[];
    utenlandsopphold: Utenlandsopphold;
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[];
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
    erEndringssøknad: boolean;
    dekningsgrad: Dekningsgrad;
    uttaksplan: Periode[];
    uttaksplanNy?: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    saksnummer?: string;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    vedlegg: VedleggDataType;
    manglerDokumentasjon: boolean;
}
