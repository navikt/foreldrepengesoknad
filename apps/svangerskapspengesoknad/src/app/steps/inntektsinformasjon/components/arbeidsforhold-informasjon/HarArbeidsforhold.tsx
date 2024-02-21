import { BodyShort, Box, HStack, VStack } from '@navikt/ds-react';
import { bemUtils, formatDate } from '@navikt/fp-common';
import { Arbeidsforhold } from '@navikt/fp-types';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import './harArbeidsforhold.css';

interface Props {
    arbeidsforhold: Arbeidsforhold[];
    harArbeidsforhold: boolean;
}

const HarArbeidsforhold: FunctionComponent<Props> = ({ arbeidsforhold, harArbeidsforhold }: Props) => {
    const intl = useIntl();

    if (!harArbeidsforhold) {
        return null;
    }

    const bem = bemUtils('arbeidsforholdInfoBox');

    return (
        <VStack gap="2">
            {arbeidsforhold.map((arbforhold) => (
                <Box
                    key={arbforhold.arbeidsgiverId + arbforhold.fom + arbforhold.tom}
                    padding="4"
                    background="surface-action-subtle"
                    borderRadius="medium"
                >
                    <VStack gap="4">
                        <HStack justify="space-between">
                            <BodyShort className={bem.element('name')}>
                                {arbforhold.arbeidsgiverIdType === 'orgnr' || arbforhold.arbeidsgiverNavn ? (
                                    arbforhold.arbeidsgiverNavn
                                ) : (
                                    <FormattedMessage id="privat.arbeidsgiver" />
                                )}
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage
                                    id="inntektsinformasjon.arbeidsforhold.stillingsprosent"
                                    values={{
                                        stillingsprosent: arbforhold.stillingsprosent,
                                    }}
                                />
                            </BodyShort>
                        </HStack>
                        {arbforhold.arbeidsgiverIdType === 'orgnr' && (
                            <BodyShort>
                                <FormattedMessage
                                    id="inntektsinformasjon.arbeidsforhold.organisasjonsnummer"
                                    values={{
                                        organisasjonsnummer: arbforhold.arbeidsgiverId,
                                    }}
                                />
                            </BodyShort>
                        )}
                        <BodyShort>
                            <FormattedMessage
                                id="inntektsinformasjon.arbeidsforhold.periode"
                                values={{
                                    fom: formatDate(arbforhold.fom),
                                    tom: arbforhold.tom
                                        ? formatDate(arbforhold.tom)
                                        : intl.formatMessage({ id: 'pågående' }),
                                }}
                            />
                        </BodyShort>
                    </VStack>
                </Box>
            ))}
        </VStack>
    );
};
export default HarArbeidsforhold;
