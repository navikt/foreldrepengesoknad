import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-common';
import { ArbeidsforholdOgInntektFp } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { EgenNæring } from '@navikt/fp-steg-egen-naering';

import OppsummeringsPunkt from '../OppsummeringsPunkt';
import InntekterTabell from './InntekterTabell';
import Næringsdetaljer from './Næringsdetaljer';

interface Props {
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektFp;
    egenNæring?: EgenNæring;
}

const SelvstendigNæringsdrivendeOppsummering: FunctionComponent<Props> = ({ arbeidsforholdOgInntekt, egenNæring }) => {
    const intl = useIntl();

    if (!arbeidsforholdOgInntekt.harJobbetSomSelvstendigNæringsdrivende || !egenNæring) {
        return (
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.tittel' })}>
                <BodyShort>
                    {intl.formatMessage({
                        id: 'oppsummering.selvstendigNæringsdrivende.ikkeSelvstendigNæringsdrivende',
                    })}
                </BodyShort>
            </OppsummeringsPunkt>
        );
    }

    return (
        <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.tittel' })}>
            <InntekterTabell
                list={[
                    {
                        key: egenNæring.navnPåNæringen + egenNæring.fomDato + egenNæring.tomDato,
                        headerVenstre: egenNæring.navnPåNæringen || '',
                        headerHøyre: intl.formatMessage(
                            { id: 'tidsintervall' },
                            {
                                fom: formatDate(egenNæring.fomDato),
                                tom: egenNæring.pågående
                                    ? intl.formatMessage({ id: 'pågående' })
                                    : formatDate(egenNæring.tomDato),
                            },
                        ),
                        content: <Næringsdetaljer egenNæring={egenNæring} />,
                    },
                ]}
            />
        </OppsummeringsPunkt>
    );
};

export default SelvstendigNæringsdrivendeOppsummering;
