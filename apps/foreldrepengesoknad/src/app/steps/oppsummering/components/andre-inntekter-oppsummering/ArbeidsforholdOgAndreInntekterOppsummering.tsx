import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { VStack } from '@navikt/ds-react';

import { Barn, ISOStringToDate, getAktiveArbeidsforhold, isFarEllerMedmor } from '@navikt/fp-common';
import { Arbeidsforhold, SøkersituasjonFp } from '@navikt/fp-types';

import SøkerData from 'app/context/types/SøkerData';
import HarArbeidsforhold from 'app/steps/inntektsinformasjon/components/arbeidsforhold-informasjon/HarArbeidsforhold';
import HarIkkeArbeidsforhold from 'app/steps/inntektsinformasjon/components/arbeidsforhold-informasjon/HarIkkeArbeidsforhold';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';

import OppsummeringsPunkt from '../OppsummeringsPunkt';
import AndreInntekterOppsummering from './AndreInntekterOppsummering';
import FrilansOppsummering from './FrilansOppsummering';
import SelvstendigNæringsdrivendeOppsummering from './SelvstendigNæringsdrivendeOppsummering';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    barn: Barn;
    søkersituasjon: SøkersituasjonFp;
    søkerData?: SøkerData;
}

const ArbeidsforholdOgAndreInntekterOppsummering: FunctionComponent<Props> = ({
    arbeidsforhold,
    barn,
    søkersituasjon,
    søkerData,
}) => {
    const intl = useIntl();

    if (!søkerData) {
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
                <FrilansOppsummering søkerData={søkerData} />
                <SelvstendigNæringsdrivendeOppsummering søkerData={søkerData} />
                <AndreInntekterOppsummering søkerData={søkerData} />
            </VStack>
        </>
    );
};

export default ArbeidsforholdOgAndreInntekterOppsummering;
