import { AndreInntektskilder } from 'types/AndreInntektskilder';
import { VedleggDataType } from 'types/VedleggDataType';

import { AnnenForelder, Barn } from '@navikt/fp-common';
import {
    ArbeidsforholdOgInntektFp,
    Dekningsgrad,
    Frilans,
    NæringDto,
    SøkersituasjonFp,
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
} from '@navikt/fp-types';

export interface Søknad {
    type: 'foreldrepenger';
    harGodkjentVilkår: boolean;
    søkersituasjon: SøkersituasjonFp;
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
    saksnummer?: string;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    vedlegg: VedleggDataType;
    manglerDokumentasjon: boolean;
}
