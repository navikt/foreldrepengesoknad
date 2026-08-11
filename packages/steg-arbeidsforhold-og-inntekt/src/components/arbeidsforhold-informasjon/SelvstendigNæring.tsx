import { BriefcaseClockIcon, ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, HStack, Heading, InfoCard, Label, Tag, VStack } from '@navikt/ds-react';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

interface Props {
    selvstendigNæring: EksternArbeidsforholdDto_fpoversikt[];
}

export const SelvstendigNæring = ({ selvstendigNæring }: Props) => {
    const intl = useIntl();

    if (selvstendigNæring.length === 0) {
        return null;
    }

    return (
        <VStack gap="space-8">
            {selvstendigNæring.map((næring) => (
                <Box
                    key={`${næring.arbeidsgiverId}-${næring.fom}-${næring.tom ?? ''}`}
                    padding="space-16"
                    className="rounded-(--ax-radius-12) border border-ax-border-info-subtle bg-ax-bg-info-soft"
                >
                    <VStack gap="space-16">
                        <Heading size="xsmall" level="3">
                            {næring.arbeidsgiverNavn
                                ? capitalizeFirstLetterInEveryWordOnly(næring.arbeidsgiverNavn)
                                : intl.formatMessage({ id: 'inntektsinformasjon.egenNæring.label' })}
                        </Heading>
                        <Tag
                            className="inline-flex w-max items-center gap-0.5 px-1.5 py-0.5"
                            icon={<BriefcaseClockIcon aria-hidden />}
                            variant="info"
                        >
                            Selvstendig næringsdrivende
                        </Tag>
                        {næring.arbeidsgiverIdType === 'orgnr' && (
                            <HStack justify="space-between">
                                <Label>Org.nummer</Label>
                                <BodyShort className="text-ax-text-neutral-subtle" size="small">
                                    {næring.arbeidsgiverId}
                                </BodyShort>
                            </HStack>
                        )}
                        <HStack justify="space-between">
                            <Label>Dato:</Label>
                            <BodyShort className="text-ax-text-neutral-subtle" size="small">
                                <FormattedMessage
                                    id="inntektsinformasjon.arbeidsforhold.periode"
                                    values={{
                                        fom: formatDate(næring.fom),
                                        tom: næring.tom
                                            ? formatDate(næring.tom)
                                            : intl.formatMessage({ id: 'HarArbeidsforhold.pågående' }),
                                    }}
                                />
                            </BodyShort>
                        </HStack>
                        <InfoCard data-color="warning">
                            <InfoCard.Message icon={<ExclamationmarkTriangleIcon aria-hidden />}>
                                Vi trenger flere opplysninger om næringen din. Dette kan du fylle ut i neste steg.
                            </InfoCard.Message>
                        </InfoCard>
                    </VStack>
                </Box>
            ))}
        </VStack>
    );
};
