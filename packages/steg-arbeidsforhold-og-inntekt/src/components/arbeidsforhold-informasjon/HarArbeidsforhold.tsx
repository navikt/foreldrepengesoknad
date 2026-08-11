import { BriefcaseClockIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, HStack, Heading, Label, Tag, VStack } from '@navikt/ds-react';

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
                    className="border border-ax-border-info-subtle bg-ax-bg-info-soft rounded-(--ax-radius-12)"
                >
                    <VStack gap="space-16">
                        <Heading size="xsmall" level="3">
                            {arbforhold.arbeidsgiverIdType === 'orgnr' || arbforhold.arbeidsgiverNavn ? (
                                capitalizeFirstLetterInEveryWordOnly(arbforhold.arbeidsgiverNavn)
                            ) : (
                                <FormattedMessage id="HarArbeidsforhold.arbeidsgiver" />
                            )}
                        </Heading>
                        <Tag
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 w-max"
                            icon={<BriefcaseClockIcon aria-hidden />}
                            variant="info"
                        >
                            Arbeidstaker{' '}
                            <FormattedMessage
                                id="inntektsinformasjon.arbeidsforhold.stillingsprosent"
                                values={{
                                    stillingsprosent: arbforhold.stillingsprosent,
                                }}
                            />
                        </Tag>
                        {arbforhold.arbeidsgiverIdType === 'orgnr' && (
                            <HStack justify="space-between">
                                <Label>Org.nummer</Label>
                                <BodyShort className="text-ax-text-neutral-subtle" size="small">
                                    {arbforhold.arbeidsgiverId}
                                </BodyShort>
                            </HStack>
                        )}
                        <HStack justify="space-between">
                            <Label>Dato:</Label>
                            <BodyShort className="text-ax-text-neutral-subtle" size="small">
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
                        </HStack>
                    </VStack>
                </Box>
            ))}
        </VStack>
    );
};
