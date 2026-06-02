import { ReactNode } from 'react';

import { BodyShort, Box, HStack, VStack } from '@navikt/ds-react';

type Props = {
    tittel: ReactNode;
    varighetLabel: ReactNode;
    varighetVerdi: ReactNode;
    perMånedLabel: ReactNode;
    perMånedVerdi: ReactNode;
    totaltLabel: ReactNode;
    totaltVerdi: ReactNode;
};

const InfoRad = ({ label, verdi }: { label: ReactNode; verdi: ReactNode }) => (
    <HStack
        justify="space-between"
        gap="space-8"
        style={{ borderBottom: '1px solid var(--ax-border-neutral-subtleA)', paddingBottom: '0.25rem' }}
    >
        <BodyShort weight="regular">{label}</BodyShort>
        <BodyShort style={{ textAlign: 'right' }} weight="semibold">
            {verdi}
        </BodyShort>
    </HStack>
);

const TotalRad = ({ label, verdi }: { label: ReactNode; verdi: ReactNode }) => (
    <Box
        paddingBlock="space-8"
        style={{
            borderRadius: '4px',
            backgroundColor: 'var(--ax-bg-accent-soft)',
            marginTop: '0.5rem',
            padding: '1rem 0.5rem',
        }}
    >
        <HStack justify="space-between" gap="space-8">
            <BodyShort weight="regular">{label}</BodyShort>
            <BodyShort style={{ textAlign: 'right', fontSize: '1.5rem' }} weight="semibold">
                {verdi}
            </BodyShort>
        </HStack>
    </Box>
);

export const DekningsgradUtbetalingKort = ({
    tittel,
    varighetLabel,
    varighetVerdi,
    perMånedLabel,
    perMånedVerdi,
    totaltLabel,
    totaltVerdi,
}: Props) => (
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
            <BodyShort weight="semibold">{tittel}</BodyShort>
            <InfoRad label={varighetLabel} verdi={varighetVerdi} />
            <InfoRad label={perMånedLabel} verdi={perMånedVerdi} />
            <TotalRad label={totaltLabel} verdi={totaltVerdi} />
        </VStack>
    </Box>
);
