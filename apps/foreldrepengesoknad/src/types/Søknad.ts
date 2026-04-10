import { AndreInntektskilder } from 'types/AndreInntektskilder';
import { VedleggDataType } from 'types/VedleggDataType';

import {
    ArbeidsforholdOgInntektFp,
    Barn,
    Dekningsgrad,
    Frilans,
    NæringDto,
    SøkersituasjonFp,
    Utenlandsopphold,
    UtenlandsoppholdPeriode,
} from '@navikt/fp-types';

import { AnnenForelder } from './AnnenForelder';

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
