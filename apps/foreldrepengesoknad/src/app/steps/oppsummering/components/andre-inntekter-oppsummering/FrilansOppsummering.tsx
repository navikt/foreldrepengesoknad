import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-common';
import { ArbeidsforholdOgInntektFp } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { Frilans } from '@navikt/fp-steg-frilans';

import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektFp;
    frilans?: Frilans;
}

const FrilansOppsummering: FunctionComponent<Props> = ({ arbeidsforholdOgInntekt, frilans }) => {
    const intl = useIntl();

    if (!arbeidsforholdOgInntekt.harJobbetSomFrilans || !frilans) {
        return (
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.frilans.tittel' })}>
                <BodyShort>{intl.formatMessage({ id: 'oppsummering.frilans.ikkeFrilans' })}</BodyShort>
            </OppsummeringsPunkt>
        );
    }
    const { oppstart, jobberFremdelesSomFrilans } = frilans;

    return (
        <>
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.frilans.tittel' })} />
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.frilans.oppstartsdato' })}>
                <BodyShort>{formatDate(oppstart)}</BodyShort>
            </OppsummeringsPunkt>
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.frilans.fremdelesFrilans' })}>
                <BodyShort>
                    {jobberFremdelesSomFrilans ? intl.formatMessage({ id: 'ja' }) : intl.formatMessage({ id: 'nei' })}
                </BodyShort>
            </OppsummeringsPunkt>
        </>
    );
};

export default FrilansOppsummering;
