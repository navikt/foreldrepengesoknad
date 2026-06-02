import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { links } from '@navikt/fp-constants';
import { BodyShort, Box, HStack, Link, VStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import { ReactNode } from 'react';

type UtbetalingKortProps = {
    tittel: ReactNode;
    varighetVerdi: ReactNode;
    perMånedVerdi: ReactNode;
    totaltVerdi: ReactNode;
};

const InfoRad = ({ label, verdi }: { label: ReactNode; verdi: ReactNode }) => (
    <HStack
        justify="space-between"
        gap="space-8"
        style={{ borderBottom: '1px solid var(--ax-border-neutral-subtleA)', paddingBottom: '0.25rem' }}
    >
        <BodyShort weight="regular">
            {label}
        </BodyShort>
        <BodyShort style={{ textAlign: 'right' }} weight="semibold">
            {verdi}
        </BodyShort>
    </HStack>
);

const TotalRad = ({ label, verdi }: { label: ReactNode; verdi: ReactNode }) => (
    <Box
        paddingInline="space-12"
        paddingBlock="space-8"
        style={{
            borderRadius: '4px',
            backgroundColor: 'var(--ax-bg-accent-soft)',
            marginTop: '1rem',
        }}
    >
        <HStack justify="space-between" gap="space-8">
            <BodyShort weight="regular">
                {label}
            </BodyShort>
            <BodyShort style={{ textAlign: 'right', fontSize: '1.125rem' }} weight="semibold">
                {verdi}
            </BodyShort>
        </HStack>
    </Box>
);

const DekningsgradUtbetalingKort = ({
    tittel,
    varighetVerdi,
    perMånedVerdi,
    totaltVerdi,
}: UtbetalingKortProps) => (
    <Box
        padding="space-12"
        style={{
            border: '1px solid var(--ax-bg-accent-moderate-pressed)',
            borderRadius: '0.5rem',
            minWidth: '16rem',
            flex: 1,
        }}
    >
        <VStack gap="space-8">
            <BodyShort weight="semibold">
                {tittel}
            </BodyShort>
            <InfoRad
                label={<FormattedMessage id="DekningsgradUtbetalingEksempel.Rad.Varighet" />}
                verdi={varighetVerdi}
            />
            <InfoRad
                label={<FormattedMessage id="DekningsgradUtbetalingEksempel.Rad.PerMåned" />}
                verdi={perMånedVerdi}
            />
            <TotalRad
                label={<FormattedMessage id="DekningsgradUtbetalingEksempel.Rad.Totalt" />}
                verdi={totaltVerdi}
            />
        </VStack>
    </Box>
);

export const DekningsgradUtbetalingEksempel = () => (
    <VStack gap="space-16">
        <Box
            padding="space-16"
            style={{
                border: '1px solid var(--a-border-default)',
                borderRadius: '0.5rem',
            }}
        >
            <VStack gap="space-16">
                <BodyShort weight="semibold" style={{ fontSize: '1.25rem' }}>
                    <FormattedMessage id="DekningsgradUtbetalingEksempel.Tittel" />
                </BodyShort>
                <BodyShort>
                    <FormattedMessage id="DekningsgradUtbetalingEksempel.Intro" />
                </BodyShort>
                <HStack gap="space-16" align="start" style={{ flexWrap: 'wrap' }}>
                    <DekningsgradUtbetalingKort
                        tittel={<FormattedMessage id="DekningsgradUtbetalingEksempel.Hundre.Tittel" />}
                        varighetVerdi={<FormattedMessage id="DekningsgradUtbetalingEksempel.Hundre.Varighet" />}
                        perMånedVerdi={<FormattedMessage id="DekningsgradUtbetalingEksempel.Hundre.PerMåned" />}
                        totaltVerdi={<FormattedMessage id="DekningsgradUtbetalingEksempel.Hundre.Totalt" />}
                    />
                    <Box asChild paddingInline="space-4" style={{ alignSelf: 'center' }}>
                        <span style={{ fontSize: '2em', lineHeight: 1 }}>≈</span>
                    </Box>
                    <DekningsgradUtbetalingKort
                        tittel={<FormattedMessage id="DekningsgradUtbetalingEksempel.Atti.Tittel" />}
                        varighetVerdi={<FormattedMessage id="DekningsgradUtbetalingEksempel.Atti.Varighet" />}
                        perMånedVerdi={<FormattedMessage id="DekningsgradUtbetalingEksempel.Atti.PerMåned" />}
                        totaltVerdi={<FormattedMessage id="DekningsgradUtbetalingEksempel.Atti.Totalt" />}
                    />
                </HStack>
                <BodyShort size="small">
                    <FormattedMessage id="DekningsgradUtbetalingEksempel.Fotnote" />
                </BodyShort>
            </VStack>
        </Box>
        <Link href={links.hvorMye} target="_blank">
            <FormattedMessage id="DekningsgradUtbetalingEksempel.Link" />
            <ExternalLinkIcon title="a11y-title" fontSize="1.5rem" />
        </Link>
    </VStack>
);
