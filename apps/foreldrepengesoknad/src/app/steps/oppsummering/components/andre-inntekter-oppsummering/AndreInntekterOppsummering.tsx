import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { ISOStringToDate } from '@navikt/fp-common';
import { ArbeidsforholdOgInntektFp } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { formatDate } from '@navikt/fp-utils';

import { AndreInntektskilder, AnnenInntektType } from 'app/types/AndreInntektskilder';

import OppsummeringsPunkt from '../OppsummeringsPunkt';
import AnnenInntektDetaljer from './AnnenInntektDetaljer';
import InntekterTabell from './InntekterTabell';

interface Props {
    arbeidsforholdOgInntekt: ArbeidsforholdOgInntektFp;
    andreInntektskilder?: AndreInntektskilder[];
}

const AndreInntekterOppsummering: FunctionComponent<Props> = ({ arbeidsforholdOgInntekt, andreInntektskilder }) => {
    const intl = useIntl();

    if (!arbeidsforholdOgInntekt.harHattAndreInntektskilder || !andreInntektskilder) {
        return (
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.andreInntekter.tittel' })}>
                <BodyShort>
                    <FormattedMessage id="oppsummering.andreInntekter.ikkeHattAndreInntekter" />
                </BodyShort>
            </OppsummeringsPunkt>
        );
    }

    return (
        <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.andreInntekter.tittel' })}>
            <InntekterTabell
                list={andreInntektskilder.map((annenInntekt) => ({
                    key: annenInntekt.type + annenInntekt.fom + annenInntekt.tom,
                    headerVenstre: intl.formatMessage({ id: `inntektstype.${annenInntekt.type.toLowerCase()}` }),
                    headerHøyre: intl.formatMessage(
                        { id: 'tidsintervall' },
                        {
                            fom: formatDate(ISOStringToDate(annenInntekt.fom)!),
                            tom:
                                annenInntekt.type !== AnnenInntektType.SLUTTPAKKE && annenInntekt.pågående
                                    ? intl.formatMessage({ id: 'pågående' })
                                    : formatDate(ISOStringToDate(annenInntekt.tom)!),
                        },
                    ),
                    content: <AnnenInntektDetaljer annenInntekt={annenInntekt} />,
                }))}
            />
        </OppsummeringsPunkt>
    );
};

export default AndreInntekterOppsummering;
