import { intlUtils } from '@navikt/fp-common';
import HarArbeidsforhold from 'app/steps/inntektsinformasjon/components/arbeidsforhold-informasjon/HarArbeidsforhold';
import HarIkkeArbeidsforhold from 'app/steps/inntektsinformasjon/components/arbeidsforhold-informasjon/HarIkkeArbeidsforhold';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import FrilansOppsummering from './FrilansOppsummering';

const ArbeidsforholdOgAndreInntekterOppsummering: FunctionComponent = () => {
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

    return (
        <>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.inntekt.registrerteArbeidsforhold')}>
                <HarIkkeArbeidsforhold harArbeidsforhold={harArbeidsforhold} />
                <HarArbeidsforhold harArbeidsforhold={harArbeidsforhold} arbeidsforhold={arbeidsforhold} />
            </OppsummeringsPunkt>
            <FrilansOppsummering />
        </>
    );
};

export default ArbeidsforholdOgAndreInntekterOppsummering;
