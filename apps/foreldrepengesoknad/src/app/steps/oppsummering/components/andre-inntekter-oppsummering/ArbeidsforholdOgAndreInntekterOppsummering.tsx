import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { Barn } from '@navikt/fp-common';
import {
    ArbeidsforholdOgInntektFp,
    HarArbeidsforhold,
    HarIkkeArbeidsforhold,
} from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { EgenNæring } from '@navikt/fp-steg-egen-naering';
import { Frilans } from '@navikt/fp-steg-frilans';
import { Arbeidsforhold, SøkersituasjonFp } from '@navikt/fp-types';

import { AndreInntektskilder } from 'app/types/AndreInntektskilder';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { ISOStringToDate } from 'app/utils/dateUtils';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';

import OppsummeringsPunkt from '../OppsummeringsPunkt';
import AndreInntekterOppsummering from './AndreInntekterOppsummering';
import FrilansOppsummering from './FrilansOppsummering';
import SelvstendigNæringsdrivendeOppsummering from './SelvstendigNæringsdrivendeOppsummering';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    barn: Barn;
    søkersituasjon: SøkersituasjonFp;
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektFp;
    frilans?: Frilans;
    egenNæring?: EgenNæring;
    andreInntektskilder?: AndreInntektskilder[];
}

const ArbeidsforholdOgAndreInntekterOppsummering: FunctionComponent<Props> = ({
    arbeidsforhold,
    barn,
    søkersituasjon,
    arbeidsforholdOgInntekt,
    frilans,
    egenNæring,
    andreInntektskilder,
}) => {
    const intl = useIntl();

    if (!arbeidsforholdOgInntekt) {
        return null;
    }

    const erAdopsjon = søkersituasjon.situasjon === 'adopsjon';
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const aktiveArbeidsForhold = getAktiveArbeidsforhold(
        arbeidsforhold,
        erAdopsjon,
        erFarEllerMedmor,
        ISOStringToDate(familiehendelsesdato),
    );
    const harArbeidsforhold = aktiveArbeidsForhold !== undefined && aktiveArbeidsForhold.length > 0;

    return (
        <>
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.inntekt.registrerteArbeidsforhold' })}>
                <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
                <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={aktiveArbeidsForhold} />
            </OppsummeringsPunkt>
            <VStack gap="4">
                <FrilansOppsummering arbeidsforholdOgInntekt={arbeidsforholdOgInntekt} frilans={frilans} />
                <SelvstendigNæringsdrivendeOppsummering
                    arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                    egenNæring={egenNæring}
                />
                <AndreInntekterOppsummering
                    arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                    andreInntektskilder={andreInntektskilder}
                />
            </VStack>
        </>
    );
};

export default ArbeidsforholdOgAndreInntekterOppsummering;
