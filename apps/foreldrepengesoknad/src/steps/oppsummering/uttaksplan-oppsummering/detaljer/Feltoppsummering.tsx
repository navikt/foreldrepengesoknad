import { BodyShort, HStack } from '@navikt/ds-react';

interface Props {
    feltnavn: string;
    verdi: string | string[];
}

export const Feltoppsummering = ({ feltnavn, verdi }: Props) => (
    <HStack gap="1">
        <BodyShort>{feltnavn}:</BodyShort>
        <BodyShort>{verdi}</BodyShort>
    </HStack>
);
