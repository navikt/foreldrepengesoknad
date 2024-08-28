import { AnnenForelder, Barn, Periode, Søkersituasjon } from '@navikt/fp-common';
import { ArbeidsforholdOgInntektFp } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { EgenNæring } from '@navikt/fp-steg-egen-naering';
import { Frilans } from '@navikt/fp-steg-frilans';
import { Dekningsgrad } from '@navikt/fp-types';

import { AndreInntektskilder } from 'app/types/AndreInntektskilder';
import { VedleggDataType } from 'app/types/VedleggDataType';

import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';

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
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    erEndringssøknad: boolean;
    dekningsgrad: Dekningsgrad;
    uttaksplan: Periode[];
    saksnummer?: string;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    vedlegg: VedleggDataType;
    manglerDokumentasjon: boolean;
}
