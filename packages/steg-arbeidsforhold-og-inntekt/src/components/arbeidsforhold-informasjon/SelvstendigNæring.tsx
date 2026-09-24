import { ExclamationmarkTriangleIcon, PersonEnvelopeIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Box, HStack, Heading, InfoCard, Label, List, ReadMore, Tag, VStack } from '@navikt/ds-react';

import { SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

interface Props {
    registrerteNæringer: SelvstendigNæringDto_fpoversikt[];
    visManglerOpplysninger?: boolean;
}

const getNæringKey = (næring: SelvstendigNæringDto_fpoversikt) => næring.organisasjonsnummer;

const getNæringNavn = (næring: SelvstendigNæringDto_fpoversikt, fallback: string) =>
    næring.navn ? capitalizeFirstLetterInEveryWordOnly(næring.navn) : fallback;

const ManglerOpplysninger = () => (
    <InfoCard data-color="warning">
        <InfoCard.Message icon={<ExclamationmarkTriangleIcon aria-hidden />}>
            <FormattedMessage id="SelvstendigNæring.ManglerOpplysninger" />
        </InfoCard.Message>
    </InfoCard>
);

export const SelvstendigNæring = ({ registrerteNæringer, visManglerOpplysninger = true }: Props) => {
    const intl = useIntl();

    if (registrerteNæringer.length === 0) {
        return null;
    }

    const fallbackNavn = intl.formatMessage({ id: 'inntektsinformasjon.egenNæring.label' });

    if (registrerteNæringer.length > 1) {
        return (
            <VStack gap="space-8">
                <Box
                    padding="space-16"
                    className="rounded-(--ax-radius-12) border border-ax-border-info-subtle bg-ax-bg-info-soft"
                >
                    <VStack gap="space-16">
                        <Heading size="xsmall" level="3">
                            <FormattedMessage id="SelvstendigNæring.MineNæringer" />
                        </Heading>
                        <Tag
                            className="inline-flex w-max items-center gap-0.5 px-1.5 py-0.5"
                            icon={<PersonEnvelopeIcon aria-hidden />}
                            variant="info"
                        >
                            <FormattedMessage id="SelvstendigNæringDrivende.Tag" />
                        </Tag>
                        <ReadMore
                            variant="moderate"
                            header={intl.formatMessage({ id: 'SelvstendigNæring.DineNæringer' })}
                        >
                            <List>
                                {registrerteNæringer.map((næring) => (
                                    <List.Item key={getNæringKey(næring)} title={getNæringNavn(næring, fallbackNavn)}>
                                        <VStack gap="space-4">
                                            <BodyShort size="small">
                                                <FormattedMessage
                                                    id="SelvstendigNæringDrivende.OrgNummerMedVerdi"
                                                    values={{ orgnummer: næring.organisasjonsnummer }}
                                                />
                                            </BodyShort>
                                        </VStack>
                                    </List.Item>
                                ))}
                            </List>
                        </ReadMore>
                        {visManglerOpplysninger && <ManglerOpplysninger />}
                    </VStack>
                </Box>
            </VStack>
        );
    }

    const næring = registrerteNæringer[0]!;

    return (
        <VStack gap="space-8">
            <Box
                padding="space-16"
                className="rounded-(--ax-radius-12) border border-ax-border-info-subtle bg-ax-bg-info-soft"
            >
                <VStack gap="space-16">
                    <Heading size="xsmall" level="3">
                        {getNæringNavn(næring, fallbackNavn)}
                    </Heading>
                    <Tag
                        className="inline-flex w-max items-center gap-0.5 px-1.5 py-0.5"
                        icon={<PersonEnvelopeIcon aria-hidden />}
                        variant="info"
                    >
                        <FormattedMessage id="SelvstendigNæringDrivende.Tag" />
                    </Tag>
                    <HStack gap={{ md: 'space-8' }} justify={{ xs: 'space-between', md: 'start' }}>
                        <Label>
                            <FormattedMessage id="SelvstendigNæringDrivende.OrgNummer" />
                        </Label>
                        <BodyShort className="text-ax-text-neutral-subtle" size="small">
                            {næring.organisasjonsnummer}
                        </BodyShort>
                    </HStack>
                    {visManglerOpplysninger && <ManglerOpplysninger />}
                </VStack>
            </Box>
        </VStack>
    );
};
