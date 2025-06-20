import { AndreInntektskilder } from 'types/AndreInntektskilder';
import { VedleggDataType } from 'types/VedleggDataType';

import { AnnenForelder, Barn, Periode, Søkersituasjon } from '@navikt/fp-common';
import { NæringFormValues } from '@navikt/fp-steg-egen-naering';
import {
    ArbeidsforholdOgInntektFp,
    Dekningsgrad,
    Frilans,
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
} from '@navikt/fp-types';

export interface Søknad {
    type: 'foreldrepenger';
    harGodkjentVilkår: boolean;
    søkersituasjon: Søkersituasjon;
    barn: Barn;
    annenForelder: AnnenForelder;
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektFp;
    egenNæring: NæringFormValues;
    frilans: Frilans;
    andreInntektskilder: AndreInntektskilder[];
    utenlandsopphold: Utenlandsopphold;
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdPeriode[];
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdPeriode[];
    erEndringssøknad: boolean;
    dekningsgrad: Dekningsgrad;
    uttaksplan: Periode[];
    saksnummer?: string;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    vedlegg: VedleggDataType;
    manglerDokumentasjon: boolean;
}
