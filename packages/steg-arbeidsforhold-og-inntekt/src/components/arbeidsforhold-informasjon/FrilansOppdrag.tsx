import { BriefcaseClockIcon, ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box, Heading, InfoCard, List, ReadMore, Tag, VStack } from '@navikt/ds-react';

import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

interface Props {
    frilansoppdrag: EksternArbeidsforholdDto_fpoversikt[];
}

export const FrilansOppdrag = ({ frilansoppdrag }: Props) => {
    const intl = useIntl();

    if (frilansoppdrag.length === 0) {
        return null;
    }
    return (
        <VStack gap="space-8">
            <Box
                padding="space-16"
                className="rounded-(--ax-radius-12) border border-ax-border-info-subtle bg-ax-bg-info-soft"
            >
                <VStack gap="space-16">
                    <Heading size="xsmall" level="3">
                        Mine frilansoppdrag
                    </Heading>
                    <Tag
                        className="inline-flex w-max items-center gap-0.5 px-1.5 py-0.5"
                        icon={<BriefcaseClockIcon aria-hidden />}
                        variant="info"
                    >
                        Frilanser
                    </Tag>
                    <ReadMore header={<FormattedMessage id="inntektsinformasjon.frilansoppdrag.label" />}>
                        <List>
                            {frilansoppdrag.map((arbforhold) => (
                                <List.Item
                                    key={`${arbforhold.arbeidsgiverId}-${arbforhold.fom}-${arbforhold.tom ?? ''}`}
                                    title={
                                        arbforhold.arbeidsgiverNavn
                                            ? capitalizeFirstLetterInEveryWordOnly(arbforhold.arbeidsgiverNavn)
                                            : intl.formatMessage({ id: 'HarArbeidsforhold.arbeidsgiver' })
                                    }
                                >
                                    <FormattedMessage
                                        id="inntektsinformasjon.arbeidsforhold.periode"
                                        values={{
                                            fom: formatDate(arbforhold.fom),
                                            tom: arbforhold.tom
                                                ? formatDate(arbforhold.tom)
                                                : intl.formatMessage({ id: 'HarArbeidsforhold.pågående' }),
                                        }}
                                    />
                                </List.Item>
                            ))}
                        </List>
                    </ReadMore>
                    <InfoCard data-color="warning">
                        <InfoCard.Message icon={<ExclamationmarkTriangleIcon aria-hidden />}>
                            Vi må vite om du fortsatt er frilanser. Dette kan du svare på i neste steg.
                        </InfoCard.Message>
                    </InfoCard>
                </VStack>
            </Box>
        </VStack>
    );
};
