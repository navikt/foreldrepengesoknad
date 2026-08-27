import { ExclamationmarkTriangleIcon, PersonEnvelopeIcon } from '@navikt/aksel-icons';
import { useIntl } from 'react-intl';

import { BodyShort, Box, HStack, Heading, InfoCard, Label, List, ReadMore, Tag, VStack } from '@navikt/ds-react';

import { SelvstendigNæringDto_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

interface Props {
    selvstendigNæring: SelvstendigNæringDto_fpoversikt[];
    visManglerOpplysninger?: boolean;
}

const getNæringKey = (næring: SelvstendigNæringDto_fpoversikt) => næring.organisasjonsnummer;

const getNæringNavn = (næring: SelvstendigNæringDto_fpoversikt, fallback: string) =>
    næring.navn ? capitalizeFirstLetterInEveryWordOnly(næring.navn) : fallback;

const ManglerOpplysninger = () => (
    <InfoCard data-color="warning">
        <InfoCard.Message icon={<ExclamationmarkTriangleIcon aria-hidden />}>
            Vi mangler opplysninger om næringen. Dette kan du legge til i neste steg.
        </InfoCard.Message>
    </InfoCard>
);

export const SelvstendigNæring = ({ selvstendigNæring, visManglerOpplysninger = true }: Props) => {
    const intl = useIntl();

    if (selvstendigNæring.length === 0) {
        return null;
    }

    const fallbackNavn = intl.formatMessage({ id: 'inntektsinformasjon.egenNæring.label' });

    if (selvstendigNæring.length > 1) {
        return (
            <VStack gap="space-8">
                <Box
                    padding="space-16"
                    className="rounded-(--ax-radius-12) border border-ax-border-info-subtle bg-ax-bg-info-soft"
                >
                    <VStack gap="space-16">
                        <Heading size="xsmall" level="3">
                            Mine næringer
                        </Heading>
                        <Tag
                            className="inline-flex w-max items-center gap-0.5 px-1.5 py-0.5"
                            icon={<PersonEnvelopeIcon aria-hidden />}
                            variant="info"
                        >
                            Selvstendig næringsdrivende
                        </Tag>
                        <ReadMore variant="moderate" header="Dine næringer">
                            <List>
                                {selvstendigNæring.map((næring) => (
                                    <List.Item key={getNæringKey(næring)} title={getNæringNavn(næring, fallbackNavn)}>
                                        <VStack gap="space-4">
                                            <BodyShort size="small">Org.nummer: {næring.organisasjonsnummer}</BodyShort>
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

    const næring = selvstendigNæring[0]!;

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
                        Selvstendig næringsdrivende
                    </Tag>
                    <HStack justify="space-between">
                        <Label>Org.nummer</Label>
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
