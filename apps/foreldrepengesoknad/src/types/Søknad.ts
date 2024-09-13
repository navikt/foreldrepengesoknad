import { AndreInntektskilder } from 'types/AndreInntektskilder';
import { VedleggDataType } from 'types/VedleggDataType';

import { AnnenForelder, Barn, Periode, Søkersituasjon } from '@navikt/fp-common';
import { ArbeidsforholdOgInntektFp } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { EgenNæring } from '@navikt/fp-steg-egen-naering';
import { Frilans } from '@navikt/fp-steg-frilans';
import { Dekningsgrad, Utenlandsopphold, UtenlandsoppholdSenere, UtenlandsoppholdTidligere } from '@navikt/fp-types';

export interface Søknad {
    type: 'foreldrepenger';
    harGodkjentVilkår: boolean;
    søkersituasjon: Søkersituasjon;
    barn: Barn;
    annenForelder: AnnenForelder;
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektFp;
    egenNæring: EgenNæring;
    frilans: Frilans;
    andreInntektskilder: AndreInntektskilder[];
    utenlandsOpphold: Utenlandsopphold;
    utenlandsoppholdNeste12Mnd: UtenlandsoppholdSenere;
    utenlandsoppholdSiste12Mnd: UtenlandsoppholdTidligere;
    erEndringssøknad: boolean;
    dekningsgrad: Dekningsgrad;
    uttaksplan: Periode[];
    saksnummer?: string;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    vedlegg: VedleggDataType;
    manglerDokumentasjon: boolean;
}
