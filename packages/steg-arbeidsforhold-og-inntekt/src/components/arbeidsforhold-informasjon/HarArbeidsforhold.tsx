import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

interface Props {
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    harArbeidsforhold: boolean;
}

export const HarArbeidsforhold = ({ arbeidsforhold, harArbeidsforhold }: Props) => {
    const intl = useIntl();

    if (!harArbeidsforhold) {
        return null;
    }

    return (
        <VStack gap="space-8">
            {arbeidsforhold.map((arbforhold) => (
                <Box
                    key={arbforhold.arbeidsgiverId + arbforhold.fom + arbforhold.fom}
                    padding="space-16"
                    background="brand-blue-moderate"
                    borderRadius="4"
                >
                    <VStack gap="space-16">
                        <HStack justify="space-between">
                            <Heading size="xsmall">
                                {arbforhold.arbeidsgiverIdType === 'orgnr' || arbforhold.arbeidsgiverNavn ? (
                                    capitalizeFirstLetterInEveryWordOnly(arbforhold.arbeidsgiverNavn)
                                ) : (
                                    <FormattedMessage id="HarArbeidsforhold.arbeidsgiver" />
                                )}
                            </Heading>
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
                                        : intl.formatMessage({ id: 'HarArbeidsforhold.pågående' }),
                                }}
                            />
                        </BodyShort>
                    </VStack>
                </Box>
            ))}
        </VStack>
    );
};
