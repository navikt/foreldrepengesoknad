import * as React from 'react';

import { BodyShort, HStack } from '@navikt/ds-react';

interface Props {
    feltnavn: string;
    verdi: string | string[];
}

const Feltoppsummering: React.FunctionComponent<Props> = ({ feltnavn, verdi }) => (
    <HStack gap="1">
        <BodyShort>{feltnavn}:</BodyShort>
        <BodyShort>{verdi}</BodyShort>
    </HStack>
);

export default Feltoppsummering;
